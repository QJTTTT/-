package com.spboot.tx.utils;

public class JsonResult {

    public static<T> ResponseData<T> success(T data)
    {
        return new ResponseData(data);
    }

    public static ResponseData<Object> error(String msg)
    {
        return new ResponseData(1 , msg , null);
    }

    public static ResponseData<Object> error(String msg , int code)
    {
        return new ResponseData(code == 0 ? 1 : code , msg , null);
    }
}
