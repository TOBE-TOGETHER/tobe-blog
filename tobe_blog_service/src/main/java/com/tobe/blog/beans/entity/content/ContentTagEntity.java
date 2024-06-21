package com.tobe.blog.beans.entity.content;

import com.baomidou.mybatisplus.annotation.TableName;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
@TableName("TOBE_CONTENT_TAG")
public class ContentTagEntity {
    private String contentId;
    private Long tagId;
}
