package com.tobe.blog.beans.entity.content;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.tobe.blog.beans.entity.BaseEntity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("tobe_comment")
public class CommentEntity extends BaseEntity {

    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * Content ID that this comment belongs to
     */
    private String contentId;

    /**
     * Content type (ARTICLE, PLAN, VOCABULARY, etc.)
     */
    private String contentType;

    /**
     * Comment content
     */
    private String content;

    /**
     * User ID who created this comment
     */
    private Long userId;

    /**
     * User name who created this comment
     */
    private String userName;

    /**
     * User avatar URL
     */
    private String userAvatarUrl;

    /**
     * Parent comment ID for nested comments (null for top-level comments)
     */
    private Long parentId;

    /**
     * Reply to user name (for quoted replies)
     */
    private String replyToUserName;

    /**
     * Reply to content snippet (for quoted replies, max 100 chars)
     */
    private String replyToContent;

    /**
     * Number of likes for this comment
     */
    private Long likeCount = 0L;

    /**
     * IP address of the commenter
     */
    private String ipAddress;
} 