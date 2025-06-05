package com.tobe.blog.content.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tobe.blog.beans.dto.content.CommentCreateDTO;
import com.tobe.blog.beans.dto.content.CommentDTO;
import com.tobe.blog.content.service.CommentService;
import com.tobe.blog.core.utils.AuthenticationUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/v1/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    /**
     * Create a new comment
     * @param dto comment creation data
     * @return created comment DTO
     */
    @PostMapping
    public ResponseEntity<CommentDTO> createComment(@Valid @RequestBody CommentCreateDTO dto) {
        return AuthenticationUtil.withAuthenticatedUser(user -> {
            CommentDTO comment = commentService.createComment(dto, user);
            return ResponseEntity.ok(comment);
        });
    }

    /**
     * Get comments for specific content with pagination
     * @param contentId content ID
     * @param contentType content type
     * @param page page number (default: 1)
     * @param size page size (default: 10)
     * @return paginated comments
     */
    @GetMapping
    public ResponseEntity<IPage<CommentDTO>> getComments(
            @RequestParam String contentId,
            @RequestParam String contentType,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        IPage<CommentDTO> comments = commentService.getCommentsForContent(contentId, contentType, page, size);
        return ResponseEntity.ok(comments);
    }

    /**
     * Delete a comment
     * @param commentId comment ID
     * @return success response
     */
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        return AuthenticationUtil.withAuthenticatedUser(user -> {
            boolean deleted = commentService.deleteComment(commentId, user);
            if (deleted) {
                return ResponseEntity.ok().<Void>build();
            } else {
                return ResponseEntity.notFound().build();
            }
        });
    }

    /**
     * Toggle like/unlike for a comment
     * @param commentId comment ID
     * @param isLike true to like, false to unlike
     * @return updated like count
     */
    @PostMapping("/{commentId}/like")
    public ResponseEntity<Long> toggleLike(
            @PathVariable Long commentId,
            @RequestParam boolean isLike) {
        return AuthenticationUtil.withAuthenticatedUser(user -> {
            Long likeCount = commentService.toggleCommentLike(commentId, isLike, user);
            return ResponseEntity.ok(likeCount);
        });
    }
} 