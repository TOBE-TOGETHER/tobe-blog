package com.tobe.blog.content.mapper;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.beans.dto.content.PlanProgressDTO;
import com.tobe.blog.beans.entity.content.PlanProgressEntity;

public interface PlanProgressMapper extends BaseMapper<PlanProgressEntity> {

    PlanProgressDTO getProgressDTOById(@Param("id") String id);

    Page<PlanProgressDTO> getProgressDTOsByPlanId(Page<PlanProgressDTO> page, @Param("planId") String planId);
}
