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
import com.tobe.blog.beans.entity.content.CommentEntity;
import com.tobe.blog.beans.entity.content.ContentGeneralInfoEntity;
import com.tobe.blog.content.mapper.CommentMapper;
import com.tobe.blog.content.service.impl.ContentGeneralInfoService;
import com.tobe.blog.core.service.NotificationService;
import com.tobe.blog.core.utils.BasicConverter;
import com.tobe.blog.core.utils.RequestContextUtil;
import com.tobe.blog.core.utils.UserDisplayNameUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentService extends ServiceImpl<CommentMapper, CommentEntity> {

    private final CommentMapper commentMapper;
    private final NotificationService notificationService;
    private final ContentGeneralInfoService contentGeneralInfoService;

    /**
     * Create a new comment
     * @param dto comment creation data
     * @param currentUser authenticated user
     * @return created comment DTO
     */
    @Transactional
    public CommentDTO createComment(CommentCreateDTO dto, EnhancedUserDetail currentUser) {
        CommentEntity entity = new CommentEntity();
        entity.setContentId(dto.getContentId());
        entity.setContentType(dto.getContentType());
        entity.setContent(dto.getContent());
        entity.setParentId(dto.getParentId());
        entity.setUserId(currentUser.getUserProfile().getId());
        
        String userName = UserDisplayNameUtil.buildDisplayName(currentUser.getUserProfile());
        entity.setUserName(userName);
        entity.setUserAvatarUrl(currentUser.getUserProfile().getAvatarUrl());
        entity.setIpAddress(RequestContextUtil.getClientIpAddress());
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
        
        if (dto.getParentId() != null) {
            // Send notification to original comment author if this is a reply
            sendCommentReplyNotification(dto.getContentId(), dto.getContentType(), dto.getParentId(),
                                       currentUser.getUserProfile().getId(), userName, dto.getContent());
        } else {
            // Send notification to content owner
            sendCommentNotification(dto.getContentId(), dto.getContentType(), currentUser.getUserProfile().getId(), userName, dto.getContent());
        }
        
        log.info("Comment created successfully for content {} by user {}", 
                dto.getContentId(), currentUser.getUsername());
        
        // Manual conversion to handle time field issues
        CommentDTO result = convertToDTO(entity);
        
        return result;
    }

    private void sendCommentNotification(String contentId, String contentType, Long commenterId, String commenterName, String commentContent) {
        try {
            ContentGeneralInfoEntity content = contentGeneralInfoService.getById(contentId);
            if (content != null) {
                notificationService.notifyContentCommented(
                    contentId,
                    content.getTitle(),
                    contentType,
                    content.getOwnerId(),
                    commenterId,
                    commenterName,
                    commentContent
                );
            }
        } catch (Exception e) {
            // Log error but don't fail the main operation
            log.error("Failed to send comment notification for content {}", contentId, e);
        }
    }

    private void sendCommentReplyNotification(String contentId, String contentType, Long parentCommentId, Long replierId, String replierName, String replyContent) {
        try {
            ContentGeneralInfoEntity content = contentGeneralInfoService.getById(contentId);
            CommentEntity parentComment = this.getById(parentCommentId);
            
            if (content != null && parentComment != null && !parentComment.getDeleted()) {
                notificationService.notifyCommentReplied(
                    contentId,
                    content.getTitle(),
                    contentType,
                    parentComment.getUserId(), // original comment author ID
                    replierId,
                    replierName,
                    replyContent,
                    parentComment.getContent() // original comment content
                );
            }
        } catch (Exception e) {
            // Log error but don't fail the main operation
            log.error("Failed to send comment reply notification for content {}", contentId, e);
        }
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
     * @param currentUser authenticated user
     * @return true if deleted successfully
     */
    @Transactional
    public boolean deleteComment(Long commentId, EnhancedUserDetail currentUser) {
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
     * @param currentUser authenticated user
     * @return updated like count
     */
    @Transactional
    public Long toggleCommentLike(Long commentId, boolean isLike, EnhancedUserDetail currentUser) {
        if (isLike) {
            commentMapper.incrementLikeCount(commentId);
        } else {
            commentMapper.decrementLikeCount(commentId);
        }
        
        CommentEntity comment = this.getById(commentId);
        return comment != null ? comment.getLikeCount() : 0;
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
     * Convert CommentEntity to CommentDTO with proper time field handling
     * @param entity comment entity
     * @return comment DTO
     */
    private CommentDTO convertToDTO(CommentEntity entity) {
        // Use BasicConverter for direct conversion, Jackson will handle Timestamp serialization
        return BasicConverter.convert(entity, CommentDTO.class);
    }
} 