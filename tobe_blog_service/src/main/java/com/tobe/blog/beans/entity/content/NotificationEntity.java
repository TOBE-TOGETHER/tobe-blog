package com.tobe.blog.beans.entity.content;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.tobe.blog.beans.consts.Const.NotificationType;
import com.tobe.blog.beans.entity.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@TableName("tobe_notification")
public class NotificationEntity extends BaseEntity {
    
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /**
     * User ID who receives this notification
     */
    private Long recipientId;
    
    /**
     * User ID who triggered this notification (nullable for system notifications)
     */
    private Long senderId;
    
    /**
     * Type of notification
     */
    @TableField("notification_type")
    private NotificationType notificationType;
    
    /**
     * Notification title
     */
    private String title;
    
    /**
     * Notification message content
     */
    private String message;
    
    /**
     * Whether the notification has been read
     */
    private Boolean isRead = false;
    
    /**
     * Related content ID (for content-related notifications)
     */
    private String relatedContentId;
    
    /**
     * Related content type (ARTICLE, PLAN, VOCABULARY, COLLECTION)
     */
    private String relatedContentType;
    
    /**
     * Related content title for quick reference
     */
    private String relatedContentTitle;
    
    /**
     * URL to navigate when notification is clicked
     */
    private String actionUrl;
    
    /**
     * Additional metadata for the notification (JSON string)
     */
    private String metadata;
} 