package com.tobe.blog.core.utils;

import com.google.gson.Gson;

public class GsonUtil {
    
    private final static Gson gson = new Gson();

    public static <T> T fromJson(String jsonString, Class<T> clz) {
        return gson.fromJson(jsonString, clz);
    }

    public static String toJson(Object obj) {
        return gson.toJson(obj);
    }
}
