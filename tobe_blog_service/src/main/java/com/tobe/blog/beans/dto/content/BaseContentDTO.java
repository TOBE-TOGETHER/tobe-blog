package com.tobe.blog.beans.dto.content;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

import com.tobe.blog.beans.consts.Const;
import com.tobe.blog.beans.dto.tag.TagInfoDTO;

import lombok.Data;

@Data
public class BaseContentDTO implements Serializable {
    protected String id;
    protected String title;
    protected String description;
    protected String coverImgUrl;
    // manipulate if the content can be viewed by others
    protected Boolean publicToAll;
    protected Timestamp publishTime;
    protected Long viewCount;
    protected Long likeCount;
    // owner related info
    protected Long ownerId;
    protected String ownerName;
    protected String avatarUrl;
    protected String contentType;
    // manipulate if the content require login to view
    protected Boolean contentProtected;
    protected List<TagInfoDTO> tags;
    protected Const.Topic topic;
    protected Timestamp createTime;
    protected Timestamp updateTime;
    protected Boolean banned;
    protected Boolean recommended;
    protected String reason;
}
