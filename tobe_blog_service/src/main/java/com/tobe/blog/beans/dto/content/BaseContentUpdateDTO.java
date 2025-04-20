package com.tobe.blog.beans.dto.content;

import java.io.Serializable;
import java.util.List;

import com.tobe.blog.beans.consts.Const;
import com.tobe.blog.beans.dto.tag.TagInfoDTO;

import lombok.Data;

@Data
public class BaseContentUpdateDTO implements Serializable {
    protected String id;
    protected String title;
    protected String description;
    protected String coverImgUrl;
    protected Boolean contentProtected;
    protected List<TagInfoDTO> tags;
    protected Const.Topic topic;
}
