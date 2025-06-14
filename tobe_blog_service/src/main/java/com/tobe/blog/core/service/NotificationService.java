package com.tobe.blog.core.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tobe.blog.beans.consts.Const.NotificationType;
import com.tobe.blog.beans.dto.content.NotificationCreateDTO;
import com.tobe.blog.beans.dto.content.NotificationDTO;
import com.tobe.blog.beans.dto.user.EnhancedUserDetail;
import com.tobe.blog.beans.entity.content.NotificationEntity;
import com.tobe.blog.beans.entity.user.UserEntity;
import com.tobe.blog.core.mapper.NotificationMapper;
import com.tobe.blog.core.utils.BasicConverter;
import com.tobe.blog.core.utils.JsonMetadataUtil;
import com.tobe.blog.core.utils.SecurityUtil;
import com.tobe.blog.core.utils.UserDisplayNameUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService extends ServiceImpl<NotificationMapper, NotificationEntity> {

    private final NotificationMapper notificationMapper;
    private final UserService userService;

    /**
     * Create a new notification
     * @param dto notification creation data
     * @return created notification DTO
     */
    @Transactional
    public NotificationDTO createNotification(NotificationCreateDTO dto) {
        NotificationEntity entity = BasicConverter.convert(dto, NotificationEntity.class);
        entity.setDeleted(false);
        entity.setIsRead(false);
        
        this.save(entity);
        
        log.info("Notification created: {} for user {}", dto.getNotificationType(), dto.getRecipientId());
        
        return convertToDTO(entity);
    }

    /**
     * Get notifications for a user with pagination
     * @param userId user ID
     * @param page page number (1-based)
     * @param size page size
     * @param isRead filter by read status (null for all)
     * @return paginated notifications
     */
    public Page<NotificationDTO> getUserNotifications(Long userId, int page, int size, Boolean isRead) {
        Page<NotificationEntity> entityPage = new Page<>(page, size);
        
        LambdaQueryWrapper<NotificationEntity> query = new LambdaQueryWrapper<NotificationEntity>()
                .eq(NotificationEntity::getRecipientId, userId)
                .eq(NotificationEntity::getDeleted, false)
                .orderByDesc(NotificationEntity::getCreateTime);
        
        if (isRead != null) {
            query.eq(NotificationEntity::getIsRead, isRead);
        }
        
        Page<NotificationEntity> notificationPage = this.page(entityPage, query);
        
        // Convert to DTOs with sender names
        List<NotificationDTO> notifications = notificationPage.getRecords().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        
        // Create result page
        Page<NotificationDTO> resultPage = new Page<>(page, size);
        resultPage.setRecords(notifications);
        resultPage.setTotal(notificationPage.getTotal());
        resultPage.setPages(notificationPage.getPages());
        
        return resultPage;
    }

    /**
     * Mark a notification as read
     * @param notificationId notification ID
     * @param userId user ID (for security check)
     * @return true if successful
     */
    @Transactional
    public boolean markAsRead(Long notificationId, Long userId) {
        NotificationEntity notification = this.getById(notificationId);
        if (notification == null || !notification.getRecipientId().equals(userId)) {
            log.warn("Notification {} not found or access denied for user {}", notificationId, userId);
            return false;
        }
        
        notification.setIsRead(true);
        boolean result = this.updateById(notification);
        
        if (result) {
            log.info("Notification {} marked as read by user {}", notificationId, userId);
        }
        
        return result;
    }

    /**
     * Mark all notifications as read for a user
     * @param userId user ID
     * @return number of notifications marked as read
     */
    @Transactional
    public int markAllAsRead(Long userId) {
        LambdaQueryWrapper<NotificationEntity> query = new LambdaQueryWrapper<NotificationEntity>()
                .eq(NotificationEntity::getRecipientId, userId)
                .eq(NotificationEntity::getIsRead, false)
                .eq(NotificationEntity::getDeleted, false);
        
        List<NotificationEntity> unreadNotifications = this.list(query);
        
        unreadNotifications.forEach(notification -> notification.setIsRead(true));
        boolean result = this.updateBatchById(unreadNotifications);
        
        if (result) {
            log.info("Marked {} notifications as read for user {}", unreadNotifications.size(), userId);
        }
        
        return unreadNotifications.size();
    }

    /**
     * Get unread notification count for a user
     * @param userId user ID
     * @return unread count
     */
    public long getUnreadCount(Long userId) {
        return notificationMapper.getUnreadCount(userId);
    }

    /**
     * Get unread notification count for current authenticated user
     * @return unread count
     */
    public long getCurrentUserUnreadCount() {
        EnhancedUserDetail currentUser = SecurityUtil.getCurrentUserDetail();
        if (currentUser == null) {
            return 0;
        }
        return getUnreadCount(currentUser.getUserProfile().getId());
    }

    /**
     * Helper method to notify when content is recommended
     * @param contentId content ID
     * @param contentTitle content title
     * @param contentType content type
     * @param contentOwnerId content owner ID
     * @param adminId admin ID who recommended
     */
    public void notifyContentRecommended(String contentId, String contentTitle, String contentType, Long contentOwnerId, Long adminId) {
        NotificationCreateDTO dto = new NotificationCreateDTO();
        dto.setRecipientId(contentOwnerId);
        dto.setSenderId(adminId);
        dto.setNotificationType(NotificationType.CONTENT_RECOMMENDED);
        dto.setTitle("Content Recommended");
        dto.setMessage(String.format("Your %s \"%s\" has been recommended by an administrator", contentType.toLowerCase(), contentTitle));
        dto.setRelatedContentId(contentId);
        dto.setRelatedContentType(contentType);
        dto.setRelatedContentTitle(contentTitle);
        dto.setActionUrl("/content/" + contentId);
        
        createNotification(dto);
    }

    /**
     * Helper method to notify when content is banned
     * @param contentId content ID
     * @param contentTitle content title
     * @param contentType content type
     * @param contentOwnerId content owner ID
     * @param adminId admin ID who banned
     */
    public void notifyContentBanned(String contentId, String contentTitle, String contentType, Long contentOwnerId, Long adminId) {
        NotificationCreateDTO dto = new NotificationCreateDTO();
        dto.setRecipientId(contentOwnerId);
        dto.setSenderId(adminId);
        dto.setNotificationType(NotificationType.CONTENT_BANNED);
        dto.setTitle("Content Banned");
        dto.setMessage(String.format("Your %s \"%s\" has been banned by an administrator", contentType.toLowerCase(), contentTitle));
        dto.setRelatedContentId(contentId);
        dto.setRelatedContentType(contentType);
        dto.setRelatedContentTitle(contentTitle);
        dto.setActionUrl("/content/" + contentId);
        
        createNotification(dto);
    }

    /**
     * Helper method to notify when content is commented
     * @param contentId content ID
     * @param contentTitle content title
     * @param contentType content type
     * @param contentOwnerId content owner ID
     * @param commenterId commenter ID
     * @param commenterName commenter name
     * @param commentContent the actual comment text
     */
    public void notifyContentCommented(String contentId, String contentTitle, String contentType, Long contentOwnerId, Long commenterId, String commenterName, String commentContent) {
        // Don't notify if the content owner commented on their own content
        if (contentOwnerId.equals(commenterId)) {
            return;
        }
        NotificationCreateDTO dto = new NotificationCreateDTO();
        dto.setRecipientId(contentOwnerId);
        dto.setSenderId(commenterId);
        dto.setNotificationType(NotificationType.CONTENT_COMMENTED);
        dto.setTitle("New Comment");
        dto.setMessage(String.format("%s commented on your %s \"%s\"", commenterName, contentType.toLowerCase(), contentTitle));
        dto.setRelatedContentId(contentId);
        dto.setRelatedContentType(contentType);
        dto.setRelatedContentTitle(contentTitle);
        dto.setActionUrl("/content/" + contentId);
        
        // Use JsonMetadataUtil for creating metadata
        dto.setMetadata(JsonMetadataUtil.createCommentMetadata(commentContent));
        
        createNotification(dto);
    }

    /**
     * Helper method to notify when someone replies to a comment
     * @param contentId content ID
     * @param contentTitle content title
     * @param contentType content type
     * @param originalCommenterId original comment author ID
     * @param replyerId replier ID
     * @param replierName replier name
     * @param replyContent the actual reply text
     * @param originalCommentContent the original comment content for context
     */
    public void notifyCommentReplied(String contentId, String contentTitle, String contentType, Long originalCommenterId, Long replyerId, String replierName, String replyContent, String originalCommentContent) {
        // Don't notify if the user replied to their own comment
        if (originalCommenterId.equals(replyerId)) {
            return;
        }
        NotificationCreateDTO dto = new NotificationCreateDTO();
        dto.setRecipientId(originalCommenterId);
        dto.setSenderId(replyerId);
        dto.setNotificationType(NotificationType.COMMENT_REPLIED);
        dto.setTitle("New Reply");
        dto.setMessage(String.format("%s replied to your comment on \"%s\"", replierName, contentTitle));
        dto.setRelatedContentId(contentId);
        dto.setRelatedContentType(contentType);
        dto.setRelatedContentTitle(contentTitle);
        dto.setActionUrl("/content/" + contentId);
        
        // Use JsonMetadataUtil for creating metadata
        dto.setMetadata(JsonMetadataUtil.createCommentReplyMetadata(replyContent, originalCommentContent));
        
        createNotification(dto);
    }

    /**
     * Convert NotificationEntity to NotificationDTO with sender name
     * @param entity notification entity
     * @return notification DTO
     */
    private NotificationDTO convertToDTO(NotificationEntity entity) {
        NotificationDTO dto = BasicConverter.convert(entity, NotificationDTO.class);
        
        // Get sender name if sender ID exists
        if (entity.getSenderId() != null) {
            UserEntity sender = userService.getById(entity.getSenderId());
            if (sender != null) {
                // Use UserDisplayNameUtil for consistent name building
                String senderName = UserDisplayNameUtil.buildDisplayName(sender);
                dto.setSenderName(senderName);
            }
        }
        
        return dto;
    }
} 