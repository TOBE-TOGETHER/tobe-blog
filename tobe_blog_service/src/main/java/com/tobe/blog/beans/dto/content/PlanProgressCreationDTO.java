package com.tobe.blog.beans.dto.content;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlanProgressCreationDTO {
    private String planId;
    private String description;
}
