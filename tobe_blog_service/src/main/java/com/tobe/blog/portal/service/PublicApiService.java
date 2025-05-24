package com.tobe.blog.portal.service;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.beans.consts.Const;
import com.tobe.blog.beans.dto.content.BaseContentDTO;
import com.tobe.blog.beans.dto.tag.TagInfoStatisticDTO;
import com.tobe.blog.core.utils.CacheUtil;
import com.tobe.blog.portal.mapper.PublicApiMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Slf4j
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

    /**
     * Like a content
     * @param ip The IP address of the user
     * @param contentId The ID of the content to like
     * @return true if the content was liked, false otherwise
     */
    public Boolean likeContent(String ip, String contentId) {
        final String key = String.format("%s:%s:%s", LIKE_COUNT_UNI_KEY, ip, contentId);
        if (cacheUtil.hasKey(key)) {
            return Boolean.FALSE;
        }
        cacheUtil.hIncr(Const.CONTENT_LIKE_COUNT_KEY, contentId, 1L);
        cacheUtil.set(key, null, TimeUnit.MINUTES.toSeconds(5L));
        return Boolean.TRUE;
    }

    /**
     * Get tag info statistics
     * @param ownerId The ID of the owner
     * @param contentType The type of content
     * @param topic The topic of the content
     * @param keyword The keyword to search for
     * @return A list of tag info statistics
     */
    public List<TagInfoStatisticDTO> getTagInfoStatistics(Long ownerId, String contentType, Const.Topic topic, String keyword) {
        return apiMapper.getTagInfoStatistics(ownerId, contentType, topic, keyword);
    }

}
