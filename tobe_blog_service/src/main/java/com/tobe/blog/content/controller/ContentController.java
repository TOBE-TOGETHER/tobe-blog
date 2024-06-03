package com.tobe.blog.content.controller;

import com.tobe.blog.beans.dto.content.BaseContentDTO;
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
    public ResponseEntity<List<BaseContentDTO>> getContents() {
        List<BaseContentDTO> result = contentService.list().stream().map(e -> {
            BaseContentDTO dto = new BaseContentDTO();
            BeanUtils.copyProperties(e, dto);
            return dto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }
}
