package com.tobe.blog.beans.dto.content;

import java.io.Serializable;
import java.sql.Timestamp;

import lombok.Data;

@Data
public class ContentDTO implements Serializable {
    protected String id;
    protected String title;
    protected String description;
    // manipulate if the content can be viewed by others
    protected Boolean publicToAll;
    protected Timestamp publishTime;
    protected Long viewCount;
    protected Long likeCount;
    protected Long ownerId;
    protected String contentType;
    // manipulate if the content require login to view
    protected Boolean contentProtected;

    protected Timestamp createTime;
    protected Timestamp updateTime;

}
