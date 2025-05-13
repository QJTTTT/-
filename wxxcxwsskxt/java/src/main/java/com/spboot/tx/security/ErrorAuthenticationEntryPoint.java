package com.spboot.tx.security;

import com.alibaba.fastjson.JSONArray;
import com.spboot.tx.utils.JsonResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;
import java.util.HashMap;

//错误消息类，未授权访问通过此类返回 401 未授权访问信息。
// 自定义实现 Spring Security 的默认未授权访问处理接口 AuthenticationEntryPoint
@Component
public class ErrorAuthenticationEntryPoint implements AuthenticationEntryPoint, Serializable {
    private static final long serialVersionUID = 5200068540912465653L;

    private static final Logger logger = LoggerFactory.getLogger(ErrorAuthenticationEntryPoint.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        //authException.printStackTrace();
        logger.error("Request page Not auth Page: "+request.getRequestURI());
        // 设置 Json 格式返回

        response.setContentType("application/json;charset=UTF-8");
        // 设置 HTTP 状态码为 401
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().print(JSONArray.toJSON(JsonResult.error("未授权",1001)));
    }
}