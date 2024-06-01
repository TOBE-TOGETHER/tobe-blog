package com.tobe.blog.beans.dto.content;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ArticleCreationDTO extends ContentCreationDTO {
    private String subTitle;
    private String content;
}
