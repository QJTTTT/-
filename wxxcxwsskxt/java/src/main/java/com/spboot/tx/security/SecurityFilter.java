package com.spboot.tx.security;

import cn.hutool.core.util.StrUtil;
import com.alibaba.fastjson.JSONObject;
import com.spboot.tx.config.ApplicationRunnerImp;
import com.spboot.tx.pojo.*;
import com.spboot.tx.service.*;
import com.spboot.tx.utils.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;
import java.util.concurrent.atomic.AtomicReference;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    @Autowired
    private JwtTokenUtils jwtTokenUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsersService userService;
    private static final Logger logger = LoggerFactory.getLogger(SecurityFilter.class);
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        response.setCharacterEncoding("utf-8");
        String uri = request.getRequestURI();

        // 在这里设置跨域请求处理
        if( !StrUtil.hasBlank( request.getHeader("Origin")) && response.getHeader("Access-Control-Allow-Origin") == null)
        {
            response.addHeader("Access-Control-Allow-Origin" , request.getHeader("Origin"));
            response.addHeader("Access-Control-Allow-Methods" , "POST, GET ,OPTIONS, PUT,DELETE");
            response.addHeader("Access-Control-Allow-Headers" , "x-requested-with,content-type,auth-token,app-http,Authorization,token");
            response.addHeader("Access-Control-Allow-Credentials" , "true");
            response.addHeader("Access-Control-Max-Age" , Integer.toString(86400*7));
            if("OPTIONS".equals(request.getMethod().toUpperCase())){  // 这个方法只是试探，所以需要直接返回信息
                PrintWriter writer = response.getWriter();
                writer.println("ok");
                writer.flush();
                writer.close();
                //filterChain.doFilter(request,response);
                return;
            }
        }
        String token = request.getHeader("Authorization") == null ? request.getHeader("token") : request.getHeader("Authorization");
        if(!StrUtil.hasBlank(token)){
            try{
                AtomicReference<SessionUser> user = new AtomicReference();
                jwtTokenUtils.getClaimFromToken(token,(map)->{
                    user.set(JSONObject.parseObject(JSONObject.toJSONString(map), SessionUser.class));
                    return null;
                });
                user.get().refresh();
                SessionFactory.set(user.get());
                request.setAttribute("user" , user.get());

                UsersDetailsImpl userDetails = new UsersDetailsImpl(SessionFactory.get());
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }catch (Exception e){
                e.printStackTrace();
                throw new IOException(e.getMessage());
            }
        }



        if(uri.startsWith("/api/user/")
           || uri.startsWith("/files/")
           || uri.startsWith("/static/")
           || uri.startsWith("/upload/")
            || uri.startsWith("/websocket")

            || uri.startsWith("/api/admins/insert")

                    
                    
                    
    
            || uri.startsWith("/api/yonghu/insert")

                    
                    
                    
                    
                    
                    
                    
                    
    
    
                || uri.startsWith("/api/wxuser/login")
                || uri.startsWith("/webjars/springfox-swagger-ui/")
                || uri.startsWith("/swagger-ui.html")
                || uri.startsWith("/swagger-resources")
                || uri.startsWith("/api/user/captch")
                || uri.startsWith("/v2/api-docs")
                || uri.startsWith("/csrf")
        ){
            filterChain.doFilter(request,response);
            return;
        }

        if(StrUtil.hasBlank(token)){
            //response.setStatus(401);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            throw new IOException();
        }
        filterChain.doFilter(request,response);
    }

}
