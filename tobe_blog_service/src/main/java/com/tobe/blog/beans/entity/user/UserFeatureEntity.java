package com.tobe.blog.beans.entity.user;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.tobe.blog.beans.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
@TableName("TOBE_CORE_USER_FEATURE")
public class UserFeatureEntity extends BaseEntity {
    @TableId
    private Long userId;
    private Boolean articleModule;
    private Boolean planModule;
    private Boolean vocabularyModule;
}
