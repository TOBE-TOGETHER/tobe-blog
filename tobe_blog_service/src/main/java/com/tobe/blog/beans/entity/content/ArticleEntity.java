package com.tobe.blog.beans.entity.content;

import com.baomidou.mybatisplus.annotation.TableName;
import com.tobe.blog.beans.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("tobe_article_info")
public class ArticleEntity extends BaseEntity {
    private String subTitle;
    private String content;
}
