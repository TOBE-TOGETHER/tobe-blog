package com.tobe.blog.content.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tobe.blog.beans.consts.Const;
import com.tobe.blog.beans.dto.content.ContentCreationDTO;
import com.tobe.blog.beans.dto.content.ContentDTO;
import com.tobe.blog.beans.entity.content.ContentEntity;
import com.tobe.blog.content.mapper.ContentMapper;
import com.tobe.blog.core.utils.SecurityUtil;
import org.springframework.beans.BeanUtils;

public abstract class AbstractContentService<C extends ContentCreationDTO, G extends ContentDTO>
        extends ServiceImpl<ContentMapper, ContentEntity> {

    public ContentDTO createContent(C contentCreationDTO) {
        ContentEntity content = new ContentEntity();
        BeanUtils.copyProperties(contentCreationDTO, content);
        content.setContentType(getContentType().name());
        content.setDeleted(Boolean.FALSE);
        content.setPublicToAll(Boolean.FALSE);
        content.setViewCount(0L);
        content.setLikeCount(0L);
        content.setOwnerId(SecurityUtil.getUserId());
        this.save(content);
        ContentDTO contentDTO = new ContentDTO();
        BeanUtils.copyProperties(content, contentDTO);
        return contentDTO;
    }

    public G convert(C contentCreationDTO) {

        return
    }

    protected abstract Const.ContentType getContentType();
}
