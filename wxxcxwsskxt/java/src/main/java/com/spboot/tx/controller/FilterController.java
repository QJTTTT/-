package com.spboot.tx.controller;

import com.jntoo.db.DB;
import com.jntoo.db.utils.Convert;
import com.jntoo.db.utils.StringUtil;


import com.spboot.tx.filter.CollaborativeFiltering;
import com.spboot.tx.pojo.*;

import com.spboot.tx.utils.JsonResult;
import com.spboot.tx.utils.ResponseData;
import com.spboot.tx.utils.SessionFactory;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Api(tags = { "协同过滤控制器" })
@RestController
@RequestMapping("/api/filter")
public class FilterController {

    @Resource
    private HttpServletRequest request;

    @Resource
    private HttpServletResponse response;

    @ApiOperation(value = "获取全部管理员", httpMethod = "GET")
    @RequestMapping("/selectAll")
    public ResponseData<Object> selectAll() {
        int size = 6;
        List result;
        if(SessionFactory.get() != null && !StringUtil.isNullOrEmpty(SessionFactory.getUsername())){
            // 搜索表
            String wupinbiao = "tushuxinxi";


            List<Yonghu> select1 = DB.name(Yonghu.class).order("id asc").select();
            List<Tushuxinxi> xinwenxinxiList = DB.name(Tushuxinxi.class).order("id asc").select();
            List<Pinglun> pinglunList = DB.name(Pinglun.class).order("id desc").select();
            List<Shoucang> shoucangList = DB.name(Shoucang.class).order("id asc").select();


            List<CollaborativeFiltering.UserProductData> dataList = new ArrayList();
            CollaborativeFiltering cf = new CollaborativeFiltering();
            for (Yonghu map : select1) {

                String username1 = map.getYonghuming();

                for (Tushuxinxi xinwenxinxi : xinwenxinxiList) {
                    CollaborativeFiltering.UserProductData data = new CollaborativeFiltering.UserProductData();
                    data.userId = map.getId();
                    data.productId = xinwenxinxi.getId();
                    data.liulancishu = Long.valueOf(DB.name("liulanjilu").where("tushuxinxiid" , data.productId).where("liulanyonghu",username1).count()).intValue();
                    if(data.liulancishu == 0){
                        continue;
                    }
                    for (Pinglun pinglun : pinglunList) {
                        if(pinglun.getBiaoid().intValue() == xinwenxinxi.getId().intValue() && pinglun.getPinglunren().equals(username1))
                        {
                            data.pinglun = Convert.toInt( pinglun.getPingfen() );
                            break;
                        }
                    }
                    for (Shoucang shoucang : shoucangList) {
                        if(shoucang.getXwid().intValue() == xinwenxinxi.getId().intValue() && shoucang.getUsername().equals(username1))
                        {
                            data.shoucang = 1;
                            break;
                        }
                    }
//
                    dataList.add(data);
                }

            }

            // 构建用户-商品评分矩阵
            Map<Integer, Map<Integer, Double>> userItemMatrix = CollaborativeFiltering.buildUserItemMatrix(dataList);

            // 打印评分矩阵，查看每个用户对商品的评分
            CollaborativeFiltering.printMatrix(userItemMatrix);

            // 为用户推荐商品
            List<Integer> ids = CollaborativeFiltering.recommendItems(userItemMatrix, SessionFactory.getId(), size);

            CollaborativeFiltering.printRecommendations(ids);
            String where = " 1=1 ";
            String notWhere = " 1=1 ";


            if(ids.size() > 0){
                where += " and id in("+ StringUtil.join("," , ids) +") ";
                notWhere += " and id not in("+ StringUtil.join("," , ids) +") ";
            }

            result = DB.name(wupinbiao).where(where).limit(size).order("rand()").select();
            if(result.size() < size){
                result.addAll(DB.name(wupinbiao).limit(size-result.size()).where(notWhere).order("rand()").select());
            }
            // 获取推荐数据
        }else{
            result = DB.name("tushuxinxi")
                    .limit(size)


                    .order("rand()")
                    .select();
        }
        return JsonResult.success(result);
    }





}
