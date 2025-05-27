package com.tobe.blog.content.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tobe.blog.beans.entity.content.CommentEntity;

@Mapper
public interface CommentMapper extends BaseMapper<CommentEntity> {
    
    /**
     * Increment like count for a comment
     * @param id comment id
     * @return affected rows
     */
    @Update("UPDATE tobe_comment SET like_count = like_count + 1 WHERE id = #{id}")
    int incrementLikeCount(@Param("id") Long id);
    
    /**
     * Decrement like count for a comment
     * @param id comment id
     * @return affected rows
     */
    @Update("UPDATE tobe_comment SET like_count = like_count - 1 WHERE id = #{id} AND like_count > 0")
    int decrementLikeCount(@Param("id") Long id);
} 