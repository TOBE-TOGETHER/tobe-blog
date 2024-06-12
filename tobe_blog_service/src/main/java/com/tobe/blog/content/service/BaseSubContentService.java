package com.tobe.blog.content.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tobe.blog.beans.consts.Const;
import com.tobe.blog.beans.dto.content.BaseContentCreationDTO;
import com.tobe.blog.beans.dto.content.BaseContentDTO;
import com.tobe.blog.beans.dto.content.BaseContentUpdateDTO;
import com.tobe.blog.beans.dto.content.BaseSearchFilter;
import com.tobe.blog.beans.entity.content.BaseSubContentEntity;
import com.tobe.blog.beans.entity.content.ContentEntity;
import com.tobe.blog.content.mapper.BaseSubContentMapper;
import com.tobe.blog.core.utils.SecurityUtil;

import java.sql.Timestamp;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

/**
 * This is the core service to save, update, delete, and search user contents.
 * The code has been highly abstracted with generics and several DTO beans 
 * and entities need to be created when onboarding new kind of user content.
 * 
 * @param <D> DTO used to return basic info to client
 * @param <C> DTO used for creation
 * @param <U> DTO used for update
 * @param <E> Entity used for database, @TableName annotation is required
 * @param <M> Mapper used for manipulating data, providing common CRUD methods
 */
public abstract class BaseSubContentService<
    D extends BaseContentDTO, 
    C extends BaseContentCreationDTO, 
    U extends BaseContentUpdateDTO, 
    E extends BaseSubContentEntity, 
    M extends BaseSubContentMapper<D, E>> extends ServiceImpl<M, E> {

    @Autowired
    private ContentService contentService;

    @Transactional
    public D save(C creationDTO) {
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
    public D update(U updateDTO) {
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

    public Page<D> search(int current, int size, BaseSearchFilter filter) {
        return this.baseMapper.pageDTOsByUserId(new Page<>(current, size), getConcreteEntity().getTableName(), SecurityUtil.getUserId(), filter);
    }

    public D getDTOById(String id) {
        return this.baseMapper.getDTOById(getConcreteEntity().getTableName(), id);
    }

    public D release(String id) {
        final ContentEntity entity = contentService.getAndValidateContent(id);
        entity.setPublicToAll(Boolean.TRUE);
        entity.setPublishTime(new Timestamp(System.currentTimeMillis()));
        contentService.updateById(entity);
        return this.baseMapper.getDTOById(getConcreteEntity().getTableName(), id);
    }

    protected abstract D getConcreteDTO();

    protected abstract E getConcreteEntity();

    protected abstract Const.ContentType getContentType();
}
