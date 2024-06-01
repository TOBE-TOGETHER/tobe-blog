package com.tobe.blog.core.utils;

import com.tobe.blog.beans.dto.user.EnhancedUserDetail;
import com.tobe.blog.beans.dto.user.UserGeneralDTO;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Component
public class TokenUtil implements Serializable {

    private static final long serialVersionUID = -3L;

    @Value("${jwt.expire.access}")
    private long ACCESS_TOKEN_EXPIRATION;
    @Value("${jwt.expire.refresh}")
    private long REFRESH_TOKEN_EXPIRATION;
    @Value("${jwt.secret.access}")
    private String ACCESS_SECRET_KEY;
    @Value("${jwt.secret.refresh}")
    private String REFRESH_SECRET_KEY;

    private static final Map<String, Object> HEADERS = Map.of("alg", "HS256", "typ", "JWT");

    private static final String TOKEN_ISSUER = "tobe-server";

    public static final String AUTHORIZATION_KEY = "Authorization";

    public static final String REFRESH_KEY = "Refresh-Token";

    public static final String TOKEN_PREFIX = "Bearer ";

    public static final String TOKEN_PATTERN = "Bearer %s";

    public String createAccessToken(EnhancedUserDetail user) {
        try {
            return buildToken(ACCESS_SECRET_KEY, user.getUsername(), user.getUserProfile().getId(),
                    user.getAuthorities(), ACCESS_TOKEN_EXPIRATION);
        } catch (Exception e) {
            log.error("Error happens when create access token for: " + user.getUsername(), e);
            return null;
        }
    }

    public String createRefreshToken(EnhancedUserDetail user) {
        try {
            return buildToken(REFRESH_SECRET_KEY, user.getUsername(), user.getUserProfile().getId(),
                    user.getAuthorities(), REFRESH_TOKEN_EXPIRATION);
        } catch (Exception e) {
            log.error("Error happens when create refresh token for: " + user.getUsername(), e);
            return null;
        }
    }

    @SuppressWarnings("deprecation")
    private String buildToken(String secret, String subject, long id, Collection<? extends GrantedAuthority> roles,
            long tokenExpiration) {

        final String token = Jwts.builder()
                .setHeader(HEADERS)
                .setIssuer(TOKEN_ISSUER)
                .setSubject(subject)
                .setExpiration(getExpiredDate(tokenExpiration))
                .setIssuedAt(new Date())
                .claim("roles", roles)
                .claim("id", id)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
        return String.format(TOKEN_PATTERN, token);
    }

    @SuppressWarnings("deprecation")
    public String freshAccessToken(String refreshToken) {
        try {
            final Claims refreshClaims = Jwts.parserBuilder().setSigningKey(REFRESH_SECRET_KEY).build()
                    .parseClaimsJws(refreshToken).getBody();
            if (isTokenExpired(refreshClaims)) {
                return null;
            }
            String token = Jwts.builder()
                    .setClaims(refreshClaims)
                    .setIssuer(TOKEN_ISSUER)
                    .setSubject(refreshClaims.getSubject())
                    .setIssuedAt(new Date())
                    .setExpiration(getExpiredDate(ACCESS_TOKEN_EXPIRATION))
                    .signWith(SignatureAlgorithm.HS256, ACCESS_SECRET_KEY).compact();
            return String.format(TOKEN_PATTERN, token);
        } catch (Exception e) {
            log.error("Error happens when refresh the token, token: " + refreshToken, e);
            return null;
        }
    }

    @SuppressWarnings("unchecked")
    public EnhancedUserDetail validationToken(String token) {
        try {
            final Claims claims = Jwts.parserBuilder().setSigningKey(ACCESS_SECRET_KEY).build()
                    .parseClaimsJws(token).getBody();
            if (isTokenExpired(claims)) {
                return null;
            }
            final List<LinkedHashMap<String, String>> roleMap = claims.get("roles", ArrayList.class);
            final List<GrantedAuthority> roles = Optional.ofNullable(roleMap).orElse(List.of()).stream()
                    .map(r -> new SimpleGrantedAuthority(r.get("authority"))).collect(Collectors.toList());
            final UserGeneralDTO userProfile = new UserGeneralDTO();
            userProfile.setId(claims.get("id", Long.class));
            return new EnhancedUserDetail(roles, claims.getSubject(), Strings.EMPTY, userProfile);
        } catch (SignatureException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException e) {
            log.error("Error happens when validate the token, token: " + token, e);
            return null;
        }
    }

    private Date getExpiredDate(long expireTime) {
        return new Date(System.currentTimeMillis() + expireTime);
    }

    private boolean isTokenExpired(Claims claims) {
        return claims.getExpiration().before(new Date());
    }
}
