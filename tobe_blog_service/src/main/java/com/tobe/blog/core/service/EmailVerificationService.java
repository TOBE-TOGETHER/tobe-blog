package com.tobe.blog.core.service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.tobe.blog.beans.entity.user.UserEntity;
import com.tobe.blog.core.exception.TobeRuntimeException;
import com.tobe.blog.core.utils.CacheUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailVerificationService {
    
    private final EmailService emailService;
    private final UserService userService;
    private final CacheUtil cacheUtil;
    
    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;
    
    private static final String EMAIL_VERIFICATION_TOKEN_KEY = "email_verification_token:";
    private static final String EMAIL_VERIFICATION_SUBJECT = "Verify Your Email Address";
    private static final String EMAIL_VERIFICATION_TEMPLATE = "email-verification";
    private static final int TOKEN_EXPIRE_MINUTES = 60; // 1 hour
    
    /**
     * Generate verification token and send verification email
     * @param email User's email address
     * @param firstName User's first name
     */
    public void sendVerificationEmail(String email, String firstName) {
        try {
            // Generate verification token
            String token = UUID.randomUUID().toString();
            
            // Store token in cache with expiration
            cacheUtil.set(EMAIL_VERIFICATION_TOKEN_KEY + email, token, TOKEN_EXPIRE_MINUTES * 60);
            
            // Prepare email template variables
            Map<String, Object> params = new HashMap<>();
            params.put("firstName", firstName != null ? firstName : "User");
            params.put("email", email);
            params.put("verificationLink", frontendUrl + "/verify-email?token=" + token + "&email=" + email);
            params.put("expirationMinutes", TOKEN_EXPIRE_MINUTES);
            
            // Send verification email
            emailService.sendTemplateEmail(email, EMAIL_VERIFICATION_SUBJECT, EMAIL_VERIFICATION_TEMPLATE, params);
            
            log.info("Verification email sent to: {}", email);
        } catch (Exception e) {
            log.error("Error sending verification email to: {}", email, e);
            throw new TobeRuntimeException("Failed to send verification email");
        }
    }
    
    /**
     * Verify email with token
     * @param email User's email address
     * @param token Verification token
     * @return true if verification successful, false otherwise
     */
    @Transactional
    public Boolean verifyEmail(String email, String token) {
        try {
            // Get stored token from cache
            String storedToken = (String) cacheUtil.get(EMAIL_VERIFICATION_TOKEN_KEY + email);
            
            if (storedToken == null) {
                log.warn("Email verification token expired or not found for email: {}", email);
                return Boolean.FALSE;
            }
            
            if (!storedToken.equals(token)) {
                log.warn("Invalid email verification token for email: {}", email);
                return Boolean.FALSE;
            }
            
            // Find user by email
            UserEntity user = userService.getOne(
                new LambdaQueryWrapper<UserEntity>().eq(UserEntity::getEmail, email)
            );
            
            if (user == null) {
                log.warn("User not found for email: {}", email);
                return Boolean.FALSE;
            }
            
            if (user.getEmailVerified()) {
                log.info("Email already verified for: {}", email);
                return Boolean.TRUE;
            }
            
            // Update user's email verification status
            user.setEmailVerified(Boolean.TRUE);
            boolean updated = userService.updateById(user);
            
            if (updated) {
                // Remove token from cache after successful verification
                cacheUtil.del(EMAIL_VERIFICATION_TOKEN_KEY + email);
                log.info("Email verified successfully for: {}", email);
                return Boolean.TRUE;
            } else {
                log.error("Failed to update email verification status for: {}", email);
                return Boolean.FALSE;
            }
            
        } catch (Exception e) {
            log.error("Error verifying email for: {}", email, e);
            return Boolean.FALSE;
        }
    }
    
    /**
     * Check if email is verified
     * @param email User's email address
     * @return true if email is verified, false otherwise
     */
    public Boolean isEmailVerified(String email) {
        try {
            UserEntity user = userService.getOne(
                new LambdaQueryWrapper<UserEntity>().eq(UserEntity::getEmail, email)
            );
            return user != null && user.getEmailVerified();
        } catch (Exception e) {
            log.error("Error checking email verification status for: {}", email, e);
            return Boolean.FALSE;
        }
    }
    
    /**
     * Resend verification email
     * @param email User's email address
     */
    public void resendVerificationEmail(String email) {
        try {
            // Check if user exists
            UserEntity user = userService.getOne(
                new LambdaQueryWrapper<UserEntity>().eq(UserEntity::getEmail, email)
            );
            
            if (user == null) {
                throw new TobeRuntimeException("User not found");
            }
            
            if (user.getEmailVerified()) {
                throw new TobeRuntimeException("Email already verified");
            }
            
            // Send verification email
            sendVerificationEmail(email, user.getFirstName());
            
        } catch (TobeRuntimeException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error resending verification email to: {}", email, e);
            throw new TobeRuntimeException("Failed to resend verification email");
        }
    }
} 