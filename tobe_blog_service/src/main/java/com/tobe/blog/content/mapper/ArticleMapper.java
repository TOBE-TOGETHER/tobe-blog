package com.tobe.blog.content.mapper;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.beans.dto.content.ArticleDTO;
import com.tobe.blog.beans.dto.content.BaseSearchFilter;
import com.tobe.blog.beans.entity.content.ArticleEntity;

public interface ArticleMapper extends BaseSubContentMapper<ArticleDTO, ArticleEntity> {

    @Override
    Page<ArticleDTO> pageDTOsByUserId(Page<ArticleDTO> page, @Param("tableName") String tableName, @Param("userId") Long userId, BaseSearchFilter filter);

    @Override
    ArticleDTO getDTOById(@Param("id") String id);
}
