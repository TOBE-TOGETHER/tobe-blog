package com.tobe.blog.beans.dto.tag;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TagInfoGeneralDTO {
    protected Long value;
    protected String label;
}
