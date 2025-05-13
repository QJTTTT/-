package com.spboot.tx.pojo;

import com.baomidou.mybatisplus.annotation.*;
import com.jntoo.db.*;
import java.io.Serializable;
import java.util.*;

@TableName("tushujieyue")
public class Tushujieyue implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(type = IdType.AUTO)
    private Integer id;

    private Integer tushuxinxiid;

    private String tushuhao;

    private String tushumingcheng;

    private Integer tushuleibie;

    private String tupian;

    private String zuozhe;

    private String chubanshe;

    private Double jieyuejine;

    private String jieyuedanhao;

    private String jieyueshijian;

    private String guihuanshijian;

    private String xingming;

    private String dianhua;

    private String jieyueyonghu;

    private String jieyuezhuangtai;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Long getTushuxujieCount() {
        return DB.name("tushuxujie").where("tushujieyueid", id).count();
    }

    public Long getJieyueguihuanCount() {
        return DB.name("jieyueguihuan").where("tushujieyueid", id).count();
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

    public String getTupian() {
        return tupian;
    }

    public void setTupian(String tupian) {
        this.tupian = tupian == null ? "" : tupian.trim();
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

    public Double getJieyuejine() {
        return jieyuejine;
    }

    public void setJieyuejine(Double jieyuejine) {
        this.jieyuejine = jieyuejine == null ? 0.0f : jieyuejine;
    }

    public String getJieyuedanhao() {
        return jieyuedanhao;
    }

    public void setJieyuedanhao(String jieyuedanhao) {
        this.jieyuedanhao = jieyuedanhao == null ? "" : jieyuedanhao.trim();
    }

    public String getJieyueshijian() {
        return jieyueshijian;
    }

    public void setJieyueshijian(String jieyueshijian) {
        this.jieyueshijian = jieyueshijian == null ? "" : jieyueshijian.trim();
    }

    public String getGuihuanshijian() {
        return guihuanshijian;
    }

    public void setGuihuanshijian(String guihuanshijian) {
        this.guihuanshijian = guihuanshijian == null ? "" : guihuanshijian.trim();
    }

    public String getXingming() {
        return xingming;
    }

    public void setXingming(String xingming) {
        this.xingming = xingming == null ? "" : xingming.trim();
    }

    public String getDianhua() {
        return dianhua;
    }

    public void setDianhua(String dianhua) {
        this.dianhua = dianhua == null ? "" : dianhua.trim();
    }

    public String getJieyueyonghu() {
        return jieyueyonghu;
    }

    public void setJieyueyonghu(String jieyueyonghu) {
        this.jieyueyonghu = jieyueyonghu == null ? "" : jieyueyonghu.trim();
    }

    public String getJieyuezhuangtai() {
        return jieyuezhuangtai;
    }

    public void setJieyuezhuangtai(String jieyuezhuangtai) {
        this.jieyuezhuangtai = jieyuezhuangtai == null ? "" : jieyuezhuangtai.trim();
    }
}
