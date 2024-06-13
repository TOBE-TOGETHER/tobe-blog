package com.tobe.blog.content.mapper;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.beans.dto.content.BaseSearchFilter;
import com.tobe.blog.beans.dto.content.PlanDTO;
import com.tobe.blog.beans.entity.content.PlanEntity;

public interface PlanMapper extends BaseContentMapper<PlanDTO, PlanEntity> {
    @Override
    Page<PlanDTO> pageDTOsByUserId(Page<PlanDTO> page, @Param("tableName") String tableName, @Param("userId") Long userId, BaseSearchFilter filter);

    @Override
    PlanDTO getDTOById(@Param("tableName") String tableName, @Param("id") String id);
}
