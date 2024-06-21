package com.tobe.blog.beans.dto.content;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class ArticleDTO extends BaseContentDTO {
    private String subTitle;
    private String content;
}
