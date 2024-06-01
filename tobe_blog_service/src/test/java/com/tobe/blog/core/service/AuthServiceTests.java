package com.tobe.blog.core.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ActiveProfiles;

import com.tobe.blog.beans.dto.user.EnhancedUserDetail;
import com.tobe.blog.beans.dto.user.UserLoginDTO;
import com.tobe.blog.core.service.UserServiceTests.DefaultUserTestData;

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
        Assertions.assertEquals(DefaultUserTestData.USER_ID, userDetails.getUserProfile().getId());
        Assertions.assertEquals(DefaultUserTestData.ADDRESS, userDetails.getUserProfile().getAddress());
        Assertions.assertEquals(DefaultUserTestData.AVATAR, userDetails.getUserProfile().getAvatarUrl());
        Assertions.assertEquals(DefaultUserTestData.BACKGROUND_IMG, userDetails.getUserProfile().getBackgroundImg());
        Assertions.assertEquals(DefaultUserTestData.BLOG, userDetails.getUserProfile().getBlog());
        Assertions.assertEquals(DefaultUserTestData.EMAIL, userDetails.getUserProfile().getEmail());
        Assertions.assertEquals(DefaultUserTestData.FIRST_NAME, userDetails.getUserProfile().getFirstName());
        Assertions.assertEquals(DefaultUserTestData.LAST_NAME, userDetails.getUserProfile().getLastName());
        Assertions.assertEquals(DefaultUserTestData.INTRODUCTION, userDetails.getUserProfile().getIntroduction());
        Assertions.assertEquals(DefaultUserTestData.PHONE_NUM, userDetails.getUserProfile().getPhoneNum());
        Assertions.assertEquals(DefaultUserTestData.PHOTO_IMG, userDetails.getUserProfile().getPhotoImg());
    }

    @Test
    @DisplayName("Auth Service: user can NOT login with non-existing username")
    public void testLogin_failWithNonExistingUsername() {
        final UserLoginDTO loginDTO = new UserLoginDTO();
        loginDTO.setUsername("non_tobe_admin");
        Assertions.assertThrows(RuntimeException.class, () -> authService.login(loginDTO));
    }
}
