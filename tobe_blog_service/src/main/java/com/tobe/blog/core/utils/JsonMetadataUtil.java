package com.tobe.blog.core.utils;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

/**
 * Utility class for handling JSON metadata operations in notifications and other features
 */
@Slf4j
public class JsonMetadataUtil {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Create JSON metadata for comment notifications
     * @param commentContent the comment content
     * @return JSON string with comment metadata
     */
    public static String createCommentMetadata(String commentContent) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("commentContent", commentContent);
        return toJsonString(metadata);
    }

    /**
     * Create JSON metadata for comment reply notifications
     * @param replyContent the reply content
     * @param originalCommentContent the original comment content
     * @return JSON string with reply metadata
     */
    public static String createCommentReplyMetadata(String replyContent, String originalCommentContent) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("commentContent", replyContent);
        metadata.put("originalCommentContent", originalCommentContent);
        return toJsonString(metadata);
    }

    /**
     * Extract comment content from JSON metadata
     * @param metadataJson JSON metadata string
     * @return comment content or null if not found/invalid
     */
    public static String getCommentContent(String metadataJson) {
        return getStringValue(metadataJson, "commentContent");
    }

    /**
     * Extract original comment content from JSON metadata
     * @param metadataJson JSON metadata string
     * @return original comment content or null if not found/invalid
     */
    public static String getOriginalCommentContent(String metadataJson) {
        return getStringValue(metadataJson, "originalCommentContent");
    }

    /**
     * Convert object to JSON string safely
     * @param object object to convert
     * @return JSON string or empty object "{}" if conversion fails
     */
    public static String toJsonString(Object object) {
        try {
            return objectMapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            log.warn("Failed to convert object to JSON: {}", e.getMessage());
            return "{}";
        }
    }

    /**
     * Parse JSON string and extract string value by key
     * @param jsonString JSON string to parse
     * @param key key to extract
     * @return string value or null if not found/invalid
     */
    public static String getStringValue(String jsonString, String key) {
        if (jsonString == null || jsonString.trim().isEmpty()) {
            return null;
        }

        try {
            JsonNode rootNode = objectMapper.readTree(jsonString);
            JsonNode valueNode = rootNode.get(key);
            return valueNode != null ? valueNode.asText() : null;
        } catch (JsonProcessingException e) {
            log.warn("Failed to parse JSON metadata: {}", e.getMessage());
            return null;
        }
    }

    /**
     * Parse JSON string and extract all key-value pairs
     * @param jsonString JSON string to parse
     * @return Map of key-value pairs or empty map if parsing fails
     */
    public static Map<String, String> parseMetadata(String jsonString) {
        Map<String, String> result = new HashMap<>();
        
        if (jsonString == null || jsonString.trim().isEmpty()) {
            return result;
        }

        try {
            JsonNode rootNode = objectMapper.readTree(jsonString);
            rootNode.fields().forEachRemaining(entry -> {
                result.put(entry.getKey(), entry.getValue().asText());
            });
        } catch (JsonProcessingException e) {
            log.warn("Failed to parse JSON metadata: {}", e.getMessage());
        }
        
        return result;
    }
} 