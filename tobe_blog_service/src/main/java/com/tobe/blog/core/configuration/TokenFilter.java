package com.tobe.blog.core.configuration;


import com.tobe.blog.beans.dto.user.EnhancedUserDetail;
import com.tobe.blog.core.utils.TokenUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.annotation.Resource;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Slf4j
@Component
public class TokenFilter extends OncePerRequestFilter {

    @Resource
    private TokenUtil tokenUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
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
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        } catch (Exception ex) {
            log.error("Auth exception: " + ex.getMessage(), ex);
        }
    }
}

