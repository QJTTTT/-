package com.spboot.tx.pojo;

import com.baomidou.mybatisplus.annotation.*;
import com.jntoo.db.*;
import java.io.Serializable;
import java.util.*;

@TableName("jieyueguihuan")
public class Jieyueguihuan implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(type = IdType.AUTO)
    private Integer id;

    private Integer tushujieyueid;

    private String tushuhao;

    private String tushumingcheng;

    private Integer tushuleibie;

    private String tupian;

    private String zuozhe;

    private String chubanshe;

    private String jieyuedanhao;

    private String jieyueshijian;

    private String xingming;

    private String dianhua;

    private String jieyueyonghu;

    private Double jieyuejine;

    private String guihuanshijian;

    private String shijiguihuanshijian;

    private Integer jieyuetianshu;

    private Double jieyuefeiyong;

    private Double chaoshifajin;

    private Double zongfeiyong;

    private String shifouzhunshi;
    private String iszf;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getTushujieyueid() {
        return tushujieyueid;
    }

    public void setTushujieyueid(Integer tushujieyueid) {
        this.tushujieyueid = tushujieyueid == null ? 0 : tushujieyueid;
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

    public Double getJieyuejine() {
        return jieyuejine;
    }

    public void setJieyuejine(Double jieyuejine) {
        this.jieyuejine = jieyuejine == null ? 0.0f : jieyuejine;
    }

    public String getGuihuanshijian() {
        return guihuanshijian;
    }

    public void setGuihuanshijian(String guihuanshijian) {
        this.guihuanshijian = guihuanshijian == null ? "" : guihuanshijian.trim();
    }

    public String getShijiguihuanshijian() {
        return shijiguihuanshijian;
    }

    public void setShijiguihuanshijian(String shijiguihuanshijian) {
        this.shijiguihuanshijian = shijiguihuanshijian == null ? "" : shijiguihuanshijian.trim();
    }

    public Integer getJieyuetianshu() {
        return jieyuetianshu;
    }

    public void setJieyuetianshu(Integer jieyuetianshu) {
        this.jieyuetianshu = jieyuetianshu == null ? 0 : jieyuetianshu;
    }

    public Double getJieyuefeiyong() {
        return jieyuefeiyong;
    }

    public void setJieyuefeiyong(Double jieyuefeiyong) {
        this.jieyuefeiyong = jieyuefeiyong == null ? 0.0f : jieyuefeiyong;
    }

    public Double getChaoshifajin() {
        return chaoshifajin;
    }

    public void setChaoshifajin(Double chaoshifajin) {
        this.chaoshifajin = chaoshifajin == null ? 0.0f : chaoshifajin;
    }

    public Double getZongfeiyong() {
        return zongfeiyong;
    }

    public void setZongfeiyong(Double zongfeiyong) {
        this.zongfeiyong = zongfeiyong == null ? 0.0f : zongfeiyong;
    }

    public String getShifouzhunshi() {
        return shifouzhunshi;
    }

    public void setShifouzhunshi(String shifouzhunshi) {
        this.shifouzhunshi = shifouzhunshi == null ? "" : shifouzhunshi.trim();
    }

    public String getIszf() {
        return iszf;
    }

    public void setIszf(String iszf) {
        this.iszf = iszf == null ? "" : iszf.trim();
    }
}
