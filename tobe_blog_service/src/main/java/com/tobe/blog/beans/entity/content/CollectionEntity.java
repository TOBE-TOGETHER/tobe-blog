package com.tobe.blog.beans.entity.content;

import com.baomidou.mybatisplus.annotation.TableName;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@TableName("TOBE_COLLECTION_INFO")
public class CollectionEntity extends BaseContentEntity {
}
