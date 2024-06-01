package com.tobe.blog.beans.dto.user;

import org.hibernate.validator.constraints.Length;

import lombok.Data;

@Data
public class UserLoginDTO {
    @Length(max = 120)
    private String username;
    @Length(max = 8)
    private String password;
}
