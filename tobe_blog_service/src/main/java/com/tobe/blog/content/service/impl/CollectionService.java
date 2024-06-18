package com.tobe.blog.content.service.impl;

import org.springframework.stereotype.Service;

import com.tobe.blog.beans.consts.Const.ContentType;
import com.tobe.blog.beans.dto.content.CollectionCreationDTO;
import com.tobe.blog.beans.dto.content.CollectionDTO;
import com.tobe.blog.beans.dto.content.CollectionUpdateDTO;
import com.tobe.blog.beans.entity.content.CollectionEntity;
import com.tobe.blog.content.mapper.CollectionMapper;
import com.tobe.blog.content.mapper.TagRelationshipMapper;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CollectionService extends BaseContentService<CollectionDTO, CollectionCreationDTO, CollectionUpdateDTO, CollectionEntity, CollectionMapper> {

    private TagRelationshipMapper tagRelationshipMapper;

    @Override
    public CollectionDTO getDTOById(String id) {
        CollectionDTO result = super.getDTOById(id);
        result.setTagTree(tagRelationshipMapper.getTagRelationshipByParentId(null, id));
        return result;
    }

    @Override
    protected CollectionDTO getConcreteDTO() {
        return new CollectionDTO();
    }

    @Override
    protected CollectionEntity getConcreteEntity() {
        return new CollectionEntity();
    }

    @Override
    protected ContentType getContentType() {
        return ContentType.COLLECTION;
    }
  
}
