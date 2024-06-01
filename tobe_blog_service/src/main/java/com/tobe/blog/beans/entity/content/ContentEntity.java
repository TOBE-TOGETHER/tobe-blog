package com.tobe.blog.beans.entity.content;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.tobe.blog.beans.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@TableName("tobe_content_info")
public class ContentEntity extends BaseEntity {
    @TableId(type = IdType.ASSIGN_UUID)
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
}
