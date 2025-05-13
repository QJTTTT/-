package com.spboot.tx.utils;

import java.io.Serializable;

/**
 * Json 数据返回格式
 */
public class ResponseData <T>  {


    private Integer code;
    private String msg;
    private T data;

    public ResponseData(Integer code , String msg , T data)
    {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public ResponseData(T data)
    {
        this.data = data;
        setCode(0);
        setMsg("");
    }

    public ResponseData(String msg)
    {
        this.msg = msg;
        setData(null);
        setCode(1);
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
