package com.tobe.blog.beans.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response DTO for email verification operations
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailVerificationResponse {
    
    private boolean success;
    private String message;
    private boolean alreadyVerified;
    
    public static EmailVerificationResponse success(String message, boolean alreadyVerified) {
        return new EmailVerificationResponse(true, message, alreadyVerified);
    }
    
    public static EmailVerificationResponse failure(String message) {
        return new EmailVerificationResponse(false, message, false);
    }
} 