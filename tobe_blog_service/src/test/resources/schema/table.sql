DROP TABLE tobe_core_user IF EXISTS;
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

DROP TABLE tobe_core_user_feature IF EXISTS;
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

DROP TABLE tobe_core_user_role IF EXISTS;
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
  COLLATE = utf8mb4_0900_ai_ci