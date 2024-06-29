package com.tobe.blog.portal.mapper;

import java.util.List;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.beans.dto.content.BaseContentDTO;
import com.tobe.blog.beans.dto.tag.TagInfoStatisticDTO;
import com.tobe.blog.beans.dto.user.UserBriefProfileDTO;

public interface PublicApiMapper {
    Page<BaseContentDTO> searchContents(Page<BaseContentDTO> page, String[] tags, Long ownerId, String contentType);

    List<TagInfoStatisticDTO> getTagInfoStatistics(Long ownerId, String contentType);

    List<UserBriefProfileDTO> getTop5ActiveUsers();
}
