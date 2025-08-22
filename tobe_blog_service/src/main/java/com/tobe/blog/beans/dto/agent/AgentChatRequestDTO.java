package com.tobe.blog.beans.dto.agent;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgentChatRequestDTO {
    
    private List<AgentMessageDTO> messages;
    
    private String model = "deepseek-chat"; // Default model
    private Double temperature = 0.7; // Default temperature
    private Integer maxTokens = 4096; // Default max tokens
} 