package com.tobe.blog.beans.dto.user;

import java.sql.Timestamp;
import java.util.List;

import lombok.Data;

@Data
public class UserGeneralDTO {
    private Long id;
    private String username;
    private String lastName;
    private String firstName;
    private String phoneNum;
    private String email;
    private String address;
    private String avatarUrl;
    private String introduction;
    private String blog;
    private String profession;
    private String photoImg;
    private String backgroundImg;
    private Boolean emailVerified;
    private UserFeatureDTO features;
    private Timestamp createTime;
    private Timestamp updateTime;
    private List<String> roles;
}
