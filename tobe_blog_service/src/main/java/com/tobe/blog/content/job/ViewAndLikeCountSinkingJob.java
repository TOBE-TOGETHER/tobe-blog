package com.tobe.blog.content.job;

import java.util.Set;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.tobe.blog.beans.consts.Const;
import com.tobe.blog.content.service.impl.ContentGeneralInfoService;
import com.tobe.blog.core.utils.CacheUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class ViewAndLikeCountSinkingJob {

    private final ContentGeneralInfoService contentGeneralInfoService;
    private final CacheUtil cacheUtil;

    @Scheduled(cron = "0 * * * * ?")
    public void sinkAllViewCountEveryMin() {
        sinkDataToDB(Const.CONTENT_VIEW_COUNT_KEY);
    }

    @Scheduled(cron = "0 */5 * * * ?")
    public void sinkLikeCountEveryFiveMins() {
        sinkDataToDB(Const.CONTENT_LIKE_COUNT_KEY);
    }

    private void sinkDataToDB(String typeKey) {
        log.info(String.format("Start to sink the %s count into DB", typeKey));
        final Set<String> contentIds = cacheUtil.hGetHashKeys(typeKey);
        contentIds.stream().forEach(id -> {
            try {
                Long increasedCount = Long.valueOf(String.valueOf(cacheUtil.hGet(typeKey, id)));
                contentGeneralInfoService.sinkViewCountToDB(typeKey, id, increasedCount);
            } catch (Exception ex) {
                log.error(String.format("Error happens when sink the %s count to DB for content id: %s", typeKey, id), ex);
            } finally {
                cacheUtil.hDel(typeKey, id);
            }
        });
    }
}
