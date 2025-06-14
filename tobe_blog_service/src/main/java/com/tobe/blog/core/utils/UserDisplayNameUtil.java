package com.tobe.blog.core.utils;

import com.tobe.blog.beans.dto.user.UserGeneralDTO;
import com.tobe.blog.beans.entity.user.UserEntity;

/**
 * Utility class for building user display names consistently across the application
 */
public class UserDisplayNameUtil {

    /**
     * Build user display name from UserGeneralDTO
     * @param userProfile user profile DTO
     * @return display name
     */
    public static String buildDisplayName(UserGeneralDTO userProfile) {
        if (userProfile == null) {
            return "Anonymous User";
        }
        
        // Try to build full name from firstName and lastName
        String firstName = userProfile.getFirstName();
        String lastName = userProfile.getLastName();
        
        if (isNotEmpty(firstName) && isNotEmpty(lastName)) {
            return (firstName.trim() + " " + lastName.trim()).trim();
        }
        
        // If only firstName is available
        if (isNotEmpty(firstName)) {
            return firstName.trim();
        }
        
        // If only lastName is available
        if (isNotEmpty(lastName)) {
            return lastName.trim();
        }
        
        // Fall back to username if no name is available
        if (isNotEmpty(userProfile.getUsername())) {
            return userProfile.getUsername().trim();
        }
        
        // Last resort - use email prefix
        if (isNotEmpty(userProfile.getEmail())) {
            String email = userProfile.getEmail().trim();
            int atIndex = email.indexOf('@');
            if (atIndex > 0) {
                return email.substring(0, atIndex);
            }
            return email;
        }
        
        // Ultimate fallback
        return "Anonymous User";
    }

    /**
     * Build user display name from UserEntity
     * @param user user entity
     * @return display name
     */
    public static String buildDisplayName(UserEntity user) {
        if (user == null) {
            return "Anonymous User";
        }
        
        if (isNotEmpty(user.getFirstName()) && isNotEmpty(user.getLastName())) {
            return (user.getFirstName().trim() + " " + user.getLastName().trim()).trim();
        }
        
        if (isNotEmpty(user.getFirstName())) {
            return user.getFirstName().trim();
        }
        
        if (isNotEmpty(user.getLastName())) {
            return user.getLastName().trim();
        }
        
        if (isNotEmpty(user.getUsername())) {
            return user.getUsername().trim();
        }
        
        if (isNotEmpty(user.getEmail())) {
            String email = user.getEmail().trim();
            int atIndex = email.indexOf('@');
            if (atIndex > 0) {
                return email.substring(0, atIndex);
            }
            return email;
        }
        
        return "Anonymous User";
    }

    /**
     * Check if a string is not empty (null, empty, or whitespace only)
     * @param str string to check
     * @return true if string has content
     */
    private static boolean isNotEmpty(String str) {
        return str != null && !str.trim().isEmpty();
    }
} 