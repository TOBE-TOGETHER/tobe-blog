package com.tobe.blog.beans.dto.content;

import com.tobe.blog.beans.consts.Const.NotificationType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class NotificationCreateDTO {
    
    @NotNull(message = "Recipient ID cannot be null")
    private Long recipientId;
    
    private Long senderId; // Optional for system notifications
    
    @NotNull(message = "Notification type cannot be null")
    private NotificationType notificationType;
    
    @NotBlank(message = "Title cannot be empty")
    @Size(max = 255, message = "Title cannot exceed 255 characters")
    private String title;
    
    @NotBlank(message = "Message cannot be empty")
    @Size(max = 1000, message = "Message cannot exceed 1000 characters")
    private String message;
    
    private String relatedContentId;
    private String relatedContentType;
    private String relatedContentTitle;
    private String actionUrl;
    private String metadata;
} 