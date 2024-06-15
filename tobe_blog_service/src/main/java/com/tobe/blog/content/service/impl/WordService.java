package com.tobe.blog.content.service.impl;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tobe.blog.beans.consts.Const.ContentType;
import com.tobe.blog.beans.dto.content.WordCreationDTO;
import com.tobe.blog.beans.dto.content.WordDTO;
import com.tobe.blog.beans.dto.content.WordUpdateDTO;
import com.tobe.blog.beans.entity.content.ContentGeneralInfoEntity;
import com.tobe.blog.beans.entity.content.WordEntity;
import com.tobe.blog.content.mapper.WordMapper;
import com.tobe.blog.core.exception.TobeRuntimeException;
import com.tobe.blog.core.utils.BasicConverter;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class WordService extends ServiceImpl<WordMapper, WordEntity> {

    private final ContentGeneralInfoService contentGeneralInfoService;
    
    @Transactional
    public WordDTO saveWord(WordCreationDTO dto) {
        final ContentGeneralInfoEntity contentEntity = contentGeneralInfoService.getById(dto.getVocabularyId());
        if (Objects.isNull(contentEntity) || !ContentType.VOC.name().equals(contentEntity.getContentType())) {
            throw new TobeRuntimeException("The vocabularyId is invalid");
        }
        final WordEntity entity = BasicConverter.convert(dto, WordEntity.class);
        this.save(entity);
        return getWordById(entity.getId());
    }

    @Transactional
    public WordDTO updateWord(WordUpdateDTO dto) {
        final WordEntity entity = BasicConverter.convert(dto, WordEntity.class);
        this.updateById(entity);
        return getWordById(entity.getId());
    }

    public List<WordDTO> getWordsByVOCId(String vocabularyId) {
        return this.list(new LambdaQueryWrapper<WordEntity>().eq(WordEntity::getVocabularyId, vocabularyId))
            .stream().map(t -> BasicConverter.convert(t, WordDTO.class)).toList();
    }

    public WordDTO getWordById(Long id) {
        return BasicConverter.convert(this.getById(id), WordDTO.class);
    }
}
