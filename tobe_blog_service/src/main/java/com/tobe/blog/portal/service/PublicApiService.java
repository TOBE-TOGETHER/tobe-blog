package com.tobe.blog.portal.service;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.concurrent.TimeUnit;
import java.util.UUID;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.beans.consts.Const;
import com.tobe.blog.beans.dto.content.BaseContentDTO;
import com.tobe.blog.beans.dto.tag.TagInfoStatisticDTO;
import com.tobe.blog.core.service.EmailService;
import com.tobe.blog.core.service.UserService;
import com.tobe.blog.core.utils.CacheUtil;
import com.tobe.blog.portal.mapper.PublicApiMapper;
@Slf4j
@Service
@RequiredArgsConstructor
public class PublicApiService {

    private final PublicApiMapper apiMapper;
    private final CacheUtil cacheUtil;
    private final UserService userService;
    private final EmailService emailService;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    private static final String RESET_PASSWORD_EMAIL_TEMPLATE = "password-reset-email";
    private static final String RESET_PASSWORD_EMAIL_SUBJECT = "Password Reset - Tobe Blog";
    private static final String LIKE_COUNT_UNI_KEY = "LIKE_COUNT_UNI_KEY";
    private static final String PASSWORD_RESET_TOKEN_KEY = "PASSWORD_RESET_TOKEN_";
    private static final long PASSWORD_RESET_TOKEN_EXPIRY = TimeUnit.MINUTES.toSeconds(5);

    /**
     * The core search method for the portal home page to display users' contents
     * @param current: page number
     * @param size: page size
     * @param tags: tag Ids in array, ignore the filter when array is empty
     * @param ownerId: ignore the filter when not given
     * @param contentType: ARTICLE, PLAN, VOCABULARY or COLLECTION
     * @return A page of user contents of given ownerId and contentType
     */
    public Page<BaseContentDTO> searchContents(int current, int size, String[] tags, Long ownerId, String contentType, Const.Topic topic, String keyword) {
        return this.apiMapper.searchContents(new Page<>(current, size), tags, ownerId, contentType, topic, keyword);
    }

    public Boolean likeContent(String ip, String contentId) {
        final String key = String.format("%s:%s:%s", LIKE_COUNT_UNI_KEY, ip, contentId);
        if (cacheUtil.hasKey(key)) {
            return Boolean.FALSE;
        }
        cacheUtil.hIncr(Const.CONTENT_LIKE_COUNT_KEY, contentId, 1L);
        cacheUtil.set(key, null, TimeUnit.MINUTES.toSeconds(5L));
        return Boolean.TRUE;
    }

    public List<TagInfoStatisticDTO> getTagInfoStatistics(Long ownerId, String contentType, Const.Topic topic, String keyword) {
        return apiMapper.getTagInfoStatistics(ownerId, contentType, topic, keyword);
    }

    /**
     * Process a password reset request
     * @param email The email address of the user requesting password reset
     */
    public void requestPasswordReset(String email) {
        try {
            // Check if email exists in the system
            if (!userService.isEmailRegistered(email)) {
                log.warn("Password reset requested for non-existent email: {}", email);
                return;
            }

            // Generate a unique token
            String resetToken = UUID.randomUUID().toString();

            // Store token in cache with expiry
            cacheUtil.set(PASSWORD_RESET_TOKEN_KEY + email, resetToken, PASSWORD_RESET_TOKEN_EXPIRY);

            // Get username
            String name = userService.getFirstNameByEmail(email);
            if (name == null || name.isEmpty()) {
                name = "User"; // Default name if not found
            }

            // Build reset URL
            String resetUrl = String.format("%s/reset-password?email=%s&token=%s",
                    frontendUrl, email, resetToken);

            // Prepare email parameters
            Map<String, Object> params = new HashMap<>();
            params.put("resetUrl", resetUrl);
            params.put("name", name);
            params.put("email", email);
            params.put("expiryMinutes", 5); // Same as TOKEN_EXPIRY

            // Send email with token
            emailService.sendTemplateEmail(
                email,
                    RESET_PASSWORD_EMAIL_SUBJECT,
                    RESET_PASSWORD_EMAIL_TEMPLATE,
                params
            );
            
            log.info("Password reset email sent to: {}", email);
        } catch (Exception e) {
            log.error("Error processing password reset request for email: {}", email, e);
        }
    }

    /**
     * Validate a password reset token and reset the password
     * @param email The email address of the user
     * @param token The reset token to validate
     * @param newPassword The new password to set
     * @return true if password was successfully reset, false otherwise
     */
    public Boolean resetPassword(String email, String token, String newPassword) {
        try {
            // Retrieve token from cache
            String storedToken = (String) cacheUtil.get(PASSWORD_RESET_TOKEN_KEY + email);

            // Validate token
            if (storedToken == null || !storedToken.equals(token)) {
                log.warn("Invalid or expired password reset token for email: {}", email);
                return Boolean.FALSE;
            }

            // Reset password
            boolean result = userService.updatePassword(email, newPassword);

            // Remove token from cache after use
            if (result) {
                cacheUtil.del(PASSWORD_RESET_TOKEN_KEY + email);
            }

            return result;
        } catch (Exception e) {
            log.error("Error resetting password for email: {}", email, e);
            return Boolean.FALSE;
        }
    }
}
