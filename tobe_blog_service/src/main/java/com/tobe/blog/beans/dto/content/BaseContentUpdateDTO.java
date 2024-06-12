package com.tobe.blog.beans.dto.content;

import java.io.Serializable;
import java.util.List;

import com.tobe.blog.beans.dto.tag.TagInfoGeneralDTO;

import lombok.Data;

@Data
public class BaseContentUpdateDTO implements Serializable {
    protected String id;
    protected String description;
    protected Boolean contentProtected;
    protected List<TagInfoGeneralDTO> tags;
}
