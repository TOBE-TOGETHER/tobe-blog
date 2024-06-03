package com.tobe.blog.content.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tobe.blog.beans.dto.content.VOCCreationDTO;
import com.tobe.blog.beans.dto.content.VOCDTO;
import com.tobe.blog.beans.dto.content.VOCUpdateDTO;
import com.tobe.blog.beans.entity.content.VOCEntity;
import com.tobe.blog.content.mapper.VOCMapper;
import com.tobe.blog.content.service.VOCService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1/vocabularies")
@RequiredArgsConstructor
public class VOCController
        extends BaseContentController<VOCDTO, VOCCreationDTO, VOCUpdateDTO, VOCEntity, VOCMapper, VOCService> {

    private final VOCService vocService;

    protected VOCService getConcreteSubContentService() {
        return this.vocService;
    }

}
