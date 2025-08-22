package com.tobe.blog.beans.dto.agent;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgentChatResponseDTO {
    
    private String content;
    private String model;
    private Long usage;
    private String finishReason;
    private String error;
} 