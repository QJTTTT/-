package com.spboot.tx.pojo;

import com.baomidou.mybatisplus.annotation.*;
import com.jntoo.db.*;
import java.io.Serializable;
import java.util.*;

@TableName("tushuxinxi")
public class Tushuxinxi implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(type = IdType.AUTO)
    private Integer id;

    private String tushuhao;

    private String tushumingcheng;

    private Integer tushuleibie;

    private String tupian;

    private Double jieyuejine;

    private Integer tushukucun;

    private String isbnhao;

    private String zuozhe;

    private String chubanshe;

    private Integer jieyuecishu;

    private String jianjie;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Long getTushujieyueCount() {
        return DB.name("tushujieyue").where("tushuxinxiid", id).count();
    }

    public Long getTushucaigouCount() {
        return DB.name("tushucaigou").where("tushuxinxiid", id).count();
    }

    public Long getTushubaosunCount() {
        return DB.name("tushubaosun").where("tushuxinxiid", id).count();
    }

    public Long getLiulanjiluCount() {
        return DB.name("liulanjilu").where("tushuxinxiid", id).count();
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

    public String getTupian() {
        return tupian;
    }

    public void setTupian(String tupian) {
        this.tupian = tupian == null ? "" : tupian.trim();
    }

    public Double getJieyuejine() {
        return jieyuejine;
    }

    public void setJieyuejine(Double jieyuejine) {
        this.jieyuejine = jieyuejine == null ? 0.0f : jieyuejine;
    }

    public Integer getTushukucun() {
        return tushukucun;
    }

    public void setTushukucun(Integer tushukucun) {
        this.tushukucun = tushukucun == null ? 0 : tushukucun;
    }

    public String getIsbnhao() {
        return isbnhao;
    }

    public void setIsbnhao(String isbnhao) {
        this.isbnhao = isbnhao == null ? "" : isbnhao.trim();
    }

    public String getZuozhe() {
        return zuozhe;
    }

    public void setZuozhe(String zuozhe) {
        this.zuozhe = zuozhe == null ? "" : zuozhe.trim();
    }

    public String getChubanshe() {
        return chubanshe;
    }

    public void setChubanshe(String chubanshe) {
        this.chubanshe = chubanshe == null ? "" : chubanshe.trim();
    }

    public Integer getJieyuecishu() {
        return jieyuecishu;
    }

    public void setJieyuecishu(Integer jieyuecishu) {
        this.jieyuecishu = jieyuecishu == null ? 0 : jieyuecishu;
    }

    public String getJianjie() {
        return jianjie;
    }

    public void setJianjie(String jianjie) {
        this.jianjie = jianjie == null ? "" : jianjie.trim();
    }
}
