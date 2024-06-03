package com.tobe.blog.content.service;

import org.springframework.stereotype.Service;

import com.tobe.blog.beans.consts.Const.ContentType;
import com.tobe.blog.beans.dto.content.PlanCreationDTO;
import com.tobe.blog.beans.dto.content.PlanDTO;
import com.tobe.blog.beans.dto.content.PlanUpdateDTO;
import com.tobe.blog.beans.entity.content.PlanEntity;
import com.tobe.blog.content.mapper.PlanMapper;

@Service
public class PlanService
        extends BaseSubContentService<PlanDTO, PlanCreationDTO, PlanUpdateDTO, PlanEntity, PlanMapper> {

    @Override
    protected PlanDTO getConcreteDTO() {
        return new PlanDTO();
    }

    @Override
    protected PlanEntity getConcreteEntity() {
        return new PlanEntity();
    }

    @Override
    protected ContentType getContentType() {
        return ContentType.PLAN;
    }

}
