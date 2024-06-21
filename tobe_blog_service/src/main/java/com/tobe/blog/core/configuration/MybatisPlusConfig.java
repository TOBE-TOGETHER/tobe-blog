package com.tobe.blog.core.configuration;

import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import com.tobe.blog.core.utils.SecurityUtil;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.sql.Timestamp;
import java.util.Objects;

@Configuration
public class MybatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        return interceptor;
    }

    /**
     * This is to auto-fill the meta-data like createBy, updateBy, createTime,
     * updateTime
     */
    @Bean
    public MetaObjectHandler metaObjectHandler() {
        return new MetaObjectHandler() {
            @Override
            public void insertFill(MetaObject metaObject) {
                // if createBy is not null, will not auto-fill again, this is to avoid
                // getUsername error when create a new user
                if (Objects.isNull(this.getFieldValByName("createBy", metaObject))) {
                    this.strictInsertFill(metaObject, "createBy", String.class, getUsernameFromContext());
                }
                this.strictInsertFill(metaObject, "createTime", Timestamp.class,
                        new Timestamp(System.currentTimeMillis()));
                this.strictInsertFill(metaObject, "updateTime", Timestamp.class,
                        new Timestamp(System.currentTimeMillis()));
            }

            @Override
            public void updateFill(MetaObject metaObject) {
                // the strictUpdateFill function of mybatis won't overwrite the updateTime if
                // the value is not null
                this.setFieldValByName("updateBy", getUsernameFromContext(), metaObject);
                this.setFieldValByName("updateTime", new Timestamp(System.currentTimeMillis()), metaObject);
            }
        };
    }

    private String getUsernameFromContext() {
        return SecurityUtil.getUsername();
    }
}
