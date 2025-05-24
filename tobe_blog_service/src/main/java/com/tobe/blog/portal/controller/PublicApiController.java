package com.tobe.blog.portal.controller;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.analytics.service.AnalyticsService;
import com.tobe.blog.beans.consts.Const;
import com.tobe.blog.beans.dto.EmailVerificationResponse;
import com.tobe.blog.beans.dto.analytics.UserContentAnalyticsDTO;
import com.tobe.blog.beans.dto.content.ArticleDTO;
import com.tobe.blog.beans.dto.content.BaseContentDTO;
import com.tobe.blog.beans.dto.content.CollectionDTO;
import com.tobe.blog.beans.dto.content.PlanDTO;
import com.tobe.blog.beans.dto.content.PlanProgressDTO;
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
import com.tobe.blog.core.service.EmailVerificationService;
import com.tobe.blog.core.service.PasswordResetService;
import com.tobe.blog.core.service.UserService;
import com.tobe.blog.core.utils.CacheUtil;
import com.tobe.blog.core.utils.IpUtil;
import com.tobe.blog.core.utils.TagRelationshipUtil;
import com.tobe.blog.portal.service.PublicApiService;

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
    private final PasswordResetService passwordResetService;
    private final EmailVerificationService emailVerificationService;
    private final CacheUtil cacheUtil;
    private final TagRelationshipUtil tagRelationshipUtil;
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
        tagRelationshipUtil.setRelatedContentsForTagTree(result.getTagTree(), result.getOwnerId());
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

    @PostMapping("/request-password-reset")
    public ResponseEntity<Void> requestPasswordReset(@RequestParam(value = "email") String email) {
        passwordResetService.requestPasswordReset(email);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Boolean> resetPassword(
        @RequestParam(value = "email") String email,
        @RequestParam(value = "token") String token,
        @RequestParam(value = "newPassword") String newPassword) {
        return ResponseEntity.ok(passwordResetService.resetPassword(email, token, newPassword));
    }

    @GetMapping("/brief-profile/{id}")
    public ResponseEntity<UserBriefProfileDTO> getUserBasicProfile(@PathVariable long id) {
        UserBriefProfileDTO result;
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

    /**
     * API to verify email with token
     */
    @GetMapping("/email-verification/verify")
    public ResponseEntity<EmailVerificationResponse> verifyEmail(
            @RequestParam String email,
            @RequestParam String token) {
        try {
            // First check if email is already verified
            Boolean isAlreadyVerified = emailVerificationService.isEmailVerified(email);
            if (isAlreadyVerified) {
                return ResponseEntity.ok(
                    EmailVerificationResponse.success("Email already verified", true)
                );
            }
            
            Boolean result = emailVerificationService.verifyEmail(email, token);
            if (result) {
                return ResponseEntity.ok(
                    EmailVerificationResponse.success("Email verified successfully", false)
                );
            } else {
                return ResponseEntity.badRequest().body(
                    EmailVerificationResponse.failure("Invalid or expired verification token")
                );
            }
        } catch (Exception e) {
            log.error("Error verifying email: {}", email, e);
            return ResponseEntity.internalServerError().body(
                EmailVerificationResponse.failure("Internal server error")
            );
        }
    }

    /**
     * API to resend verification email
     */
    @PostMapping("/email-verification/resend")
    public ResponseEntity<String> resendVerificationEmail(@RequestParam String email) {
        try {
            emailVerificationService.resendVerificationEmail(email);
            return ResponseEntity.ok("Verification email sent successfully");
        } catch (Exception e) {
            log.error("Error resending verification email: {}", email, e);
            return ResponseEntity.badRequest().body("Failed to resend verification email");
        }
    }

    /**
     * API to check if email is verified
     */
    @GetMapping("/email-verification/status")
    public ResponseEntity<Boolean> checkEmailVerificationStatus(@RequestParam String email) {
        try {
            Boolean isVerified = emailVerificationService.isEmailVerified(email);
            return ResponseEntity.ok(isVerified);
        } catch (Exception e) {
            log.error("Error checking email verification status: {}", email, e);
            return ResponseEntity.ok(Boolean.FALSE);
        }
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
}
