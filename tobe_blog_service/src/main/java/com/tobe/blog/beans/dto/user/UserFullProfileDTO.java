package com.tobe.blog.beans.dto.user;

import lombok.Data;

@Data
public class UserFullProfileDTO extends UserBriefProfileDTO {
    private String profession;
    private String address;
    private String photoImg;
    private String backgroundImg;
    private UserFeatureDTO features;
}
