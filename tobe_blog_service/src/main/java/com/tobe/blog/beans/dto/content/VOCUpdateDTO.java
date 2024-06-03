package com.tobe.blog.beans.dto.content;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class VOCUpdateDTO extends BaseContentUpdateDTO {
    private String language;
}
