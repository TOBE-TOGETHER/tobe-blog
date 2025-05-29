package com.tobe.blog.core.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Enhanced Email Template Service that uses the new base email template architecture
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class EmailTemplateService {
    
    private final EmailService emailService;
    
    // Template names
    private static final String BASE_EMAIL_TEMPLATE = "base-email";
    private static final String EMAIL_VERIFICATION_NEW_TEMPLATE = "email-verification-new";
    private static final String PASSWORD_RESET_NEW_TEMPLATE = "password-reset-new";
    
    /**
     * Send email verification using the new template architecture
     * 
     * @param recipientEmail Email address of the recipient
     * @param recipientName Name of the recipient
     * @param verificationLink Verification link
     * @param expirationMinutes Minutes until the link expires
     */
    public void sendEmailVerification(String recipientEmail, String recipientName, 
                                    String verificationLink, int expirationMinutes) {
        try {
            Map<String, Object> variables = new HashMap<>();
            variables.put("firstName", recipientName != null ? recipientName : "User");
            variables.put("email", recipientEmail);
            variables.put("verificationLink", verificationLink);
            variables.put("expirationMinutes", expirationMinutes);
            
            emailService.sendTemplateEmail(
                recipientEmail,
                "Email Verification - Tobe Blog",
                EMAIL_VERIFICATION_NEW_TEMPLATE,
                variables
            );
            
            log.info("Email verification sent successfully to: {}", recipientEmail);
        } catch (Exception e) {
            log.error("Failed to send email verification to: {}", recipientEmail, e);
            throw new RuntimeException("Failed to send email verification", e);
        }
    }
    
    /**
     * Send password reset email using the new template architecture
     * 
     * @param recipientEmail Email address of the recipient
     * @param recipientName Name of the recipient
     * @param resetUrl Password reset URL
     * @param expiryMinutes Minutes until the link expires
     */
    public void sendPasswordReset(String recipientEmail, String recipientName, 
                                String resetUrl, int expiryMinutes) {
        try {
            Map<String, Object> variables = new HashMap<>();
            variables.put("name", recipientName != null ? recipientName : "User");
            variables.put("email", recipientEmail);
            variables.put("resetUrl", resetUrl);
            variables.put("expiryMinutes", expiryMinutes);
            
            emailService.sendTemplateEmail(
                recipientEmail,
                "Password Reset - Tobe Blog",
                PASSWORD_RESET_NEW_TEMPLATE,
                variables
            );
            
            log.info("Password reset email sent successfully to: {}", recipientEmail);
        } catch (Exception e) {
            log.error("Failed to send password reset email to: {}", recipientEmail, e);
            throw new RuntimeException("Failed to send password reset email", e);
        }
    }
    
    /**
     * Send a custom email using the base template
     * 
     * @param recipientEmail Email address of the recipient
     * @param recipientName Name of the recipient
     * @param subject Email subject
     * @param emailTitle Email title (for browser tab)
     * @param contentTemplate Content template fragment name
     * @param customVariables Additional variables for the template
     */
    public void sendCustomEmail(String recipientEmail, String recipientName, String subject,
                              String emailTitle, String contentTemplate, Map<String, Object> customVariables) {
        try {
            Map<String, Object> variables = new HashMap<>();
            variables.put("emailTitle", emailTitle);
            variables.put("emailSubject", subject);
            variables.put("recipientName", recipientName != null ? recipientName : "User");
            variables.put("recipientEmail", recipientEmail);
            variables.put("contentTemplate", contentTemplate);
            
            // Add custom variables
            if (customVariables != null) {
                variables.putAll(customVariables);
            }
            
            emailService.sendTemplateEmail(
                recipientEmail,
                subject,
                BASE_EMAIL_TEMPLATE,
                variables
            );
            
            log.info("Custom email sent successfully to: {} with template: {}", recipientEmail, contentTemplate);
        } catch (Exception e) {
            log.error("Failed to send custom email to: {} with template: {}", recipientEmail, contentTemplate, e);
            throw new RuntimeException("Failed to send custom email", e);
        }
    }
} 