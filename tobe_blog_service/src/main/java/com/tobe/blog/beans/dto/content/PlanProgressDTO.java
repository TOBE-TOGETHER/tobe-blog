package com.tobe.blog.beans.dto.content;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlanProgressDTO {
    private String id;
    private String planId;
    private String description;
    private Long updaterId;
    private String updaterName;
    private String avatarUrl;
    private Timestamp createTime;
    private Timestamp updateTime;
}
