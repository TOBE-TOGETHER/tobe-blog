package com.tobe.blog.analytics.service;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.tobe.blog.beans.dto.analytics.UserContentAnalyticsDTO;
import com.tobe.blog.beans.entity.content.ContentGeneralInfoEntity;
import com.tobe.blog.content.service.impl.ContentGeneralInfoService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final ContentGeneralInfoService generalInfoService;

    public UserContentAnalyticsDTO getOverallResult(Long userId) {
        final UserContentAnalyticsDTO result = new UserContentAnalyticsDTO();
        generalInfoService.list(new LambdaQueryWrapper<ContentGeneralInfoEntity>()
          .eq(ContentGeneralInfoEntity::getOwnerId, userId)).stream()
          .forEach(c -> statistics(c, result));
        return result;
    }
  
    public UserContentAnalyticsDTO getResult(String contentType, Long userId) {
        final UserContentAnalyticsDTO result = new UserContentAnalyticsDTO();
        generalInfoService.list(new LambdaQueryWrapper<ContentGeneralInfoEntity>()
          .eq(ContentGeneralInfoEntity::getOwnerId, userId)
          .eq(ContentGeneralInfoEntity::getContentType, contentType)).stream()
          .forEach(c -> statistics(c, result));
        return result;
    }

    private void statistics(ContentGeneralInfoEntity content, UserContentAnalyticsDTO result) {
        result.setTotalCount(result.getTotalCount() + 1);
        result.setTotalLikeCount(result.getTotalLikeCount() + content.getLikeCount());
        result.setTotalViewCount(result.getTotalViewCount() + content.getViewCount());
        if (content.getPublicToAll()) {
            result.setPublicCount(result.getPublicCount() + 1);
        }
    }

}
