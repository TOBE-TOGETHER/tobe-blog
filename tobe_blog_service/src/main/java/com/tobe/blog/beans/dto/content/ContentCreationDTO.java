package com.tobe.blog.beans.dto.content;

import lombok.Data;

import java.io.Serializable;

@Data
public class ContentCreationDTO  implements Serializable {
    protected String title;
    protected String description;
    protected Boolean contentProtected;

}
