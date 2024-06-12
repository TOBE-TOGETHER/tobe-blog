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

DROP TABLE IF EXISTS EXISTStobe_content_info;
-- base content info
create table tobe_content_info
(
    ID                varchar(32)                              not null
        primary key,
    TITLE             varchar(128) collate utf8mb4_unicode_ci  not null,
    DESCRIPTION       varchar(1000) collate utf8mb4_unicode_ci null,
    CONTENT_TYPE      varchar(20)                              not null,
    OWNER_ID          int                                      not null,
    LIKE_COUNT        int default 0                            not null,
    VIEW_COUNT        int default 0                            not null,
    PUBLIC_TO_ALL     bit default false                        not null,
    PUBLISH_TIME      datetime                                 null,
    CONTENT_PROTECTED bit default false                        not null,
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
    SUB_TITLE   varchar(128) collate utf8mb4_unicode_ci not null,
    CONTENT     longtext collate utf8mb4_unicode_ci     not null,
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
    SUBJECT_ID  varchar(32)       not null,
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