package com.tobe.blog.content.service.impl;

import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.tobe.blog.DefaultTestData;
import com.tobe.blog.DefaultTestData.DefaultUser;
import com.tobe.blog.beans.consts.Const.ContentType;
import com.tobe.blog.beans.dto.content.ArticleCreationDTO;
import com.tobe.blog.beans.dto.content.ArticleDTO;
import com.tobe.blog.beans.dto.content.ArticleUpdateDTO;
import com.tobe.blog.beans.dto.tag.TagInfoDTO;
import com.tobe.blog.core.utils.SecurityUtil;

@SpringBootTest
@ActiveProfiles("test")
public class ArticleServiceTests {

    @Autowired
    private ArticleService articleService;

    @BeforeEach
    void setUp() {
        SecurityUtil.setUserDetail(DefaultTestData.getDefaultUserAuthentication());
    }

    @Test
    @DisplayName("Article Service: create with valid input")
    void testSave_withValidInput() {
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
        Assertions.assertEquals(ContentType.ARTICLE.name(), result.getContentType());
        Assertions.assertEquals(dto.getDescription(), result.getDescription());
        Assertions.assertNotNull(result.getId());
        Assertions.assertEquals(0, result.getViewCount());
        Assertions.assertEquals(0, result.getLikeCount());
        Assertions.assertEquals(Boolean.FALSE, result.getPublicToAll());
        Assertions.assertNull(result.getPublishTime());
    }

    @Test
    @DisplayName("Article Service: create new Article with invalid input")
    void testSaveWithInvalidInput() {
        ArticleCreationDTO dto = new ArticleCreationDTO();
        dto.setTitle("Article With Long Subtitle");
        dto.setSubTitle(RandomStringUtils.randomAlphabetic(129));
        dto.setDescription("Let's verify the content together!");
        dto.setContentProtected(Boolean.FALSE);
        dto.setContent("Today is a special one in the history!");
        // SubTitle length can not exceed 128
        Assertions.assertThrows(RuntimeException.class, () -> articleService.save(dto));
        dto.setSubTitle(RandomStringUtils.randomAlphabetic(128));
        ArticleDTO result = articleService.save(dto);
        Assertions.assertNotNull(result.getId());
        // No length constrain to the content field
        dto.setTitle("Article With Long Content");
        dto.setContent(RandomStringUtils.randomAlphabetic(40000));
        result = articleService.save(dto);
        Assertions.assertNotNull(result.getId());
    }

    @Test
    @DisplayName("Article Service: update article")
    void testUpdate_existingArticle() {
        ArticleCreationDTO dto = new ArticleCreationDTO();
        dto.setTitle("Article To Be Update");
        dto.setSubTitle("Subtitle to be updated");
        dto.setDescription("Desc to be updated");
        dto.setContentProtected(Boolean.FALSE);
        dto.setContent("Content to be updated");
        ArticleDTO saveResult = articleService.save(dto);
        // prepare update DTO
        ArticleUpdateDTO updateDTO = new ArticleUpdateDTO();
        String UPDATED_SUBTITLE = "Updated subtitle";
        String UPDATED_DESCRIPTION = "Updated desc";
        String UPDATED_CONTENT = "Updated content";
        updateDTO.setId(saveResult.getId());
        updateDTO.setSubTitle(UPDATED_SUBTITLE);
        updateDTO.setDescription(UPDATED_DESCRIPTION);
        updateDTO.setContent(UPDATED_CONTENT);
        updateDTO.setContentProtected(Boolean.TRUE);
        ArticleDTO updateResult = articleService.update(updateDTO);
        Assertions.assertEquals(saveResult.getId(), updateResult.getId());
        Assertions.assertEquals(UPDATED_SUBTITLE, updateResult.getSubTitle());
        Assertions.assertEquals(UPDATED_DESCRIPTION, updateResult.getDescription());
        Assertions.assertEquals(UPDATED_CONTENT, updateResult.getContent());
        Assertions.assertEquals(Boolean.TRUE, updateResult.getContentProtected());
    }

    @Test
    @DisplayName("Article Service: delete article")
    void testDelete() {
        ArticleCreationDTO dto = new ArticleCreationDTO();
        dto.setTitle("Article To Be Deleted");
        ArticleDTO saveResult = articleService.save(dto);
        Assertions.assertNotNull(saveResult.getId());
        Assertions.assertDoesNotThrow(() -> articleService.delete(saveResult.getId()));
        // should throw when the content has been deleted or not existing
        Assertions.assertThrows(RuntimeException.class, () -> articleService.delete(saveResult.getId()));
    }

    @Test
    @DisplayName("Article Service: release article")
    void testRelease() {
        ArticleCreationDTO dto = new ArticleCreationDTO();
        dto.setTitle("Article To Be Released");
        ArticleDTO saveResult = articleService.save(dto);
        Assertions.assertNotNull(saveResult.getId());
        ArticleDTO releaseResult = articleService.release(saveResult.getId());
        Assertions.assertTrue(releaseResult.getPublicToAll());
        Assertions.assertNotNull(releaseResult.getPublishTime());
        // should not be able to repeatly release 
        Assertions.assertThrows(RuntimeException.class, () -> articleService.release(saveResult.getId()));
    }

    @Test
    @DisplayName("Article Service: create with tags")
    void testCreateWithTags() {
        ArticleCreationDTO dto = new ArticleCreationDTO();
        dto.setTitle("Article with tags");
        dto.setTags(List.of(
          TagInfoDTO.builder().value(1L).label("FIRST").build(), 
          TagInfoDTO.builder().value(2L).label("SECOND").build()
        ));
        // the tags should be correctly saved
        ArticleDTO saveResult = articleService.save(dto);
        Assertions.assertNotNull(saveResult.getId());
        Assertions.assertEquals(2, saveResult.getTags().size());
        // the tags should be correctly updated
        ArticleUpdateDTO updateDTO = new ArticleUpdateDTO();
        updateDTO.setId(saveResult.getId());
        updateDTO.setTags(List.of(
          TagInfoDTO.builder().value(1L).label("FIRST").build()
        ));
        ArticleDTO updateResult = articleService.update(updateDTO);
        Assertions.assertNotNull(updateResult.getId());
        Assertions.assertEquals(1, updateResult.getTags().size());
    }
}
