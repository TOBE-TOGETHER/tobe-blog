package com.tobe.blog.core.service;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tobe.blog.beans.entity.user.UserFeatureEntity;
import com.tobe.blog.core.mapper.UserFeatureMapper;

@Service
public class UserFeatureService extends ServiceImpl<UserFeatureMapper, UserFeatureEntity> {
}
