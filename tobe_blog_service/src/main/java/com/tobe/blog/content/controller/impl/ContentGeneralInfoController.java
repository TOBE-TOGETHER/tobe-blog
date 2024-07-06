package com.tobe.blog.content.controller.impl;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.beans.dto.content.BaseContentDTO;
import com.tobe.blog.content.service.impl.ContentGeneralInfoService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/v1/contents")
@RequiredArgsConstructor
public class ContentGeneralInfoController {

    private final ContentGeneralInfoService contentService;

    /** 
     * Search all published content no matter if the content get banned or not.
     * This API is for administor to manage and review contents
    */
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Page<BaseContentDTO>> searchPublishedContents(
        @RequestParam(value = "current", required = false, defaultValue = "1") int current,
        @RequestParam(value = "size", required = false, defaultValue = "10") int size,
        @RequestParam(value = "keyword", required = false, defaultValue = "") String keyword) {
        return ResponseEntity.ok(contentService.searchPublishedContentDTOs(current, size, keyword));
    }
    
}
