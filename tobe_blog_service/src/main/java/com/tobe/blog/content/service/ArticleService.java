package com.tobe.blog.content.service;

import com.tobe.blog.beans.consts.Const.ContentType;
import com.tobe.blog.beans.dto.content.ArticleCreationDTO;
import com.tobe.blog.beans.dto.content.ArticleDTO;
import com.tobe.blog.beans.dto.content.ArticleUpdateDTO;
import com.tobe.blog.beans.entity.content.ArticleEntity;
import com.tobe.blog.content.mapper.ArticleMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class ArticleService
        extends AbstractContentService<ArticleDTO, ArticleCreationDTO, ArticleUpdateDTO, ArticleMapper, ArticleEntity> {

    @Override
    protected ArticleDTO saveConcreteContentValues(ArticleDTO contentDTO, ArticleCreationDTO creationDTO) {
        ArticleEntity entity = new ArticleEntity();
        entity.setContentId(contentDTO.getId());
        entity.setSubTitle(creationDTO.getSubTitle());
        entity.setContent(creationDTO.getContent());
        entity.setDeleted(Boolean.FALSE);
        this.save(entity);
        BeanUtils.copyProperties(entity, contentDTO);
        return contentDTO;
    }

    @Override
    protected ContentType getContentType() {
        return ContentType.ARTICLE;
    }

    @Override
    protected ArticleDTO getConcreteDTO() {
        return new ArticleDTO();
    }

}
