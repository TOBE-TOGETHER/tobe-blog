package com.tobe.blog.core.configuration;

import com.tobe.blog.beans.dto.user.EnhancedUserDetail;
import com.tobe.blog.core.utils.SecurityUtil;
import com.tobe.blog.core.utils.TokenUtil;

import jakarta.annotation.Resource;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
public class TokenFilter extends OncePerRequestFilter {

    @Resource
    private TokenUtil tokenUtil;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {
        parseTokenAndSetAuthContext(request, response);
        filterChain.doFilter(request, response);
    }

    private void parseTokenAndSetAuthContext(HttpServletRequest request, HttpServletResponse response) {
        try {
            final String authorizationValue = request.getHeader(TokenUtil.AUTHORIZATION_KEY);
            if (authorizationValue != null && authorizationValue.startsWith(TokenUtil.TOKEN_PREFIX)) {
                String token = authorizationValue.substring(TokenUtil.TOKEN_PREFIX.length());
                // Validate users' token and put authentication into context
                final EnhancedUserDetail user = tokenUtil.validationToken(token);
                if (user != null) {
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            user, null, user.getAuthorities());
                    SecurityUtil.setUserDetail(authentication);
                }
            }
        } catch (Exception ex) {
            log.error("Auth exception: " + ex.getMessage(), ex);
        }
    }
}
