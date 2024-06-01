package com.tobe.blog.beans.entity.content;

import com.baomidou.mybatisplus.annotation.TableName;
import com.tobe.blog.beans.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("tobe_plan_info")
public class PlanEntity extends BaseEntity {
    private Timestamp targetStartTime;
    private Timestamp targetEndTime;
}
