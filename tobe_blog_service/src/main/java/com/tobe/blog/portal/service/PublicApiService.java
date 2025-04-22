package com.tobe.blog.portal.service;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.beans.consts.Const;
import com.tobe.blog.beans.dto.content.BaseContentDTO;
import com.tobe.blog.beans.dto.tag.TagInfoStatisticDTO;
import com.tobe.blog.beans.dto.user.UserBriefProfileDTO;
import com.tobe.blog.core.utils.CacheUtil;
import com.tobe.blog.portal.mapper.PublicApiMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PublicApiService {

    private final PublicApiMapper apiMapper;
    private final CacheUtil cacheUtil;
    private static final String LIKE_COUNT_UNI_KEY = "LIKE_COUNT_UNI_KEY";

    /**
     * The core search method for the portal home page to display users' contents
     * @param current: page number
     * @param size: page size
     * @param tags: tag Ids in array, ignore the filter when array is empty
     * @param ownerId: ignore the filter when not given
     * @param contentType: ARTICLE, PLAN, VOCABULARY or COLLECTION
     * @return A page of user contents of given ownerId and contentType
     */
    public Page<BaseContentDTO> searchContents(int current, int size, String[] tags, Long ownerId, String contentType, Const.Topic topic, String keyword) {
        return this.apiMapper.searchContents(new Page<>(current, size), tags, ownerId, contentType, topic, keyword);
    }

    public Boolean likeContent(String ip, String contentId) {
        final String key = String.format("%s:%s:%s", LIKE_COUNT_UNI_KEY, ip, contentId);
        if (cacheUtil.hasKey(key)) {
            return Boolean.FALSE;
        }
        cacheUtil.hIncr(Const.CONTENT_LIKE_COUNT_KEY, contentId, 1L);
        cacheUtil.set(key, null, TimeUnit.MINUTES.toSeconds(5L));
        return Boolean.TRUE;
    }

    public List<TagInfoStatisticDTO> getTagInfoStatistics(Long ownerId, String contentType, Const.Topic topic, String keyword) {
        return apiMapper.getTagInfoStatistics(ownerId, contentType, topic, keyword);
    }

    public List<UserBriefProfileDTO> getTop5ActiveUsers() {
        return apiMapper.getTop5ActiveUsers();
    }
  
}
