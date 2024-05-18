package com.tobe.blog.core.utils;

import java.util.Map;
import java.util.Set;

public interface ICacheUtil {

    Boolean expire(String key, long time);

    Long getExpireTime(String key);

    Boolean hasKey(String key);

    void del(String... key);

    Object get(String key);

    Boolean set(String key, Object value);

    Boolean set(String key, Object value, long expireTime);

    Long incr(String key, long delta);

    Long decr(String key, long delta);

    Map<Object, Object> hmGet(String key);

    Boolean hmSet(String key, Map<String, Object> map);

    Boolean hmSet(String key, Map<String, Object> map, long expireTime);

    Set<String> hGetHashKeys(String key);

    Object hGet(String key, String item);

    Boolean hSet(String key, String item, Object value);

    Boolean hSet(String key, String item, Object value, long expireTime);

    void hDel(String key, Object... item);

    Boolean hHasKey(String key, String item);

    Long hIncr(String key, String item, long by);

    Long hDecr(String key, String item, long by);

    Set<Object> sGet(String key);

    Boolean sHasKey(String key, Object value);

    Long sSet(String key, Object... value);

    Long sSet(String key, long expireTime, Object... value);

    Long sDel(String key, Object... value);
}
