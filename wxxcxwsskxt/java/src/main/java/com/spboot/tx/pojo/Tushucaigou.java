package com.spboot.tx.pojo;

import com.baomidou.mybatisplus.annotation.*;
import com.jntoo.db.*;
import java.io.Serializable;
import java.util.*;

@TableName("tushucaigou")
public class Tushucaigou implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(type = IdType.AUTO)
    private Integer id;

    private Integer tushuxinxiid;

    private String tushuhao;

    private String tushumingcheng;

    private Integer tushuleibie;

    private String caigoubianhao;

    private String gongyingshang;

    private Double caigoujiage;

    private Integer caigoushuliang;

    private Double caigouxiaoji;

    private String caigoubeizhu;

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

    public String getCaigoubianhao() {
        return caigoubianhao;
    }

    public void setCaigoubianhao(String caigoubianhao) {
        this.caigoubianhao = caigoubianhao == null ? "" : caigoubianhao.trim();
    }

    public String getGongyingshang() {
        return gongyingshang;
    }

    public void setGongyingshang(String gongyingshang) {
        this.gongyingshang = gongyingshang == null ? "" : gongyingshang.trim();
    }

    public Double getCaigoujiage() {
        return caigoujiage;
    }

    public void setCaigoujiage(Double caigoujiage) {
        this.caigoujiage = caigoujiage == null ? 0.0f : caigoujiage;
    }

    public Integer getCaigoushuliang() {
        return caigoushuliang;
    }

    public void setCaigoushuliang(Integer caigoushuliang) {
        this.caigoushuliang = caigoushuliang == null ? 0 : caigoushuliang;
    }

    public Double getCaigouxiaoji() {
        return caigouxiaoji;
    }

    public void setCaigouxiaoji(Double caigouxiaoji) {
        this.caigouxiaoji = caigouxiaoji == null ? 0.0f : caigouxiaoji;
    }

    public String getCaigoubeizhu() {
        return caigoubeizhu;
    }

    public void setCaigoubeizhu(String caigoubeizhu) {
        this.caigoubeizhu = caigoubeizhu == null ? "" : caigoubeizhu.trim();
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
