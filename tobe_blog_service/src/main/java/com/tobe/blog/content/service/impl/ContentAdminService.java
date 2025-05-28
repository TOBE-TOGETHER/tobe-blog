package com.tobe.blog.content.service.impl;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tobe.blog.beans.dto.content.BaseContentDTO;
import com.tobe.blog.beans.entity.content.ContentAdminEntity;
import com.tobe.blog.content.mapper.ContentAdminMapper;
import com.tobe.blog.core.utils.BasicConverter;

@Service
public class ContentAdminService extends ServiceImpl<ContentAdminMapper, ContentAdminEntity> {

    public BaseContentDTO banContentById(String id) {
        final ContentAdminEntity entity = this.getById(id);
        entity.setBanned(true);
        entity.setReason("Violating content, blocked by administrators");
        this.updateById(entity);
        return BasicConverter.convert(entity, BaseContentDTO.class);
    }

    public BaseContentDTO unbanContentById(String id) {
        final ContentAdminEntity entity = this.getById(id);
        entity.setBanned(false);
        entity.setReason("Content has been reviewed and unbanned by administrators");
        this.updateById(entity);
        return BasicConverter.convert(entity, BaseContentDTO.class);
    }

    public BaseContentDTO recommmendContentById(String id) {
        final ContentAdminEntity entity = this.getById(id);
        entity.setRecommended(true);
        entity.setReason("High-quality content, recommended by administrators");
        this.updateById(entity);
        return BasicConverter.convert(entity, BaseContentDTO.class);
    }

    public BaseContentDTO unrecommendContentById(String id) {
        final ContentAdminEntity entity = this.getById(id);
        entity.setRecommended(false);
        entity.setReason("Content recommendation has been removed by administrators");
        this.updateById(entity);
        return BasicConverter.convert(entity, BaseContentDTO.class);
    }
}
