package com.tobe.blog.beans.dto.content;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContentBasicInfoDTO implements Serializable {
    protected String id;
    protected String contentType;
    protected Boolean publicToAll;
    protected Boolean banned;
} 