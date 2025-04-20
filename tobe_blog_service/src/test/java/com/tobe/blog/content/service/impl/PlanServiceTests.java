package com.tobe.blog.content.service.impl;

import java.sql.Timestamp;
import java.util.List;
import java.util.concurrent.TimeUnit;

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
import com.tobe.blog.beans.dto.content.ContentVisibilityUpdateDTO;
import com.tobe.blog.beans.dto.content.PlanCreationDTO;
import com.tobe.blog.beans.dto.content.PlanDTO;
import com.tobe.blog.beans.dto.content.PlanUpdateDTO;
import com.tobe.blog.beans.dto.tag.TagInfoDTO;
import com.tobe.blog.core.utils.SecurityUtil;

import io.micrometer.core.instrument.util.TimeUtils;

@SpringBootTest
@ActiveProfiles("test")
public class PlanServiceTests {

    @Autowired
    private PlanService planService;
    private final Timestamp startTime = new Timestamp(System.currentTimeMillis());
    private final Timestamp endTimestamp = new Timestamp((long) (System.currentTimeMillis() + TimeUtils.daysToUnit(1, TimeUnit.MILLISECONDS)));

    @BeforeEach
    void setUp() {
        SecurityUtil.setUserDetail(DefaultTestData.getDefaultUserAuthentication());
    }

    @Test
    @DisplayName("Plan Service: create with valid input")
    void testSave_withValidInput() {
        PlanCreationDTO dto = new PlanCreationDTO();
        dto.setTitle("Hello world!");
        dto.setDescription("Let's verify the content together!");
        dto.setContentProtected(Boolean.FALSE);
        dto.setTargetStartTime(startTime);
        dto.setTargetEndTime(endTimestamp);
        PlanDTO result = planService.save(dto);

        Assertions.assertEquals(DefaultUser.USER_ID, result.getOwnerId());
        Assertions.assertEquals(String.format("%s %s", DefaultUser.FIRST_NAME, DefaultUser.LAST_NAME), result.getOwnerName());
        Assertions.assertEquals(DefaultUser.AVATAR, result.getAvatarUrl());
        Assertions.assertEquals(dto.getTitle(), result.getTitle());
        Assertions.assertEquals(dto.getContentProtected(), result.getContentProtected());
        Assertions.assertEquals(ContentType.PLAN.name(), result.getContentType());
        Assertions.assertEquals(dto.getDescription(), result.getDescription());
        Assertions.assertNotNull(result.getId());
        Assertions.assertEquals(0, result.getViewCount());
        Assertions.assertEquals(0, result.getLikeCount());
        Assertions.assertEquals(Boolean.FALSE, result.getPublicToAll());
        Assertions.assertNull(result.getPublishTime());
    }

    @Test
    @DisplayName("Plan Service: update item")
    void testUpdate_existingPlan() {
        PlanCreationDTO dto = new PlanCreationDTO();
        dto.setTitle("Plan To Be Update");
        dto.setDescription("Desc to be updated");
        PlanDTO saveResult = planService.save(dto);
        // prepare update DTO
        PlanUpdateDTO updateDTO = new PlanUpdateDTO();
        updateDTO.setId(saveResult.getId());
        updateDTO.setContentProtected(Boolean.TRUE);
        Timestamp updatedTimestamp = new Timestamp(System.currentTimeMillis());
        updateDTO.setTargetStartTime(updatedTimestamp);
        updateDTO.setTargetEndTime(updatedTimestamp);
        PlanDTO updateResult = planService.update(updateDTO);
        Assertions.assertEquals(saveResult.getId(), updateResult.getId());
        Assertions.assertEquals(Boolean.TRUE, updateResult.getContentProtected());
        Assertions.assertEquals(updatedTimestamp, updateResult.getTargetStartTime());
        Assertions.assertEquals(updatedTimestamp, updateResult.getTargetEndTime());
    }

    @Test
    @DisplayName("Plan Service: delete plan")
    void testDelete() {
        final PlanCreationDTO dto = new PlanCreationDTO();
        dto.setTitle("Plan To Be Deleted");
        final PlanDTO saveResult = planService.save(dto);
        Assertions.assertNotNull(saveResult.getId());
        Assertions.assertDoesNotThrow(() -> planService.delete(saveResult.getId()));
        // should throw when the content has been deleted or not existing
        Assertions.assertThrows(RuntimeException.class, () -> planService.delete(saveResult.getId()));
    }

    @Test
    @DisplayName("Plan Service: release plan")
    void testRelease() {
        final PlanCreationDTO dto = new PlanCreationDTO();
        dto.setTitle("Plan To Be Released");
        final PlanDTO saveResult = planService.save(dto);
        Assertions.assertNotNull(saveResult.getId());
        final ContentVisibilityUpdateDTO visibilityUpdateDTO = ContentVisibilityUpdateDTO.builder().id(saveResult.getId()).visibility(Visibility.PUBLIC).build();
        final PlanDTO releaseResult = planService.updateVisibility(
            saveResult.getId(), visibilityUpdateDTO);
        Assertions.assertTrue(releaseResult.getPublicToAll());
        Assertions.assertNotNull(releaseResult.getPublishTime());
        // should not be able to repeatly release 
        Assertions.assertThrows(RuntimeException.class, () -> planService.updateVisibility(saveResult.getId(), visibilityUpdateDTO));
    }

    @Test
    @DisplayName("Plan Service: create with tags")
    void testCreateWithTags() {
        final PlanCreationDTO dto = new PlanCreationDTO();
        dto.setTitle("Plan with tags");
        dto.setTags(List.of(
          TagInfoDTO.builder().value(1L).label("FIRST").build(), 
          TagInfoDTO.builder().value(2L).label("SECOND").build()
        ));
        // the tags should be correctly saved
        final PlanDTO saveResult = planService.save(dto);
        Assertions.assertNotNull(saveResult.getId());
        Assertions.assertEquals(2, saveResult.getTags().size());
        // the tags should be correctly updated
        final PlanUpdateDTO updateDTO = new PlanUpdateDTO();
        updateDTO.setId(saveResult.getId());
        updateDTO.setTags(List.of(
          TagInfoDTO.builder().value(1L).label("FIRST").build()
        ));
        final PlanDTO updateResult = planService.update(updateDTO);
        Assertions.assertNotNull(updateResult.getId());
        Assertions.assertEquals(1, updateResult.getTags().size());
    }
}
