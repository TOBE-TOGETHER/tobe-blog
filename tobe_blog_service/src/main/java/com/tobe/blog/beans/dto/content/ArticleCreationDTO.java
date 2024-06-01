package com.tobe.blog.beans.dto.content;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleCreationDTO extends ContentCreationDTO{
    private String subTitle;
    private String content;
}
