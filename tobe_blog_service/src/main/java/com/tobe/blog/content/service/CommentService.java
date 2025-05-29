package com.tobe.blog.content.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tobe.blog.beans.dto.content.CommentCreateDTO;
import com.tobe.blog.beans.dto.content.CommentDTO;
import com.tobe.blog.beans.dto.user.EnhancedUserDetail;
import com.tobe.blog.beans.dto.user.UserGeneralDTO;
import com.tobe.blog.beans.entity.content.CommentEntity;
import com.tobe.blog.content.mapper.CommentMapper;
import com.tobe.blog.core.utils.BasicConverter;
import com.tobe.blog.core.utils.SecurityUtil;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentService extends ServiceImpl<CommentMapper, CommentEntity> {

    private final CommentMapper commentMapper;

    /**
     * Create a new comment
     * @param dto comment creation data
     * @param request HTTP request for IP address
     * @return created comment DTO
     */
    @Transactional
    public CommentDTO createComment(CommentCreateDTO dto, HttpServletRequest request) {
        EnhancedUserDetail currentUser = SecurityUtil.getCurrentUserDetail();
        
        CommentEntity entity = new CommentEntity();
        entity.setContentId(dto.getContentId());
        entity.setContentType(dto.getContentType());
        entity.setContent(dto.getContent());
        entity.setParentId(dto.getParentId());
        entity.setUserId(currentUser.getUserProfile().getId());
        
        String userName = buildUserDisplayName(currentUser.getUserProfile());
        entity.setUserName(userName);
        entity.setUserAvatarUrl(currentUser.getUserProfile().getAvatarUrl());
        entity.setIpAddress(getClientIpAddress(request));
        entity.setDeleted(false);
        entity.setLikeCount(0L);

        // Handle reply information for quoted display
        if (dto.getParentId() != null) {
            CommentEntity parentComment = this.getById(dto.getParentId());
            if (parentComment != null && !parentComment.getDeleted()) {
                entity.setReplyToUserName(parentComment.getUserName());
                // Create content snippet (max 100 chars)
                String contentSnippet = parentComment.getContent();
                if (contentSnippet.length() > 100) {
                    contentSnippet = contentSnippet.substring(0, 100) + "...";
                }
                entity.setReplyToContent(contentSnippet);
            }
        }

        this.save(entity);
        
        log.info("Comment created successfully for content {} by user {}", 
                dto.getContentId(), currentUser.getUsername());
        
        // Manual conversion to handle time field issues
        CommentDTO result = convertToDTO(entity);
        
        return result;
    }

    /**
     * Get comments for a specific content with pagination (flat structure)
     * @param contentId content ID
     * @param contentType content type
     * @param page page number (1-based)
     * @param size page size
     * @return paginated comments in flat structure
     */
    public IPage<CommentDTO> getCommentsForContent(
        String contentId,
        String contentType,
        int page,
        int size
    ) {
        Page<CommentEntity> entityPage = new Page<>(page, size);
        
        // Get all comments (both top-level and replies) in flat structure
        LambdaQueryWrapper<CommentEntity> query = new LambdaQueryWrapper<CommentEntity>()
                .eq(CommentEntity::getContentId, contentId)
                .eq(CommentEntity::getContentType, contentType)
                .eq(CommentEntity::getDeleted, false)
                .orderByDesc(CommentEntity::getCreateTime); // Order by creation time DESC for latest first
                
        IPage<CommentEntity> commentsPage = this.page(entityPage, query);
        
        // Convert to DTOs (no need for nested structure)
        List<CommentDTO> comments = commentsPage.getRecords().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        
        // Create result page
        Page<CommentDTO> resultPage = new Page<>(page, size);
        resultPage.setRecords(comments);
        resultPage.setTotal(commentsPage.getTotal());
        resultPage.setPages(commentsPage.getPages());
        
        return resultPage;
    }

    /**
     * Delete a comment (soft delete)
     * @param commentId comment ID
     * @return true if deleted successfully
     */
    @Transactional
    public boolean deleteComment(Long commentId) {
        EnhancedUserDetail currentUser = SecurityUtil.getCurrentUserDetail();
        
        CommentEntity comment = this.getById(commentId);
        if (comment == null) {
            log.warn("Comment {} not found", commentId);
            return false;
        }
        
        // Check if current user is the owner of the comment or has admin privileges
        if (!comment.getUserId().equals(currentUser.getUserProfile().getId()) && 
            !hasAdminPrivileges(currentUser)) {
            log.warn("User {} attempted to delete comment {} without permission", 
                    currentUser.getUsername(), commentId);
            return false;
        }
        
        comment.setDeleted(true);
        boolean result = this.updateById(comment);
        
        if (result) {
            log.info("Comment {} deleted by user {}", commentId, currentUser.getUsername());
        }
        
        return result;
    }

    /**
     * Like or unlike a comment
     * @param commentId comment ID
     * @param isLike true to like, false to unlike
     * @return updated like count
     */
    @Transactional
    public Long toggleCommentLike(Long commentId, boolean isLike) {
        // Check if user is authenticated
        EnhancedUserDetail currentUser = SecurityUtil.getCurrentUserDetail();
        if (currentUser == null) {
            throw new RuntimeException("User must be authenticated to like comments");
        }
        
        if (isLike) {
            commentMapper.incrementLikeCount(commentId);
        } else {
            commentMapper.decrementLikeCount(commentId);
        }
        
        CommentEntity comment = this.getById(commentId);
        return comment != null ? comment.getLikeCount() : 0;
    }

    /**
     * Get client IP address from request
     * @param request HTTP request
     * @return client IP address
     */
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty() && !"unknown".equalsIgnoreCase(xForwardedFor)) {
            return xForwardedFor.split(",")[0];
        }
        
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty() && !"unknown".equalsIgnoreCase(xRealIp)) {
            return xRealIp;
        }
        
        return request.getRemoteAddr();
    }

    /**
     * Check if current user has admin privileges
     * @param user current user
     * @return true if user has admin privileges
     */
    private boolean hasAdminPrivileges(EnhancedUserDetail user) {
        return user.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().contains("ADMIN"));
    }

    /**
     * Build user display name from user profile
     * @param userProfile user profile
     * @return display name
     */
    private String buildUserDisplayName(UserGeneralDTO userProfile) {
        // Try to build full name from firstName and lastName
        String firstName = userProfile.getFirstName();
        String lastName = userProfile.getLastName();
        
        if (firstName != null && !firstName.trim().isEmpty() && 
            lastName != null && !lastName.trim().isEmpty()) {
            return (firstName.trim() + " " + lastName.trim()).trim();
        }
        
        // If only firstName is available
        if (firstName != null && !firstName.trim().isEmpty()) {
            return firstName.trim();
        }
        
        // If only lastName is available
        if (lastName != null && !lastName.trim().isEmpty()) {
            return lastName.trim();
        }
        
        // Fall back to username if no name is available
        if (userProfile.getUsername() != null && !userProfile.getUsername().trim().isEmpty()) {
            return userProfile.getUsername().trim();
        }
        
        // Last resort - use email prefix
        if (userProfile.getEmail() != null && !userProfile.getEmail().trim().isEmpty()) {
            String email = userProfile.getEmail().trim();
            int atIndex = email.indexOf('@');
            if (atIndex > 0) {
                return email.substring(0, atIndex);
            }
            return email;
        }
        
        // Ultimate fallback
        return "Anonymous User";
    }

    /**
     * Convert CommentEntity to CommentDTO with proper time field handling
     * @param entity comment entity
     * @return comment DTO
     */
    private CommentDTO convertToDTO(CommentEntity entity) {
        // Use BasicConverter for direct conversion, Jackson will handle Timestamp serialization
        return BasicConverter.convert(entity, CommentDTO.class);
    }
} 