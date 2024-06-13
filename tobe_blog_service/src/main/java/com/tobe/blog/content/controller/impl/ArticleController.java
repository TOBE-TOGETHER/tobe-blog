package com.tobe.blog.content.controller.impl;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tobe.blog.beans.dto.content.ArticleCreationDTO;
import com.tobe.blog.beans.dto.content.ArticleDTO;
import com.tobe.blog.beans.dto.content.ArticleUpdateDTO;
import com.tobe.blog.beans.entity.content.ArticleEntity;
import com.tobe.blog.content.mapper.ArticleMapper;
import com.tobe.blog.content.service.impl.ArticleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1/articles")
@RequiredArgsConstructor
public class ArticleController extends
        BaseContentController<ArticleDTO, ArticleCreationDTO, ArticleUpdateDTO, ArticleEntity, ArticleMapper, ArticleService> {

    private final ArticleService articleService;

    @Override
    protected ArticleService getConcreteSubContentService() {
        return this.articleService;
    }

}
