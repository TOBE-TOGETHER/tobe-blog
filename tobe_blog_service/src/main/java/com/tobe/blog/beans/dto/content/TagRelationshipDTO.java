package com.tobe.blog.beans.dto.content;

import java.util.List;

import lombok.Data;

@Data
public class TagRelationshipDTO {
    private Long id;
    private Long parentId;
    private Long tagId;
    private String label;
    private String collectionId;
    private List<TagRelationshipDTO> children;
    private List<BaseContentDTO> relatedContents;
}
