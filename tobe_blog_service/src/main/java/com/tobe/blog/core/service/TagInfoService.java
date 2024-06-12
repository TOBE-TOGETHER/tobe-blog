package com.tobe.blog.core.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tobe.blog.core.utils.BasicConverter;
import com.tobe.blog.beans.dto.tag.TagInfoCreationDTO;
import com.tobe.blog.beans.dto.tag.TagInfoGeneralDTO;
import com.tobe.blog.beans.entity.tag.TagInfoEntity;
import com.tobe.blog.core.mapper.TagInfoMapper;
import com.tobe.blog.core.exception.TobeRuntimeException;
import org.springframework.stereotype.Service;

@Service
public class TagInfoService extends ServiceImpl<TagInfoMapper, TagInfoEntity> {

    public Page<TagInfoGeneralDTO> getTagsByKeyword(String keyword, int current, int size) {
        return (Page<TagInfoGeneralDTO>) this.page(new Page<>(current, size), new LambdaQueryWrapper<TagInfoEntity>()
                .like(TagInfoEntity::getKeyword, keyword)
                .orderByAsc(TagInfoEntity::getKeyword))
                .convert(TagInfoEntity::covertToDTO);
    }

    public TagInfoGeneralDTO createTag(TagInfoCreationDTO dto) {
        validateTagExistOrNot(dto);
        final TagInfoEntity entity = BasicConverter.convert(dto, TagInfoEntity.class);
        this.save(entity);
        return TagInfoEntity.covertToDTO(entity);
    }

    private void validateTagExistOrNot(TagInfoCreationDTO dto) {
        if (this.baseMapper.exists(new LambdaQueryWrapper<TagInfoEntity>()
                .eq(TagInfoEntity::getKeyword, dto.getKeyword()))) {
            throw new TobeRuntimeException("Tag already exists in DB");
        }
    }
}
