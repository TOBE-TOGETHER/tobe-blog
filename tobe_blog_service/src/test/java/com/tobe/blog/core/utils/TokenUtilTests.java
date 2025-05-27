package com.tobe.blog.core.utils;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.anyLong;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.util.ReflectionTestUtils;

import com.tobe.blog.beans.dto.user.EnhancedUserDetail;
import com.tobe.blog.beans.dto.user.UserGeneralDTO;
import com.tobe.blog.core.service.UserService;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
public class TokenUtilTests {

    @Mock
    private UserService userService;

    @InjectMocks
    private TokenUtil tokenUtil;

    @BeforeEach
    void setUp() {
        // Set test values for JWT configuration
        ReflectionTestUtils.setField(tokenUtil, "ACCESS_TOKEN_EXPIRATION", 3600000L); // 1 hour
        ReflectionTestUtils.setField(tokenUtil, "REFRESH_TOKEN_EXPIRATION", 86400000L); // 24 hours
        ReflectionTestUtils.setField(tokenUtil, "ACCESS_SECRET_KEY", "testsecretkeyforaccesstoken1234567890abcdef");
        ReflectionTestUtils.setField(tokenUtil, "REFRESH_SECRET_KEY", "testsecretkeyforrefreshtoken1234567890abcdef");
    }

    @Test
    @DisplayName("TokenUtil: Create and validate token with complete user profile")
    void testCreateAndValidateTokenWithCompleteUserProfile() {
        // Setup test user data
        UserGeneralDTO userProfile = new UserGeneralDTO();
        userProfile.setId(123L);
        userProfile.setUsername("testuser");
        userProfile.setFirstName("John");
        userProfile.setLastName("Doe");
        userProfile.setEmail("john.doe@example.com");
        userProfile.setAvatarUrl("https://example.com/avatar.jpg");

        EnhancedUserDetail originalUser = new EnhancedUserDetail(
                List.of(new SimpleGrantedAuthority("ROLE_USER")),
                "testuser",
                "password",
                userProfile
        );

        // Mock UserService to return complete user profile
        when(userService.getUser(123L)).thenReturn(userProfile);

        // Create access token
        String accessToken = tokenUtil.createAccessToken(originalUser);
        assertNotNull(accessToken);

        // Extract token without Bearer prefix
        String tokenWithoutPrefix = accessToken.replace("Bearer ", "");

        // Validate token and check if complete user profile is loaded
        EnhancedUserDetail validatedUser = tokenUtil.validationToken(tokenWithoutPrefix);

        assertNotNull(validatedUser);
        assertNotNull(validatedUser.getUserProfile());
        assertEquals(123L, validatedUser.getUserProfile().getId());
        assertEquals("testuser", validatedUser.getUserProfile().getUsername());
        assertEquals("John", validatedUser.getUserProfile().getFirstName());
        assertEquals("Doe", validatedUser.getUserProfile().getLastName());
        assertEquals("john.doe@example.com", validatedUser.getUserProfile().getEmail());
        assertEquals("https://example.com/avatar.jpg", validatedUser.getUserProfile().getAvatarUrl());
    }

    @Test
    @DisplayName("TokenUtil: Validation returns null when user not found")
    void testValidationReturnsNullWhenUserNotFound() {
        // Setup test user data
        UserGeneralDTO userProfile = new UserGeneralDTO();
        userProfile.setId(999L);
        userProfile.setUsername("nonexistentuser");

        EnhancedUserDetail originalUser = new EnhancedUserDetail(
                List.of(new SimpleGrantedAuthority("ROLE_USER")),
                "nonexistentuser",
                "password",
                userProfile
        );

        // Mock UserService to return null (user not found)
        when(userService.getUser(anyLong())).thenReturn(null);

        // Create access token
        String accessToken = tokenUtil.createAccessToken(originalUser);
        assertNotNull(accessToken);

        // Extract token without Bearer prefix
        String tokenWithoutPrefix = accessToken.replace("Bearer ", "");

        // Validate token - should return null because user not found
        EnhancedUserDetail validatedUser = tokenUtil.validationToken(tokenWithoutPrefix);

        assertNull(validatedUser);
    }
} 