package com.tobe.blog.content.controller.impl;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tobe.blog.beans.dto.content.BaseContentDTO;
import com.tobe.blog.content.service.impl.ContentAdminService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/v1/content-admin")
@RequiredArgsConstructor
public class ContentAdminController {

    private final ContentAdminService contentAdminService;

    @PutMapping("/{id}/ban")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<BaseContentDTO> banContentById(@PathVariable String id) {
        return ResponseEntity.ok(contentAdminService.banContentById(id));
    }

    @PutMapping("/{id}/recommend")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<BaseContentDTO> recommendContentById(@PathVariable String id) {
        return ResponseEntity.ok(contentAdminService.recommmendContentById(id));
    }

}
