package com.spboot.tx.service;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.*;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.jntoo.db.*;
import com.jntoo.db.utils.*;
import com.spboot.tx.mapper.*;
import com.spboot.tx.pojo.*;
import com.spboot.tx.utils.*;
import java.io.*;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.util.*;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TushuxujieService {

    @Resource
    private TushuxujieMapper mapper;

    /**
     *   根据id获取一行数据
     * @param id 主键id
     */
    public ResponseData<Tushuxujie> findById(Integer id) {
        return JsonResult.success(mapper.selectById(id));
    }

    public ResponseData<List<Tushuxujie>> selectAll(Wrapper<Tushuxujie> query) {
        return JsonResult.success(mapper.selectList(query));
    }

    public ResponseData<List<Tushuxujie>> selectAll() {
        QueryWrapper<Tushuxujie> wrapper = Wrappers.query();
        wrapper.orderByDesc("id");
        return selectAll(wrapper);
    }

    /**
     *  根据map 条件筛选数据
     *
     */
    public ResponseData selectAll(Map<String, Object> map) {
        Object objPage = map.get("page");
        Object objSize = map.get("pagesize");

        String orderby = (String) map.get("orderby");
        String sort = (String) map.get("sort");

        if (StringUtil.isNullOrEmpty(orderby)) {
            orderby = "id";
        }
        if (StringUtil.isNullOrEmpty(sort)) {
            sort = "DESC";
        }
        sort = sort.toUpperCase();
        if (!sort.equals("DESC") && !sort.equals("ASC")) {
            sort = "DESC";
        }
        if (objPage == null) {
            objPage = "1";
        }
        if (objSize == null) {
            objSize = "10";
        }
        Integer pageIndex = Integer.parseInt(objPage.toString());
        Integer pageSize = Integer.parseInt(objSize.toString());

        QueryWrapper<Tushuxujie> wrapper = mapToWrapper(map);

        if (sort.equals("DESC")) {
            wrapper.orderByDesc(orderby);
        } else {
            wrapper.orderByAsc(orderby);
        }
        return selectAll(wrapper);
    }

    /**
     *  根据map 条件筛选数据并分页
     *
     */
    public ResponseData selectPages(Map<String, Object> map) {
        Object objPage = map.get("page");
        Object objSize = map.get("pagesize");

        String orderby = (String) map.get("orderby");
        String sort = (String) map.get("sort");

        if (StringUtil.isNullOrEmpty(orderby)) {
            orderby = "id";
        }
        if (StringUtil.isNullOrEmpty(sort)) {
            sort = "DESC";
        }
        sort = sort.toUpperCase();
        if (!sort.equals("DESC") && !sort.equals("ASC")) {
            sort = "DESC";
        }
        if (objPage == null) {
            objPage = "1";
        }
        if (objSize == null) {
            objSize = "10";
        }
        Integer pageIndex = Integer.parseInt(objPage.toString());
        Integer pageSize = Integer.parseInt(objSize.toString());

        QueryWrapper<Tushuxujie> wrapper = mapToWrapper(map);

        if (sort.equals("DESC")) {
            wrapper.orderByDesc(orderby);
        } else {
            wrapper.orderByAsc(orderby);
        }
        Page page = new Page(pageIndex, pageSize);
        return selectPages(wrapper, page);
    }

    public QueryWrapper<Tushuxujie> mapToWrapper(Map<String, Object> map) {
        QueryWrapper<Tushuxujie> wrapper = Wrappers.query();

        String where = " 1=1 ";
        // 判断URL 参数tushujieyueid是否大于0
        if (!StringUtil.isNullOrEmpty(map.get("tushujieyueid")) && Convert.toInt(map.get("tushujieyueid")) > 0) {
            // 大于0 则写入条件
            wrapper.eq("tushujieyueid", map.get("tushujieyueid"));
        }
        // 以下是判断搜索框中是否有输入内容，判断是否前台是否有填写相关条件，符合则写入sql搜索语句
        if (!StringUtil.isNullOrEmpty(map.get("tushuhao"))) {
            wrapper.like("tushuhao", map.get("tushuhao"));
        }
        if (!StringUtil.isNullOrEmpty(map.get("tushumingcheng"))) {
            wrapper.like("tushumingcheng", map.get("tushumingcheng"));
        }
        if (!StringUtil.isNullOrEmpty(map.get("tushuleibie"))) {
            wrapper.eq("tushuleibie", map.get("tushuleibie"));
        }
        if (!StringUtil.isNullOrEmpty(map.get("jieyuedanhao"))) {
            wrapper.like("jieyuedanhao", map.get("jieyuedanhao"));
        }
        if (!StringUtil.isNullOrEmpty(map.get("jieyueyonghu"))) {
            wrapper.like("jieyueyonghu", map.get("jieyueyonghu"));
        }
        if (!StringUtil.isNullOrEmpty(map.get("jieyueshijian_start"))) {
            wrapper.ge("jieyueshijian", map.get("jieyueshijian_start"));
        }
        if (!StringUtil.isNullOrEmpty(map.get("jieyueshijian_end"))) {
            wrapper.le("jieyueshijian", map.get("jieyueshijian_end"));
        }
        if (!StringUtil.isNullOrEmpty(map.get("xujiedao_start"))) {
            wrapper.ge("xujiedao", map.get("xujiedao_start"));
        }
        if (!StringUtil.isNullOrEmpty(map.get("xujiedao_end"))) {
            wrapper.le("xujiedao", map.get("xujiedao_end"));
        }

        if (map.containsKey("session_name")) {
            wrapper.eq(map.get("session_name").toString(), Request.user().getUsername());
        }
        wrapper.apply(where);
        return wrapper;
    }

    /**
     * 根据map 字段筛选信息进行搜索数据
     * @param map 字段结构数据
     * @return 搜索到得数据
     */
    public ResponseData<List<Tushuxujie>> filter(Map<String, Object> map) {
        Class<Tushuxujie> aClass = Tushuxujie.class;
        com.jntoo.db.QueryWrapper<Tushuxujie> wrapper = DB.name(aClass);

        if (
            map.containsKey("limit")
        ) { // 设置行数
            wrapper.limit(map.get("limit").toString());
        } else {
            wrapper.limit(10);
        }
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            if (entry.getKey().equals("orderby")) {
                wrapper.order(entry.getValue().toString(), map.get("sort") == null ? "DESC" : String.valueOf(map.get("sort")));
            } else {
                try {
                    Field field = aClass.getField(entry.getKey());
                    if (entry.getValue() instanceof Map) {
                        Map<String, Object> val = (Map) entry.getValue();
                        wrapper.where(entry.getKey(), val.get("exp").toString(), val.get("value"));
                    } else if (entry.getValue() instanceof Collection) {
                        List<Object> collection = new ArrayList((Collection) entry.getValue());
                        wrapper.where(entry.getKey(), collection.get(0).toString(), collection.get(1));
                    } else {
                        wrapper.where(entry.getKey(), entry.getValue());
                    }
                } catch (NoSuchFieldException e) {
                    // 没有该字段就不理他了主要是判断有没有字段得
                }
            }
        }
        return JsonResult.success(wrapper.select());
    }

    public ResponseData selectPages(QueryWrapper<Tushuxujie> wrapper, IPage page) {
        Map result = new HashMap();
        result.put("lists", mapper.selectPage(page, wrapper));
        return JsonResult.success(result);
    }

    public ResponseData insert(Tushuxujie entityData, Map post) {
        Info.handlerNullEntity(entityData);

        entityData.setId(null);
        mapper.insert(entityData);
        if (entityData.getId() != null) {
            Integer charuid = entityData.getId();
            DB.execute("UPDATE tushujieyue SET guihuanshijian = '" + post.get("xujiedao") + "' WHERE id='" + post.get("tushujieyueid") + "'");

            return findById(entityData.getId());
        } else {
            return JsonResult.error("插入错误");
        }
    }

    public ResponseData<Object> update(Tushuxujie entityData, Map post) {
        mapper.updateById(entityData);

        return JsonResult.success(mapper.selectById(entityData.getId()));
    }

    public ResponseData<Object> delete(List<Integer> ids) {
        try {
            for (Integer id : ids) {
                delete(id);
            }
            return JsonResult.success("操作成功");
        } catch (Exception e) {
            return JsonResult.error("操作失败");
        }
    }

    public ResponseData<Object> delete(Integer id) {
        try {
            mapper.deleteById(id);

            return JsonResult.success("操作成功");
        } catch (Exception e) {
            return JsonResult.error("操作失败");
        }
    }
}
