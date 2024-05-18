package com.tobe.blog.core.controller;


import com.tobe.blog.beans.dto.user.EnhancedUserDetail;
import com.tobe.blog.beans.dto.user.UserLoginDTO;
import com.tobe.blog.core.service.AuthService;
import com.tobe.blog.core.utils.TokenUtil;
import io.micrometer.core.instrument.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final TokenUtil tokenUtil;

    /**
     * API to login front-end system, fetch access token and refresh token and user profile
     */
    @PostMapping("/login")
    public ResponseEntity<EnhancedUserDetail> login(@RequestBody final UserLoginDTO dto) {
        return ResponseEntity.ok(authService.login(dto));
    }

    /**
     * API to renewal access token with the refresh token attached in the header
     */
    @GetMapping("/refresh")
    public ResponseEntity<String> refresh(final HttpServletRequest request) {
        final String refreshToken = request.getHeader(TokenUtil.REFRESH_KEY);
        if (StringUtils.isBlank(refreshToken)) {
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(tokenUtil.freshAccessToken(refreshToken.substring(TokenUtil.TOKEN_PREFIX.length())));
    }
}
