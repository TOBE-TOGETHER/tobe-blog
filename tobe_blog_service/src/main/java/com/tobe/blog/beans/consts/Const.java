package com.tobe.blog.beans.consts;

public class Const {

    public static final String CONTENT_VIEW_COUNT_KEY = "CONTENT_VIEW_COUNT";

    public static final String CONTENT_LIKE_COUNT_KEY = "CONTENT_LIKE_COUNT";

    public static class Role {
        public static final String ADMIN = "ROLE_ADMIN";
        public static final String BASIC = "ROLE_BASIC";
    }

    public static enum ContentType {
        ARTICLE,
        PLAN,
        VOCABULARY,
        COLLECTION
    }

    public static enum ContentStatus {
        DRFAT,
        PUBLISHED
    }

    public static enum Visibility {
        PUBLIC,
        PRIVATE
    }

    public static enum Topic {
        READING,
        LANGUAGE,
        TECHNICAL,
        LIFE,
        OTHER
    }
}
