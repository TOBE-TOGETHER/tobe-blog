package com.tobe.blog.core.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.tobe.blog.beans.dto.agent.AgentChatRequestDTO;
import com.tobe.blog.beans.dto.agent.AgentChatResponseDTO;
import com.tobe.blog.core.exception.TobeRuntimeException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AgentService {

    private final RestTemplate restTemplate;

    @Value("${deepseek.api.key}")
    private String deepseekApiKey;

    @Value("${deepseek.api.url:https://api.deepseek.com/v1/chat/completions}")
    private String deepseekApiUrl;

    /**
     * Send a chat request to DeepSeek API
     * @param request The chat request
     * @return The chat response
     */
    public AgentChatResponseDTO sendChatRequest(AgentChatRequestDTO request) {
        try {
            // Prepare the request body for DeepSeek API
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", request.getModel());
            requestBody.put("messages", request.getMessages());
            requestBody.put("temperature", request.getTemperature());
            requestBody.put("max_tokens", request.getMaxTokens());
            requestBody.put("stream", false); // We'll handle streaming separately

            // Set up headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(deepseekApiKey);

            // Create HTTP entity
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            // Make the request
            ResponseEntity<JsonNode> response = restTemplate.exchange(
                deepseekApiUrl,
                HttpMethod.POST,
                entity,
                JsonNode.class
            );

            // Parse the response
            return parseDeepSeekResponse(response.getBody());

        } catch (Exception e) {
            log.error("Error calling DeepSeek API", e);
            return new AgentChatResponseDTO(
                null,
                request.getModel(),
                null,
                null,
                "Failed to get response from AI: " + e.getMessage()
            );
        }
    }

    /**
     * Send a streaming chat request to DeepSeek API
     * @param request The chat request
     * @return Stream of response chunks
     */
    public java.util.stream.Stream<String> sendStreamingChatRequest(AgentChatRequestDTO request) {
        try {
            // For now, we'll simulate streaming by making a regular request and splitting the response
            // This is a temporary implementation until WebClient is properly configured
            AgentChatResponseDTO response = sendChatRequest(request);
            
            if (response.getError() != null) {
                throw new TobeRuntimeException(response.getError());
            }
            
            String content = response.getContent() != null ? response.getContent() : "";
            
            // For testing, use a simple Chinese response if content is empty
            if (content.isEmpty()) {
                content = "你好！这是一个测试响应。Hello! This is a test response.";
            }
            
            // Split content into meaningful chunks for streaming effect
            // Handle newlines and special characters properly
            return splitContentIntoSensibleChunks(content);
                
        } catch (Exception e) {
            log.error("Error calling DeepSeek API for streaming", e);
            throw new TobeRuntimeException("Failed to get streaming response from AI: " + e.getMessage());
        }
    }

    /**
     * Split content into sensible chunks for streaming
     * @param content The content to split
     * @return Stream of chunks
     */
    private java.util.stream.Stream<String> splitContentIntoSensibleChunks(String content) {
        // First, normalize line endings
        content = content.replace("\r\n", "\n").replace("\r", "\n");
        
        // Split by paragraphs first (double newlines)
        String[] paragraphs = content.split("\n\n");
        
        return java.util.Arrays.stream(paragraphs)
            .map(String::trim)
            .filter(paragraph -> !paragraph.isEmpty())
            .flatMap(paragraph -> {
                // If paragraph contains single newlines, split by lines
                if (paragraph.contains("\n")) {
                    // Split by newlines and add newline to each line
                    String[] lines = paragraph.split("\n");
                    return java.util.Arrays.stream(lines)
                        .map(String::trim)
                        .filter(line -> !line.isEmpty())
                        .map(line -> line + "\n"); // Add newline to each line
                } else {
                    // For paragraphs without internal newlines, split by sentences
                    String[] sentences = paragraph.split("(?<=[。！？.!?])");
                    return java.util.Arrays.stream(sentences)
                        .map(String::trim)
                        .filter(sentence -> !sentence.isEmpty())
                        .map(sentence -> sentence + "\n"); // Add newline after each sentence
                }
            });
    }

    /**
     * Parse DeepSeek API response
     * @param responseBody The response body from DeepSeek
     * @return Parsed response
     */
    private AgentChatResponseDTO parseDeepSeekResponse(JsonNode responseBody) {
        try {
            if (responseBody == null) {
                return new AgentChatResponseDTO(null, null, null, null, "Empty response from AI");
            }

            // Check for errors
            if (responseBody.has("error")) {
                JsonNode error = responseBody.get("error");
                String errorMessage = error.has("message") ? error.get("message").asText() : "Unknown error";
                return new AgentChatResponseDTO(null, null, null, null, errorMessage);
            }

            // Parse successful response
            JsonNode choices = responseBody.get("choices");
            if (choices != null && choices.isArray() && choices.size() > 0) {
                JsonNode choice = choices.get(0);
                JsonNode message = choice.get("message");
                
                String content = message.has("content") ? message.get("content").asText() : "";
                String finishReason = choice.has("finish_reason") ? choice.get("finish_reason").asText() : null;
                
                // Parse usage if available
                Long usage = null;
                if (responseBody.has("usage")) {
                    JsonNode usageNode = responseBody.get("usage");
                    if (usageNode.has("total_tokens")) {
                        usage = usageNode.get("total_tokens").asLong();
                    }
                }

                return new AgentChatResponseDTO(content, null, usage, finishReason, null);
            }

            return new AgentChatResponseDTO(null, null, null, null, "Invalid response format from AI");

        } catch (Exception e) {
            log.error("Error parsing DeepSeek response", e);
            return new AgentChatResponseDTO(null, null, null, null, "Error parsing AI response: " + e.getMessage());
        }
    }
} 