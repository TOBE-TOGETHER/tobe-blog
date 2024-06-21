package com.tobe.blog.beans.dto.content;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class ArticleUpdateDTO extends BaseContentUpdateDTO {
    private String subTitle;
    private String content;
}
