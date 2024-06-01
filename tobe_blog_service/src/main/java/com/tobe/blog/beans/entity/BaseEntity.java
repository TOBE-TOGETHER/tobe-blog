package com.tobe.blog.beans.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableLogic;
import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;

@Data
public class BaseEntity implements Serializable {

    @TableLogic
    protected Boolean deleted;
    @TableField(fill = FieldFill.INSERT)
    protected Timestamp createTime;
    @TableField(fill = FieldFill.INSERT)
    protected String createBy;
    @TableField(fill = FieldFill.INSERT_UPDATE)
    protected Timestamp updateTime;
    @TableField(fill = FieldFill.UPDATE)
    protected String updateBy;
}
