-- Init one default user profile for testing
INSERT INTO tobe_core_user(ID, USERNAME, PASSWORD, PHONE_NUM, EMAIL, LAST_NAME, FIRST_NAME, ADDRESS, AVATAR_URL, INTRODUCTION, BLOG, BACKGROUND_IMG, PHOTO_IMG, PROFESSION, DELETED)
VALUES(1, 'tobe_admin', '$2a$10$TEIjcjW2OrsuyLCqD.4oqeRmXvcgk4Gm3.1Y568QoMLNW3Rtjta4e', '13145801234', 'tobe_admin@tobe.com', 'TOBE', 'Admin', 'Shenzhen China', 'https://avatar.com', 'Hello world', 'https://blog.com', 'https://bg.com', 'https://photo.com', 'Developer', FALSE);
INSERT INTO tobe_core_user_role(ID, ROLE, USER_ID, DELETED) VALUES(1, 'ROLE_BASIC', 1, FALSE);
INSERT INTO tobe_core_user_role(ID, ROLE, USER_ID, DELETED) VALUES(2, 'ROLE_ADMIN', 1, FALSE);

INSERT INTO tobe_core_user_feature(USER_ID, ARTICLE_MODULE, PLAN_MODULE, VOCABULARY_MODULE, COLLECTION_MODULE, DELETED)
VALUES (1, TRUE, TRUE, FALSE, FALSE, FALSE);

COMMIT;