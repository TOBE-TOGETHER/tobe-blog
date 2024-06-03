package com.tobe.blog.beans.dto.content;

import java.io.Serializable;

import lombok.Data;

@Data
public class BaseContentUpdateDTO implements Serializable {
    protected String id;
    protected String description;
    protected Boolean contentProtected;
}
