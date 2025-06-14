package com.tobe.blog.core.utils;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import jakarta.servlet.http.HttpServletRequest;

/**
 * Utility class for accessing request context information
 * Eliminates need to pass HttpServletRequest to service layer
 */
public class RequestContextUtil {

    /**
     * Get client IP address from current request context
     * @return client IP address or "unknown" if not available
     */
    public static String getClientIpAddress() {
        try {
            ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
            HttpServletRequest request = attrs.getRequest();
            
            String xForwardedFor = request.getHeader("X-Forwarded-For");
            if (xForwardedFor != null && !xForwardedFor.isEmpty() && !"unknown".equalsIgnoreCase(xForwardedFor)) {
                return xForwardedFor.split(",")[0];
            }
            
            String xRealIp = request.getHeader("X-Real-IP");
            if (xRealIp != null && !xRealIp.isEmpty() && !"unknown".equalsIgnoreCase(xRealIp)) {
                return xRealIp;
            }
            
            return request.getRemoteAddr();
        } catch (IllegalStateException e) {
            // No request context available (e.g., in async processing or background tasks)
            return "unknown";
        }
    }

    /**
     * Get current HTTP request from context
     * @return current HttpServletRequest or null if not available
     */
    public static HttpServletRequest getCurrentRequest() {
        try {
            ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
            return attrs.getRequest();
        } catch (IllegalStateException e) {
            return null;
        }
    }

    /**
     * Check if we're currently in a request context
     * @return true if request context is available
     */
    public static boolean hasRequestContext() {
        try {
            RequestContextHolder.currentRequestAttributes();
            return true;
        } catch (IllegalStateException e) {
            return false;
        }
    }
} 