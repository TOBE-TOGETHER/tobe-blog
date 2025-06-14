package com.tobe.blog.beans.dto.content;

import java.sql.Timestamp;

import com.tobe.blog.beans.consts.Const.NotificationType;

import lombok.Data;

@Data
public class NotificationDTO {
    
    private Long id;
    private String title;
    private String message;
    private NotificationType notificationType;
    private Boolean isRead;
    private String relatedContentId;
    private String relatedContentType;
    private String relatedContentTitle;
    private String actionUrl;
    private Timestamp createTime;
    
    /**
     * Computed field: name of the user who triggered this notification
     */
    private String senderName;
    
    /**
     * Additional metadata for the notification (JSON string)
     */
    private String metadata;
} 