package com.tobe.blog.core.controller;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.tobe.blog.beans.dto.user.EnhancedUserDetail;
import com.tobe.blog.beans.dto.user.UserLoginDTO;
import com.tobe.blog.beans.entity.user.UserEntity;
import com.tobe.blog.core.exception.EmailNotVerifiedException;
import com.tobe.blog.core.service.AuthService;
import com.tobe.blog.core.service.UserService;
import com.tobe.blog.core.utils.TokenUtil;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final TokenUtil tokenUtil;
    private final AuthenticationManager authenticationManager;

    /**
     * API to login front-end system, fetch access token and refresh token and user
     * profile
     */
    @PostMapping("/login")
    public ResponseEntity<EnhancedUserDetail> login(@RequestBody final UserLoginDTO dto) {
        // First check if user exists and email is verified
        final UserEntity userEntity = userService.getOne(new LambdaQueryWrapper<UserEntity>()
                .eq(UserEntity::getUsername, dto.getUsername())
                .or().eq(UserEntity::getEmail, dto.getUsername())
                .or().eq(UserEntity::getPhoneNum, dto.getUsername()));
                
        if (userEntity == null) {
            throw new UsernameNotFoundException("Invalid user name[ " + dto.getUsername() + " ], please confirm again!");
        }
        
        // Check if email is verified before attempting password validation
        if (!userEntity.getEmailVerified()) {
            throw new EmailNotVerifiedException("Email not verified. Please check your email and complete the verification process.");
        }
        
        // Now verify the username & password via authenticationManager
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword()));
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
