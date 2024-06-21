package com.tobe.blog.core.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ActiveProfiles;

import com.tobe.blog.DefaultTestData.DefaultUser;
import com.tobe.blog.beans.dto.user.EnhancedUserDetail;
import com.tobe.blog.beans.dto.user.UserLoginDTO;

/**
 * No need to verify the correctness of the login password in this test
 * as it has been verified in the Controller layer by authenticationManager 
 */
@SpringBootTest
@ActiveProfiles("test")
@DirtiesContext(classMode = ClassMode.BEFORE_CLASS)
public class AuthServiceTests {

    @Autowired
    private AuthService authService;

    @Test
    @DisplayName("Auth Service: user can login successfully with existing username")
    public void testLogin_successWithExistingUsername() {
        final UserLoginDTO loginDTO = new UserLoginDTO();
        loginDTO.setUsername("tobe_admin");
        final EnhancedUserDetail userDetails = authService.login(loginDTO);
        Assertions.assertEquals(loginDTO.getUsername(), userDetails.getUsername());
        Assertions.assertNotNull(userDetails.getAccessToken());
        Assertions.assertNotNull(userDetails.getRefreshToken());
        Assertions.assertEquals(DefaultUser.USER_ID, userDetails.getUserProfile().getId());
        Assertions.assertEquals(DefaultUser.ADDRESS, userDetails.getUserProfile().getAddress());
        Assertions.assertEquals(DefaultUser.AVATAR, userDetails.getUserProfile().getAvatarUrl());
        Assertions.assertEquals(DefaultUser.BACKGROUND_IMG, userDetails.getUserProfile().getBackgroundImg());
        Assertions.assertEquals(DefaultUser.BLOG, userDetails.getUserProfile().getBlog());
        Assertions.assertEquals(DefaultUser.EMAIL, userDetails.getUserProfile().getEmail());
        Assertions.assertEquals(DefaultUser.FIRST_NAME, userDetails.getUserProfile().getFirstName());
        Assertions.assertEquals(DefaultUser.LAST_NAME, userDetails.getUserProfile().getLastName());
        Assertions.assertEquals(DefaultUser.INTRODUCTION, userDetails.getUserProfile().getIntroduction());
        Assertions.assertEquals(DefaultUser.PHONE_NUM, userDetails.getUserProfile().getPhoneNum());
        Assertions.assertEquals(DefaultUser.PHOTO_IMG, userDetails.getUserProfile().getPhotoImg());
    }

    @Test
    @DisplayName("Auth Service: user can NOT login with non-existing username")
    public void testLogin_failWithNonExistingUsername() {
        final UserLoginDTO loginDTO = new UserLoginDTO();
        loginDTO.setUsername("non_tobe_admin");
        Assertions.assertThrows(RuntimeException.class, () -> authService.login(loginDTO));
    }
}
