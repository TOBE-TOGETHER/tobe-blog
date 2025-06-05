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
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.lenient;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ActiveProfiles;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.tobe.blog.beans.dto.content.CommentDTO;
import com.tobe.blog.beans.dto.user.EnhancedUserDetail;
import com.tobe.blog.beans.dto.user.UserGeneralDTO;
import com.tobe.blog.beans.entity.content.CommentEntity;
import com.tobe.blog.content.mapper.CommentMapper;
import com.tobe.blog.content.service.impl.ContentGeneralInfoService;
import com.tobe.blog.core.service.NotificationService;
import com.tobe.blog.core.utils.BasicConverter;

/**
 * Tests for CommentService
 * 
 * Note: User display name building tests have been moved to UserDisplayNameUtilTests
 * since the buildUserDisplayName method is now extracted to a utility class.
 * 
 * Authentication validation tests have been moved to controller layer tests
 * since authentication is now handled in CommentController.
 * 
 * Most business logic tests that require database operations are better tested
 * at the integration test level or controller test level.
 */
@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
public class CommentServiceTests {

    @Mock
    private CommentMapper commentMapper;

    @Mock
    private NotificationService notificationService;

    @Mock
    private ContentGeneralInfoService contentGeneralInfoService;

    @Mock
    private EnhancedUserDetail currentUser;

    @Mock
    private UserGeneralDTO userProfile;

    @InjectMocks
    private CommentService commentService;

    @BeforeEach
    void setUp() throws Exception {
        // Basic setup that tests can use - using lenient to avoid unnecessary stubbing warnings
        lenient().when(commentMapper.insert(any(CommentEntity.class))).thenReturn(1);
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