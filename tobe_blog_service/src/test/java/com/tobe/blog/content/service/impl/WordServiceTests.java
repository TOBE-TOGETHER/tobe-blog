package com.tobe.blog.content.service.impl;

import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.tobe.blog.DefaultTestData;
import com.tobe.blog.beans.dto.content.VOCCreationDTO;
import com.tobe.blog.beans.dto.content.VOCDTO;
import com.tobe.blog.beans.dto.content.WordCreationDTO;
import com.tobe.blog.beans.dto.content.WordDTO;
import com.tobe.blog.beans.dto.content.WordUpdateDTO;
import com.tobe.blog.core.utils.SecurityUtil;

@SpringBootTest
@ActiveProfiles("test")
public class WordServiceTests {
  
    @Autowired
    private WordService wordService;
    @Autowired
    private VOCService vocService;
    private VOCDTO vocDTO;

    @BeforeEach
    void setUp() {
        SecurityUtil.setUserDetail(DefaultTestData.getDefaultUserAuthentication());
        final VOCCreationDTO vocCreationDTO = new VOCCreationDTO();
        vocCreationDTO.setTitle("Vocabulary for testing words");
        vocCreationDTO.setLanguage("EN");
        this.vocDTO = this.vocService.save(vocCreationDTO);
    }

    @Test
    @DisplayName("Word Service: create with valid input")
    void testCreateWord_withValidInput() {
        final WordCreationDTO dto = new WordCreationDTO();
        dto.setVocabularyId(vocDTO.getId());
        dto.setText("world");
        dto.setMeaningInChinese("世界");
        dto.setMeaningInEnglish("earth");
        dto.setPartOfSpeech("noun");
        
        final WordDTO result = wordService.saveWord(dto);
        Assertions.assertNotNull(result.getId());
        Assertions.assertEquals(vocDTO.getId(), result.getVocabularyId());
        Assertions.assertEquals(dto.getText(), result.getText());
        Assertions.assertEquals(dto.getMeaningInChinese(), result.getMeaningInChinese());
        Assertions.assertEquals(dto.getMeaningInChinese(), result.getMeaningInChinese());
        Assertions.assertEquals(dto.getPartOfSpeech(), result.getPartOfSpeech());
    }

    @Test
    @DisplayName("Word Service: create with invalid input")
    void testCreateWord_withInvalidInput() {
        // Vocabulary ID & text can not be null
        final WordCreationDTO dto = new WordCreationDTO();
        Assertions.assertThrows(RuntimeException.class, () -> wordService.saveWord(dto));
        dto.setVocabularyId(vocDTO.getId());
        dto.setText("test");
        Assertions.assertDoesNotThrow(() -> wordService.saveWord(dto));
        // text length can not exceed 200
        dto.setText(RandomStringUtils.randomAlphanumeric(201));
        Assertions.assertThrows(RuntimeException.class, () -> wordService.saveWord(dto));
        dto.setText(RandomStringUtils.randomAlphanumeric(200));
        Assertions.assertDoesNotThrow(() -> wordService.saveWord(dto));
        // meaningInChinese can not exceed 128
        dto.setMeaningInChinese(RandomStringUtils.randomAlphanumeric(129));
        Assertions.assertThrows(RuntimeException.class, () -> wordService.saveWord(dto));
        dto.setMeaningInChinese(RandomStringUtils.randomAlphanumeric(128));
        Assertions.assertDoesNotThrow(() -> wordService.saveWord(dto));
        // meaningInEnglish can not exceed 128
        dto.setMeaningInEnglish(RandomStringUtils.randomAlphanumeric(129));
        Assertions.assertThrows(RuntimeException.class, () -> wordService.saveWord(dto));
        dto.setMeaningInEnglish(RandomStringUtils.randomAlphanumeric(128));
        Assertions.assertDoesNotThrow(() -> wordService.saveWord(dto));
        // partOfSpeech can not exceed 32
        dto.setPartOfSpeech(RandomStringUtils.randomAlphanumeric(33));
        Assertions.assertThrows(RuntimeException.class, () -> wordService.saveWord(dto));
        dto.setPartOfSpeech(RandomStringUtils.randomAlphanumeric(32));
        Assertions.assertDoesNotThrow(() -> wordService.saveWord(dto));
    }

    @Test
    @DisplayName("Word Service: update word")
    void testUpdateWord() {
        final WordCreationDTO dto = new WordCreationDTO();
        dto.setVocabularyId(vocDTO.getId());
        dto.setText("Word to be updated");
        WordDTO saveResult = wordService.saveWord(dto);
        // build update DTO
        final WordUpdateDTO updateDTO = new WordUpdateDTO();
        updateDTO.setId(saveResult.getId());
        updateDTO.setText("The desc has been updated");
        updateDTO.setMeaningInChinese("updated CH meaning");
        updateDTO.setMeaningInEnglish("updated EN meaning");
        updateDTO.setPartOfSpeech("updated part of speech");
        final WordDTO updateResult = wordService.updateWord(updateDTO);
        Assertions.assertEquals(updateDTO.getText(), updateResult.getText());
        Assertions.assertEquals(updateDTO.getMeaningInChinese(), updateResult.getMeaningInChinese());
        Assertions.assertEquals(updateDTO.getMeaningInEnglish(), updateResult.getMeaningInEnglish());
        Assertions.assertEquals(updateDTO.getPartOfSpeech(), updateResult.getPartOfSpeech());
    }

    @Test
    @DisplayName("Word Service: get words")
    void testGetWordsByVOCId() {
        // create a new voc to avoid test conflict with other test methods
        final VOCCreationDTO vocCreationDTO = new VOCCreationDTO();
        vocCreationDTO.setTitle("VOC for getting words");
        vocCreationDTO.setLanguage("EN");
        final String ID_FOR_QUERY = vocService.save(vocCreationDTO).getId();
        // init words
        final WordCreationDTO dto = new WordCreationDTO();
        dto.setVocabularyId(ID_FOR_QUERY);
        dto.setText("A");
        wordService.saveWord(dto);
        dto.setText("B");
        wordService.saveWord(dto);
        dto.setText("C");
        wordService.saveWord(dto);
        dto.setText("D");
        wordService.saveWord(dto);
        // get all words
        List<WordDTO> result = wordService.getWordsByVOCId(ID_FOR_QUERY);
        Assertions.assertEquals(4, result.size());
    }
}
