package com.tobe.blog.beans.dto.content;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WordDTO {
    private Long id;
    private String vocabularyId;
    private String text;
    private String meaningInChinese;
    private String meaningInEnglish;
    private String partOfSpeech;
    protected Timestamp createTime;
    protected Timestamp updateTime;
}
