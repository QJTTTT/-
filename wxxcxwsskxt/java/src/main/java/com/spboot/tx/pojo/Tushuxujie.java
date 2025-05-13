package com.spboot.tx.pojo;

import com.baomidou.mybatisplus.annotation.*;
import com.jntoo.db.*;
import java.io.Serializable;
import java.util.*;

@TableName("tushuxujie")
public class Tushuxujie implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(type = IdType.AUTO)
    private Integer id;

    private Integer tushujieyueid;

    private String tushuhao;

    private String tushumingcheng;

    private Integer tushuleibie;

    private String jieyuedanhao;

    private String jieyueyonghu;

    private String jieyueshijian;

    private String guihuanshijian;

    private String xujiedao;

    private String xujiebeizhu;

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

    public String getJieyuedanhao() {
        return jieyuedanhao;
    }

    public void setJieyuedanhao(String jieyuedanhao) {
        this.jieyuedanhao = jieyuedanhao == null ? "" : jieyuedanhao.trim();
    }

    public String getJieyueyonghu() {
        return jieyueyonghu;
    }

    public void setJieyueyonghu(String jieyueyonghu) {
        this.jieyueyonghu = jieyueyonghu == null ? "" : jieyueyonghu.trim();
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

    public String getXujiedao() {
        return xujiedao;
    }

    public void setXujiedao(String xujiedao) {
        this.xujiedao = xujiedao == null ? "" : xujiedao.trim();
    }

    public String getXujiebeizhu() {
        return xujiebeizhu;
    }

    public void setXujiebeizhu(String xujiebeizhu) {
        this.xujiebeizhu = xujiebeizhu == null ? "" : xujiebeizhu.trim();
    }
}
