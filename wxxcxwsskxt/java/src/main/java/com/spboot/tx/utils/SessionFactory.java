package com.spboot.tx.utils;

import com.alibaba.fastjson.JSONObject;

/**
 * 当前session会话处理,系统运行的时候是多线程方式运行的,所以需要设置当前的线程运行时的session会话记录,以保证上下文中的session变量的正确性
 */
public class SessionFactory {
    // 使用 ThreadLocal 线程变量来保存session,保证下文运行时获取到的session数据都是一致的
    private static final ThreadLocal<SessionUser> content = new ThreadLocal();

    // 设置session
    public static void set(SessionUser session)
    {
        content.set(session);
    }
    // 获取session
    public static SessionUser get()
    {
        return content.get();
    }

    // 删除session
    public static void remove()
    {
        content.remove();
    }


    public static String getUsername() {
        SessionUser session = get();
        if(session!=null){
            return get().getUsername();
        }
        return null;
    }
    public static String getCx() {
        SessionUser session = get();
        if(session!=null){
            return get().getCx();
        }
        return null;
    }

    public static String getRoles() {
        SessionUser session = get();
        if(session!=null){
            return get().getRoles();
        }
        return null;
    }

    public static Integer getId() {
        SessionUser session = get();
        if(session!=null){
            return get().getId();
        }
        return null;
    }

    public static JSONObject getObject(){
        SessionUser session = get();
        if(session!=null){
            return session.getObject();
        }
        return new JSONObject();
    }

    public static String getString(String name)
    {
        SessionUser session = get();
        if(session!=null){
            return session.getObject().getString(name);
        }
        return null;
    }

    public static int getInt(String name)
    {
        SessionUser session = get();
        if(session!=null){
            return session.getObject().getIntValue(name);
        }
        return 0;
    }

    public static double getDouble(String name)
    {
        SessionUser session = get();
        if(session!=null){
            return session.getObject().getDoubleValue(name);
        }
        return 0.0;
    }

    public static boolean checkLogin() {
        return get()!=null;
    }

}
