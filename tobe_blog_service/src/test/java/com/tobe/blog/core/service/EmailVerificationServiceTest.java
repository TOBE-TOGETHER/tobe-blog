package com.tobe.blog.core.service;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.contains;
import static org.mockito.ArgumentMatchers.eq;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.tobe.blog.beans.entity.user.UserEntity;
import com.tobe.blog.core.exception.TobeRuntimeException;
import com.tobe.blog.core.utils.CacheUtil;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class EmailVerificationServiceTest {

    @Mock
    private EmailService emailService;
    
    @Mock
    private UserService userService;
    
    @Mock
    private CacheUtil cacheUtil;
    
    @InjectMocks
    private EmailVerificationService emailVerificationService;
    
    private UserEntity testUser;
    private final String testEmail = "test@example.com";
    private final String testFirstName = "Test";
    private final String testToken = "test-token-123";
    
    @BeforeEach
    void setUp() {
        testUser = new UserEntity();
        testUser.setId(1L);
        testUser.setEmail(testEmail);
        testUser.setFirstName(testFirstName);
        testUser.setEmailVerified(Boolean.FALSE);
    }
    
    @Test
    @DisplayName("Should send verification email successfully")
    void testSendVerificationEmail_Success() {
        // Given
        when(cacheUtil.set(anyString(), anyString(), anyInt())).thenReturn(true);
        doNothing().when(emailService).sendTemplateEmail(anyString(), anyString(), anyString(), any(Map.class));
        
        // When & Then
        assertDoesNotThrow(() -> emailVerificationService.sendVerificationEmail(testEmail, testFirstName));
        
        // Verify interactions
        verify(cacheUtil).set(contains("email_verification_token:"), anyString(), anyLong());
        verify(emailService).sendTemplateEmail(eq(testEmail), anyString(), eq("email-verification"), any(Map.class));
    }
    
    @Test
    @DisplayName("Should verify email successfully with valid token")
    void testVerifyEmail_Success() {
        // Given
        when(cacheUtil.get("email_verification_token:" + testEmail)).thenReturn(testToken);
        when(userService.getOne(any(LambdaQueryWrapper.class))).thenReturn(testUser);
        when(userService.updateById(testUser)).thenReturn(true);
        doNothing().when(cacheUtil).del(anyString());
        
        // When
        Boolean result = emailVerificationService.verifyEmail(testEmail, testToken);
        
        // Then
        assertTrue(result);
        assertTrue(testUser.getEmailVerified());
        verify(cacheUtil).del("email_verification_token:" + testEmail);
    }
    
    @Test
    @DisplayName("Should return false when token is expired or not found")
    void testVerifyEmail_TokenExpired() {
        // Given
        when(cacheUtil.get("email_verification_token:" + testEmail)).thenReturn(null);
        
        // When
        Boolean result = emailVerificationService.verifyEmail(testEmail, testToken);
        
        // Then
        assertFalse(result);
        verify(userService, never()).getOne(any());
        verify(userService, never()).updateById(any());
    }
    
    @Test
    @DisplayName("Should return false when token is invalid")
    void testVerifyEmail_InvalidToken() {
        // Given
        when(cacheUtil.get("email_verification_token:" + testEmail)).thenReturn("different-token");
        
        // When
        Boolean result = emailVerificationService.verifyEmail(testEmail, testToken);
        
        // Then
        assertFalse(result);
        verify(userService, never()).getOne(any());
        verify(userService, never()).updateById(any());
    }
    
    @Test
    @DisplayName("Should return false when user not found")
    void testVerifyEmail_UserNotFound() {
        // Given
        when(cacheUtil.get("email_verification_token:" + testEmail)).thenReturn(testToken);
        when(userService.getOne(any(LambdaQueryWrapper.class))).thenReturn(null);
        
        // When
        Boolean result = emailVerificationService.verifyEmail(testEmail, testToken);
        
        // Then
        assertFalse(result);
        verify(userService, never()).updateById(any());
    }
    
    @Test
    @DisplayName("Should return true when email is already verified")
    void testVerifyEmail_AlreadyVerified() {
        // Given
        testUser.setEmailVerified(Boolean.TRUE);
        when(cacheUtil.get("email_verification_token:" + testEmail)).thenReturn(testToken);
        when(userService.getOne(any(LambdaQueryWrapper.class))).thenReturn(testUser);
        
        // When
        Boolean result = emailVerificationService.verifyEmail(testEmail, testToken);
        
        // Then
        assertTrue(result);
        verify(userService, never()).updateById(any());
    }
    
    @Test
    @DisplayName("Should check email verification status correctly")
    void testIsEmailVerified() {
        // Given - verified user
        testUser.setEmailVerified(Boolean.TRUE);
        when(userService.getOne(any(LambdaQueryWrapper.class))).thenReturn(testUser);
        
        // When
        Boolean result = emailVerificationService.isEmailVerified(testEmail);
        
        // Then
        assertTrue(result);
        
        // Given - unverified user
        testUser.setEmailVerified(Boolean.FALSE);
        
        // When
        result = emailVerificationService.isEmailVerified(testEmail);
        
        // Then
        assertFalse(result);
    }
    
    @Test
    @DisplayName("Should resend verification email successfully")
    void testResendVerificationEmail_Success() {
        // Given
        when(userService.getOne(any(LambdaQueryWrapper.class))).thenReturn(testUser);
        when(cacheUtil.set(anyString(), anyString(), anyInt())).thenReturn(true);
        doNothing().when(emailService).sendTemplateEmail(anyString(), anyString(), anyString(), any(Map.class));
        
        // When & Then
        assertDoesNotThrow(() -> emailVerificationService.resendVerificationEmail(testEmail));
        
        // Verify
        verify(emailService).sendTemplateEmail(eq(testEmail), anyString(), eq("email-verification"), any(Map.class));
    }
    
    @Test
    @DisplayName("Should throw exception when resending email for non-existent user")
    void testResendVerificationEmail_UserNotFound() {
        // Given
        when(userService.getOne(any(LambdaQueryWrapper.class))).thenReturn(null);
        
        // When & Then
        TobeRuntimeException exception = assertThrows(TobeRuntimeException.class, 
            () -> emailVerificationService.resendVerificationEmail(testEmail));
        
        assertEquals("User not found", exception.getMessage());
    }
    
    @Test
    @DisplayName("Should throw exception when resending email for already verified user")
    void testResendVerificationEmail_AlreadyVerified() {
        // Given
        testUser.setEmailVerified(Boolean.TRUE);
        when(userService.getOne(any(LambdaQueryWrapper.class))).thenReturn(testUser);
        
        // When & Then
        TobeRuntimeException exception = assertThrows(TobeRuntimeException.class, 
            () -> emailVerificationService.resendVerificationEmail(testEmail));
        
        assertEquals("Email already verified", exception.getMessage());
    }
} 