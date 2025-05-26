package com.tobe.blog.core.utils;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.tobe.blog.beans.dto.content.BaseContentDTO;
import com.tobe.blog.beans.dto.content.TagRelationshipDTO;
import com.tobe.blog.portal.service.PublicApiService;

import lombok.RequiredArgsConstructor;

/**
 * Utility class for handling tag relationship operations
 */
@Component
@RequiredArgsConstructor
public class TagRelationshipUtil {

    private final PublicApiService publicApiService;

    /**
     * Populate related contents for tag tree nodes
     * This method searches for published and non-banned content for each tag
     * 
     * @param tagTree the tag tree to populate
     * @param ownerId the owner id for content filtering
     */
    public void setRelatedContentsForTagTree(List<TagRelationshipDTO> tagTree, Long ownerId) {
        if (tagTree == null || tagTree.isEmpty()) {
            return;
        }
        
        tagTree.forEach(node -> {
            // Search for related content using the same logic as portal page
            node.setRelatedContents(
                publicApiService.searchContents(
                    1, 1000, 
                    new String[]{node.getTagId().toString()}, 
                    ownerId, 
                    new String[]{}, 
                    null, 
                    ""
                ).getRecords()
                .stream()
                .sorted(Comparator.comparing(BaseContentDTO::getTitle))
                .collect(Collectors.toList())
            );
            
            // Recursively process children
            if (node.getChildren() != null && !node.getChildren().isEmpty()) {
                setRelatedContentsForTagTree(node.getChildren(), ownerId);
            }
        });
    }
} 