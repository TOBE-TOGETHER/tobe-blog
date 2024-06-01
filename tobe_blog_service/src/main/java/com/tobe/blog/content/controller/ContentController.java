package com.tobe.blog.content.controller;

import com.tobe.blog.beans.dto.content.ContentDTO;
import com.tobe.blog.content.service.ContentService;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/v1/contents")
@RequiredArgsConstructor
public class ContentController {

    private final ContentService contentService;

    @GetMapping
    public ResponseEntity<List<ContentDTO>> getContents() {
        List<ContentDTO> result = contentService.list().stream().map(e -> {
            ContentDTO dto = new ContentDTO();
            BeanUtils.copyProperties(e, dto);
            return dto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }
}
