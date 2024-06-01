package com.tobe.blog.content.service;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tobe.blog.beans.consts.Const;
import com.tobe.blog.beans.dto.content.ContentCreationDTO;
import com.tobe.blog.beans.dto.content.ContentDTO;
import com.tobe.blog.beans.dto.content.ContentUpdateDTO;
import com.tobe.blog.beans.entity.BaseEntity;
import com.tobe.blog.beans.entity.content.ContentEntity;
import com.tobe.blog.core.exception.TobeRuntimeException;
import com.tobe.blog.core.utils.SecurityUtil;

import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

public abstract class AbstractContentService<G extends ContentDTO, C extends ContentCreationDTO, U extends ContentUpdateDTO, M extends BaseMapper<E>, E extends BaseEntity>
        extends ServiceImpl<M, E> {

    @Autowired
    private ContentService contentService;

    @Transactional
    public G save(C creationDTO) {
        // save content level data
        ContentEntity content = new ContentEntity();
        BeanUtils.copyProperties(creationDTO, content);
        content.setContentType(getContentType().name());
        content.setDeleted(Boolean.FALSE);
        content.setPublicToAll(Boolean.FALSE);
        content.setViewCount(0L);
        content.setLikeCount(0L);
        content.setOwnerId(SecurityUtil.getUserId());
        contentService.save(content);
        // fill in content level field values
        G result = getConcreteDTO();
        BeanUtils.copyProperties(content, result);
        // save concrete level data and return general concrete DTO
        return this.saveConcreteContentValues(result, creationDTO);
    }

    public G getDTOById(String id) {
        final ContentEntity contentEntity = contentService.getById(id);
        if (Objects.isNull(contentEntity)) {
            return null;
        }
        // build result DTO and copy content level values
        final G result = getConcreteDTO();
        BeanUtils.copyProperties(contentEntity, result);
        // get concrete entity and set values if entity existings
        final E concreteEntity = this.getById(id);
        BeanUtils.copyProperties(concreteEntity, result);
        return result;
    }

    @Transactional
    public G update(U updateDTO) {
        // validate and update content level values
        final ContentEntity contentEntity = contentService.getAndValidateContent(updateDTO.getId());
        BeanUtils.copyProperties(updateDTO, contentEntity);
        contentService.updateById(contentEntity);
        // update concrete level values
        final E concreteEntity = this.getById(updateDTO.getId());
        BeanUtils.copyProperties(updateDTO, concreteEntity);
        this.updateById(concreteEntity);
        // return updated general DTO
        return this.getDTOById(updateDTO.getId());
    }

    @Transactional
    protected void delete(String id) {
        contentService.getAndValidateContent(id);
        contentService.removeById(id);
        this.removeById(id);
    }

    protected abstract G saveConcreteContentValues(G contentDTO, C creationDTO);

    protected abstract G getConcreteDTO();

    protected abstract Const.ContentType getContentType();
}
