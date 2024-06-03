package com.tobe.blog.beans.dto.content;

import java.sql.Timestamp;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class PlanDTO extends BaseContentDTO {
    private Timestamp targetStartTime;
    private Timestamp targetEndTime;
}
