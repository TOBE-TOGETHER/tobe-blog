package com.tobe.blog.beans.dto.content;

import java.io.Serializable;
import java.util.List;

import com.tobe.blog.beans.dto.tag.TagInfoDTO;

import lombok.Data;

@Data
public class BaseContentCreationDTO implements Serializable {
    protected String title;
    protected String description;
    protected Boolean contentProtected;
    protected List<TagInfoDTO> tags;
}
