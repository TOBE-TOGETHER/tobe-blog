package com.tobe.blog.content.controller.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.util.Strings;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.beans.dto.content.BaseContentCreationDTO;
import com.tobe.blog.beans.dto.content.BaseContentDTO;
import com.tobe.blog.beans.dto.content.BaseContentUpdateDTO;
import com.tobe.blog.beans.dto.content.BaseSearchFilter;
import com.tobe.blog.beans.dto.content.ContentVisibilityUpdateDTO;
import com.tobe.blog.beans.entity.content.BaseContentEntity;
import com.tobe.blog.content.controller.IContentController;
import com.tobe.blog.content.mapper.BaseContentMapper;
import com.tobe.blog.content.service.IContentService;

/**
 * This is an abstract controller which provides some common implementations 
 * of basic CRUD APIs for user content module. Thereby, the concrete controllers 
 * can be as clean as possible and only focus on the special logic of their own.
 * 
 * @param <D> DTO used to return basic info to client
 * @param <C> DTO used for creation
 * @param <U> DTO used for update
 * @param <E> Entity used for database, @TableName annotation is required
 * @param <M> Mapper used for manipulating data, providing common CRUD methods
 * @param <S> Core service to implement the save, update, delete operations
 */
public abstract class BaseContentController<
    D extends BaseContentDTO, 
    C extends BaseContentCreationDTO, 
    U extends BaseContentUpdateDTO, 
    E extends BaseContentEntity, 
    M extends BaseContentMapper<D, E>, 
    S extends IContentService<D, C, U, E, M>> implements IContentController<D, C, U, E, M, S> {

    protected abstract S getConcreteSubContentService();
    private final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    @Override
    @PostMapping
    public ResponseEntity<D> create(@RequestBody C dto) {
        return ResponseEntity.ok(getConcreteSubContentService().save(dto));
    }

    @Override
    @PutMapping("/{id}")
    public ResponseEntity<D> update(@PathVariable String id, @RequestBody U dto) {
        return ResponseEntity.ok(getConcreteSubContentService().update(dto));
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<D> delete(@PathVariable String id) {
        getConcreteSubContentService().delete(id);
        return ResponseEntity.ok(null);
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<D> getById(@PathVariable String id) {
        return ResponseEntity.ok(getConcreteSubContentService().getDTOById(id));
    }

    @Override
    @GetMapping
    public ResponseEntity<Page<D>> search(            
        @RequestParam(value = "current", required = false, defaultValue = "1") int current,
        @RequestParam(value = "size", required = false, defaultValue = "10") int size,
        @RequestParam(value = "status", required = false, defaultValue = "") String status,
        @RequestParam(value = "createFrom", required = false, defaultValue = "") String createFrom,
        @RequestParam(value = "createTo", required = false, defaultValue = "") String createTo,
        @RequestParam(value = "updateFrom", required = false, defaultValue = "") String updateFrom,
        @RequestParam(value = "updateTo", required = false, defaultValue = "") String updateTo,
        @RequestParam(value = "tags", required = false, defaultValue = "") String tags,
        @RequestParam(value = "keyword", required = false, defaultValue = "") String keyword) {
        try {
            final BaseSearchFilter filter = buildSearchFilter(status, createFrom, createTo, updateFrom, updateTo, tags, keyword);
            return ResponseEntity.ok(this.getConcreteSubContentService().search(current, size, filter));
        } catch (ParseException e) {
            return ResponseEntity.badRequest().build();
        }   
    }

    @Override
    @PutMapping("/{id}/visibility")
    public ResponseEntity<D> updatVisibility(@PathVariable String id, @RequestBody ContentVisibilityUpdateDTO updateDTO) {
        return ResponseEntity.ok(this.getConcreteSubContentService().updatVisibility(id, updateDTO));
    }

    private BaseSearchFilter buildSearchFilter(
        String status,
        String createFrom, 
        String createTo, 
        String updateFrom,
        String updateTo, 
        String tags,
        String keyword) throws ParseException {
        final BaseSearchFilter filter = new BaseSearchFilter();
        if (Strings.isNotBlank(status)) {
            filter.setStatus(status);
        }
        if (Strings.isNotBlank(createFrom)) {
            filter.setCreateFrom(sdf.parse(createFrom));
        }
        if (Strings.isNotBlank(createTo)) {
            filter.setCreateTo(sdf.parse(createTo));
        }
        if (Strings.isNotBlank(updateFrom)) {
            filter.setUpdateFrom(sdf.parse(updateFrom));
        }
        if (Strings.isNotBlank(updateTo)) {
            filter.setUpdateTo(sdf.parse(updateTo));
        }
        if (StringUtils.isNotBlank(tags))  {
            filter.setTags(tags.split(","));
        }
        if (Strings.isNotBlank(keyword)) {
            filter.setKeyword(keyword);
        }
        return filter;
    }
}
