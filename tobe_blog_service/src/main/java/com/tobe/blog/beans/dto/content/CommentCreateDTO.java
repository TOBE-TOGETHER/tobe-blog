package com.tobe.blog.beans.dto.content;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CommentCreateDTO {
    
    @NotBlank(message = "Content ID cannot be empty")
    private String contentId;
    
    @NotBlank(message = "Content type cannot be empty")
    private String contentType;
    
    @NotBlank(message = "Comment content cannot be empty")
    @Size(max = 1000, message = "Comment content cannot exceed 1000 characters")
    private String content;
    
    /**
     * Parent comment ID for replies (optional)
     */
    private Long parentId;
} 