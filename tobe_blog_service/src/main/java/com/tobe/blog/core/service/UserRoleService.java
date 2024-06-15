package com.tobe.blog.core.service;


import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tobe.blog.beans.entity.user.UserRoleEntity;
import com.tobe.blog.core.mapper.UserRoleMapper;

@Service
public class UserRoleService extends ServiceImpl<UserRoleMapper, UserRoleEntity> {
}
