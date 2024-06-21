package com.tobe.blog.content.controller.impl;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tobe.blog.beans.dto.content.VOCCreationDTO;
import com.tobe.blog.beans.dto.content.VOCDTO;
import com.tobe.blog.beans.dto.content.VOCUpdateDTO;
import com.tobe.blog.beans.dto.content.WordDTO;
import com.tobe.blog.beans.entity.content.VOCEntity;
import com.tobe.blog.content.mapper.VOCMapper;
import com.tobe.blog.content.service.impl.VOCService;
import com.tobe.blog.content.service.impl.WordService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/v1/vocabularies")
@RequiredArgsConstructor
public class VOCController
        extends BaseContentController<VOCDTO, VOCCreationDTO, VOCUpdateDTO, VOCEntity, VOCMapper, VOCService> {

    private final VOCService vocService;
    private final WordService wordService;

    @GetMapping("/{id}/words")
    public ResponseEntity<List<WordDTO>> getWordsByVOCId(@RequestParam String id) {
        return ResponseEntity.ok(wordService.getWordsByVOCId(id));
    }

    protected VOCService getConcreteSubContentService() {
        return this.vocService;
    }

}
