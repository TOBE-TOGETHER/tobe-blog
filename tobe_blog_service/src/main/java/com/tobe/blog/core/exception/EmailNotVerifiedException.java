package com.tobe.blog.core.exception;

/**
 * Exception thrown when user tries to login with an unverified email address
 */
public class EmailNotVerifiedException extends RuntimeException {
    
    public EmailNotVerifiedException(String message) {
        super(message);
    }
    
    public EmailNotVerifiedException(String message, Throwable cause) {
        super(message, cause);
    }
} 