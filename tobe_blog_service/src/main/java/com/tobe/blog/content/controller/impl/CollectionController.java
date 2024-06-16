package com.tobe.blog.content.controller.impl;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tobe.blog.beans.dto.content.CollectionCreationDTO;
import com.tobe.blog.beans.dto.content.CollectionDTO;
import com.tobe.blog.beans.dto.content.CollectionUpdateDTO;
import com.tobe.blog.beans.entity.content.CollectionEntity;
import com.tobe.blog.content.mapper.CollectionMapper;
import com.tobe.blog.content.service.impl.CollectionService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/v1/collections")
@AllArgsConstructor
public class CollectionController extends
        BaseContentController<CollectionDTO, CollectionCreationDTO, CollectionUpdateDTO, CollectionEntity, CollectionMapper, CollectionService> {

    private CollectionService collectionService;
          
    @Override
    protected CollectionService getConcreteSubContentService() {
        return this.collectionService;
    }
  
}
