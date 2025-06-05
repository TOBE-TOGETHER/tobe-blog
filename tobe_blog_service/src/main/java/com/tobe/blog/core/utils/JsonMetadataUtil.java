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

    /**
     * Create JSON metadata for basic notification i18n (content recommended/banned)
     * @param contentType the content type
     * @param contentTitle the content title
     * @return JSON string with i18n parameters
     */
    public static String createNotificationI18nMetadata(String contentType, String contentTitle) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("contentType", contentType);
        metadata.put("contentTitle", contentTitle);
        return toJsonString(metadata);
    }

    /**
     * Create JSON metadata for comment notification i18n
     * @param commenterName the commenter name
     * @param contentType the content type
     * @param contentTitle the content title
     * @param commentContent the comment content
     * @return JSON string with i18n parameters
     */
    public static String createCommentNotificationI18nMetadata(String commenterName, String contentType, String contentTitle, String commentContent) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("commenterName", commenterName);
        metadata.put("contentType", contentType);
        metadata.put("contentTitle", contentTitle);
        metadata.put("commentContent", commentContent);
        return toJsonString(metadata);
    }

    /**
     * Create JSON metadata for reply notification i18n
     * @param replierName the replier name
     * @param contentTitle the content title
     * @param replyContent the reply content
     * @param originalCommentContent the original comment content
     * @return JSON string with i18n parameters
     */
    public static String createReplyNotificationI18nMetadata(String replierName, String contentTitle, String replyContent, String originalCommentContent) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("replierName", replierName);
        metadata.put("contentTitle", contentTitle);
        metadata.put("commentContent", replyContent);
        metadata.put("originalCommentContent", originalCommentContent);
        return toJsonString(metadata);
    }

    /**
     * Create JSON metadata for deleted comment notification i18n
     * @param contentType the content type
     * @param contentTitle the content title
     * @param deletedCommentContent the deleted comment content
     * @return JSON string with i18n parameters
     */
    public static String createDeletedCommentNotificationI18nMetadata(String contentType, String contentTitle, String deletedCommentContent) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("contentType", contentType);
        metadata.put("contentTitle", contentTitle);
        metadata.put("commentContent", deletedCommentContent);
        return toJsonString(metadata);
    }

    /**
     * Create JSON metadata for deleted reply notification i18n
     * @param contentTitle the content title
     * @param deletedReplyContent the deleted reply content
     * @param originalCommentContent the original comment content
     * @return JSON string with i18n parameters
     */
    public static String createDeletedReplyNotificationI18nMetadata(String contentTitle, String deletedReplyContent, String originalCommentContent) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("contentTitle", contentTitle);
        metadata.put("commentContent", deletedReplyContent);
        metadata.put("originalCommentContent", originalCommentContent);
        return toJsonString(metadata);
    }
} 