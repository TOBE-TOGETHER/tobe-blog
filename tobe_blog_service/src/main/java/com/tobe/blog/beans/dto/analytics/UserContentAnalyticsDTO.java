package com.tobe.blog.beans.dto.analytics;

import lombok.Data;

@Data
public class UserContentAnalyticsDTO {
    protected long totalCount;
    protected long publicCount;
    protected long totalViewCount;
    protected long totalLikeCount;
}
