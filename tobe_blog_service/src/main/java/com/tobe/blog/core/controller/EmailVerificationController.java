package com.tobe.blog.core.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tobe.blog.beans.dto.EmailVerificationResponse;
import com.tobe.blog.core.service.EmailVerificationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/v1/email-verification")
@RequiredArgsConstructor
public class EmailVerificationController {

    private final EmailVerificationService emailVerificationService;

    /**
     * API to verify email with token
     */
    @GetMapping("/verify")
    public ResponseEntity<EmailVerificationResponse> verifyEmail(
            @RequestParam String email,
            @RequestParam String token) {
        try {
            // First check if email is already verified
            Boolean isAlreadyVerified = emailVerificationService.isEmailVerified(email);
            if (isAlreadyVerified) {
                return ResponseEntity.ok(
                    EmailVerificationResponse.success("Email already verified", true)
                );
            }
            
            Boolean result = emailVerificationService.verifyEmail(email, token);
            if (result) {
                return ResponseEntity.ok(
                    EmailVerificationResponse.success("Email verified successfully", false)
                );
            } else {
                return ResponseEntity.badRequest().body(
                    EmailVerificationResponse.failure("Invalid or expired verification token")
                );
            }
        } catch (Exception e) {
            log.error("Error verifying email: {}", email, e);
            return ResponseEntity.internalServerError().body(
                EmailVerificationResponse.failure("Internal server error")
            );
        }
    }

    /**
     * API to resend verification email
     */
    @PostMapping("/resend")
    public ResponseEntity<String> resendVerificationEmail(@RequestParam String email) {
        try {
            emailVerificationService.resendVerificationEmail(email);
            return ResponseEntity.ok("Verification email sent successfully");
        } catch (Exception e) {
            log.error("Error resending verification email: {}", email, e);
            return ResponseEntity.badRequest().body("Failed to resend verification email");
        }
    }

    /**
     * API to check if email is verified
     */
    @GetMapping("/status")
    public ResponseEntity<Boolean> checkEmailVerificationStatus(@RequestParam String email) {
        try {
            Boolean isVerified = emailVerificationService.isEmailVerified(email);
            return ResponseEntity.ok(isVerified);
        } catch (Exception e) {
            log.error("Error checking email verification status: {}", email, e);
            return ResponseEntity.ok(Boolean.FALSE);
        }
    }
} 