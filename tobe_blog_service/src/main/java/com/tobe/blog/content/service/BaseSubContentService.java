package com.tobe.blog.content.service;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tobe.blog.beans.consts.Const;
import com.tobe.blog.beans.dto.content.ContentCreationDTO;
import com.tobe.blog.beans.dto.content.ContentDTO;
import com.tobe.blog.beans.dto.content.ContentUpdateDTO;
import com.tobe.blog.beans.entity.content.BaseSubContentEntity;
import com.tobe.blog.beans.entity.content.ContentEntity;
import com.tobe.blog.core.utils.SecurityUtil;

import java.util.Objects;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

public abstract class BaseSubContentService<G extends ContentDTO, C extends ContentCreationDTO, U extends ContentUpdateDTO, E extends BaseSubContentEntity, M extends BaseMapper<E>>
        extends ServiceImpl<M, E> {

    @Autowired
    private ContentService contentService;

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
    public G save(C creationDTO) {
        // save content level data
        ContentEntity contentEntity = new ContentEntity();
        BeanUtils.copyProperties(creationDTO, contentEntity);
        contentEntity.setContentType(getContentType().name());
        contentEntity.setDeleted(Boolean.FALSE);
        contentEntity.setPublicToAll(Boolean.FALSE);
        contentEntity.setViewCount(0L);
        contentEntity.setLikeCount(0L);
        contentEntity.setOwnerId(SecurityUtil.getUserId());
        contentService.save(contentEntity);
        // save sub level data and return general concrete DTO
        E concreteEntity = this.getConcreteEntity();
        concreteEntity.setContentId(contentEntity.getId());
        concreteEntity.setDeleted(Boolean.FALSE);
        BeanUtils.copyProperties(creationDTO, concreteEntity);
        this.save(concreteEntity);
        return this.getDTOById(contentEntity.getId());
    }

    @Transactional
    public G update(U updateDTO) {
        // validate and update content level values
        final ContentEntity contentEntity = contentService.getAndValidateContent(updateDTO.getId());
        BeanUtils.copyProperties(updateDTO, contentEntity);
        contentService.updateById(contentEntity);
        // update sub level values
        final E concreteEntity = this.getById(updateDTO.getId());
        BeanUtils.copyProperties(updateDTO, concreteEntity);
        this.updateById(concreteEntity);
        // return updated general DTO
        return this.getDTOById(updateDTO.getId());
    }

    @Transactional
    public void delete(String id) {
        contentService.getAndValidateContent(id);
        contentService.removeById(id);
        this.removeById(id);
    }

    protected abstract G getConcreteDTO();

    protected abstract E getConcreteEntity();

    protected abstract Const.ContentType getContentType();
}
