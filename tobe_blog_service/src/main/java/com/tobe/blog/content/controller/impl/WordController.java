package com.tobe.blog.content.controller.impl;


import java.util.List;

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

import com.tobe.blog.beans.dto.content.WordCreationDTO;
import com.tobe.blog.beans.dto.content.WordDTO;
import com.tobe.blog.beans.dto.content.WordUpdateDTO;
import com.tobe.blog.content.service.impl.WordService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1/words")
@RequiredArgsConstructor
public class WordController {

    private final WordService wordService;

    @GetMapping
    public ResponseEntity<List<WordDTO>> getWordsByVOCId(@RequestParam(value = "vocabularyId") String vocabularyId) {
        return ResponseEntity.ok(wordService.getWordsByVOCId(vocabularyId));
    }

    @PostMapping
    public ResponseEntity<WordDTO> createWord(@RequestBody WordCreationDTO dto) {
        return ResponseEntity.ok(wordService.saveWord(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<WordDTO> updateWord(@PathVariable Long id, @RequestBody WordUpdateDTO dto) {
        return ResponseEntity.ok(wordService.updateWord(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<WordDTO> getWordById(@PathVariable Long id) {
        return ResponseEntity.ok(wordService.getWordById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<WordDTO> deleteWordById(@PathVariable Long id) {
        wordService.removeById(id);
        return ResponseEntity.ok(null);
    }
}
