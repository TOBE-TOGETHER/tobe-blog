package com.tobe.blog.core.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tobe.blog.beans.entity.content.NotificationEntity;

@Mapper
public interface NotificationMapper extends BaseMapper<NotificationEntity> {
    
    /**
     * Get unread notification count for a user
     * @param recipientId user ID
     * @return unread notification count
     */
    @Select("SELECT COUNT(*) FROM tobe_notification WHERE recipient_id = #{recipientId} AND is_read = false AND deleted = false")
    long getUnreadCount(@Param("recipientId") Long recipientId);
} 