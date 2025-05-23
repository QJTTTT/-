package com.spboot.tx.controller;

import com.jntoo.db.DB;
import com.spboot.tx.pojo.*;
import com.spboot.tx.utils.*;
import io.swagger.annotations.Api;
import java.util.*;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = { "支付" })
@RestController
@RequestMapping("/api")
public class PaymentController {

    @Resource
    HttpServletRequest request;

    /**
     * 处理支付
     * @return String
     */
    @RequestMapping("/payment")
    @ResponseBody
    public ResponseData payment() {
        String id, biao;
        if (request.getParameter("out_trade_no") != null) {
            String[] out_trade_no = request.getParameter("out_trade_no").split("\\-");
            id = out_trade_no[2];
            biao = out_trade_no[1];
        } else {
            id = request.getParameter("id");
            biao = request.getParameter("biao");
        }

        String sql = "update " + biao + " set iszf='是' where id='" + id + "'";
        DB.execute(sql);

        if ("jieyueguihuan".equals(biao)) {
            Jieyueguihuan order = DB.name(Jieyueguihuan.class).find(id);
           // DB.execute("UPDATE tushujieyue SET jieyuezhuangtai = '已归还' WHERE id='" + order.getTushujieyueid() + "'");

            DB.execute("UPDATE tushuxinxi SET tushukucun = tushukucun+1 WHERE tushuhao='" + order.getTushuhao() + "'");
        }

        return JsonResult.success("ok");
    }
}
