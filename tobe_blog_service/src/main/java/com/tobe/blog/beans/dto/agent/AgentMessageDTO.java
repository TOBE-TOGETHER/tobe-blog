package com.tobe.blog.beans.dto.agent;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgentMessageDTO {
    
    @NotNull(message = "Role cannot be null")
    private String role; // "user" or "assistant"
    
    @NotBlank(message = "Content cannot be empty")
    private String content;
} 