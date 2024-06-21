package com.tobe.blog.content.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tobe.blog.beans.dto.content.TagRelationshipCreationDTO;
import com.tobe.blog.beans.dto.content.TagRelationshipDTO;
import com.tobe.blog.beans.entity.tag.TagRelationshipEntity;
import com.tobe.blog.content.mapper.TagRelationshipMapper;
import com.tobe.blog.core.utils.BasicConverter;

import io.jsonwebtoken.lang.Collections;

@Service
public class TagRelationshipService extends ServiceImpl<TagRelationshipMapper, TagRelationshipEntity> {

    public TagRelationshipDTO createTagRelationship(TagRelationshipCreationDTO dto) {
        final TagRelationshipEntity entity = new TagRelationshipEntity();
        entity.setTagId(dto.getTagId());
        entity.setParentId(dto.getParentId());
        entity.setDeleted(Boolean.FALSE);
        entity.setCollectionId(dto.getCollectionId());
        this.save(entity);
        return BasicConverter.convert(entity, TagRelationshipDTO.class);
    }

    public List<TagRelationshipDTO> getTagRelationshipByParentId(Long parentId, String collectionId) {
        return this.baseMapper.getTagRelationshipByParentId(parentId, collectionId);
    }

    public void deleteById(Long id) {
        final TagRelationshipEntity entity = this.getById(id);
        if (entity == null) {
            return;
        }
        final List<TagRelationshipDTO> nodes = this.getTagRelationshipByParentId(id, entity.getCollectionId());
        if (Collections.isEmpty(nodes)) {
            this.removeById(entity.getId());
        } else {
            final List<Long> idsFromTree = getRelationshipIdsFromTree(nodes);
            idsFromTree.add(entity.getId());
            this.removeBatchByIds(idsFromTree);
        }
    }

    private List<Long> getRelationshipIdsFromTree(List<TagRelationshipDTO> nodes) {
        if (Collections.isEmpty(nodes)) {
            return List.of();
        }
        final List<Long> result = new ArrayList<>();
        scan(nodes, result);
        return result;
    }

    private void scan(List<TagRelationshipDTO> nodes, List<Long> result) {
        if (!Collections.isEmpty(nodes)) {
            nodes.forEach(n -> {
               if (!Collections.isEmpty(n.getChildren())) {
                   scan(n.getChildren(), result);
               }
               result.add(n.getId());
            });
        }
    }
}
