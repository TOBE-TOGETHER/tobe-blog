package com.tobe.blog.content.service.impl;

import org.springframework.stereotype.Service;

import com.tobe.blog.beans.consts.Const.ContentType;
import com.tobe.blog.beans.dto.content.ArticleCreationDTO;
import com.tobe.blog.beans.dto.content.ArticleDTO;
import com.tobe.blog.beans.dto.content.ArticleUpdateDTO;
import com.tobe.blog.beans.entity.content.ArticleEntity;
import com.tobe.blog.content.mapper.ArticleMapper;

@Service
public class ArticleService extends
        BaseContentService<ArticleDTO, ArticleCreationDTO, ArticleUpdateDTO, ArticleEntity, ArticleMapper> {

    @Override
    protected ArticleDTO getConcreteDTO() {
        return new ArticleDTO();
    }

    @Override
    protected ArticleEntity getConcreteEntity() {
        return new ArticleEntity();
    }

    @Override
    protected ContentType getContentType() {
        return ContentType.ARTICLE;
    }

}
