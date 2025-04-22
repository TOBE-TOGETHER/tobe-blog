package com.tobe.blog.portal.controller;

import java.util.Comparator;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import com.tobe.blog.beans.consts.Const;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.util.Strings;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.analytics.service.AnalyticsService;
import com.tobe.blog.beans.dto.analytics.UserContentAnalyticsDTO;
import com.tobe.blog.beans.dto.content.ArticleDTO;
import com.tobe.blog.beans.dto.content.BaseContentDTO;
import com.tobe.blog.beans.dto.content.CollectionDTO;
import com.tobe.blog.beans.dto.content.PlanDTO;
import com.tobe.blog.beans.dto.content.PlanProgressDTO;
import com.tobe.blog.beans.dto.content.TagRelationshipDTO;
import com.tobe.blog.beans.dto.content.VOCDTO;
import com.tobe.blog.beans.dto.content.WordDTO;
import com.tobe.blog.beans.dto.tag.TagInfoStatisticDTO;
import com.tobe.blog.beans.dto.user.UserBriefProfileDTO;
import com.tobe.blog.beans.dto.user.UserFullProfileDTO;
import com.tobe.blog.content.service.impl.ArticleService;
import com.tobe.blog.content.service.impl.CollectionService;
import com.tobe.blog.content.service.impl.PlanProgressService;
import com.tobe.blog.content.service.impl.PlanService;
import com.tobe.blog.content.service.impl.VOCService;
import com.tobe.blog.content.service.impl.WordService;
import com.tobe.blog.core.service.UserService;
import com.tobe.blog.core.utils.CacheUtil;
import com.tobe.blog.core.utils.IpUtil;
import com.tobe.blog.portal.service.PublicApiService;

import io.jsonwebtoken.lang.Collections;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@RequestMapping("/v1/api")
@RequiredArgsConstructor
public class PublicApiController {

    private final PublicApiService publicApiService;
    private final ArticleService articleService;
    private final PlanService planService;
    private final VOCService vocService;
    private final CollectionService collectionService;
    private final PlanProgressService progressService;
    private final WordService wordService;
    private final UserService userService;
    private final AnalyticsService analyticsService;
    private final CacheUtil cacheUtil;
    private static final String USER_PROFILE_CACHE_PREFIX = "USER_PROFILE_";

    @GetMapping("/contents")
    public ResponseEntity<Page<BaseContentDTO>> searchContents(
        @RequestParam(value = "current", required = false, defaultValue = "1") int current,
        @RequestParam(value = "size", required = false, defaultValue = "10") int size,
        @RequestParam(value = "tags", required = false, defaultValue = "") String tags,
        @RequestParam(value = "ownerId", required = false, defaultValue = "") Long ownerId,
        @RequestParam(value = "contentType", required = false, defaultValue = "") String contentType,
        @RequestParam(value = "topic", required = false, defaultValue = "") Const.Topic topic,
        @RequestParam(value = "keyword", required = false, defaultValue = "") String keyword) {
        final String[] tagFilter = StringUtils.isNotBlank(tags) ? tags.split(",") : new String[]{};
        return ResponseEntity.ok(publicApiService.searchContents(current, size, tagFilter, ownerId, contentType, topic, keyword));
    }

    @GetMapping("/articles/{id}")
    public ResponseEntity<ArticleDTO> getArticleById(@PathVariable(value = "id") String id) {
        final ArticleDTO result = articleService.getDTOByIdAndCount(id);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/plans/{id}")
    public ResponseEntity<PlanDTO> getPlanById(@PathVariable(value = "id") String id) {
        final PlanDTO result = planService.getDTOByIdAndCount(id);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/vocabularies/{id}")
    public ResponseEntity<VOCDTO> getVocabularyById(@PathVariable(value = "id") String id) {
        final VOCDTO result = vocService.getDTOByIdAndCount(id);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/collections/{id}")
    public ResponseEntity<CollectionDTO> getCollectionById(@PathVariable(value = "id") String id) {
        final CollectionDTO result = collectionService.getDTOByIdAndCount(id);
        setRelatedContentsForTagTree(result.getTagTree(), result.getOwnerId());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/plans/{id}/progresses")
    public ResponseEntity<Page<PlanProgressDTO>> getProgressesByPlanId(
        @PathVariable String id,
        @RequestParam(value = "current", required = false, defaultValue = "1") int current,
        @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        return ResponseEntity.ok(progressService.getProgressesByPlanId(id, current, size));
    }

    @GetMapping("/vocabularies/{id}/words")
    public ResponseEntity<List<WordDTO>> getWordsByVocabularyId(@PathVariable String id) {
        return ResponseEntity.ok(wordService.getWordsByVOCId(id));
    }

    @PostMapping("/like-content/{id}")
    public ResponseEntity<Boolean> likeContent(@PathVariable(value = "id") String id, HttpServletRequest request) {
        final String ip = IpUtil.getClientIpAddress(request);
        return ResponseEntity.ok(publicApiService.likeContent(ip, id));
    }
    
    @GetMapping("/full-profile/{id}")
    public ResponseEntity<UserFullProfileDTO> getUserFullProfile(@PathVariable long id) {
        UserFullProfileDTO result = userService.getUserFullProfile(id);
        fillViewData(result);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/tag-statistics")
    public ResponseEntity<List<TagInfoStatisticDTO>> getTagInfoStatistics(
        @RequestParam(value = "ownerId", required = false, defaultValue = "") Long ownerId,
        @RequestParam(value = "contentType", required = false, defaultValue = "ARTICLE") String contentType,
        @RequestParam(value = "topic", required = false, defaultValue = "") Const.Topic topic,
        @RequestParam(value = "keyword", required = false, defaultValue = "") String keyword
    ) {
        return ResponseEntity.ok(publicApiService.getTagInfoStatistics(ownerId, contentType, topic, keyword));
    }

    @GetMapping("/brief-profile/{id}")
    public ResponseEntity<UserBriefProfileDTO> getUserBasicProfile(@PathVariable long id) {
        UserBriefProfileDTO result = null;
        try {
            result = (UserBriefProfileDTO) cacheUtil.get(USER_PROFILE_CACHE_PREFIX + id);
            if (result != null) {
                return ResponseEntity.ok(result);
            }
        } catch (Exception e) {
            log.error("Failed to get user profile from cache for user: " + id, e);
        }
        result = userService.getUserBriefProfile(id);
        fillViewData(result);
        cacheUtil.set(USER_PROFILE_CACHE_PREFIX + id, result, TimeUnit.HOURS.toSeconds(12));
        return ResponseEntity.ok(result);
    }

    private void fillViewData(UserBriefProfileDTO result) {
        if (result != null) {
            final UserContentAnalyticsDTO dto = analyticsService.getOverallResult(result.getId());
            result.setContentCount(dto.getTotalCount());
            result.setPublicContentCount(dto.getPublicCount());
            result.setViewCount(dto.getTotalViewCount());
            result.setLikeCount(dto.getTotalLikeCount());
        }
    }

    private void setRelatedContentsForTagTree(List<TagRelationshipDTO> tagTree, Long ownerId) {
        tagTree.forEach(node -> {
            node.setRelatedContents(
              publicApiService.searchContents(
                            1, 1000, new String[]{ node.getTagId().toString() }, ownerId, Strings.EMPTY, null, Strings.EMPTY).getRecords()
                            .stream().sorted(Comparator.comparing(BaseContentDTO::getTitle))
                            .collect(Collectors.toList()));
            if (!Collections.isEmpty(node.getChildren())) {
                setRelatedContentsForTagTree(node.getChildren(), ownerId);
            }
        });
    }
}
