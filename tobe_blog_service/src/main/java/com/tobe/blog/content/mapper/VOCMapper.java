package com.tobe.blog.content.mapper;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.beans.dto.content.BaseSearchFilter;
import com.tobe.blog.beans.dto.content.VOCDTO;
import com.tobe.blog.beans.entity.content.VOCEntity;

public interface VOCMapper extends BaseContentMapper<VOCDTO, VOCEntity> {
    @Override
    Page<VOCDTO> pageDTOsByUserId(Page<VOCDTO> page, @Param("tableName") String tableName, @Param("userId") Long userId, BaseSearchFilter filter);

    @Override
    VOCDTO getDTOById(@Param("tableName") String tableName, @Param("id") String id);
}
