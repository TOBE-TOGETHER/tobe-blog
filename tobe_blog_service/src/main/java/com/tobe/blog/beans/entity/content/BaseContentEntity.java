package com.tobe.blog.beans.entity.content;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.tobe.blog.beans.entity.BaseEntity;
import com.tobe.blog.core.exception.TobeRuntimeException;

import io.micrometer.common.util.StringUtils;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public abstract class BaseContentEntity extends BaseEntity {
    @TableId(type = IdType.INPUT)
    protected String contentId;

    public String getTableName() {
        TableName name = this.getClass().getAnnotation(TableName.class);
        if (StringUtils.isBlank(name.value())) {
            throw new TobeRuntimeException("Entity must have a valid TableName value");
        }
        return name.value();
    }
}
