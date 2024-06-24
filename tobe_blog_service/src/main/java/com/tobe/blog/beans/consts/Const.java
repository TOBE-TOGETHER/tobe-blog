package com.tobe.blog.beans.consts;

public class Const {
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
}
