package com.tobe.blog.content.service;

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
import com.tobe.blog.beans.dto.content.VOCCreationDTO;
import com.tobe.blog.beans.dto.content.VOCDTO;
import com.tobe.blog.beans.dto.content.VOCUpdateDTO;
import com.tobe.blog.core.utils.SecurityUtil;

@SpringBootTest
@ActiveProfiles("test")
public class VOCServiceTests {

    @Autowired
    private VOCService vocService;

    @BeforeEach
    void setUp() {
        SecurityUtil.setUserDetail(DefaultTestData.getDefaultUserAuthentication());
    }

    @Test
    @DisplayName("Vocabulary Service: create with valid input")
    void testSave_withValidInput() {
        VOCCreationDTO dto = new VOCCreationDTO();
        dto.setTitle("Hello world!");
        dto.setDescription("Let's verify the content together!");
        dto.setContentProtected(Boolean.FALSE);
        dto.setLanguage("EN");
        VOCDTO result = vocService.save(dto);

        Assertions.assertEquals(DefaultUser.USER_ID, result.getOwnerId());
        Assertions.assertEquals(String.format("%s %s", DefaultUser.FIRST_NAME, DefaultUser.LAST_NAME), result.getOwnerName());
        Assertions.assertEquals(DefaultUser.AVATAR, result.getAvatarUrl());
        Assertions.assertEquals(dto.getTitle(), result.getTitle());
        Assertions.assertEquals(dto.getContentProtected(), result.getContentProtected());
        Assertions.assertEquals(ContentType.VOC.name(), result.getContentType());
        Assertions.assertEquals(dto.getDescription(), result.getDescription());
        Assertions.assertNotNull(result.getId());
        Assertions.assertEquals(0, result.getViewCount());
        Assertions.assertEquals(0, result.getLikeCount());
        Assertions.assertEquals(Boolean.FALSE, result.getPublicToAll());
        Assertions.assertNull(result.getPublishTime());
    }

    @Test
    @DisplayName("Vocabulary Service: create with invalid input")
    void testSaveWithInvalidInput() {
        VOCCreationDTO dto = new VOCCreationDTO();
        dto.setTitle("Vocabulry With Long Language value");
        dto.setDescription("Let's verify the content together!");
        dto.setContentProtected(Boolean.FALSE);
        // language field can not be null
        Assertions.assertThrows(RuntimeException.class, () -> vocService.save(dto));
        // language field length can not exceed 32
        dto.setLanguage(RandomStringUtils.randomAlphanumeric(33));
        Assertions.assertThrows(RuntimeException.class, () -> vocService.save(dto));
        dto.setLanguage(RandomStringUtils.randomAlphanumeric(32));
        VOCDTO result = vocService.save(dto);
        Assertions.assertNotNull(result.getId());
    }

    @Test
    @DisplayName("Vocabulary Service: update item")
    void testUpdate_existingVocabulary() {
        VOCCreationDTO dto = new VOCCreationDTO();
        dto.setTitle("Vocabulry To Be Update");
        dto.setDescription("Desc to be updated");
        dto.setLanguage("EN");
        VOCDTO saveResult = vocService.save(dto);
        // prepare update DTO
        VOCUpdateDTO updateDTO = new VOCUpdateDTO();
        updateDTO.setId(saveResult.getId());
        updateDTO.setLanguage("CH");
        updateDTO.setContentProtected(Boolean.TRUE);
        VOCDTO updateResult = vocService.update(updateDTO);
        Assertions.assertEquals(saveResult.getId(), updateResult.getId());
        Assertions.assertEquals("CH", updateResult.getLanguage());
    }


    @Test
    @DisplayName("Vocabulary Service: delete item")
    void testDelete() {
        VOCCreationDTO dto = new VOCCreationDTO();
        dto.setTitle("Plan To Be Deleted");
        dto.setLanguage("EN");
        VOCDTO saveResult = vocService.save(dto);
        Assertions.assertNotNull(saveResult.getId());
        Assertions.assertDoesNotThrow(() -> vocService.delete(saveResult.getId()));
        // should throw when the content has been deleted or not existing
        Assertions.assertThrows(RuntimeException.class, () -> vocService.delete(saveResult.getId()));
    }

    @Test
    @DisplayName("Vocabulary Service: release item")
    void testRelease() {
        VOCCreationDTO dto = new VOCCreationDTO();
        dto.setTitle("Plan To Be Released");
        dto.setLanguage("EN");
        VOCDTO saveResult = vocService.save(dto);
        Assertions.assertNotNull(saveResult.getId());
        VOCDTO releaseResult = vocService.release(saveResult.getId());
        Assertions.assertTrue(releaseResult.getPublicToAll());
        Assertions.assertNotNull(releaseResult.getPublishTime());
        // should not be able to repeatly release 
        Assertions.assertThrows(RuntimeException.class, () -> vocService.release(saveResult.getId()));
    }
}
