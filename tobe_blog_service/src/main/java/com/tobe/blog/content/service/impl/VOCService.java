package com.tobe.blog.content.service.impl;

import org.springframework.stereotype.Service;

import com.tobe.blog.beans.consts.Const.ContentType;
import com.tobe.blog.beans.dto.content.VOCCreationDTO;
import com.tobe.blog.beans.dto.content.VOCDTO;
import com.tobe.blog.beans.dto.content.VOCUpdateDTO;
import com.tobe.blog.beans.entity.content.VOCEntity;
import com.tobe.blog.content.mapper.VOCMapper;

@Service
public class VOCService extends BaseContentService<VOCDTO, VOCCreationDTO, VOCUpdateDTO, VOCEntity, VOCMapper> {

    @Override
    protected VOCDTO getConcreteDTO() {
        return new VOCDTO();
    }

    @Override
    protected VOCEntity getConcreteEntity() {
        return new VOCEntity();
    }

    @Override
    protected ContentType getContentType() {
        return ContentType.VOC;
    }

}
