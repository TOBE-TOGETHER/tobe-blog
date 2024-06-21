package com.tobe.blog.content.service.impl;

import java.util.Objects;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tobe.blog.beans.entity.content.ContentGeneralInfoEntity;
import com.tobe.blog.content.mapper.ContentGeneralInfoMapper;
import com.tobe.blog.core.exception.TobeRuntimeException;
import com.tobe.blog.core.utils.SecurityUtil;

@Service
public class ContentGeneralInfoService extends ServiceImpl<ContentGeneralInfoMapper, ContentGeneralInfoEntity> {

    protected ContentGeneralInfoEntity getAndValidateContent(String id) {
        final ContentGeneralInfoEntity entity = this.getById(id);
        validateExistence(entity);
        validateOwnership(entity);
        return entity;
    }

    private void validateExistence(ContentGeneralInfoEntity entity) {
        if (Objects.isNull(entity)) {
            throw new TobeRuntimeException("The content doesn't exists, or already has been deleted");
        }
    }

    private void validateOwnership(ContentGeneralInfoEntity entity) {
        if (entity.getOwnerId() != SecurityUtil.getUserId().longValue()) {
            throw new TobeRuntimeException("You can't operate a content doesn't belong to you");
        }
    }
}
