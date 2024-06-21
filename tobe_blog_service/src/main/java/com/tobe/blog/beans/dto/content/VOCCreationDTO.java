package com.tobe.blog.beans.dto.content;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class VOCCreationDTO extends BaseContentCreationDTO {
    private String language;
}
