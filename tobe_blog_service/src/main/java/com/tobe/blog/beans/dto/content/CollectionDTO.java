package com.tobe.blog.beans.dto.content;

import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class CollectionDTO extends BaseContentDTO {
    private String coverImgUrl;
    private List<TagRelationshipDTO> tagTree;
}
