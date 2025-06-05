package com.tobe.blog.core.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.beans.dto.content.NotificationDTO;
import com.tobe.blog.core.service.NotificationService;
import com.tobe.blog.core.utils.AuthenticationUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    /**
     * Get current user's notifications with pagination
     * @param page page number (default: 1)
     * @param size page size (default: 10)
     * @param isRead filter by read status (null for all)
     * @return paginated notifications
     */
    @GetMapping
    public ResponseEntity<Page<NotificationDTO>> getCurrentUserNotifications(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Boolean isRead) {
        
        return AuthenticationUtil.withAuthenticatedUserId(userId -> {
            Page<NotificationDTO> notifications = notificationService.getUserNotifications(
                    userId, page, size, isRead);
            return ResponseEntity.ok(notifications);
        });
    }

    /**
     * Get current user's unread notification count
     * @return unread count
     */
    @GetMapping("/unread-count")
    public ResponseEntity<Long> getCurrentUserUnreadCount() {
        long count = notificationService.getCurrentUserUnreadCount();
        return ResponseEntity.ok(count);
    }

    /**
     * Mark a notification as read
     * @param notificationId notification ID
     * @return success response
     */
    @PutMapping("/{notificationId}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long notificationId) {
        return AuthenticationUtil.withAuthenticatedUserId(userId -> {
            boolean success = notificationService.markAsRead(notificationId, userId);
            
            if (success) {
                return ResponseEntity.ok().<Void>build();
            } else {
                return ResponseEntity.notFound().build();
            }
        });
    }

    /**
     * Mark all notifications as read for current user
     * @return number of notifications marked as read
     */
    @PutMapping("/mark-all-read")
    public ResponseEntity<Integer> markAllAsRead() {
        return AuthenticationUtil.withAuthenticatedUserId(userId -> {
            int count = notificationService.markAllAsRead(userId);
            return ResponseEntity.ok(count);
        });
    }
} 