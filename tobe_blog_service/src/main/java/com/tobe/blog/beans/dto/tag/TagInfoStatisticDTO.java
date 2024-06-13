package com.tobe.blog.beans.dto.tag;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class TagInfoStatisticDTO extends TagInfoDTO {
    private int count;
}
