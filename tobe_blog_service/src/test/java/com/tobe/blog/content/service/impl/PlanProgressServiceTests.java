package com.tobe.blog.content.service.impl;

import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.DefaultTestData;
import com.tobe.blog.DefaultTestData.DefaultUser;
import com.tobe.blog.beans.dto.content.PlanCreationDTO;
import com.tobe.blog.beans.dto.content.PlanDTO;
import com.tobe.blog.beans.dto.content.PlanProgressCreationDTO;
import com.tobe.blog.beans.dto.content.PlanProgressDTO;
import com.tobe.blog.beans.dto.content.PlanProgressUpdateDTO;
import com.tobe.blog.core.utils.SecurityUtil;

@SpringBootTest
@ActiveProfiles("test")
public class PlanProgressServiceTests {

    @Autowired
    private PlanProgressService progressService;
    @Autowired
    private PlanService planService;
    private PlanDTO plan;

    @BeforeEach
    void setUp() {
        SecurityUtil.setUserDetail(DefaultTestData.getDefaultUserAuthentication());
        PlanCreationDTO planCreationDTO = new PlanCreationDTO();
        planCreationDTO.setTitle("Plan for testing progress");
        this.plan = planService.save(planCreationDTO);
    }

    @Test
    @DisplayName("Plan Progress Service: create with valid input")
    void testCreateProgress_withValidInput() {
        final PlanProgressCreationDTO dto = new PlanProgressCreationDTO();
        dto.setPlanId(plan.getId());
        dto.setDescription("Progress: this is the first update");
        PlanProgressDTO saveResult = progressService.saveProgress(dto);
        Assertions.assertNotNull(saveResult.getId());
        Assertions.assertEquals(plan.getId(), saveResult.getPlanId());
        Assertions.assertEquals(dto.getDescription(), saveResult.getDescription());
        Assertions.assertEquals(DefaultUser.USER_ID, saveResult.getUpdaterId());
        Assertions.assertEquals(
          String.format("%s %s", DefaultUser.FIRST_NAME, DefaultUser.LAST_NAME), saveResult.getUpdaterName());
        Assertions.assertEquals(DefaultUser.AVATAR, saveResult.getAvatarUrl());
        Assertions.assertNotNull(saveResult.getCreateTime());
        Assertions.assertNotNull(saveResult.getUpdateTime());
    }

    @Test
    @DisplayName("Plan Progress Service: create with invalid input")
    void testCreateProgress_withInvalidInput() {
        // PLAN ID can not be null
        final PlanProgressCreationDTO dtoWithoutPlanId = new PlanProgressCreationDTO();
        dtoWithoutPlanId.setDescription("Progress: Plan ID can not be null");
        Assertions.assertThrows(RuntimeException.class, () -> progressService.saveProgress(dtoWithoutPlanId));
        dtoWithoutPlanId.setPlanId(plan.getId());
        Assertions.assertDoesNotThrow(() -> progressService.saveProgress(dtoWithoutPlanId));
        // Description length can not exceed 1000
        final PlanProgressCreationDTO dtoWithInvalidDesc = new PlanProgressCreationDTO();
        dtoWithInvalidDesc.setPlanId(plan.getId());
        dtoWithInvalidDesc.setDescription(RandomStringUtils.randomAlphanumeric(1001));
        Assertions.assertThrows(RuntimeException.class, () -> progressService.saveProgress(dtoWithInvalidDesc));
        dtoWithInvalidDesc.setDescription(RandomStringUtils.randomAlphanumeric(1000));
        Assertions.assertDoesNotThrow(() -> progressService.saveProgress(dtoWithInvalidDesc));
    }

    @Test
    @DisplayName("Plan Progress Service: update progress")
    void testUpdateProgress() {
        final PlanProgressCreationDTO dto = new PlanProgressCreationDTO();
        dto.setPlanId(plan.getId());
        dto.setDescription("Progress to be updated");
        PlanProgressDTO saveResult = progressService.saveProgress(dto);
        // build update DTO
        final PlanProgressUpdateDTO updateDTO = new PlanProgressUpdateDTO();
        updateDTO.setId(saveResult.getId());
        updateDTO.setDescription("The desc has been updated");
        PlanProgressDTO updateResult = progressService.updateProgress(updateDTO);
        Assertions.assertEquals(updateDTO.getDescription(), updateResult.getDescription());
    }

    @Test
    @DisplayName("Plan Progress Service: get progresses")
    void testGetProgressesByPlanId() {
        // create a new plan to avoid test conflict with other test methods
        final PlanCreationDTO planCreationDTO = new PlanCreationDTO();
        planCreationDTO.setTitle("Plan for getting progresses");
        final String PLAN_ID_FOR_QUERY = planService.save(planCreationDTO).getId();
        // init progresses
        final PlanProgressCreationDTO dto = new PlanProgressCreationDTO();
        dto.setPlanId(PLAN_ID_FOR_QUERY);
        dto.setDescription("Progress one");
        progressService.saveProgress(dto);
        dto.setDescription("Progress two");
        progressService.saveProgress(dto);
        dto.setDescription("Progress three");
        progressService.saveProgress(dto);
        // get all progress
        Page<PlanProgressDTO> result = progressService.getProgressesByPlanId(PLAN_ID_FOR_QUERY, 1, 2);
        Assertions.assertEquals(1, result.getCurrent());
        Assertions.assertEquals(2, result.getRecords().size());
        Assertions.assertEquals(3, result.getTotal());
    }
}