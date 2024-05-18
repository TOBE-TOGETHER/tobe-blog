package com.tobe.blog.beans.dto.user;

import com.tobe.blog.beans.entity.user.UserFeatureEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserFeatureDTO {
    private Boolean articleModule;
    private Boolean projectModule;
    private Boolean vocabularyModule;

    public static UserFeatureDTO convert(UserFeatureEntity entity) {
        if (entity == null) {
            return null;
        }
        return new UserFeatureDTO(entity.getArticleModule(), entity.getPlanModule(), entity.getVocabularyModule());
    }
}


