package com.tobe.blog.beans.dto.user;

import lombok.Data;

@Data
public class UserFullProfileDTO extends UserBriefProfileDTO {
    private String position;
    private String address;
    private String photoImg;
    private String backgroundImg;
    private UserFeatureDTO features;
}
