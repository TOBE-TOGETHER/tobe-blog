package com.tobe.blog.core.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tobe.blog.beans.consts.Const;
import com.tobe.blog.beans.dto.user.UserBriefProfileDTO;
import com.tobe.blog.beans.dto.user.UserCreationDTO;
import com.tobe.blog.beans.dto.user.UserFeatureDTO;
import com.tobe.blog.beans.dto.user.UserFullProfileDTO;
import com.tobe.blog.beans.dto.user.UserGeneralDTO;
import com.tobe.blog.beans.dto.user.UserUpdateDTO;
import com.tobe.blog.beans.entity.user.UserEntity;
import com.tobe.blog.beans.entity.user.UserFeatureEntity;
import com.tobe.blog.beans.entity.user.UserRoleEntity;
import com.tobe.blog.core.exception.TobeRuntimeException;
import com.tobe.blog.core.mapper.UserMapper;
import com.tobe.blog.core.utils.BasicConverter;
import com.tobe.blog.core.utils.CacheUtil;
import com.tobe.blog.core.utils.GsonUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService extends ServiceImpl<UserMapper, UserEntity> {

    private final CacheUtil cacheUtil;
    private final UserRoleService userRoleService;
    private final UserFeatureService userFeatureService;
    private final ApplicationContext applicationContext;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserGeneralDTO getUser(long id) {
        UserEntity userEntity = this.getById(id);
        if (Objects.isNull(userEntity)) {
            log.warn("user doesn't exist, id: " + id);
            return new UserGeneralDTO();
        }
        UserGeneralDTO result = BasicConverter.convert(userEntity, UserGeneralDTO.class);
        
        // Get user roles
        List<UserRoleEntity> userRoles = userRoleService.list(
            new LambdaQueryWrapper<UserRoleEntity>().eq(UserRoleEntity::getUserId, id)
        );
        result.setRoles(userRoles.stream().map(UserRoleEntity::getRole).collect(Collectors.toList()));
        
        // Get user features
        UserFeatureDTO featureDTO = BasicConverter.convert(userFeatureService.getById(id), UserFeatureDTO.class);
        result.setFeatures(featureDTO);
        
        return result;
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
        LambdaQueryWrapper<UserEntity> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.orderByDesc(UserEntity::getCreateTime);
        
        Page<UserEntity> userPage = this.page(new Page<>(current, size), queryWrapper);
        Page<UserGeneralDTO> resultPage = new Page<>();
        
        // Convert and populate roles
        List<UserGeneralDTO> userDTOs = userPage.getRecords().stream()
            .map(user -> {
                UserGeneralDTO dto = BasicConverter.convert(user, UserGeneralDTO.class);
                // Get user roles
                List<UserRoleEntity> userRoles = userRoleService.list(
                    new LambdaQueryWrapper<UserRoleEntity>().eq(UserRoleEntity::getUserId, user.getId())
                );
                dto.setRoles(userRoles.stream().map(UserRoleEntity::getRole).collect(Collectors.toList()));
                return dto;
            })
            .collect(Collectors.toList());
        
        resultPage.setRecords(userDTOs);
        resultPage.setTotal(userPage.getTotal());
        resultPage.setCurrent(userPage.getCurrent());
        resultPage.setSize(userPage.getSize());
        resultPage.setPages(userPage.getPages());
        
        return resultPage;
    }

    public Page<UserGeneralDTO> getUsers(int current, int size, String keyword, Boolean emailVerified) {
        LambdaQueryWrapper<UserEntity> queryWrapper = new LambdaQueryWrapper<>();
        
        // Add keyword search for username, firstName, lastName, and email
        if (keyword != null && !keyword.trim().isEmpty()) {
            String searchKeyword = "%" + keyword.trim() + "%";
            queryWrapper.and(wrapper -> wrapper
                .like(UserEntity::getUsername, searchKeyword)
                .or().like(UserEntity::getFirstName, searchKeyword)
                .or().like(UserEntity::getLastName, searchKeyword)
                .or().like(UserEntity::getEmail, searchKeyword)
            );
        }
        
        // Add email verification filter
        if (emailVerified != null) {
            queryWrapper.eq(UserEntity::getEmailVerified, emailVerified);
        }
        
        // Order by create time descending (newest first)
        queryWrapper.orderByDesc(UserEntity::getCreateTime);
        
        Page<UserEntity> userPage = this.page(new Page<>(current, size), queryWrapper);
        Page<UserGeneralDTO> resultPage = new Page<>();
        
        // Convert and populate roles
        List<UserGeneralDTO> userDTOs = userPage.getRecords().stream()
            .map(user -> {
                UserGeneralDTO dto = BasicConverter.convert(user, UserGeneralDTO.class);
                // Get user roles
                List<UserRoleEntity> userRoles = userRoleService.list(
                    new LambdaQueryWrapper<UserRoleEntity>().eq(UserRoleEntity::getUserId, user.getId())
                );
                dto.setRoles(userRoles.stream().map(UserRoleEntity::getRole).collect(Collectors.toList()));
                return dto;
            })
            .collect(Collectors.toList());
        
        resultPage.setRecords(userDTOs);
        resultPage.setTotal(userPage.getTotal());
        resultPage.setCurrent(userPage.getCurrent());
        resultPage.setSize(userPage.getSize());
        resultPage.setPages(userPage.getPages());
        
        return resultPage;
    }

    @Transactional
    public UserGeneralDTO createUser(UserCreationDTO dto) {
        // verify if the same request has been submitted in last 3s
        validateRequestSubmitted(dto);

        // verify if the user already exists
        validateEmailExist(dto.getEmail());

        // insert user
        UserEntity userEntity = BasicConverter.convert(dto, UserEntity.class);
        userEntity.setUsername(getDefaultUsernameFromEmail(userEntity.getEmail()));
        userEntity.setPassword(encoder.encode(dto.getPassword()));
        userEntity.setDeleted(Boolean.FALSE);
        userEntity.setEmailVerified(Boolean.FALSE); // Set email as not verified initially
        this.save(userEntity);

        // insert default user role
        List<UserRoleEntity> defaultRoles = createDefaultRole(userEntity.getId());
        defaultRoles.forEach(x -> this.userRoleService.save(x));

        // insert default user feature setting
        userFeatureService.save(createDefaultFeature(userEntity.getId()));
        
        // Send email verification
        try {
            EmailVerificationService emailVerificationService = applicationContext.getBean(EmailVerificationService.class);
            emailVerificationService.sendVerificationEmail(userEntity.getEmail(), userEntity.getFirstName());
        } catch (Exception e) {
            log.error("Failed to send verification email during user registration for email: {}", 
                userEntity.getEmail(), e);
            // Don't fail the registration if email sending fails
        }
        
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
        UserGeneralDTO result = BasicConverter.convert(oriUserEntity, UserGeneralDTO.class);
        UserFeatureDTO featureDTO = updateFeature(dto.getFeatures(), dto.getId());
        result.setFeatures(featureDTO);
        return result;
    }

    @Transactional
    public void deleteUser(long id) {
        this.removeById(id);
    }

    @Transactional
    public UserGeneralDTO updateUserRoles(long userId, List<String> roles) {
        // Remove existing roles for the user
        userRoleService.remove(new LambdaQueryWrapper<UserRoleEntity>().eq(UserRoleEntity::getUserId, userId));
        
        // Add new roles
        roles.forEach(role -> {
            UserRoleEntity userRole = new UserRoleEntity(role, userId);
            userRoleService.save(userRole);
        });
        
        // Return updated user information
        return getUser(userId);
    }

    private List<UserRoleEntity> createDefaultRole(Long userId) {
        return List.of(
                new UserRoleEntity(Const.Role.BASIC.getValue(), userId));
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

    private void validateRequestSubmitted(UserCreationDTO dto) {
        String payload = GsonUtil.toJson(dto);
        if (cacheUtil.getExpireTime(payload) > 0) {
            throw new TobeRuntimeException("The request has been submitted, please don't repeatly submit.");
        }
        cacheUtil.set(payload, null, 3);
    }

    private void validateEmailExist(String email) {
        boolean emailExist = this.getOneOpt(
                new LambdaQueryWrapper<UserEntity>().eq(UserEntity::getEmail, email))
                .isPresent();
        if (emailExist) {
            throw new TobeRuntimeException("The email has been registered, please login directly.");
        }
    }

    private UserFeatureDTO updateFeature(UserFeatureDTO dto, Long userId) {
        UserFeatureEntity featureEntity = new UserFeatureEntity();
        BeanUtils.copyProperties(dto, featureEntity);
        featureEntity.setUserId(userId);
        userFeatureService.saveOrUpdate(featureEntity);
        return userFeatureService
                .getOneOpt(new LambdaQueryWrapper<UserFeatureEntity>().eq(UserFeatureEntity::getUserId, userId))
                .map(e -> BasicConverter.convert(e, UserFeatureDTO.class)).orElse(null);
    }

    /**
     * Checks if an email is registered in the system
     *
     * @param email The email to check
     * @return true if the email is registered, false otherwise
     */
    public boolean isEmailRegistered(String email) {
        return this.getOneOpt(
                new LambdaQueryWrapper<UserEntity>().eq(UserEntity::getEmail, email))
                .isPresent();
    }

    /**
     * Gets a firstname by email
     *
     * @param email The user's email
     * @return The firstname associated with the email, or null if not found
     */
    public String getFirstNameByEmail(String email) {
        return this.getOneOpt(
                new LambdaQueryWrapper<UserEntity>().eq(UserEntity::getEmail, email))
                .map(UserEntity::getFirstName)
                .orElse(null);
    }

    /**
     * Updates a user's password
     *
     * @param email The user's email
     * @param newPassword The new password
     * @return true if the password was updated successfully, false otherwise
     */
    @Transactional
    public boolean updatePassword(String email, String newPassword) {
        try {
            // Find the user by email
            Optional<UserEntity> userOpt = this.getOneOpt(
                    new LambdaQueryWrapper<UserEntity>().eq(UserEntity::getEmail, email));
            
            if (userOpt.isEmpty()) {
                log.warn("Failed to update password: user with email {} not found", email);
                return false;
            }
            
            // Update the password
            UserEntity userEntity = userOpt.get();
            userEntity.setPassword(encoder.encode(newPassword));
            boolean updated = this.updateById(userEntity);
            
            if (updated) {
                log.info("Password updated successfully for user with email: {}", email);
            } else {
                log.warn("Failed to update password for user with email: {}", email);
            }
            
            return updated;
        } catch (Exception e) {
            log.error("Error updating password for user with email: {}", email, e);
            return false;
        }
    }
}
