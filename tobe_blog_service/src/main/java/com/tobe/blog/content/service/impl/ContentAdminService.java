package com.tobe.blog.content.service.impl;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tobe.blog.beans.dto.content.BaseContentDTO;
import com.tobe.blog.beans.dto.user.EnhancedUserDetail;
import com.tobe.blog.beans.entity.content.ContentAdminEntity;
import com.tobe.blog.beans.entity.content.ContentGeneralInfoEntity;
import com.tobe.blog.content.mapper.ContentAdminMapper;
import com.tobe.blog.core.service.NotificationService;
import com.tobe.blog.core.utils.BasicConverter;
import com.tobe.blog.core.utils.SecurityUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContentAdminService extends ServiceImpl<ContentAdminMapper, ContentAdminEntity> {

    private final NotificationService notificationService;
    private final ContentGeneralInfoService contentGeneralInfoService;

    public BaseContentDTO banContentById(String id) {
        final ContentAdminEntity entity = this.getById(id);
        entity.setBanned(true);
        entity.setReason("Violating content, blocked by administrators");
        this.updateById(entity);
        
        // Send notification to content owner
        sendBanNotification(id);
        
        return BasicConverter.convert(entity, BaseContentDTO.class);
    }

    public BaseContentDTO unbanContentById(String id) {
        final ContentAdminEntity entity = this.getById(id);
        entity.setBanned(false);
        entity.setReason("Content has been reviewed and unbanned by administrators");
        this.updateById(entity);
        return BasicConverter.convert(entity, BaseContentDTO.class);
    }

    public BaseContentDTO recommmendContentById(String id) {
        final ContentAdminEntity entity = this.getById(id);
        entity.setRecommended(true);
        entity.setReason("High-quality content, recommended by administrators");
        this.updateById(entity);
        
        // Send notification to content owner
        sendRecommendationNotification(id);
        
        return BasicConverter.convert(entity, BaseContentDTO.class);
    }

    public BaseContentDTO unrecommendContentById(String id) {
        final ContentAdminEntity entity = this.getById(id);
        entity.setRecommended(false);
        entity.setReason("Content recommendation has been removed by administrators");
        this.updateById(entity);
        return BasicConverter.convert(entity, BaseContentDTO.class);
    }

    private void sendBanNotification(String contentId) {
        try {
            ContentGeneralInfoEntity content = contentGeneralInfoService.getById(contentId);
            if (content != null) {
                EnhancedUserDetail currentUser = SecurityUtil.getCurrentUserDetail();
                Long adminId = currentUser != null ? currentUser.getUserProfile().getId() : null;
                
                notificationService.notifyContentBanned(
                    contentId,
                    content.getTitle(),
                    content.getContentType(),
                    content.getOwnerId(),
                    adminId
                );
            }
        } catch (Exception e) {
            // Log error but don't fail the main operation
            log.error("Failed to send ban notification for content {}", contentId, e);
        }
    }

    private void sendRecommendationNotification(String contentId) {
        try {
            ContentGeneralInfoEntity content = contentGeneralInfoService.getById(contentId);
            if (content != null) {
                EnhancedUserDetail currentUser = SecurityUtil.getCurrentUserDetail();
                Long adminId = currentUser != null ? currentUser.getUserProfile().getId() : null;
                
                notificationService.notifyContentRecommended(
                    contentId,
                    content.getTitle(),
                    content.getContentType(),
                    content.getOwnerId(),
                    adminId
                );
            }
        } catch (Exception e) {
            // Log error but don't fail the main operation
            log.error("Failed to send recommendation notification for content {}", contentId, e);
        }
    }
}
