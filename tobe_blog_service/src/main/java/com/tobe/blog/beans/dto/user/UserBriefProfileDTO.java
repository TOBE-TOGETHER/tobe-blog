package com.tobe.blog.beans.dto.user;

import lombok.Data;

@Data
public class UserBriefProfileDTO {
    protected Long id;
    protected String lastName;
    protected String firstName;
    protected String avatarUrl;
    protected String introduction;
    protected String blog;
    protected Long contentCount;
    protected Long publicContentCount;
    protected Long viewCount;
    protected Long likeCount;
}
