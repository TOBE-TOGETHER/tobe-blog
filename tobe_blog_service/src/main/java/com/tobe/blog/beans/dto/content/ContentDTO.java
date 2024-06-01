package com.tobe.blog.beans.dto.content;

import java.sql.Timestamp;

/**
 * @author louis
 * @version 1.0
 * @date 2024/6/1 15:38
 */
public class ContentDTO {
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
