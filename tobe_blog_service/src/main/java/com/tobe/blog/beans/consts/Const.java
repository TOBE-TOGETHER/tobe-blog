package com.tobe.blog.beans.consts;

public class Const {

    public static final String CONTENT_VIEW_COUNT_KEY = "CONTENT_VIEW_COUNT";

    public static final String CONTENT_LIKE_COUNT_KEY = "CONTENT_LIKE_COUNT";

    public static enum Role {
        BASIC("ROLE_BASIC"),
        ADMIN("ROLE_ADMIN");

        private final String value;

        Role(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
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

    public enum NotificationType {
        CONTENT_RECOMMENDED("CONTENT_RECOMMENDED"),
        CONTENT_BANNED("CONTENT_BANNED"),
        CONTENT_COMMENTED("CONTENT_COMMENTED"),
        COMMENT_REPLIED("COMMENT_REPLIED"),
        COMMENT_DELETED("COMMENT_DELETED"),
        REPLY_DELETED("REPLY_DELETED"),
        SYSTEM_ANNOUNCEMENT("SYSTEM_ANNOUNCEMENT");

        private final String value;

        NotificationType(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }
}
