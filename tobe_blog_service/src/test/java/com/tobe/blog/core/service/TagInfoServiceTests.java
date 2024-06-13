package com.tobe.blog.core.service;

import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.tobe.blog.DefaultTestData;
import com.tobe.blog.beans.dto.tag.TagInfoCreationDTO;
import com.tobe.blog.beans.dto.tag.TagInfoDTO;
import com.tobe.blog.core.utils.SecurityUtil;

@SpringBootTest
@ActiveProfiles("test")
public class TagInfoServiceTests {

    @Autowired
    private TagInfoService tagInfoService;
    
    @BeforeEach
    void setUp() {
        SecurityUtil.setUserDetail(DefaultTestData.getDefaultUserAuthentication());
    }

    @Test
    void testSave_withValidInput() {
        final TagInfoCreationDTO dto = new TagInfoCreationDTO();
        dto.setKeyword("FirstTag");
        TagInfoDTO result = tagInfoService.createTag(dto);
        Assertions.assertEquals(dto.getKeyword(), result.getLabel());
        Assertions.assertNotNull(result.getValue());
        // the duplicate tag should not be save
        Assertions.assertThrows(RuntimeException.class, () -> tagInfoService.createTag(dto));
    }

    @Test
    void testSave_withInvalidInput() {
        final TagInfoCreationDTO dto = new TagInfoCreationDTO();
        dto.setKeyword(RandomStringUtils.randomAlphanumeric(33));
        Assertions.assertThrows(RuntimeException.class, () -> tagInfoService.createTag(dto));
        dto.setKeyword(RandomStringUtils.randomAlphanumeric(32));
        TagInfoDTO result = tagInfoService.createTag(dto);
        Assertions.assertEquals(dto.getKeyword(), result.getLabel());
        Assertions.assertNotNull(result.getValue());
    }
  
}
