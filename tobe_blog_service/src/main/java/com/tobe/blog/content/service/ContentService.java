package com.tobe.blog.content.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tobe.blog.beans.entity.content.ContentEntity;
import com.tobe.blog.content.mapper.ContentMapper;
import org.springframework.stereotype.Service;

@Service
public class ContentService extends ServiceImpl<ContentMapper, ContentEntity> {
}
