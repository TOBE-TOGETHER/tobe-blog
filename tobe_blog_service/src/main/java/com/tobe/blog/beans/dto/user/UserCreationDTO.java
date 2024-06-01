package com.tobe.blog.beans.dto.user;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

@Data
public class UserCreationDTO {
    @Length(max = 32)
    private String firstName;
    @Length(max = 32)
    private String lastName;
    @Email
    @Length(max = 120)
    private String email;
    @NotNull
    @Length(min = 6, max = 20)
    private String password;
}
