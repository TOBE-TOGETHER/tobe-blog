package com.tobe.blog.content.service.impl;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tobe.blog.beans.consts.Const;
import com.tobe.blog.beans.dto.content.BaseContentCreationDTO;
import com.tobe.blog.beans.dto.content.BaseContentDTO;
import com.tobe.blog.beans.dto.content.BaseContentUpdateDTO;
import com.tobe.blog.beans.dto.content.BaseSearchFilter;
import com.tobe.blog.beans.dto.tag.TagInfoDTO;
import com.tobe.blog.beans.entity.content.BaseContentEntity;
import com.tobe.blog.beans.entity.content.ContentGeneralInfoEntity;
import com.tobe.blog.beans.entity.content.ContentTagEntity;
import com.tobe.blog.content.mapper.BaseContentMapper;
import com.tobe.blog.content.service.IContentService;
import com.tobe.blog.core.exception.TobeRuntimeException;
import com.tobe.blog.core.utils.SecurityUtil;

import io.jsonwebtoken.lang.Collections;
import io.netty.util.internal.StringUtil;

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
public abstract class BaseContentService<
    D extends BaseContentDTO, 
    C extends BaseContentCreationDTO, 
    U extends BaseContentUpdateDTO, 
    E extends BaseContentEntity, 
    M extends BaseContentMapper<D, E>> extends ServiceImpl<M, E> implements IContentService<D, C, U, E, M> {

    @Autowired
    private ContentGeneralInfoService generalInfoService;
    @Autowired
    private ContentTagService tagService;

    @Override
    @Transactional
    public D save(C creationDTO) {
        // save content level data
        ContentGeneralInfoEntity contentEntity = new ContentGeneralInfoEntity();
        BeanUtils.copyProperties(creationDTO, contentEntity);
        contentEntity.setContentType(getContentType().name());
        contentEntity.setDeleted(Boolean.FALSE);
        contentEntity.setPublicToAll(Boolean.FALSE);
        contentEntity.setViewCount(0L);
        contentEntity.setLikeCount(0L);
        contentEntity.setOwnerId(SecurityUtil.getUserId());
        generalInfoService.save(contentEntity);
        // save sub level data and return general concrete DTO
        E concreteEntity = this.getConcreteEntity();
        concreteEntity.setContentId(contentEntity.getId());
        concreteEntity.setDeleted(Boolean.FALSE);
        BeanUtils.copyProperties(creationDTO, concreteEntity);
        this.save(concreteEntity);
        // save tag info
        saveContentTag(contentEntity.getId(), creationDTO.getTags());
        return this.getDTOById(contentEntity.getId());
    }

    @Override
    @Transactional
    public D update(U updateDTO) {
        // validate and update content level values
        final ContentGeneralInfoEntity contentEntity = generalInfoService.getAndValidateContent(updateDTO.getId());
        BeanUtils.copyProperties(updateDTO, contentEntity);
        generalInfoService.updateById(contentEntity);
        // update sub level values
        final E concreteEntity = this.getById(updateDTO.getId());
        BeanUtils.copyProperties(updateDTO, concreteEntity);
        this.updateById(concreteEntity);
        // save tag info
        saveContentTag(contentEntity.getId(), updateDTO.getTags());
        // return updated general DTO
        return this.getDTOById(updateDTO.getId());
    }

    @Override
    @Transactional
    public void delete(String id) {
        generalInfoService.getAndValidateContent(id);
        generalInfoService.removeById(id);
        this.removeById(id);
    }

    @Override
    public Page<D> search(int current, int size, BaseSearchFilter filter) {
        return this.baseMapper.pageDTOsByUserId(new Page<>(current, size), getConcreteEntity().getTableName(),
                SecurityUtil.getUserId(), filter);
    }

    @Override
    public D getDTOById(String id) {
        return this.baseMapper.getDTOById(getConcreteEntity().getTableName(), id);
    }

    @Override
    public D release(String id) {
        final ContentGeneralInfoEntity entity = generalInfoService.getAndValidateContent(id);
        if (entity.getPublicToAll()) {
            throw new TobeRuntimeException("Content has already been released");
        }
        entity.setPublicToAll(Boolean.TRUE);
        entity.setPublishTime(new Timestamp(System.currentTimeMillis()));
        generalInfoService.updateById(entity);
        return this.baseMapper.getDTOById(getConcreteEntity().getTableName(), id);
    }

    private void saveContentTag(String contentId, List<TagInfoDTO> tags) {
        if (Collections.isEmpty(tags) || StringUtil.isNullOrEmpty(contentId)) {
            return;
        }
        tagService.remove(
            new LambdaQueryWrapper<ContentTagEntity>().eq(ContentTagEntity::getContentId, contentId));
        tagService.saveBatch(
            tags.stream().map(t -> new ContentTagEntity(contentId, t.getValue())).toList());
    }

    protected abstract D getConcreteDTO();

    protected abstract E getConcreteEntity();

    protected abstract Const.ContentType getContentType();
}