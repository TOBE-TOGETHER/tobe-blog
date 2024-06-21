package com.tobe.blog.beans.dto.content;

import lombok.Data;

@Data
public class TagRelationshipCreationDTO {
    private Long tagId;
    private Long parentId;
    private String collectionId;
}
