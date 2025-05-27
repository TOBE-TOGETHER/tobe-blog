package com.tobe.blog.content.service;

import java.lang.reflect.Method;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.TimeZone;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ActiveProfiles;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.tobe.blog.beans.dto.content.CommentCreateDTO;
import com.tobe.blog.beans.dto.content.CommentDTO;
import com.tobe.blog.beans.dto.user.EnhancedUserDetail;
import com.tobe.blog.beans.dto.user.UserGeneralDTO;
import com.tobe.blog.beans.entity.content.CommentEntity;
import com.tobe.blog.content.mapper.CommentMapper;
import com.tobe.blog.core.utils.BasicConverter;
import com.tobe.blog.core.utils.SecurityUtil;

import jakarta.servlet.http.HttpServletRequest;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
public class CommentServiceTests {

    @Mock
    private CommentMapper commentMapper;

    @Mock
    private HttpServletRequest request;

    @Mock
    private EnhancedUserDetail currentUser;

    @Mock
    private UserGeneralDTO userProfile;

    @InjectMocks
    private CommentService commentService;

    private Method buildUserDisplayNameMethod;

    @BeforeEach
    void setUp() throws Exception {
        // Get the private method using reflection
        buildUserDisplayNameMethod = CommentService.class.getDeclaredMethod("buildUserDisplayName", UserGeneralDTO.class);
        buildUserDisplayNameMethod.setAccessible(true);
    }

    @Test
    @DisplayName("Comment Service: build user display name with full name")
    void testBuildUserDisplayName_withFullName() throws Exception {
        UserGeneralDTO user = new UserGeneralDTO();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setUsername("johndoe");
        user.setEmail("john.doe@example.com");

        String result = (String) buildUserDisplayNameMethod.invoke(commentService, user);
        assertEquals("John Doe", result);
    }

    @Test
    @DisplayName("Comment Service: build user display name with first name only")
    void testBuildUserDisplayName_withFirstNameOnly() throws Exception {
        UserGeneralDTO user = new UserGeneralDTO();
        user.setFirstName("John");
        user.setLastName(null);
        user.setUsername("johndoe");
        user.setEmail("john.doe@example.com");

        String result = (String) buildUserDisplayNameMethod.invoke(commentService, user);
        assertEquals("John", result);
    }

    @Test
    @DisplayName("Comment Service: build user display name with last name only")
    void testBuildUserDisplayName_withLastNameOnly() throws Exception {
        UserGeneralDTO user = new UserGeneralDTO();
        user.setFirstName(null);
        user.setLastName("Doe");
        user.setUsername("johndoe");
        user.setEmail("john.doe@example.com");

        String result = (String) buildUserDisplayNameMethod.invoke(commentService, user);
        assertEquals("Doe", result);
    }

    @Test
    @DisplayName("Comment Service: build user display name with username fallback")
    void testBuildUserDisplayName_withUsernameFallback() throws Exception {
        UserGeneralDTO user = new UserGeneralDTO();
        user.setFirstName(null);
        user.setLastName(null);
        user.setUsername("johndoe");
        user.setEmail("john.doe@example.com");

        String result = (String) buildUserDisplayNameMethod.invoke(commentService, user);
        assertEquals("johndoe", result);
    }

    @Test
    @DisplayName("Comment Service: build user display name with email fallback")
    void testBuildUserDisplayName_withEmailFallback() throws Exception {
        UserGeneralDTO user = new UserGeneralDTO();
        user.setFirstName(null);
        user.setLastName(null);
        user.setUsername(null);
        user.setEmail("john.doe@example.com");

        String result = (String) buildUserDisplayNameMethod.invoke(commentService, user);
        assertEquals("john.doe", result);
    }

    @Test
    @DisplayName("Comment Service: build user display name with empty strings")
    void testBuildUserDisplayName_withEmptyStrings() throws Exception {
        UserGeneralDTO user = new UserGeneralDTO();
        user.setFirstName("");
        user.setLastName("");
        user.setUsername("");
        user.setEmail("john.doe@example.com");

        String result = (String) buildUserDisplayNameMethod.invoke(commentService, user);
        assertEquals("john.doe", result);
    }

    @Test
    @DisplayName("Comment Service: build user display name with whitespace strings")
    void testBuildUserDisplayName_withWhitespaceStrings() throws Exception {
        UserGeneralDTO user = new UserGeneralDTO();
        user.setFirstName("   ");
        user.setLastName("   ");
        user.setUsername("   ");
        user.setEmail("john.doe@example.com");

        String result = (String) buildUserDisplayNameMethod.invoke(commentService, user);
        assertEquals("john.doe", result);
    }

    @Test
    @DisplayName("Comment Service: build user display name with null values fallback to anonymous")
    void testBuildUserDisplayName_withNullValuesFallbackToAnonymous() throws Exception {
        UserGeneralDTO user = new UserGeneralDTO();
        user.setFirstName(null);
        user.setLastName(null);
        user.setUsername(null);
        user.setEmail(null);

        String result = (String) buildUserDisplayNameMethod.invoke(commentService, user);
        assertEquals("Anonymous User", result);
    }

    @Test
    @DisplayName("Comment Service: build user display name handles null and empty mixed")
    void testBuildUserDisplayName_withNullAndEmptyMixed() throws Exception {
        UserGeneralDTO user = new UserGeneralDTO();
        user.setFirstName("null");
        user.setLastName("null");
        user.setUsername("johndoe");
        user.setEmail("john.doe@example.com");

        String result = (String) buildUserDisplayNameMethod.invoke(commentService, user);
        assertEquals("null null", result);
    }

    @Test
    @DisplayName("Comment Service: create comment with proper user name and parent ID")
    void testCreateComment_withProperUserNameAndParentId() throws Exception {
        // Setup test data
        CommentCreateDTO dto = new CommentCreateDTO();
        dto.setContentId("article-123");
        dto.setContentType("ARTICLE");
        dto.setContent("This is a test comment");
        dto.setParentId(456L); // This is a reply to comment 456

        // Setup user profile
        userProfile.setId(123L);
        userProfile.setFirstName("John");
        userProfile.setLastName("Doe");
        userProfile.setUsername("johndoe");
        userProfile.setEmail("john.doe@example.com");
        userProfile.setAvatarUrl("https://example.com/avatar.jpg");

        // Setup current user
        when(currentUser.getUserProfile()).thenReturn(userProfile);
        when(currentUser.getUsername()).thenReturn("johndoe");

        // Setup request
        when(request.getHeader("X-Forwarded-For")).thenReturn(null);
        when(request.getHeader("X-Real-IP")).thenReturn(null);
        when(request.getRemoteAddr()).thenReturn("192.168.1.1");

        // Mock SecurityUtil
        try (MockedStatic<SecurityUtil> mockedSecurityUtil = Mockito.mockStatic(SecurityUtil.class)) {
            mockedSecurityUtil.when(SecurityUtil::getCurrentUserDetail).thenReturn(currentUser);

            // Execute the method
            CommentDTO result = commentService.createComment(dto, request);

            // Verify the result
            assertNotNull(result);
            assertEquals("article-123", result.getContentId());
            assertEquals("ARTICLE", result.getContentType());
            assertEquals("This is a test comment", result.getContent());
            assertEquals(123L, result.getUserId());
            assertEquals("John Doe", result.getUserName()); // This should be properly built
            assertEquals("https://example.com/avatar.jpg", result.getUserAvatarUrl());
            assertEquals(456L, result.getParentId()); // Parent ID should be preserved
            assertEquals(0, result.getLikeCount());
            assertEquals(false, result.getDeleted());
        }
    }

    @Test
    @DisplayName("Comment Service: create top-level comment without parent ID")
    void testCreateComment_topLevelComment() throws Exception {
        // Setup test data
        CommentCreateDTO dto = new CommentCreateDTO();
        dto.setContentId("article-123");
        dto.setContentType("ARTICLE");
        dto.setContent("This is a top-level comment");
        dto.setParentId(null); // Top-level comment

        // Setup user profile
        userProfile.setId(123L);
        userProfile.setFirstName(null);
        userProfile.setLastName(null);
        userProfile.setUsername("johndoe");
        userProfile.setEmail("john.doe@example.com");
        userProfile.setAvatarUrl("https://example.com/avatar.jpg");

        // Setup current user
        when(currentUser.getUserProfile()).thenReturn(userProfile);
        when(currentUser.getUsername()).thenReturn("johndoe");

        // Setup request
        when(request.getRemoteAddr()).thenReturn("192.168.1.1");

        // Mock SecurityUtil
        try (MockedStatic<SecurityUtil> mockedSecurityUtil = Mockito.mockStatic(SecurityUtil.class)) {
            mockedSecurityUtil.when(SecurityUtil::getCurrentUserDetail).thenReturn(currentUser);

            // Execute the method
            CommentDTO result = commentService.createComment(dto, request);

            // Verify the result
            assertNotNull(result);
            assertEquals("article-123", result.getContentId());
            assertEquals("ARTICLE", result.getContentType());
            assertEquals("This is a top-level comment", result.getContent());
            assertEquals(123L, result.getUserId());
            assertEquals("johndoe", result.getUserName()); // Should fallback to username
            assertEquals("https://example.com/avatar.jpg", result.getUserAvatarUrl());
            assertNull(result.getParentId()); // Should be null for top-level comment
            assertEquals(0, result.getLikeCount());
            assertEquals(false, result.getDeleted());
        }
    }

    @Test
    @DisplayName("Comment Service: BasicConverter test for CommentEntity to CommentDTO")
    void testBasicConverter_CommentEntityToDTO() throws Exception {
        // Create a CommentEntity with all fields set
        CommentEntity entity = new CommentEntity();
        entity.setId(123L);
        entity.setContentId("article-456");
        entity.setContentType("ARTICLE");
        entity.setContent("Test comment content");
        entity.setUserId(789L);
        entity.setUserName("John Doe");
        entity.setUserAvatarUrl("https://example.com/avatar.jpg");
        entity.setParentId(999L);
        entity.setLikeCount(5L);
        entity.setIpAddress("192.168.1.1");
        entity.setDeleted(false);
        
        // Set BaseEntity fields with current timestamp
        Timestamp currentTime = new Timestamp(System.currentTimeMillis());
        entity.setCreateTime(currentTime);
        entity.setUpdateTime(currentTime);
        entity.setCreateBy("testuser");
        entity.setUpdateBy("testuser");

        // Convert using BasicConverter - should now work with Timestamp fields
        CommentDTO dto = BasicConverter.convert(entity, CommentDTO.class);

        // Verify all fields are correctly converted
        assertEquals(123L, dto.getId());
        assertEquals("article-456", dto.getContentId());
        assertEquals("ARTICLE", dto.getContentType());
        assertEquals("Test comment content", dto.getContent());
        assertEquals(789L, dto.getUserId());
        assertEquals("John Doe", dto.getUserName()); // This should be preserved
        assertEquals("https://example.com/avatar.jpg", dto.getUserAvatarUrl());
        assertEquals(999L, dto.getParentId()); // This should be preserved
        assertEquals(5L, dto.getLikeCount());
        assertEquals(false, dto.getDeleted());
        
        // Time fields should now be properly converted as Timestamp objects
        assertNotNull(dto.getCreateTime(), "CreateTime should not be null");
        assertNotNull(dto.getUpdateTime(), "UpdateTime should not be null");
        assertEquals(currentTime, dto.getCreateTime(), "CreateTime should match");
        assertEquals(currentTime, dto.getUpdateTime(), "UpdateTime should match");
    }

    @Test
    @DisplayName("Comment Service: convertToDTO method test")
    void testConvertToDTO() throws Exception {
        // Create a CommentEntity with all fields set
        CommentEntity entity = new CommentEntity();
        entity.setId(456L);
        entity.setContentId("article-789");
        entity.setContentType("ARTICLE");
        entity.setContent("Test comment for convertToDTO");
        entity.setUserId(123L);
        entity.setUserName("Jane Doe");
        entity.setUserAvatarUrl("https://example.com/jane.jpg");
        entity.setParentId(null); // Top-level comment
        entity.setLikeCount(3L);
        entity.setIpAddress("192.168.1.100");
        entity.setDeleted(false);
        
        // Set BaseEntity fields with current timestamp
        Timestamp currentTime = new Timestamp(System.currentTimeMillis());
        entity.setCreateTime(currentTime);
        entity.setUpdateTime(currentTime);
        entity.setCreateBy("testuser");
        entity.setUpdateBy("testuser");

        // Use reflection to call the private convertToDTO method
        Method convertToDTOMethod = CommentService.class.getDeclaredMethod("convertToDTO", CommentEntity.class);
        convertToDTOMethod.setAccessible(true);
        
        CommentDTO dto = (CommentDTO) convertToDTOMethod.invoke(commentService, entity);

        // Verify all fields are correctly converted
        assertEquals(456L, dto.getId());
        assertEquals("article-789", dto.getContentId());
        assertEquals("ARTICLE", dto.getContentType());
        assertEquals("Test comment for convertToDTO", dto.getContent());
        assertEquals(123L, dto.getUserId());
        assertEquals("Jane Doe", dto.getUserName());
        assertEquals("https://example.com/jane.jpg", dto.getUserAvatarUrl());
        assertNull(dto.getParentId()); // Should be null for top-level comment
        assertEquals(3L, dto.getLikeCount());
        assertEquals(false, dto.getDeleted());
        
        // Verify time fields are properly converted as Timestamp objects
        assertNotNull(dto.getCreateTime(), "CreateTime should not be null");
        assertNotNull(dto.getUpdateTime(), "UpdateTime should not be null");
        assertEquals(currentTime, dto.getCreateTime(), "CreateTime should match");
        assertEquals(currentTime, dto.getUpdateTime(), "UpdateTime should match");
    }

    @Test
    @DisplayName("Comment Service: JSON serialization test")
    void testJSONSerialization() throws Exception {
        // Create a CommentDTO with timestamp
        CommentDTO dto = new CommentDTO();
        dto.setId(123L);
        dto.setContentId("article-456");
        dto.setContentType("ARTICLE");
        dto.setContent("Test comment");
        dto.setUserId(789L);
        dto.setUserName("John Doe");
        dto.setCreateTime(new Timestamp(System.currentTimeMillis()));
        dto.setUpdateTime(new Timestamp(System.currentTimeMillis()));
        
        // Use ObjectMapper to serialize to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setTimeZone(TimeZone.getTimeZone("UTC"));
        objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        
        String json = objectMapper.writeValueAsString(dto);
        
        // Verify JSON contains ISO format timestamps
        assertTrue(json.contains("T"), "JSON should contain ISO format timestamp");
        assertTrue(json.contains("Z"), "JSON should contain UTC timezone indicator");
    }
} 