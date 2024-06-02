package com.tobe.blog.beans.entity.content;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@TableName("tobe_article_info")
public class ArticleEntity extends BaseSubContentEntity {
    private String subTitle;
    private String content;
}
