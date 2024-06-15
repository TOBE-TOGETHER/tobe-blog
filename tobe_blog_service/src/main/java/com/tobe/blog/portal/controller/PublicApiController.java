package com.tobe.blog.portal.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.beans.dto.content.ArticleDTO;
import com.tobe.blog.beans.dto.content.PlanDTO;
import com.tobe.blog.beans.dto.content.PlanProgressDTO;
import com.tobe.blog.beans.dto.content.VOCDTO;
import com.tobe.blog.beans.dto.content.WordDTO;
import com.tobe.blog.content.service.impl.ArticleService;
import com.tobe.blog.content.service.impl.PlanProgressService;
import com.tobe.blog.content.service.impl.PlanService;
import com.tobe.blog.content.service.impl.VOCService;
import com.tobe.blog.content.service.impl.WordService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1/api")
@RequiredArgsConstructor
public class PublicApiController {

    private final ArticleService articleService;
    private final PlanService planService;
    private final VOCService vocService;
    private final PlanProgressService progressService;
    private final WordService wordService;

    @GetMapping("/articles/{id}")
    public ResponseEntity<ArticleDTO> getArticleById(@PathVariable(value = "id") String id) {
        final ArticleDTO result = articleService.getDTOByIdAndCount(id);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/plans/{id}")
    public ResponseEntity<PlanDTO> getPlanById(@PathVariable(value = "id") String id) {
        final PlanDTO result = planService.getDTOByIdAndCount(id);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/vocabularies/{id}")
    public ResponseEntity<VOCDTO> getVocabularyById(@PathVariable(value = "id") String id) {
        final VOCDTO result = vocService.getDTOByIdAndCount(id);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/plans/{id}/progresses")
    public ResponseEntity<Page<PlanProgressDTO>> getProgressesByPlanId(
            @PathVariable String id,
            @RequestParam(value = "current", required = false, defaultValue = "1") int current,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        return ResponseEntity.ok(progressService.getProgressesByPlanId(id, current, size));
    }

    @GetMapping("/vocabularies/{id}/words")
    public ResponseEntity<List<WordDTO>> getWordsByVocabularyId(@PathVariable String id) {
        return ResponseEntity.ok(wordService.getWordsByVOCId(id));
    }

}
