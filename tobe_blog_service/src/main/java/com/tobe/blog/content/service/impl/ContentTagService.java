package com.tobe.blog.content.service.impl;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tobe.blog.beans.entity.content.ContentTagEntity;
import com.tobe.blog.content.mapper.ContentTagMapper;

@Service
public class ContentTagService extends ServiceImpl<ContentTagMapper, ContentTagEntity> {
}
