package com.tobe.blog.analytics.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tobe.blog.analytics.service.AnalyticsService;
import com.tobe.blog.beans.dto.analytics.UserContentAnalyticsDTO;
import com.tobe.blog.core.utils.SecurityUtil;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/v1/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/{contentType}")
    public ResponseEntity<UserContentAnalyticsDTO> getUserContentAnalyticsResult(
        @PathVariable("contentType") String contentType) {
        return ResponseEntity.ok(analyticsService.getResult(contentType, SecurityUtil.getUserId()));
    }
    
}
