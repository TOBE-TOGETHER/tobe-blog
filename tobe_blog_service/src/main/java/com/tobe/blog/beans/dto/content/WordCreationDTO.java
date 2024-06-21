package com.tobe.blog.beans.dto.content;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WordCreationDTO {
    private String vocabularyId;
    private String text;
    private String meaningInChinese;
    private String meaningInEnglish;
    private String partOfSpeech;
}
