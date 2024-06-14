package com.tobe.blog.beans.entity.content;

import com.baomidou.mybatisplus.annotation.TableName;
import com.tobe.blog.beans.entity.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@TableName("tobe_plan_progress")
public class PlanProgressEntity extends BaseEntity {
    private String id;
    private String planId;
    private String description;
    private Long updaterId;
}
