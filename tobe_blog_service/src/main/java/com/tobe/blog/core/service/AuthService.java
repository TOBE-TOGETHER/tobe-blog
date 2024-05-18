package com.tobe.blog.core.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.tobe.blog.beans.dto.user.UserFeatureDTO;
import com.tobe.blog.core.utils.BasicConverter;
import com.tobe.blog.beans.dto.user.EnhancedUserDetail;
import com.tobe.blog.beans.dto.user.UserGeneralDTO;
import com.tobe.blog.beans.dto.user.UserLoginDTO;
import com.tobe.blog.beans.entity.user.UserEntity;
import com.tobe.blog.beans.entity.user.UserRoleEntity;
import com.tobe.blog.core.utils.TokenUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {

    private final UserService userService;
    private final UserRoleService userRoleService;
    private final UserFeatureService userFeatureService;
    private final TokenUtil tokenUtil;

    public EnhancedUserDetail login(UserLoginDTO dto) {
        final EnhancedUserDetail userDetails = (EnhancedUserDetail) loadUserByUsername(dto.getUsername());
        final String accessToken = tokenUtil.createAccessToken(userDetails);
        final String refreshToken = tokenUtil.createRefreshToken(userDetails);
        userDetails.setAccessToken(accessToken);
        userDetails.setRefreshToken(refreshToken);
        return userDetails;
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        final UserEntity userEntity = this.userService.getOne(new LambdaQueryWrapper<UserEntity>()
                .eq(UserEntity::getUsername, userName)
                .or().eq(UserEntity::getEmail, userName)
                .or().eq(UserEntity::getPhoneNum, userName));
        if (userEntity == null) {
            log.info("Invalid user name, please confirm again!", userName);
            throw new UsernameNotFoundException("Invalid user name[ " + userName + " ], please confirm again!");
        }
        final UserGeneralDTO profile = BasicConverter.convert(userEntity, UserGeneralDTO.class);
        profile.setFeatures(BasicConverter.convert(userFeatureService.getById(profile.getId()), UserFeatureDTO.class));
        return new EnhancedUserDetail(getAuthority(userEntity.getId()), userEntity.getUsername(),
                userEntity.getPassword(), profile);
    }

    private List<SimpleGrantedAuthority> getAuthority(long id) {
        final List<UserRoleEntity> roles = userRoleService
                .list(new LambdaQueryWrapper<UserRoleEntity>().eq(UserRoleEntity::getUserId, id));
        return roles.stream().map(r -> new SimpleGrantedAuthority(r.getRole())).collect(Collectors.toList());
    }

    private UserFeatureDTO getUserFeature(long id) {
        return UserFeatureDTO.convert(userFeatureService.getById(id));
    }
}