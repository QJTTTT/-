
declare interface EModuleForm<T>{
    form:T;
}

declare interface EModuleReadForm<T,R>{
    form:T;
    readMap:R;
}



declare interface ELunbotu {
    // 标题 。
    title?:string;
    // 图片 。
    image?:string;
    // 连接地址 。
    url?:string;
        
}

declare type ELunbotuForm = EModuleForm<ELunbotu>;
declare interface EAdmins {
    // 帐号 。
    username?:string;
    // 密码 。
    pwd?:string;
        
}

declare type EAdminsForm = EModuleForm<EAdmins>;
declare interface EYonghu {
    // 用户名 。
    yonghuming?:string;
    // 密码 。
    mima?:string;
    // 姓名 。
    xingming?:string;
    // 性别 。
    // 可选项:男,女。
    xingbie?:string;
    // 手机 。
    shouji?:string;
    // 简介 。
    jianjie?:string;
    // 头像 。
    touxiang?:string;
    // openid 。
    openid?:string;
        
}

declare type EYonghuForm = EModuleForm<EYonghu>;
declare interface ETushuzhonglei {
    // 分类名称 。
    fenleimingcheng?:string;
        
}

declare type ETushuzhongleiForm = EModuleForm<ETushuzhonglei>;
declare interface ETushuxinxi {
    // 图书号 。
    tushuhao?:string;
    // 图书名称 。
    tushumingcheng?:string;
    // 图书类别 。
    tushuleibie?:number;
    // 图片 。
    tupian?:string;
    // 借阅金额 。
    jieyuejine?:number;
    // 图书库存 。
    tushukucun?:number;
    // ISBN号 。
    isbnhao?:string;
    // 作者 。
    zuozhe?:string;
    // 出版社 。
    chubanshe?:string;
    // 借阅次数 。
    jieyuecishu?:number;
    // 简介 。
    jianjie?:string;
            // 图书借阅的数量。
    tushujieyueCount?:number;
    // 图书采购的数量。
    tushucaigouCount?:number;
    // 图书报损的数量。
    tushubaosunCount?:number;
    // 浏览记录的数量。
    liulanjiluCount?:number;

}

declare type ETushuxinxiForm = EModuleForm<ETushuxinxi>;
declare interface ETushujieyue {
    // 图书信息id 。
    tushuxinxiid?:number;
    // 图书号 。
    tushuhao?:string;
    // 图书名称 。
    tushumingcheng?:string;
    // 图书类别 。
    tushuleibie?:number;
    // 图片 。
    tupian?:string;
    // 作者 。
    zuozhe?:string;
    // 出版社 。
    chubanshe?:string;
    // 借阅金额 。
    jieyuejine?:number;
    // 借阅单号 。
    jieyuedanhao?:string;
    // 借阅时间 。
    jieyueshijian?:string;
    // 归还时间 。
    guihuanshijian?:string;
    // 姓名 。
    xingming?:string;
    // 电话 。
    dianhua?:string;
    // 借阅用户 。
    jieyueyonghu?:string;
    // 借阅状态 。
    // 可选项:借阅成功,已归还。
    jieyuezhuangtai?:"借阅成功"|"已归还";
            // 图书续借的数量。
    tushuxujieCount?:number;
    // 借阅归还的数量。
    jieyueguihuanCount?:number;

}

declare type ETushujieyueForm = EModuleReadForm<ETushujieyue,ETushuxinxi>;
declare interface ETushuxujie {
    // 图书借阅id 。
    tushujieyueid?:number;
    // 图书号 。
    tushuhao?:string;
    // 图书名称 。
    tushumingcheng?:string;
    // 图书类别 。
    tushuleibie?:number;
    // 借阅单号 。
    jieyuedanhao?:string;
    // 借阅用户 。
    jieyueyonghu?:string;
    // 借阅时间 。
    jieyueshijian?:string;
    // 归还时间 。
    guihuanshijian?:string;
    // 续借到 。
    xujiedao?:string;
    // 续借备注 。
    xujiebeizhu?:string;
        
}

declare type ETushuxujieForm = EModuleReadForm<ETushuxujie,ETushujieyue>;
declare interface EJieyueguihuan {
    // 图书借阅id 。
    tushujieyueid?:number;
    // 图书号 。
    tushuhao?:string;
    // 图书名称 。
    tushumingcheng?:string;
    // 图书类别 。
    tushuleibie?:number;
    // 图片 。
    tupian?:string;
    // 作者 。
    zuozhe?:string;
    // 出版社 。
    chubanshe?:string;
    // 借阅单号 。
    jieyuedanhao?:string;
    // 借阅时间 。
    jieyueshijian?:string;
    // 姓名 。
    xingming?:string;
    // 电话 。
    dianhua?:string;
    // 借阅用户 。
    jieyueyonghu?:string;
    // 借阅金额 。
    jieyuejine?:number;
    // 归还时间 。
    guihuanshijian?:string;
    // 实际归还时间 。
    shijiguihuanshijian?:string;
    // 借阅天数 。
    jieyuetianshu?:number;
    // 借阅费用 。
    jieyuefeiyong?:number;
    // 超时罚金 。
    chaoshifajin?:number;
    // 总费用 。
    zongfeiyong?:number;
    // 是否准时 。
    // 可选项:准时,超时。
    shifouzhunshi?:"准时"|"超时";
        iszf?:string;

}

declare type EJieyueguihuanForm = EModuleReadForm<EJieyueguihuan,ETushujieyue>;
declare interface EPinglun {
    // 表 。
    biao?:string;
    // 表id 。
    biaoid?:number;
    // 标题 。
    biaoti?:string;
    // 评分 。
    pingfen?:number;
    // 评论内容 。
    pinglunneirong?:string;
    // 评论人 。
    pinglunren?:string;
    // 评论时间 。
    addtime?:string;
        
}

declare type EPinglunForm = EModuleForm<EPinglun>;
declare interface ETousujianyi {
    // 姓名 。
    xingming?:string;
    // 联系电话 。
    lianxidianhua?:string;
    // 反馈类型 。
    // 可选项:投诉,建议。
    fankuileixing?:"投诉"|"建议";
    // 反馈内容 。
    fankuineirong?:string;
    // 反馈用户 。
    fankuiyonghu?:string;
    // 反馈状态 。
    // 可选项:待回复,已回复。
    fankuizhuangtai?:"待回复"|"已回复";
    // 反馈时间 。
    addtime?:string;
    // 反馈回复 。
    fankuihuifu?:string;
    // 回复时间 。
    huifushijian?:string;
        
}

declare type ETousujianyiForm = EModuleForm<ETousujianyi>;
declare interface ETushucaigou {
    // 图书信息id 。
    tushuxinxiid?:number;
    // 图书号 。
    tushuhao?:string;
    // 图书名称 。
    tushumingcheng?:string;
    // 图书类别 。
    tushuleibie?:number;
    // 采购编号 。
    caigoubianhao?:string;
    // 供应商 。
    gongyingshang?:string;
    // 采购价格 。
    caigoujiage?:number;
    // 采购数量 。
    caigoushuliang?:number;
    // 采购小计 。
    caigouxiaoji?:number;
    // 采购备注 。
    caigoubeizhu?:string;
    // 经手人 。
    jingshouren?:string;
    // 采购时间 。
    addtime?:string;
        
}

declare type ETushucaigouForm = EModuleReadForm<ETushucaigou,ETushuxinxi>;
declare interface ETushubaosun {
    // 图书信息id 。
    tushuxinxiid?:number;
    // 图书号 。
    tushuhao?:string;
    // 图书名称 。
    tushumingcheng?:string;
    // 图书类别 。
    tushuleibie?:number;
    // 报损编号 。
    baosunbianhao?:string;
    // 报损数量 。
    baosunshuliang?:number;
    // 报损说明 。
    baosunshuoming?:string;
    // 经手人 。
    jingshouren?:string;
    // 报损时间 。
    addtime?:string;
        
}

declare type ETushubaosunForm = EModuleReadForm<ETushubaosun,ETushuxinxi>;
declare interface EShoucang {
    // 用户 。
    username?:string;
    // 关联表id 。
    xwid?:number;
    // 关联表 。
    biao?:string;
    // 标题 。
    biaoti?:string;
    // 收藏时间 。
    addtime?:string;
        
}

declare type EShoucangForm = EModuleForm<EShoucang>;
declare interface ELiulanjilu {
    // 图书信息id 。
    tushuxinxiid?:number;
    // 图书号 。
    tushuhao?:string;
    // 图书名称 。
    tushumingcheng?:string;
    // 图书类别 。
    tushuleibie?:number;
    // 浏览用户 。
    liulanyonghu?:string;
    // 浏览时间 。
    addtime?:string;
        
}

declare type ELiulanjiluForm = EModuleReadForm<ELiulanjilu,ETushuxinxi>;


declare interface EResponseData<T>{
    // 为0 表示成功，其他表示错误码
    code:number;
    // 错误信息
    msg:string;
    // 数据
    data:T;
}
