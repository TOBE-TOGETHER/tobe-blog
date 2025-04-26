package com.tobe.blog.content.controller;

import org.springframework.http.ResponseEntity;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.beans.consts.Const;
import com.tobe.blog.beans.dto.content.BaseContentCreationDTO;
import com.tobe.blog.beans.dto.content.BaseContentDTO;
import com.tobe.blog.beans.dto.content.BaseContentUpdateDTO;
import com.tobe.blog.beans.dto.content.ContentVisibilityUpdateDTO;
import com.tobe.blog.beans.entity.content.BaseContentEntity;
import com.tobe.blog.content.mapper.BaseContentMapper;
import com.tobe.blog.content.service.IContentService;

public interface IContentController<
    D extends BaseContentDTO, 
    C extends BaseContentCreationDTO, 
    U extends BaseContentUpdateDTO, 
    E extends BaseContentEntity, 
    M extends BaseContentMapper<D, E>, 
    S extends IContentService<D, C, U, E, M>> {

    ResponseEntity<D> create(C dto);

    ResponseEntity<D> update(String id, U dto);

    ResponseEntity<D> delete(String id);

    ResponseEntity<D> getById(String id);

    ResponseEntity<Page<D>> search(
        int current,
        int size,
        String status,
        String createFrom,
        String createTo,
        String updateFrom,
        String updateTo,
        String tags,
        String keyword,
        Const.Topic topic);

    ResponseEntity<D> updateVisibility(String id, ContentVisibilityUpdateDTO updateDTO);

}