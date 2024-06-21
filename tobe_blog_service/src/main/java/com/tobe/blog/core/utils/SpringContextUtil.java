package com.tobe.blog.core.utils;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class SpringContextUtil implements ApplicationContextAware {

    private static ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(@NonNull ApplicationContext context) throws BeansException {
        applicationContext = context;
    }

    public static ApplicationContext getApplicationContext() {
        return applicationContext;
    }

    public static Object getBeanById(String id) {
        return applicationContext.getBean(id);
    }

    public static <T> T getBeanByClass(Class<T> clz) {
        return applicationContext.getBean(clz);
    }

    public static <T> Map<String, T> getBeansByClass(Class<T> clz) {
        return applicationContext.getBeansOfType(clz);
    }
}
