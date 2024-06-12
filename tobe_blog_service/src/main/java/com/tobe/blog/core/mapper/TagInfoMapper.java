package com.tobe.blog.core.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tobe.blog.beans.dto.tag.TagInfoGeneralDTO;
import com.tobe.blog.beans.entity.tag.TagInfoEntity;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TagInfoMapper extends BaseMapper<TagInfoEntity> {
    // This function is to get tags by content ID
    List<TagInfoGeneralDTO> getTagsBySourceId(@Param("ID") String id);
}
