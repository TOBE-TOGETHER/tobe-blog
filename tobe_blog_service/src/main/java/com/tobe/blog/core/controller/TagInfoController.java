package com.tobe.blog.core.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.beans.dto.tag.TagInfoCreationDTO;
import com.tobe.blog.beans.dto.tag.TagInfoGeneralDTO;
import com.tobe.blog.core.service.TagInfoService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/tags")
@RequiredArgsConstructor
public class TagInfoController {

    private final TagInfoService tagInfoService;

    @PostMapping
    public ResponseEntity<TagInfoGeneralDTO> createTag(@RequestBody TagInfoCreationDTO dto) {
        return ResponseEntity.ok(tagInfoService.createTag(dto));
    }

    @GetMapping
    public ResponseEntity<Page<TagInfoGeneralDTO>> getTagsByKeyword(
            @RequestParam(value = "keyword", required = false, defaultValue = "") String keyword,
            @RequestParam(value = "current", required = false, defaultValue = "1") int current,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        return ResponseEntity.ok(
                tagInfoService.getTagsByKeyword(keyword, current, size));
    }

}
