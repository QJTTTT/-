package com.spboot.tx.pojo;

import com.baomidou.mybatisplus.annotation.*;
import com.jntoo.db.*;
import java.io.Serializable;
import java.util.*;

@TableName("tushubaosun")
public class Tushubaosun implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(type = IdType.AUTO)
    private Integer id;

    private Integer tushuxinxiid;

    private String tushuhao;

    private String tushumingcheng;

    private Integer tushuleibie;

    private String baosunbianhao;

    private Integer baosunshuliang;

    private String baosunshuoming;

    private String jingshouren;

    private String addtime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getTushuxinxiid() {
        return tushuxinxiid;
    }

    public void setTushuxinxiid(Integer tushuxinxiid) {
        this.tushuxinxiid = tushuxinxiid == null ? 0 : tushuxinxiid;
    }

    public String getTushuhao() {
        return tushuhao;
    }

    public void setTushuhao(String tushuhao) {
        this.tushuhao = tushuhao == null ? "" : tushuhao.trim();
    }

    public String getTushumingcheng() {
        return tushumingcheng;
    }

    public void setTushumingcheng(String tushumingcheng) {
        this.tushumingcheng = tushumingcheng == null ? "" : tushumingcheng.trim();
    }

    public Integer getTushuleibie() {
        return tushuleibie;
    }

    public void setTushuleibie(Integer tushuleibie) {
        this.tushuleibie = tushuleibie == null ? 0 : tushuleibie;
    }

    public String getBaosunbianhao() {
        return baosunbianhao;
    }

    public void setBaosunbianhao(String baosunbianhao) {
        this.baosunbianhao = baosunbianhao == null ? "" : baosunbianhao.trim();
    }

    public Integer getBaosunshuliang() {
        return baosunshuliang;
    }

    public void setBaosunshuliang(Integer baosunshuliang) {
        this.baosunshuliang = baosunshuliang == null ? 0 : baosunshuliang;
    }

    public String getBaosunshuoming() {
        return baosunshuoming;
    }

    public void setBaosunshuoming(String baosunshuoming) {
        this.baosunshuoming = baosunshuoming == null ? "" : baosunshuoming.trim();
    }

    public String getJingshouren() {
        return jingshouren;
    }

    public void setJingshouren(String jingshouren) {
        this.jingshouren = jingshouren == null ? "" : jingshouren.trim();
    }

    public String getAddtime() {
        return addtime;
    }

    public void setAddtime(String addtime) {
        this.addtime = addtime == null ? "" : addtime.trim();
    }
}
