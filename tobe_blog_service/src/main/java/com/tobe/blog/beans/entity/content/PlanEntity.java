package com.tobe.blog.beans.entity.content;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@TableName("tobe_plan_info")
public class PlanEntity extends BaseSubContentEntity {
    private Timestamp targetStartTime;
    private Timestamp targetEndTime;
}
