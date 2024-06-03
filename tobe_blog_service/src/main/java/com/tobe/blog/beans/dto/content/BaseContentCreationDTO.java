package com.tobe.blog.beans.dto.content;

import java.io.Serializable;

import lombok.Data;

@Data
public class BaseContentCreationDTO implements Serializable {
    protected String title;
    protected String description;
    protected Boolean contentProtected;
}
