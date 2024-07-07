package com.tobe.blog.beans.entity.content;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.tobe.blog.beans.entity.BaseEntity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@TableName("TOBE_CONTENT_ADMIN")
public class ContentAdminEntity extends BaseEntity {
    @TableId(type = IdType.INPUT)
    private String contentId;
    private Boolean recommended;
    private Boolean banned;
    private String reason;
}
