DROP TABLE IF EXISTS  tobe_core_user;
CREATE TABLE `tobe_core_user`
(
    `ID`             bigint NOT NULL AUTO_INCREMENT,
    `USERNAME`       varchar(64)   DEFAULT NULL,
    `PASSWORD`       varchar(64)   DEFAULT NULL,
    `PHONE_NUM`      varchar(20)   DEFAULT NULL,
    `EMAIL`          varchar(120)  DEFAULT NULL,
    `LAST_NAME`      varchar(32)   DEFAULT NULL,
    `FIRST_NAME`     varchar(32)   DEFAULT NULL,
    `ADDRESS`        varchar(120)  DEFAULT NULL,
    `AVATAR_URL`     varchar(2000) DEFAULT NULL,
    `INTRODUCTION`   varchar(1000) DEFAULT NULL,
    `BLOG`           varchar(200)  DEFAULT NULL,
    `BACKGROUND_IMG` varchar(2000) DEFAULT NULL,
    `PHOTO_IMG`      varchar(2000) DEFAULT NULL,
    `PROFESSION`     varchar(100)  DEFAULT NULL,
    `EMAIL_VERIFIED` bit(1)        DEFAULT FALSE,
    `CREATE_TIME`    datetime      DEFAULT NULL,
    `CREATE_BY`      varchar(30)   DEFAULT NULL,
    `UPDATE_TIME`    datetime      DEFAULT NULL,
    `UPDATE_BY`      varchar(30)   DEFAULT NULL,
    `DELETED`        bit(1)        DEFAULT FALSE,
    PRIMARY KEY (`ID`),
    UNIQUE KEY `tobe_core_user_ID_uindex` (`ID`),
    UNIQUE KEY `tobe_core_user_EMAIL_uindex` (`EMAIL`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 10
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci
;

DROP TABLE IF EXISTS tobe_core_user_feature;
CREATE TABLE `tobe_core_user_feature`
(
    `USER_ID`           bigint NOT NULL,
    `ARTICLE_MODULE`    bit(1)      DEFAULT TRUE,
    `PLAN_MODULE`       bit(1)      DEFAULT TRUE,
    `VOCABULARY_MODULE` bit(1)      DEFAULT TRUE,
    `COLLECTION_MODULE` bit(1)      DEFAULT TRUE,
    `CREATE_TIME`       datetime    DEFAULT NULL,
    `CREATE_BY`         varchar(30) DEFAULT NULL,
    `UPDATE_TIME`       datetime    DEFAULT NULL,
    `UPDATE_BY`         varchar(30) DEFAULT NULL,
    `DELETED`           bit(1)      DEFAULT FALSE,
    PRIMARY KEY (`USER_ID`),
    UNIQUE KEY `tobe_core_user_feature_USER_ID_uindex` (`USER_ID`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci
;

DROP TABLE IF EXISTS tobe_core_user_role;
CREATE TABLE `tobe_core_user_role`
(
    `ID`          int NOT NULL AUTO_INCREMENT,
    `ROLE`        varchar(30) DEFAULT NULL,
    `USER_ID`     int NOT NULL,
    `MODULE`      varchar(20) DEFAULT NULL,
    `CREATE_TIME` datetime    DEFAULT NULL,
    `CREATE_BY`   varchar(30) DEFAULT NULL,
    `UPDATE_TIME` datetime    DEFAULT NULL,
    `UPDATE_BY`   varchar(30) DEFAULT NULL,
    `DELETED`     bit(1)      DEFAULT FALSE,
    PRIMARY KEY (`ID`),
    UNIQUE KEY `tobe_core_user_role_ID_uindex` (`ID`),
    KEY `tobe_core_user_role_USER_ID_index` (`USER_ID`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 40
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS tobe_content_general_info;
-- base content info
create table tobe_content_general_info
(
    ID                varchar(32)                              not null
        primary key,
    TITLE             varchar(128) collate utf8mb4_unicode_ci  not null,
    DESCRIPTION       varchar(1000) collate utf8mb4_unicode_ci null,
    COVER_IMG_URL     varchar(2000) collate utf8mb4_unicode_ci null,
    CONTENT_TYPE      varchar(20)                              not null,
    OWNER_ID          int                                      not null,
    LIKE_COUNT        int default 0                            not null,
    VIEW_COUNT        int default 0                            not null,
    PUBLIC_TO_ALL     bit default false                        not null,
    PUBLISH_TIME      datetime                                 null,
    CONTENT_PROTECTED bit default false                        not null,
    TOPIC             varchar(32)                              null,
    DELETED           bit default false                        not null,
    CREATE_BY         varchar(64)                              null,
    CREATE_TIME       datetime                                 null,
    UPDATE_BY         varchar(64)                              null,
    UPDATE_TIME       datetime                                 null
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS tobe_content_admin;
-- user content admin table 
create table tobe_content_admin
(
    CONTENT_ID                varchar(32)                      not null
        primary key,
    RECOMMENDED       bit default false                        not null,
    BANNED            bit default false                        not null,
    REASON            varchar(200)                             null,
    DELETED           bit default false                        not null,
    CREATE_BY         varchar(64)                              null,
    CREATE_TIME       datetime                                 null,
    UPDATE_BY         varchar(64)                              null,
    UPDATE_TIME       datetime                                 null
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS tobe_article_info;
-- base article info
create table tobe_article_info
(
    CONTENT_ID  varchar(32)                             not null
        primary key,
    SUB_TITLE   varchar(128) collate utf8mb4_unicode_ci null,
    CONTENT     longtext collate utf8mb4_unicode_ci     null,
    DELETED     bit default false                       not null,
    CREATE_BY   varchar(64)                             null,
    CREATE_TIME datetime                                null,
    UPDATE_BY   varchar(64)                             null,
    UPDATE_TIME datetime                                null
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS tobe_plan_info;
-- base plan info
create table tobe_plan_info
(
    CONTENT_ID        varchar(32)       not null
        primary key,
    TARGET_START_TIME datetime          null,
    TARGET_END_TIME   datetime          null,
    DELETED           bit default false not null,
    CREATE_BY         varchar(64)       null,
    CREATE_TIME       datetime          null,
    UPDATE_BY         varchar(64)       null,
    UPDATE_TIME       datetime          null
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS tobe_plan_progress;
-- plan progress
create table tobe_plan_progress
(
    ID          varchar(32)      not null
        primary key,
    PLAN_ID  varchar(32)       not null,
    DESCRIPTION varchar(1000)    null,
    UPDATER_ID  int              not null,
    DELETED     bit default FALSE not null,
    CREATE_BY   varchar(64)      null,
    CREATE_TIME datetime         null,
    UPDATE_BY   varchar(64)      null,
    UPDATE_TIME datetime         null
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS tobe_collection_info;
CREATE TABLE tobe_collection_info 
(
    CONTENT_ID varchar(32) NOT NULL PRIMARY KEY,
    DELETED bit(1) NOT NULL DEFAULT false,
    CREATE_BY varchar(64) DEFAULT NULL,
    CREATE_TIME datetime DEFAULT NULL,
    UPDATE_BY varchar(64) DEFAULT NULL,
    UPDATE_TIME datetime DEFAULT NULL
) ENGINE = InnoDB 
  DEFAULT CHARSET = utf8mb4 
  COLLATE = utf8mb4_0900_ai_ci; 

DROP TABLE IF EXISTS tobe_vocabulary_info;
-- base vocabulary info
create table tobe_vocabulary_info
(
    CONTENT_ID    varchar(32)       not null
        primary key,
    LANGUAGE      varchar(32)       not null,
    LANGUAGE_FLAG varchar(255),
    DELETED       bit default false not null,
    CREATE_BY     varchar(64)       null,
    CREATE_TIME   datetime          null,
    UPDATE_BY     varchar(64)       null,
    UPDATE_TIME   datetime          null
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS tobe_word_info;
create table tobe_word_info (
  ID            int auto_increment 
      primary key,
  VOCABULARY_ID varchar(32) not null,
  TEXT varchar(200)         not null,
  MEANING_IN_CHINESE varchar(2000) null,
  MEANING_IN_ENGLISH varchar(2000) null,
  PART_OF_SPEECH varchar(32) null,
  DELETED bit(1) not null DEFAULT false,
  CREATE_BY varchar(64) null,
  CREATE_TIME datetime null,
  UPDATE_BY varchar(64) null,
  UPDATE_TIME datetime null
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE = utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS tobe_tag_info;
create table tobe_tag_info
(
    ID          int auto_increment
        primary key,
    KEYWORD     varchar(32)       not null,
    DELETED     bit default false not null,
    CREATE_BY   varchar(64)       null,
    CREATE_TIME datetime          null,
    UPDATE_BY   varchar(64)       null,
    UPDATE_TIME datetime          null
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS tobe_tag_relationship;
create table tobe_tag_relationship
(
    ID          int auto_increment
        primary key,
    TAG_ID      int               not null,
    PARENT_ID   int               null,
    COLLECTION_ID  varchar(32)       not null,
    DELETED     bit default false null,
    CREATE_BY   varchar(64)       null,
    CREATE_TIME datetime          null,
    UPDATE_BY   varchar(64)       null,
    UPDATE_TIME datetime          null
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS tobe_content_tag;
create table tobe_content_tag
(
    CONTENT_ID  varchar(32)       not null,
    TAG_ID      int               not null
);

ALTER TABLE `tobe_content_general_info` ADD INDEX (`TOPIC`);

CREATE TABLE IF NOT EXISTS `tobe_comment` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'Primary key',
    `content_id` VARCHAR(255) NOT NULL COMMENT 'Content ID that this comment belongs to',
    `content_type` VARCHAR(50) NOT NULL COMMENT 'Content type (ARTICLE, PLAN, VOCABULARY, etc.)',
    `content` TEXT NOT NULL COMMENT 'Comment content',
    `user_id` BIGINT(20) NOT NULL COMMENT 'User ID who created this comment',
    `user_name` VARCHAR(255) NOT NULL COMMENT 'User name who created this comment',
    `user_avatar_url` VARCHAR(500) COMMENT 'User avatar URL',
    `parent_id` BIGINT(20) COMMENT 'Parent comment ID for nested comments',
    `like_count` INT(11) NOT NULL DEFAULT 0 COMMENT 'Number of likes for this comment',
    `deleted` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'Whether this comment is deleted (soft delete)',
    `ip_address` VARCHAR(50) COMMENT 'IP address of the commenter',
    `create_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT 'Create time',
    `update_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT 'Update time',
    PRIMARY KEY (`id`),
    INDEX `idx_content` (`content_id`, `content_type`),
    INDEX `idx_user_id` (`user_id`),
    INDEX `idx_parent_id` (`parent_id`),
    INDEX `idx_create_time` (`create_time`),
    INDEX `idx_is_deleted` (`deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Comment table'; 

-- Add reply quote fields to comment table for Teams-style flat display
ALTER TABLE `tobe_comment` 
ADD COLUMN `reply_to_user_name` VARCHAR(255) COMMENT 'Reply to user name (for quoted replies)' AFTER `parent_id`,
ADD COLUMN `reply_to_content` VARCHAR(500) COMMENT 'Reply to content snippet (for quoted replies, max 500 chars)' AFTER `reply_to_user_name`; 

-- Notification system table
CREATE TABLE IF NOT EXISTS `tobe_notification` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'Primary key',
    `recipient_id` BIGINT(20) NOT NULL COMMENT 'User ID who receives this notification',
    `sender_id` BIGINT(20) COMMENT 'User ID who triggered this notification (nullable for system notifications)',
    `notification_type` VARCHAR(50) NOT NULL COMMENT 'CONTENT_RECOMMENDED, CONTENT_BANNED, CONTENT_COMMENTED, SYSTEM_ANNOUNCEMENT',
    `title` VARCHAR(255) NOT NULL COMMENT 'Notification title',
    `message` VARCHAR(1000) NOT NULL COMMENT 'Notification message content',
    `is_read` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'Whether the notification has been read',
    `related_content_id` VARCHAR(255) COMMENT 'Related content ID (for content-related notifications)',
    `related_content_type` VARCHAR(50) COMMENT 'Related content type (ARTICLE, PLAN, VOCABULARY, COLLECTION)',
    `related_content_title` VARCHAR(255) COMMENT 'Related content title for quick reference',
    `action_url` VARCHAR(500) COMMENT 'URL to navigate when notification is clicked',
    `metadata` JSON COMMENT 'Additional metadata for the notification',
    `create_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT 'Create time',
    `create_by` VARCHAR(30) DEFAULT NULL COMMENT 'Creator',
    `update_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT 'Update time',
    `update_by` VARCHAR(30) DEFAULT NULL COMMENT 'Updater',
    `deleted` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'Soft delete flag',
    PRIMARY KEY (`id`),
    INDEX `idx_recipient_id` (`recipient_id`),
    INDEX `idx_notification_type` (`notification_type`),
    INDEX `idx_is_read` (`is_read`),
    INDEX `idx_create_time` (`create_time`),
    INDEX `idx_deleted` (`deleted`),
    INDEX `idx_recipient_read` (`recipient_id`, `is_read`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Notification table';

-- data.sql content
-- end of sql 