package com.tobe.blog.beans.dto.content;

import java.util.Date;

import com.tobe.blog.beans.consts.Const;

import lombok.Data;

@Data
public class BaseSearchFilter {
    private String status;
    private Date createFrom;
    private Date createTo;
    private Date updateFrom;
    private Date updateTo;
    private String[] tags;
    private String keyword;
    private Const.Topic topic;
}
