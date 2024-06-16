package com.tobe.blog.beans.dto.content;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class CollectionCreationDTO extends BaseContentCreationDTO {
    private String coverImgUrl;
}
