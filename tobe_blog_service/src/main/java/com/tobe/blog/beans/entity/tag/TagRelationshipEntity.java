package com.tobe.blog.beans.entity.tag;

import com.baomidou.mybatisplus.annotation.IdType;
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
@TableName("TOBE_TAG_RELATIONSHIP")
public class TagRelationshipEntity extends BaseEntity {
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long tagId;
    private Long parentId;
    private String subjectId;
}
