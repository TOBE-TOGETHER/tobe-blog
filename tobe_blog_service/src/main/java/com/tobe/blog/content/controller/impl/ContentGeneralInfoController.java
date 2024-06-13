package com.tobe.blog.content.controller.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tobe.blog.beans.dto.content.BaseContentDTO;
import com.tobe.blog.content.service.impl.ContentGeneralInfoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1/contents")
@RequiredArgsConstructor
public class ContentGeneralInfoController {

    private final ContentGeneralInfoService contentService;

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
