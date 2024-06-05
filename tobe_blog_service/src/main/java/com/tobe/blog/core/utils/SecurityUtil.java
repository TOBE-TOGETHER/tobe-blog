package com.tobe.blog.core.utils;

import com.tobe.blog.beans.dto.user.EnhancedUserDetail;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@Slf4j
public class SecurityUtil {

    public static Long getUserId() {
        return getUserDetail() != null ? getUserDetail().getUserProfile().getId() : -1;
    }

    public static String getUsername() {
        return getUserDetail() != null ? getUserDetail().getUsername() : "Unknown";
    }

    @SuppressWarnings("unchecked")
    public static List<GrantedAuthority> getAuthorities() {
        return getUserDetail() != null ? (List<GrantedAuthority>) getUserDetail().getAuthorities() : List.of();
    }

    public static void setUserDetail(Authentication auth) {
        try {
            SecurityContextHolder.getContext().setAuthentication(auth);
        } catch (Exception ex) {
            log.error("Cannot set user detail into the security context", ex);
        }
    }

    private static EnhancedUserDetail getUserDetail() {
        try {
            return (EnhancedUserDetail) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        } catch (Exception ex) {
            log.error("Cannot get user detail from the security context", ex);
        }
        return null;
    }
}
