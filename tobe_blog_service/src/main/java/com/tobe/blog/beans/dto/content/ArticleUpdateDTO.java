package com.tobe.blog.beans.dto.content;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class ArticleUpdateDTO extends ContentUpdateDTO {
    private String content;
    private String subTitle;
}
