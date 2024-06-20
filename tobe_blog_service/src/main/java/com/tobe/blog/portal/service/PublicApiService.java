package com.tobe.blog.portal.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.beans.dto.content.BaseContentDTO;
import com.tobe.blog.beans.dto.tag.TagInfoStatisticDTO;
import com.tobe.blog.beans.dto.user.UserBriefProfileDTO;
import com.tobe.blog.portal.mapper.PublicApiMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PublicApiService {

    private final PublicApiMapper apiMapper;

    /**
     * The core search method for the portal home page to display users' contents
     * @param current: page number
     * @param size: page size
     * @param tags: tag Ids in array, ignore the filter when array is empty
     * @param ownerId: ignore the filter when not given
     * @param contentType: ARTICLE, PLAN, VOCABULARY or COLLECTION
     * @return A page of user contents of given ownerId and contentType
     */
    public Page<BaseContentDTO> searchContents(int current, int size, String[] tags, String ownerId, String contentType) {
        return this.apiMapper.searchContents(new Page<>(current, size), tags, ownerId, contentType);
    }

    public List<TagInfoStatisticDTO> getTagInfoStatistics(String ownerId, String contentType) {
        return apiMapper.getTagInfoStatistics(ownerId, contentType);
    }

    public List<UserBriefProfileDTO> getTop5ActiveUsers() {
        return apiMapper.getTop5ActiveUsers();
    }
  
}
