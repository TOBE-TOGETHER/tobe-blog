package com.tobe.blog.content.mapper;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.beans.dto.content.BaseContentDTO;
import com.tobe.blog.beans.entity.content.ContentGeneralInfoEntity;

public interface ContentGeneralInfoMapper extends BaseMapper<ContentGeneralInfoEntity> {
    
    void updateContentMetaCount(@Param("column") String column, @Param("id") String id, @Param("newValue") long newValue);

    Page<BaseContentDTO> pagePublishedContentDTOs(Page<BaseContentDTO> page, String keyword);
}
