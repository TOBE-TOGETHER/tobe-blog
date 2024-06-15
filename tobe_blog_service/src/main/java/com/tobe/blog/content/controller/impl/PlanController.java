package com.tobe.blog.content.controller.impl;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.beans.dto.content.PlanCreationDTO;
import com.tobe.blog.beans.dto.content.PlanDTO;
import com.tobe.blog.beans.dto.content.PlanProgressDTO;
import com.tobe.blog.beans.dto.content.PlanUpdateDTO;
import com.tobe.blog.beans.entity.content.PlanEntity;
import com.tobe.blog.content.mapper.PlanMapper;
import com.tobe.blog.content.service.impl.PlanProgressService;
import com.tobe.blog.content.service.impl.PlanService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/v1/plans")
@RequiredArgsConstructor
public class PlanController
        extends BaseContentController<PlanDTO, PlanCreationDTO, PlanUpdateDTO, PlanEntity, PlanMapper, PlanService> {

    private final PlanService planService;
    private final PlanProgressService progressService;

    @GetMapping("/{id}/progresses")
    public ResponseEntity<Page<PlanProgressDTO>> getProgressByPlanId(
        @PathVariable String id,         
        @RequestParam(value = "current", required = false, defaultValue = "1") int current,
        @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        return ResponseEntity.ok(progressService.getProgressesByPlanId(id, current, size));
    }

    @Override
    protected PlanService getConcreteSubContentService() {
        return this.planService;
    }
}
