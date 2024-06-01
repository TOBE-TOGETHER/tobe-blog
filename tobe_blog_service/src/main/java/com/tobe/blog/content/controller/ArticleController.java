package com.tobe.blog.content.controller;

import com.tobe.blog.beans.dto.content.ArticleCreationDTO;
import com.tobe.blog.beans.dto.content.ArticleDTO;
import com.tobe.blog.content.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/v1/articles")
@RequiredArgsConstructor
public class ArticleController extends AbstractContentController<ArticleDTO, ArticleCreationDTO> {

    private final ArticleService articleService;

    @GetMapping("/{id}")
    public ResponseEntity<ArticleDTO> getArticleById(@RequestParam String id) {
        return ResponseEntity.ok(articleService.getDTOById(id));
    }

    @PostMapping
    public ResponseEntity<ArticleDTO> createArticle(@RequestBody ArticleCreationDTO dto) {
        return ResponseEntity.ok(articleService.save(dto));
    }
}
