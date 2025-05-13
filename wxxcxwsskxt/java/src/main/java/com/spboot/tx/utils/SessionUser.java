package com.spboot.tx.utils;

import com.alibaba.fastjson.JSONObject;
import com.jntoo.db.DB;
import com.spboot.tx.pojo.*;
import java.io.Serializable;
import java.util.Map;

public class SessionUser implements Serializable {
    private static final long serialVersionUID = 1L;
    // 用户id
    private Integer id;
    // 登录类型
    private String cx;
    // 用户名
    private String username;
    // 密码
    private String pwd;
    private String roles;
    private String table;
    private JSONObject object;

    public SessionUser()
    {

    }

    public String getRoles() {
        return roles;
    }
    public void setRoles(String roles) {
        this.roles = roles;
    }
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCx() {
        return cx;
    }

    public void setCx(String cx) {
        this.cx = cx;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public JSONObject getObject() {
        return object;
    }

    public void setObject(JSONObject object) {
        this.object = object;
    }

    public void setObject(Map object) {
        this.object = new JSONObject(object);
    }

    public String getTable() {
        return table;
    }

    public void setTable(String table) {
        this.table = table;
    }

    public void refresh() {
        object = DB.json(table).find(getId());
    }
}
