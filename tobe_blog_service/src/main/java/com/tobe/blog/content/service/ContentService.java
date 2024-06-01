package com.tobe.blog.content.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tobe.blog.beans.entity.content.ContentEntity;
import com.tobe.blog.content.mapper.ContentMapper;
import com.tobe.blog.core.exception.TobeRuntimeException;
import com.tobe.blog.core.utils.SecurityUtil;

import java.util.Objects;

import org.springframework.stereotype.Service;

@Service
public class ContentService extends ServiceImpl<ContentMapper, ContentEntity> {

    protected ContentEntity getAndValidateContent(String id) {
        final ContentEntity entity = this.getById(id);
        validateExistence(entity);
        validateOwnership(entity);
        return entity;
    }

    private void validateExistence(ContentEntity entity) {
        if (Objects.isNull(entity)) {
            throw new TobeRuntimeException("The content doesn't exists, or already has been deleted");
        }
    }

    private void validateOwnership(ContentEntity entity) {
        if (entity.getOwnerId() != SecurityUtil.getUserId().longValue()) {
            throw new TobeRuntimeException("You can't operate a content doesn't belong to you");
        }
    }
}
