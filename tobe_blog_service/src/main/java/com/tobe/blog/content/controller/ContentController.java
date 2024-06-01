package com.tobe.blog.content.controller;

import com.tobe.blog.beans.entity.content.ContentEntity;
import com.tobe.blog.content.service.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/v1/contents")
@RequiredArgsConstructor
public class ContentController {

    private final ContentService contentService;

    @GetMapping("")
    public ResponseEntity<List<ContentEntity>> getContents() {
        return ResponseEntity.ok(contentService.list());
    }
}
