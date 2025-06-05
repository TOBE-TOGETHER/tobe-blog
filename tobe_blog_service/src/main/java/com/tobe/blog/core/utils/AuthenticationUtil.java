package com.tobe.blog.core.utils;

import java.util.function.Function;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.tobe.blog.beans.dto.user.EnhancedUserDetail;

/**
 * Utility class for common authentication operations
 * Reduces code duplication in controllers
 */
public class AuthenticationUtil {

    /**
     * Execute an operation with authenticated user
     * Returns UNAUTHORIZED if no user is authenticated
     * 
     * @param <T> return type of the operation
     * @param operation function that takes authenticated user and returns ResponseEntity
     * @return ResponseEntity with operation result or UNAUTHORIZED
     */
    public static <T> ResponseEntity<T> withAuthenticatedUser(
            Function<EnhancedUserDetail, ResponseEntity<T>> operation) {
        
        EnhancedUserDetail currentUser = SecurityUtil.getCurrentUserDetail();
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        return operation.apply(currentUser);
    }

    /**
     * Execute an operation with authenticated user ID
     * Returns UNAUTHORIZED if no user is authenticated
     * 
     * @param <T> return type of the operation
     * @param operation function that takes user ID and returns ResponseEntity
     * @return ResponseEntity with operation result or UNAUTHORIZED
     */
    public static <T> ResponseEntity<T> withAuthenticatedUserId(
            Function<Long, ResponseEntity<T>> operation) {
        
        return withAuthenticatedUser(user -> 
            operation.apply(user.getUserProfile().getId()));
    }

    /**
     * Get current authenticated user
     * 
     * @return current user or null if not authenticated
     */
    public static EnhancedUserDetail getCurrentUser() {
        return SecurityUtil.getCurrentUserDetail();
    }

    /**
     * Check if user is authenticated
     * 
     * @return true if user is authenticated, false otherwise
     */
    public static boolean isAuthenticated() {
        return getCurrentUser() != null;
    }

    /**
     * Get current authenticated user ID
     * 
     * @return user ID or null if not authenticated
     */
    public static Long getCurrentUserId() {
        EnhancedUserDetail user = getCurrentUser();
        return user != null ? user.getUserProfile().getId() : null;
    }
} 