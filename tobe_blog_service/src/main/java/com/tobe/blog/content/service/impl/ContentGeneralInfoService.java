package com.tobe.blog.content.service.impl;

import java.util.Objects;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tobe.blog.beans.consts.Const;
import com.tobe.blog.beans.dto.content.BaseContentDTO;
import com.tobe.blog.beans.entity.content.ContentGeneralInfoEntity;
import com.tobe.blog.content.mapper.ContentGeneralInfoMapper;
import com.tobe.blog.core.exception.TobeRuntimeException;
import com.tobe.blog.core.utils.SecurityUtil;

@Service
public class ContentGeneralInfoService extends ServiceImpl<ContentGeneralInfoMapper, ContentGeneralInfoEntity> {

    /**
     * This method is to regularly sink the view or like count from cache into DB
     * Also the metadata updateTime will not be impacted by this sink operation
     * @param TypeKey
     * @param id
     * @param increasedCount
     */
    public void sinkViewCountToDB(String TypeKey, String id, Long increasedCount) {
        final ContentGeneralInfoEntity entity = this.getById(id);
        if (Objects.isNull(entity)) {
            return;
        }
        switch (TypeKey) {
            case Const.CONTENT_VIEW_COUNT_KEY: {
                this.baseMapper.updateContentMetaCount("VIEW_COUNT", id, entity.getViewCount() + increasedCount);
                return;
            }
            case Const.CONTENT_LIKE_COUNT_KEY: {
                this.baseMapper.updateContentMetaCount("LIKE_COUNT", id, entity.getLikeCount() + increasedCount);
                return;
            }
            default: {
                log.error("Wrong type key is given during sink count into DB: " + TypeKey);
            }
        }
    }

    public Page<BaseContentDTO> searchPublishedContentDTOs(int current, int size, String keyword) {
        return this.baseMapper.pagePublishedContentDTOs(new Page<>(current, size), keyword);
    }

    public Page<BaseContentDTO> searchPublishedContentDTOs(int current, int size, String keyword, String status, String topic) {
        return this.baseMapper.pagePublishedContentDTOs(new Page<>(current, size), keyword, status, topic);
    }

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
