package com.tobe.blog.beans.entity.user;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.tobe.blog.beans.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
@TableName("TOBE_CORE_USER")
public class UserEntity extends BaseEntity {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String lastName;
    private String firstName;
    private String phoneNum;
    private String email;
    private String address;
    private String username;
    private String password;
    private String avatarUrl;
    private String introduction;
    private String blog;
    // to overwrite the super createBy that annotated by auto-filled
    private String createBy = "New Created";
    private String photoImg;
    private String backgroundImg;
    private String position;
}
