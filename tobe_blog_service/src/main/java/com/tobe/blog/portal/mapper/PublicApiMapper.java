package com.tobe.blog.portal.mapper;

import java.util.List;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.beans.dto.content.BaseContentDTO;
import com.tobe.blog.beans.dto.tag.TagInfoStatisticDTO;
import com.tobe.blog.beans.dto.user.UserBriefProfileDTO;

public interface PublicApiMapper {
    Page<BaseContentDTO> searchContents(Page<BaseContentDTO> page, String[] tags, String ownerId, String contentType);

    List<TagInfoStatisticDTO> getTagInfoStatistics(String ownerId, String contentType);

    List<UserBriefProfileDTO> getTop5ActiveUsers();
}
