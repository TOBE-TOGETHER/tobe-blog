package com.tobe.blog.content.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tobe.blog.beans.dto.content.ContentCreationDTO;
import com.tobe.blog.beans.dto.content.ContentDTO;
import com.tobe.blog.beans.dto.content.ContentUpdateDTO;
import com.tobe.blog.beans.entity.content.BaseSubContentEntity;
import com.tobe.blog.content.service.BaseSubContentService;

public abstract class BaseContentController<G extends ContentDTO, C extends ContentCreationDTO, U extends ContentUpdateDTO, E extends BaseSubContentEntity, M extends BaseMapper<E>, S extends BaseSubContentService<G, C, U, E, M>> {

    protected abstract S getConcreteSubContentService();

    @GetMapping("/{id}")
    public ResponseEntity<G> getById(@PathVariable String id) {
        return ResponseEntity.ok(getConcreteSubContentService().getDTOById(id));
    }

    @PostMapping
    public ResponseEntity<G> create(@RequestBody C dto) {
        return ResponseEntity.ok(getConcreteSubContentService().save(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<G> update(@PathVariable String id, @RequestBody U dto) {
        return ResponseEntity.ok(getConcreteSubContentService().update(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<G> delete(@PathVariable String id) {
        getConcreteSubContentService().delete(id);
        return ResponseEntity.ok(null);
    }
}
