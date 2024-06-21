package com.tobe.blog.beans.dto.content;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class CollectionUpdateDTO extends BaseContentUpdateDTO {
    private String coverImgUrl;
}
