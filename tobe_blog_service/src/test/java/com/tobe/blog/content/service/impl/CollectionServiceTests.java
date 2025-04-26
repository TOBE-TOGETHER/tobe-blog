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
import com.tobe.blog.beans.consts.Const.Visibility;
import com.tobe.blog.beans.dto.content.CollectionCreationDTO;
import com.tobe.blog.beans.dto.content.CollectionDTO;
import com.tobe.blog.beans.dto.content.CollectionUpdateDTO;
import com.tobe.blog.beans.dto.content.ContentVisibilityUpdateDTO;
import com.tobe.blog.beans.dto.tag.TagInfoDTO;
import com.tobe.blog.core.utils.SecurityUtil;

@SpringBootTest
@ActiveProfiles("test")
public class CollectionServiceTests {
  
    @Autowired
    private CollectionService collectionService;

    @BeforeEach
    void setUp() {
        SecurityUtil.setUserDetail(DefaultTestData.getDefaultUserAuthentication());
    }

    @Test
    @DisplayName("Collection Service: create with valid input")
    void testSave_withValidInput() {
        final CollectionCreationDTO dto = new CollectionCreationDTO();
        dto.setTitle("First Collection");
        dto.setDescription("Let's verify the content together!");
        dto.setContentProtected(Boolean.FALSE);
        dto.setCoverImgUrl("https://cover-page-url");
        final CollectionDTO result = collectionService.save(dto);
        Assertions.assertEquals(DefaultUser.USER_ID, result.getOwnerId());
        Assertions.assertEquals(String.format("%s %s", DefaultUser.FIRST_NAME, DefaultUser.LAST_NAME), result.getOwnerName());
        Assertions.assertEquals(DefaultUser.AVATAR, result.getAvatarUrl());
        Assertions.assertNotNull(result.getId());
        Assertions.assertEquals(dto.getTitle(), result.getTitle());
        Assertions.assertEquals(dto.getContentProtected(), result.getContentProtected());
        Assertions.assertEquals(ContentType.COLLECTION.name(), result.getContentType());
        Assertions.assertEquals(dto.getDescription(), result.getDescription());
        Assertions.assertEquals(dto.getCoverImgUrl(), result.getCoverImgUrl());
        Assertions.assertEquals(0, result.getViewCount());
        Assertions.assertEquals(0, result.getLikeCount());
        Assertions.assertEquals(Boolean.FALSE, result.getPublicToAll());
        Assertions.assertNull(result.getPublishTime());
    }

    @Test
    @DisplayName("Collection Service: create with invalid input")
    void testSave_withInvalidInput() {
        final CollectionCreationDTO dto = new CollectionCreationDTO();
        dto.setTitle("Collection With invalid cover img url value");
        // coverImgUrl field length can not exceed 2000
        dto.setCoverImgUrl(RandomStringUtils.randomAlphanumeric(2001));
        Assertions.assertThrows(RuntimeException.class, () -> collectionService.save(dto));
        dto.setCoverImgUrl(RandomStringUtils.randomAlphanumeric(2000));
        final CollectionDTO result = collectionService.save(dto);
        Assertions.assertNotNull(result.getId());
    }


    @Test
    @DisplayName("Collection Service: update with invalid input")
    void testUpdate_existingCollection() {
        final CollectionCreationDTO dto = new CollectionCreationDTO();
        dto.setTitle("Collection to be updated");
        dto.setCoverImgUrl("Cover image to be updated");
        final CollectionDTO result = collectionService.save(dto);
        // build updateDTO
        final CollectionUpdateDTO updateDTO = new CollectionUpdateDTO();
        updateDTO.setId(result.getId());
        updateDTO.setCoverImgUrl("updated cover img");
        final CollectionDTO updateResult = collectionService.update(updateDTO);
        Assertions.assertNotNull(updateDTO.getCoverImgUrl(), updateResult.getCoverImgUrl());
    }

    @Test
    @DisplayName("Collection Service: delete item")
    void testDelete() {
        final CollectionCreationDTO dto = new CollectionCreationDTO();
        dto.setTitle("Collection To Be Deleted");
        final CollectionDTO saveResult = collectionService.save(dto);
        Assertions.assertNotNull(saveResult.getId());
        Assertions.assertDoesNotThrow(() -> collectionService.delete(saveResult.getId()));
        // should throw when the content has been deleted or not existing
        Assertions.assertThrows(RuntimeException.class, () -> collectionService.delete(saveResult.getId()));
    }

    @Test
    @DisplayName("Collection Service: release item")
    void testRelease() {
        final CollectionCreationDTO dto = new CollectionCreationDTO();
        dto.setTitle("Collection To Be Released");
        final CollectionDTO saveResult = collectionService.save(dto);
        Assertions.assertNotNull(saveResult.getId());
        final ContentVisibilityUpdateDTO visibilityUpdateDTO = ContentVisibilityUpdateDTO.builder().id(saveResult.getId()).visibility(Visibility.PUBLIC).build();
        final CollectionDTO releaseResult = collectionService.updateVisibility(saveResult.getId(), visibilityUpdateDTO);
        Assertions.assertTrue(releaseResult.getPublicToAll());
        Assertions.assertNotNull(releaseResult.getPublishTime());
        // should not be able to repeatedly release
        Assertions.assertThrows(RuntimeException.class, () -> collectionService.updateVisibility(saveResult.getId(), visibilityUpdateDTO));
    }

    @Test
    @DisplayName("Collection Service: create with tags")
    void testCreateWithTags() {
        final CollectionCreationDTO dto = new CollectionCreationDTO();
        dto.setTitle("Collection with tags");
        dto.setTags(List.of(
          TagInfoDTO.builder().value(1L).label("FIRST").build(), 
          TagInfoDTO.builder().value(2L).label("SECOND").build()
        ));
        // the tags should be correctly saved
        final CollectionDTO saveResult = collectionService.save(dto);
        Assertions.assertNotNull(saveResult.getId());
        Assertions.assertEquals(2, saveResult.getTags().size());
        // the tags should be correctly updated
        final CollectionUpdateDTO updateDTO = new CollectionUpdateDTO();
        updateDTO.setId(saveResult.getId());
        updateDTO.setTags(List.of(
          TagInfoDTO.builder().value(1L).label("FIRST").build()
        ));
        final CollectionDTO updateResult = collectionService.update(updateDTO);
        Assertions.assertNotNull(updateResult.getId());
        Assertions.assertEquals(1, updateResult.getTags().size());
    }
}
