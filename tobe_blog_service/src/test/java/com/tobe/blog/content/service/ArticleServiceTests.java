package com.tobe.blog.content.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ActiveProfiles;

import com.tobe.blog.DefaultTestData.DefaultUser;
import com.tobe.blog.beans.dto.content.ArticleCreationDTO;
import com.tobe.blog.beans.dto.content.ArticleDTO;
import com.tobe.blog.beans.dto.user.EnhancedUserDetail;
import com.tobe.blog.beans.dto.user.UserLoginDTO;
import com.tobe.blog.core.service.AuthService;
import com.tobe.blog.core.utils.SecurityUtil;

@SpringBootTest
@ActiveProfiles("test")
@DirtiesContext(classMode = ClassMode.BEFORE_CLASS)
public class ArticleServiceTests {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private AuthService authService;

    @BeforeEach
    void setUp() {
        UserLoginDTO dto = new UserLoginDTO();
        dto.setUsername(DefaultUser.USERNAME);
        dto.setPassword("123456");
        EnhancedUserDetail userDetail = authService.login(dto);
        SecurityUtil.setUserDetail(new UsernamePasswordAuthenticationToken(
            userDetail, null, userDetail.getAuthorities()));
    }

    @Test
    @DisplayName("Article Service: create new Article with valid input")
    void testSave() {
        ArticleCreationDTO dto = new ArticleCreationDTO();
        dto.setTitle("Hello world!");
        dto.setSubTitle("This is the first article content of the system");
        dto.setDescription("Let's verify the content together!");
        dto.setContentProtected(Boolean.FALSE);
        dto.setContent("Today is a special one in the history!");
        ArticleDTO result = articleService.save(dto);

        Assertions.assertEquals(DefaultUser.USER_ID, result.getOwnerId());
        Assertions.assertEquals(String.format("%s %s", DefaultUser.FIRST_NAME, DefaultUser.LAST_NAME), result.getOwnerName());
        Assertions.assertEquals(DefaultUser.AVATAR, result.getAvatarUrl());
        Assertions.assertEquals(dto.getTitle(), result.getTitle());
        Assertions.assertEquals(dto.getSubTitle(), result.getSubTitle());
        Assertions.assertEquals(dto.getContent(), result.getContent());
        Assertions.assertEquals(dto.getContentProtected(), result.getContentProtected());
        Assertions.assertEquals(dto.getDescription(), result.getDescription());
        Assertions.assertNotNull(result.getId());
        Assertions.assertEquals(0, result.getViewCount());
        Assertions.assertEquals(0, result.getLikeCount());
        Assertions.assertEquals(Boolean.FALSE, result.getPublicToAll());
        Assertions.assertNull(result.getPublishTime());
    }
}
