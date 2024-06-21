package com.tobe.blog.content.controller.impl;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tobe.blog.beans.dto.content.TagRelationshipCreationDTO;
import com.tobe.blog.beans.dto.content.TagRelationshipDTO;
import com.tobe.blog.content.service.impl.TagRelationshipService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1/tag-relationships")
@RequiredArgsConstructor
public class TagRelationshipController {

    private final TagRelationshipService tagRelationshipService;

    @PostMapping
    public ResponseEntity<TagRelationshipDTO> createTagRelationship(@RequestBody TagRelationshipCreationDTO dto) {
        return ResponseEntity.ok(tagRelationshipService.createTagRelationship(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TagRelationshipDTO> deleteTagRelationship(@PathVariable Long id) {
        tagRelationshipService.deleteById(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping
    public ResponseEntity<List<TagRelationshipDTO>> getTagRelationshipsByParentId(
        @RequestParam(required = false) Long parentId,
        @RequestParam String collectionId) {
        return ResponseEntity.ok(tagRelationshipService.getTagRelationshipByParentId(parentId, collectionId));
    }

}
