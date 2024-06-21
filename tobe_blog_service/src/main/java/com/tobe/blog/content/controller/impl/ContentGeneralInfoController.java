package com.tobe.blog.content.controller.impl;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.tobe.blog.beans.dto.content.BaseContentDTO;
import com.tobe.blog.beans.entity.content.ContentGeneralInfoEntity;
import com.tobe.blog.content.service.impl.ContentGeneralInfoService;
import com.tobe.blog.core.utils.BasicConverter;
import com.tobe.blog.core.utils.SecurityUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1/contents")
@RequiredArgsConstructor
public class ContentGeneralInfoController {

    private final ContentGeneralInfoService contentService;

    @GetMapping
    public ResponseEntity<List<BaseContentDTO>> getContents() {
        List<BaseContentDTO> result = contentService.listObjs(
          new LambdaQueryWrapper<ContentGeneralInfoEntity>()
              .eq(ContentGeneralInfoEntity::getOwnerId, SecurityUtil.getUserId()),
              r -> BasicConverter.convert(r, BaseContentDTO.class));
        return ResponseEntity.ok(result);
    }
}
