package com.tobe.blog.beans.entity.content;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.tobe.blog.beans.entity.BaseEntity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public abstract class BaseSubContentEntity extends BaseEntity {
    @TableId(type = IdType.INPUT)
    protected String contentId;
}
