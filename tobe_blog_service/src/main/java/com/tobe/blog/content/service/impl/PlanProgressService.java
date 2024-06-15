package com.tobe.blog.content.service.impl;

import java.util.Objects;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tobe.blog.beans.consts.Const.ContentType;
import com.tobe.blog.beans.dto.content.PlanProgressCreationDTO;
import com.tobe.blog.beans.dto.content.PlanProgressDTO;
import com.tobe.blog.beans.dto.content.PlanProgressUpdateDTO;
import com.tobe.blog.beans.entity.content.ContentGeneralInfoEntity;
import com.tobe.blog.beans.entity.content.PlanProgressEntity;
import com.tobe.blog.content.mapper.PlanProgressMapper;
import com.tobe.blog.core.exception.TobeRuntimeException;
import com.tobe.blog.core.utils.BasicConverter;
import com.tobe.blog.core.utils.SecurityUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlanProgressService extends ServiceImpl<PlanProgressMapper, PlanProgressEntity> {

    private final ContentGeneralInfoService contentGeneralInfoService;

    public Page<PlanProgressDTO> getProgressesByPlanId(String planId, int current, int size) {
        return this.baseMapper.getProgressDTOsByPlanId(new Page<>(current, size), planId);
    }

    public PlanProgressDTO getProgressesById(String id) {
        return this.baseMapper.getProgressDTOById(id);
    }

    @Transactional
    public PlanProgressDTO saveProgress(PlanProgressCreationDTO dto) {
        final ContentGeneralInfoEntity contentEntity = contentGeneralInfoService.getById(dto.getPlanId());
        if (Objects.isNull(contentEntity) || !ContentType.PLAN.name().equals(contentEntity.getContentType())) {
            throw new TobeRuntimeException("The planId is invalid");
        }
        final PlanProgressEntity entity = BasicConverter.convert(dto, PlanProgressEntity.class);
        entity.setUpdaterId(SecurityUtil.getUserId());
        this.save(entity);
        return this.baseMapper.getProgressDTOById(entity.getId());
    }

    @Transactional
    public PlanProgressDTO updateProgress(PlanProgressUpdateDTO dto) {
        final PlanProgressEntity progress = getAndValidateProgress(dto.getId());
        BeanUtils.copyProperties(dto, progress);
        progress.setUpdaterId(SecurityUtil.getUserId());
        this.baseMapper.updateById(progress);
        return this.getProgressesById(dto.getId());
    }

    private PlanProgressEntity getAndValidateProgress(String id) {
        final PlanProgressEntity progress = this.getById(id);
        validateProgressExists(progress);
        validateProgressOwner(progress);
        return progress;
    }

    private void validateProgressExists(PlanProgressEntity progress) {
        if (Objects.isNull(progress)) {
            throw new TobeRuntimeException("The progress doesn't exists, or already has been deleted");
        }
    }

    private void validateProgressOwner(PlanProgressEntity progress) {
        if (progress.getUpdaterId().longValue() != SecurityUtil.getUserId().longValue()) {
            throw new TobeRuntimeException("You can't operate a progress doesn't belong to you");
        }
    }
}
