package com.tobe.blog.beans.dto.content;

import java.util.Date;

import lombok.Data;

@Data
public class BaseSearchFilter {
    private String status;
    private Date createFrom;
    private Date createTo;
    private Date updateFrom;
    private Date updateTo;
    private String keyword;
}
