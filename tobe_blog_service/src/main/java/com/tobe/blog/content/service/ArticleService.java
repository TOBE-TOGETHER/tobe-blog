package com.tobe.blog.content.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tobe.blog.beans.entity.content.ArticleEntity;
import com.tobe.blog.content.mapper.ArticleMapper;
import org.springframework.stereotype.Service;

@Service
public class ArticleService extends ServiceImpl<ArticleMapper, ArticleEntity> {

}
