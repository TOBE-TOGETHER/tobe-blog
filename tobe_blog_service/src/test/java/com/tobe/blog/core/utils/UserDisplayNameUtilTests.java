package com.tobe.blog.core.utils;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ActiveProfiles;

import com.tobe.blog.beans.dto.user.UserGeneralDTO;
import com.tobe.blog.beans.entity.user.UserEntity;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
public class UserDisplayNameUtilTests {

    @Test
    @DisplayName("UserDisplayNameUtil: build display name with full name from UserGeneralDTO")
    void testBuildDisplayName_UserGeneralDTO_withFullName() {
        UserGeneralDTO user = new UserGeneralDTO();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setUsername("johndoe");
        user.setEmail("john.doe@example.com");

        String result = UserDisplayNameUtil.buildDisplayName(user);
        assertEquals("John Doe", result);
    }

    @Test
    @DisplayName("UserDisplayNameUtil: build display name with first name only from UserGeneralDTO")
    void testBuildDisplayName_UserGeneralDTO_withFirstNameOnly() {
        UserGeneralDTO user = new UserGeneralDTO();
        user.setFirstName("John");
        user.setLastName(null);
        user.setUsername("johndoe");
        user.setEmail("john.doe@example.com");

        String result = UserDisplayNameUtil.buildDisplayName(user);
        assertEquals("John", result);
    }

    @Test
    @DisplayName("UserDisplayNameUtil: build display name with username fallback from UserGeneralDTO")
    void testBuildDisplayName_UserGeneralDTO_withUsernameFallback() {
        UserGeneralDTO user = new UserGeneralDTO();
        user.setFirstName(null);
        user.setLastName(null);
        user.setUsername("johndoe");
        user.setEmail("john.doe@example.com");

        String result = UserDisplayNameUtil.buildDisplayName(user);
        assertEquals("johndoe", result);
    }

    @Test
    @DisplayName("UserDisplayNameUtil: build display name with email fallback from UserGeneralDTO")
    void testBuildDisplayName_UserGeneralDTO_withEmailFallback() {
        UserGeneralDTO user = new UserGeneralDTO();
        user.setFirstName(null);
        user.setLastName(null);
        user.setUsername(null);
        user.setEmail("john.doe@example.com");

        String result = UserDisplayNameUtil.buildDisplayName(user);
        assertEquals("john.doe", result);
    }

    @Test
    @DisplayName("UserDisplayNameUtil: build display name with null user returns anonymous")
    void testBuildDisplayName_UserGeneralDTO_withNullUser() {
        String result = UserDisplayNameUtil.buildDisplayName((UserGeneralDTO) null);
        assertEquals("Anonymous User", result);
    }

    @Test
    @DisplayName("UserDisplayNameUtil: build display name with full name from UserEntity")
    void testBuildDisplayName_UserEntity_withFullName() {
        UserEntity user = new UserEntity();
        user.setFirstName("Jane");
        user.setLastName("Smith");
        user.setUsername("janesmith");
        user.setEmail("jane.smith@example.com");

        String result = UserDisplayNameUtil.buildDisplayName(user);
        assertEquals("Jane Smith", result);
    }

    @Test
    @DisplayName("UserDisplayNameUtil: build display name with whitespace handling")
    void testBuildDisplayName_withWhitespace() {
        UserGeneralDTO user = new UserGeneralDTO();
        user.setFirstName("  John  ");
        user.setLastName("  Doe  ");

        String result = UserDisplayNameUtil.buildDisplayName(user);
        assertEquals("John Doe", result);
    }

    @Test
    @DisplayName("UserDisplayNameUtil: build display name with empty strings fallback to username")
    void testBuildDisplayName_withEmptyStrings() {
        UserGeneralDTO user = new UserGeneralDTO();
        user.setFirstName("");
        user.setLastName("");
        user.setUsername("johndoe");
        user.setEmail("john.doe@example.com");

        String result = UserDisplayNameUtil.buildDisplayName(user);
        assertEquals("johndoe", result);
    }

    @Test
    @DisplayName("UserDisplayNameUtil: build display name handles null and empty mixed")
    void testBuildDisplayName_withNullAndEmptyMixed() {
        UserGeneralDTO user = new UserGeneralDTO();
        user.setFirstName("John");
        user.setLastName("");
        user.setUsername("johndoe");
        user.setEmail("john.doe@example.com");

        String result = UserDisplayNameUtil.buildDisplayName(user);
        assertEquals("John", result);
    }

    @Test
    @DisplayName("UserDisplayNameUtil: build display name with complete fallback chain")
    void testBuildDisplayName_completeFallbackChain() {
        UserGeneralDTO user = new UserGeneralDTO();
        user.setFirstName(null);
        user.setLastName(null);
        user.setUsername(null);
        user.setEmail(null);

        String result = UserDisplayNameUtil.buildDisplayName(user);
        assertEquals("Anonymous User", result);
    }
} 