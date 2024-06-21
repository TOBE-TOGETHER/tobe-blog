package com.tobe.blog.content.controller.impl;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.beans.dto.content.PlanProgressCreationDTO;
import com.tobe.blog.beans.dto.content.PlanProgressDTO;
import com.tobe.blog.beans.dto.content.PlanProgressUpdateDTO;
import com.tobe.blog.content.service.impl.PlanProgressService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/v1/plan-progresses")
@RequiredArgsConstructor
public class PlanProgressController {
  
    private final PlanProgressService progressService;

    @GetMapping
    public ResponseEntity<Page<PlanProgressDTO>> getProgressByPlanId(
        @RequestParam(value = "planId") String planId,         
        @RequestParam(value = "current", required = false, defaultValue = "1") int current,
        @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        return ResponseEntity.ok(progressService.getProgressesByPlanId(planId, current, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlanProgressDTO> getProgressById(@PathVariable String id) {
        return ResponseEntity.ok(progressService.getProgressesById(id));
    }

    @PostMapping
    public ResponseEntity<PlanProgressDTO> createProgress(@RequestBody PlanProgressCreationDTO dto) {
        return ResponseEntity.ok(progressService.saveProgress(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlanProgressDTO> updateProgress(@RequestBody PlanProgressUpdateDTO dto) {
        return ResponseEntity.ok(progressService.updateProgress(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PlanProgressDTO> deleteWordById(@PathVariable Long id) {
        progressService.removeById(id);
        return ResponseEntity.ok(null);
    }
}
