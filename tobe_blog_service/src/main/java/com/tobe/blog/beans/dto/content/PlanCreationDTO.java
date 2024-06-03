package com.tobe.blog.beans.dto.content;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class PlanCreationDTO extends BaseContentCreationDTO {
    private Timestamp targetStartTime;
    private Timestamp targetEndTime;
}
