package com.tobe.blog.beans.dto.content;

import java.sql.Timestamp;
import java.util.List;

import lombok.Data;

@Data
public class CommentDTO {
    
    private Long id;
    private String contentId;
    private String contentType;
    private String content;
    private Long userId;
    private String userName;
    private String userAvatarUrl;
    private Long parentId;
    private String replyToUserName;
    private String replyToContent;
    private Long likeCount;
    private Boolean deleted;
    private Timestamp createTime;
    private Timestamp updateTime;
    
    /**
     * Nested replies for this comment
     */
    private List<CommentDTO> replies;
} 