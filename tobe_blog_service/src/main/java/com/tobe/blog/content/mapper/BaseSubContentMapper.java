package com.tobe.blog.content.mapper;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.beans.dto.content.BaseSearchFilter;

public interface BaseSubContentMapper<D, E> extends BaseMapper<E> {

    default Page<D> pageDTOsByUserId(Page<D> page, @Param("tableName") String tableName, @Param("userId") Long userId, BaseSearchFilter filter) {
        throw new UnsupportedOperationException("pageDTOsByUserId needs to be implemented by each concrete mapper");
    }

    default D getDTOById(@Param("id") String id) {
        throw new UnsupportedOperationException("getDTOById needs to be implemented by each concrete mapper");
    }
}
