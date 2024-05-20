package com.tobe.blog.core.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tobe.blog.beans.consts.Const;
import com.tobe.blog.beans.dto.user.*;
import com.tobe.blog.beans.entity.user.UserEntity;
import com.tobe.blog.beans.entity.user.UserFeatureEntity;
import com.tobe.blog.beans.entity.user.UserRoleEntity;
import com.tobe.blog.core.mapper.UserMapper;
import com.tobe.blog.core.utils.BasicConverter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
public class UserService extends ServiceImpl<UserMapper, UserEntity> {

    private UserRoleService userRoleService;
    private UserFeatureService userFeatureService;
    private BCryptPasswordEncoder encoder;

    public UserService(UserRoleService userRoleService, UserFeatureService userFeatureService) {
        this.userRoleService = userRoleService;
        this.userFeatureService = userFeatureService;
        this.encoder = new BCryptPasswordEncoder();
    }

    public UserGeneralDTO getUser(long id) {
        return Optional.ofNullable(this.getById(id))
                .map(u -> BasicConverter.convert(u, UserGeneralDTO.class))
                .orElse(null);
    }

    public UserBriefProfileDTO getUserBriefProfile(long id) {
        return Optional.ofNullable(this.getById(id))
                .map(u -> BasicConverter.convert(u, UserBriefProfileDTO.class))
                .orElse(null);
    }

    public UserFullProfileDTO getUserFullProfile(long id) {
        UserFullProfileDTO result = Optional.ofNullable(this.getById(id))
                .map(u -> BasicConverter.convert(u, UserFullProfileDTO.class))
                .orElse(null);
        if (Objects.isNull(result)) {
            return null;
        }
        result.setFeatures(BasicConverter.convert(userFeatureService.getById(id), UserFeatureDTO.class));
        return result;
    }

    public Page<UserGeneralDTO> getUsers(int current, int size) {
        return (Page<UserGeneralDTO>) this.page(new Page<>(current, size))
                .convert((x) -> BasicConverter.convert(x, UserGeneralDTO.class));
    }

    @Transactional
    public UserGeneralDTO createUser(UserCreationDTO dto) {
        // insert user
        UserEntity userEntity = BasicConverter.convert(dto, UserEntity.class);
        userEntity.setUsername(getDefaultUsernameFromEmail(userEntity.getEmail()));
        userEntity.setPassword(encoder.encode(dto.getPassword()));
        userEntity.setDeleted(Boolean.FALSE);
        this.save(userEntity);

        // insert default user role
        List<UserRoleEntity> defaultRoles = createDefaultRole(userEntity.getId());
        defaultRoles.forEach(x -> this.userRoleService.save(x));

        // insert default user feature setting
        userFeatureService.save(createDefaultFeature(userEntity.getId()));
        return BasicConverter.convert(userEntity, UserGeneralDTO.class);
    }

    @Transactional
    public UserGeneralDTO updateUser(UserUpdateDTO dto) {
        final UserEntity oriUserEntity = this.getById(dto.getId());
        if (Objects.isNull(oriUserEntity)) {
            log.warn("user doesn't exist, id: " + dto.getId());
            return new UserGeneralDTO();
        }
        BeanUtils.copyProperties(dto, oriUserEntity);
        this.updateById(oriUserEntity);
        return BasicConverter.convert(oriUserEntity, UserGeneralDTO.class);
    }

    @Transactional
    public void deleteUser(long id) {
        // delete role of the specific user
        this.userRoleService.remove(new LambdaQueryWrapper<UserRoleEntity>().eq(UserRoleEntity::getUserId, id));
        // delete features of the specific user
        this.userFeatureService
                .remove(new LambdaQueryWrapper<UserFeatureEntity>().eq(UserFeatureEntity::getUserId, id));
        // delete the specific user
        this.removeById(id);
    }

    private List<UserRoleEntity> createDefaultRole(Long userId) {
        return List.of(
                new UserRoleEntity(Const.Role.BASIC, userId));
    }

    private UserFeatureEntity createDefaultFeature(Long userId) {
        final UserFeatureEntity feature = new UserFeatureEntity();
        feature.setUserId(userId);
        feature.setArticleModule(Boolean.TRUE);
        feature.setPlanModule(Boolean.TRUE);
        feature.setVocabularyModule(Boolean.TRUE);
        return feature;
    }

    private String getDefaultUsernameFromEmail(String email) {
        return email.substring(0, email.indexOf('@'));
    }
}
