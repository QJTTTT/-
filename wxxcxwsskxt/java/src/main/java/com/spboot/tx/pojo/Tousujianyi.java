package com.spboot.tx.pojo;

import com.baomidou.mybatisplus.annotation.*;
import com.jntoo.db.*;
import java.io.Serializable;
import java.util.*;

@TableName("tousujianyi")
public class Tousujianyi implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(type = IdType.AUTO)
    private Integer id;

    private String xingming;

    private String lianxidianhua;

    private String fankuileixing;

    private String fankuineirong;

    private String fankuiyonghu;

    private String fankuizhuangtai;

    private String addtime;

    private String fankuihuifu;

    private String huifushijian;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getXingming() {
        return xingming;
    }

    public void setXingming(String xingming) {
        this.xingming = xingming == null ? "" : xingming.trim();
    }

    public String getLianxidianhua() {
        return lianxidianhua;
    }

    public void setLianxidianhua(String lianxidianhua) {
        this.lianxidianhua = lianxidianhua == null ? "" : lianxidianhua.trim();
    }

    public String getFankuileixing() {
        return fankuileixing;
    }

    public void setFankuileixing(String fankuileixing) {
        this.fankuileixing = fankuileixing == null ? "" : fankuileixing.trim();
    }

    public String getFankuineirong() {
        return fankuineirong;
    }

    public void setFankuineirong(String fankuineirong) {
        this.fankuineirong = fankuineirong == null ? "" : fankuineirong.trim();
    }

    public String getFankuiyonghu() {
        return fankuiyonghu;
    }

    public void setFankuiyonghu(String fankuiyonghu) {
        this.fankuiyonghu = fankuiyonghu == null ? "" : fankuiyonghu.trim();
    }

    public String getFankuizhuangtai() {
        return fankuizhuangtai;
    }

    public void setFankuizhuangtai(String fankuizhuangtai) {
        this.fankuizhuangtai = fankuizhuangtai == null ? "" : fankuizhuangtai.trim();
    }

    public String getAddtime() {
        return addtime;
    }

    public void setAddtime(String addtime) {
        this.addtime = addtime == null ? "" : addtime.trim();
    }

    public String getFankuihuifu() {
        return fankuihuifu;
    }

    public void setFankuihuifu(String fankuihuifu) {
        this.fankuihuifu = fankuihuifu == null ? "" : fankuihuifu.trim();
    }

    public String getHuifushijian() {
        return huifushijian;
    }

    public void setHuifushijian(String huifushijian) {
        this.huifushijian = huifushijian == null ? "" : huifushijian.trim();
    }
}
