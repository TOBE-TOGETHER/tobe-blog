package com.tobe.blog.content.controller.impl;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tobe.blog.beans.dto.content.PlanCreationDTO;
import com.tobe.blog.beans.dto.content.PlanDTO;
import com.tobe.blog.beans.dto.content.PlanUpdateDTO;
import com.tobe.blog.beans.entity.content.PlanEntity;
import com.tobe.blog.content.mapper.PlanMapper;
import com.tobe.blog.content.service.impl.PlanService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1/plans")
@RequiredArgsConstructor
public class PlanController
        extends BaseContentController<PlanDTO, PlanCreationDTO, PlanUpdateDTO, PlanEntity, PlanMapper, PlanService> {

    private final PlanService planService;

    @Override
    protected PlanService getConcreteSubContentService() {
        return this.planService;
    }
}
