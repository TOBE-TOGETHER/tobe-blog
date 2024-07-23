package com.tobe.blog.core.utils;

import io.micrometer.common.util.StringUtils;
import jakarta.servlet.http.HttpServletRequest;

public class IpUtil {
  
    public static String getClientIpAddress(HttpServletRequest request) {
    String[] headers = {
        "X-Forwarded-For",
        "Proxy-Client-IP",
        "WL-Proxy-Client-IP",
        "HTTP_CLIENT_IP",
        "HTTP_X_FORWARDED_FOR"
    };

    for (String header : headers) {
        String ip = request.getHeader(header);
        if (StringUtils.isNotBlank(ip) && !"unknown".equalsIgnoreCase(ip)) {
            return ip;
        }
    }

    return request.getRemoteAddr();
}
}
