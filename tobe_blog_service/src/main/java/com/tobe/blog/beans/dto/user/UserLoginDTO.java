package com.tobe.blog.beans.dto.user;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class UserLoginDTO {
    @Length(max = 120)
    private String username;
    @Length(max = 8)
    private String password;
}
