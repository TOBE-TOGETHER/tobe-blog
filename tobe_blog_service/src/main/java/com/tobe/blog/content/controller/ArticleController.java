package com.tobe.blog.content.controller;

import com.tobe.blog.beans.entity.content.ArticleEntity;
import com.tobe.blog.content.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/v1/articles")
@RequiredArgsConstructor
public class ArticleController extends AbstractContentController {

    private final ArticleService articleService;

    @GetMapping
    public ResponseEntity<List<ArticleEntity>> getArticles() {
        return ResponseEntity.ok(articleService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleEntity> getArticleById(final String id) {
        return ResponseEntity.ok(articleService.getById(id));
    }

    @PostMapping
    public ResponseEntity<ArticleEntity> createArticle(final ArticleEntity article) {
        articleService.save(article);
        return ResponseEntity.ok(article);
    }
}
