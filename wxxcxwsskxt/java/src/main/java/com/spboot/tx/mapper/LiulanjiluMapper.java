package com.spboot.tx.mapper;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.spboot.tx.pojo.*;
import org.apache.ibatis.annotations.Mapper;

@Mapper
@TableName("liulanjilu")
public interface LiulanjiluMapper extends BaseMapper<Liulanjilu> {}
