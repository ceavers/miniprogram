/**
 * 接口文件   相关模块接口应写在同一对象中
 * url       请求路径
 * data      后端接收参数
 * method    请求方式  默认POST
 * use_token 请求头是否携带token
 * loading   是否使用加载动画
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("./http");
const use_token = true;
const loading = true;
exports.api = {
  login:{
    wxLogin: (data) => http_1.http({ url: '/1MmfPAi1', data, loading }),//授权登录
    login: (data) => http_1.http({ url: '/n0kKZwwm', data, use_token, loading }),//账号密码登录
    code: (data) => http_1.http({ url: '/5byuyrgV', data, method: 'GET', use_token, loading }),//获取验证码
    codeLogin: (data) => http_1.http({ url: '/A4MWden8', data, use_token, loading }),//手机验证码登录
    register: (data) => http_1.http({ url: '/fJc9kBKU', data, use_token, loading }), //注册
    submit: (data) => http_1.http({ url: '/Dw76Tl2O', data, method: 'PUT',use_token, loading }) //修改密码
  },
  user:{
    getUserInfo: (data) => http_1.http({ url: '/OqnfVseq', data, method: 'GET', use_token, loading }),
    updataInfo: (data) => http_1.http({ url: '/dbUjansf', data, method: 'PUT', use_token}),
    getCode: (data) => http_1.http({ url: '/5byuyrgV', data, method: 'GET', use_token }),
    getRoleList: (data) => http_1.http({ url: '/0u6ZAIKu', data, method: 'POST', use_token }),
    getAuthorityList: (data) => http_1.http({ url: '/STNZDIzD', data, method: 'POST', use_token }),
    addRole: (data) => http_1.http({ url: '/GdkTi9IM', data, method: 'POST', use_token })
  },
  department: {
    getEmployList: (data) => http_1.http({ url: '/PtbH5RVg', data, method: 'GET', use_token }),
    delEmploy: (data) => http_1.http({ url: '/QDnPvnrV', data, method: 'DELETE', use_token }),
    getDepartmentList: (data) => http_1.http({ url: '/bzk2rHiZ', data, method: 'GET', use_token }),
    getDepartmentInfo: (data) => http_1.http({ url: '/HnbXWful', data, method: 'GET', use_token }),
    addDepartment: (data) => http_1.http({ url: '/p0YVg0Sf', data, method: 'POST', use_token }),
    delDepartment: (data) => http_1.http({ url: '/iVnA9hmY', data, method: 'DELETE', use_token }),
    editEmploy: (data) => http_1.http({ url: '/scsdR6aZ', data, method: 'PUT', use_token }),
    addEmploy: (data) => http_1.http({ url: '/GGJG8wQM', data, method: 'POST', use_token })
  },
  market: {
    getCustomerList: (data) => http_1.http({ url: '/OJsqzMNl', data, method: 'GET', use_token }),//获取用户列表
    addCustomer: (data) => http_1.http({ url:'/JYzjhkmb', data, method: 'POST', use_token }),//添加用户
    getCustomerTypeList: (data) => http_1.http({ url: '/2TWAp11h', data, use_token }),//获取用户类型列表
    addCustomerType: (data) => http_1.http({ url: '/MmsgLI1I', data, use_token }),//添加用户类型
    delCustomerType: (data) => http_1.http({ url: '/LxUQxSPq', data, method: 'DELETE', use_token }),//删除用户类型
    getCustomerDetail: (data) => http_1.http({ url: '/7g7LlcmX', data, method: 'GET', use_token }),//获取客户详情
    getPreMoneyList: (data) => http_1.http({ url: '/9qr5Sbye', data, use_token }),//获取预付款列表
    getOrderReceivableList: (data) => http_1.http({ url: '/zPFWuyMO', data, use_token }),//获取订单应付列表
    getProductSalesList: (data) => http_1.http({ url: '/KeVh2SNN', data, method: 'GET',use_token }),//获取产品销售列表
    getCumulativeSalesList: (data) => http_1.http({ url: '/L5fdt5gV', data, use_token }),//获取累计销售列表
    getCashFlowList: (data) => http_1.http({ url: '/6coClIRA', data, use_token }),//获取收款流水信息
    getHistoricalOrder: (data) => http_1.http({ url: '/ER5Hs5PV', data, method: 'GET', use_token }),//获取历史订单列表
    getFirstClassificationList: (data) => http_1.http({ url: '/N1Y2rygw', data, method: 'GET', use_token }),//获取一级分类列表
    getHistoricalOrderScreenList: (data) => http_1.http({ url: '/UXp8tJCf', data, method: 'GET', use_token }),//获取历史订单筛选列表
    editCustomer: (data) => http_1.http({ url: '/fwhjYHSB', data, method: 'PUT', use_token }),//修改客户信息
    delCustomer: (data) => http_1.http({ url: '/fRNhwkSa', data, method: 'DELETE', use_token }),//删除客户
    getSalesReceivable: (data) => http_1.http({ url: '/T4HpaqY2', data, use_token }),//提交销售应收信息 
    getAdvanceCharge: (data) => http_1.http({ url: '/RNeh2rSy', data, use_token }),//收预付款
    getAccountList: (data) => http_1.http({ url: '/eiPM3VV6', method: 'GET', data, use_token }),//获取账户列表
    postSalesListEntry: (data) => http_1.http({ url: '/bU8mJ67K', data, use_token }),//销售单录入
    postPurchaseListEntry: (data) => http_1.http({ url: '/VWbagdtK', data ,use_token }),//采购单录入
    getSupplierList: (data) => http_1.http({ url: '/5kW8VUj4', data, method: 'GET', use_token }),//查询供应商信息
    addSupplier: (data) => http_1.http({ url: '/fV4SbQhw', data, use_token }),//添加供应商
    getSupplierPayMoney: (data) => http_1.http({ url: '/E4zoxBTK', data, method: 'GET',use_token }),//获取供应商预付款
    getSupplierShouldPayMoney: (data) => http_1.http({ url: '/im9uo6T2', data, method: 'GET', use_token }),//获取供应商应付列表
    getSupplierPurchaseHistory: (data) => http_1.http({ url: '/q9e8qN4l', data, method: 'GET', use_token }),//获取供应商历史采购信息
    getSupplierPayHistory: (data) => http_1.http({ url: '/danyuIlT', data, method: 'GET', use_token  }),//获取供应商付款记录
    editSupplier: (data) => http_1.http({ url: '/4bpuxotz', data, use_token }),//修改供应商
    payPurchaseMoney: (data) => http_1.http({ url: '/NZYAjfCq', data, use_token }),//付采购应付款 
    delSupplier: (data) => http_1.http({ url: '/aZuO9YXA', data, method: 'DELETE',use_token }),//删除供应商
    addSaleOrder: (data) => http_1.http({ url: '/4JucTPxd', data, use_token }),//添加一个销售单,销售退货单
    addPurchaseOrder: (data) => http_1.http({ url: '/ccwLlfmJ', data, use_token }),//添加一个采购单,采购退货单
    getTaxRevenue: (data) => http_1.http({ url: '/usr4LrHt', data, method: 'GET',use_token }),//是否开启税率
    editTaxRevenue: (data) => http_1.http({ url: '/DTtECJTG', data, method: 'PUT', use_token }),//修改税率
	  editOrder: (data) => http_1.http({ url: '/GJx592We', data, use_token }),//修改订单
    getPurchaseDeatil: (data) => http_1.http({ url:'/NCWp3aQM',data,method:'POST',use_token}),  //销售（开单）结果
    getProductDetail: (data) => http_1.http({ url:'/9ZW35HwL',data,method:'GET',use_token}),  //获取商品详情
    modifyOrder: (data) => http_1.http({ url:"/GJx592We",data,method:'PUT',use_token}),  //修改订单（采购单或销售单）
    deleteOrder: (data) => http_1.http({ url:'/0tekXrek',data,method:'DELETE',use_token}),  //删除商品或者采购单
    allInStorage: (data) => http_1.http({ url:'/jVceBCvQ',data,method:'PUT',use_token}),  //全部出库（入库）
    getWareHouseList: (data) => http_1.http({ url: '/9XrpXEnZ', data, method: 'GET', use_token }), //获取仓库列表
	  delOrder: (data) => http_1.http({ url: '/0tekXrek', data, method: 'DELETE', use_token }),//删除订单或商品
	  purchaseReceiptAndPaymen: (data) => http_1.http({ url:'/3EXpbPVC',data,method:'POST',use_token}),  //采购收付款
    partialStorage: (data) => http_1.http({ url:'/FwAnxRm6',data,method:'PUT',use_token}),  //部分入库（出库）
    getPurchaseOrdersList: (data) => http_1.http({ url:'/86aAVWQI',data,method:'GET',use_token}),  //获取采购单列表
    getProductSaleMes: (data) => http_1.http({ url: '/3wDSKLvi', data ,use_token }),//获取产品销售历史
  }, 

  warehouse: {
    // 获取商品总库存
    getStockInfo: (data) => http_1.http({ url: '/N07bWKAK', data, method: 'GET', use_token }),
    // 新建商品
    addGoods: (data) => http_1.http({ url: '/sJtZwtyQ', data, method: 'GET', use_token }),
    //获取类别
    getCategory: (data) => http_1.http({ url: '/I41rBruV', data, method: 'GET', use_token }),
    //获取过滤数据
    getFilterData: (data) => http_1.http({ url: '/0q6NXVJR', data, method: 'GET', use_token }),
    //获取库存列表
    getRepertoryList: (data) => http_1.http({ url: '/vB2zdhCw', data, method: 'GET', use_token }),
    //获取商品信息
    getGoodsDetail: (data) => http_1.http({ url: '/SuACMH4d', data, method: 'GET', use_token }),
    //修改商品信息
    modifyGoodsInfo: (data) => http_1.http({ url: '/rVYjwuTB', data, method: 'GET', use_token }),
    //获取单品库存信息
    getGoodsStock: (data) => http_1.http({ url: '/Y9XJV7JI', data, method: 'GET', use_token }),  
    //获取仓库列表
    getWareHouseList: (data) => http_1.http({ url: '/9XrpXEnZ', data, method: 'GET', use_token}),
    //新增类别
    addCategory: (data) => http_1.http({ url: '/MROF85Dk', data, method: 'POST', use_token }),
    //删除类别
    delCategory: (data) => http_1.http({ url: '/Jv7IFI3i', data, method: 'POST', use_token }),
    // 图片上传
    uploadImage: (data) => http_1.http({ url: '/Veiy3qU6', data, method: 'POST', use_token }),
    //创建出/入库单
    createOutInBill: (data) => http_1.http({ url: '/xCM8haPJ', data, method: 'POST', use_token }),
    //出/入库单详情
    getOutInBillDetail: (data) => http_1.http({ url: '/6Y9XOmFN', data, method: 'GET', use_token }),
    //出/入库单品
    getOutInSingle: (data) => http_1.http({ url: '/rPhJoE09', data, method: 'GET', use_token }),
    //修改备注
    editNote: (data) => http_1.http({ url: '/QOfWteDy', data, method: 'POST', use_token }),
    //创建调拨单
    createAllotBill: (data) => http_1.http({ url: '/JYFM1tVd', data, method: 'POST', use_token }),
    //调拨单详情
    getAllotBillDetail: (data) => http_1.http({ url: '/AfDyJFwf', data, method: 'GET', use_token }),
    //调拨单品信息
    getAllotSingle: (data) => http_1.http({ url: '/4VA7mnbZ', data, method: 'GET', use_token }),
    //创建盘点单
    createCheckBill: (data) => http_1.http({ url: '/gz6JsiyE', data, method: 'POST', use_token }),
    //盘点单详情
    getCheckBillDetail: (data) => http_1.http({ url: '/cSLHnccy', data, method: 'GET', use_token }),
    //盘点调库
    checkdeStocktaking: (data) => http_1.http({ url: '/TLVPiBiy', data, method: 'POST', use_token }),
    //盘点单品信息
    getCheckSingle: (data) => http_1.http({ url: '/Qq5Z2oZM', data, method: 'GET', use_token }),
    //删除盘点单品
    deleteCheckSingle: (data) => http_1.http({ url: '/p3krdYp7', data, method: 'DELETE', use_token }),
    //修改盘点单品
    editCheckSingle: (data) => http_1.http({ url: '/0iurrxEy', data, method: 'POST', use_token }),
	  // 销售历史
    getSaleDetail: (data) => http_1.http({ url: '/xjkqckXd', data, method: 'GET', use_token }),
    // 客户销售
    getClientSale: (data) => http_1.http({ url: '/GgXy8ZkK', data, method: 'GET', use_token }),
    // 月度销售
    getMonthlySale: (data) => http_1.http({ url: '/LgqUyQN4', data, method: 'GET', use_token }),
    //仓库详情
    getStorageDetail: (data) => http_1.http({ url: '/UvwcI59s', data, method: 'GET', use_token }),
    //删除仓库
    deleteStorage: (data) => http_1.http({ url: '/ZEhMS94d', data, method: 'DELETE', use_token }),
    //部门列表
    getDepartmentList: (data) => http_1.http({ url: '/wD1Y3HHa', data, method: 'GET', use_token }),
    //修改仓库
    editStorage: (data) => http_1.http({ url: '/mr62wAzK', data, method: 'PUT', use_token }),
    //新建仓库
    createStorage: (data) => http_1.http({ url: '/aBVC1LxK', data, method: 'POST', use_token }),
	  //修改库存
    editGoodsStock: (data) => http_1.http({ url: '/Xhk1gnbn', data, method: 'POST', use_token }),
    //枚举属性列表
    enumCateList: (data) => http_1.http({ url: '/cv4M8qEW', data, method: 'GET', use_token }),
    //删除商品
    deleteGoods: (data) => http_1.http({ url: '/FE6ETve8', data, method: 'DELETE', use_token }),
    //出入库列表
    getOutInStockList: (data) => http_1.http({ url: '/IjmXq5Jd', data, method: 'GET', use_token }),
    //调拨单列表
    getAllotList: (data) => http_1.http({ url: '/nXzsFi28', data, method: 'GET', use_token }),
    //盘点单列表
    getCheckList: (data) => http_1.http({ url: '/GoAN1kKa', data, method: 'GET', use_token }),
  },
  warehouse2:{
    getWarehouse: (data) => http_1.http({ url: '/q55qt4Gg', data, method: 'POST', use_token }),
    getRefund: (data) => http_1.http({ url: '/YUBoozfL', data, method: 'PUT', use_token }),
  },
  sellInvoice:{
    getSellInvoiceList: (data) => http_1.http({ url: '/TIvmSXJF', data, method: 'GET'}),//获取销售单列表
  },
  finance:{
    getFinanceList: (data) => http_1.http({ url: '/dohfX2sH', data, method: 'GET', use_token }),//财务列表
    getIncomeList: (data) => http_1.http({ url: '/eFMKOIcl', data, method: 'GET', use_token }),//记收入
    getXlList: (data) => http_1.http({ url: '/upfWBSxR', data, method: 'GET', use_token }),//小类
    newBgList: (data) => http_1.http({ url: '/h817cGyJ', data, method: 'POST', use_token }),//新增大类
    removeBgList: (data) => http_1.http({ url: '/VmN2Vk7r', data, method: 'DELETE', use_token }),//删除大类
    newSList: (data) => http_1.http({ url: '/6HQIL2XJ', data, method: 'POST', use_token }),//新增小类
    removeSList: (data) => http_1.http({ url: '/tVqvFIBR', data, method: 'DELETE', use_token }),//删除小类
    outlayList: (data) => http_1.http({ url: '/LJV8zrec', data, method: 'GET', use_token }),//支出列表
    outsList: (data) => http_1.http({ url: '/1A6HuNQp', data, method: 'GET', use_token }),//支出列表
    newoutBList: (data) => http_1.http({ url: '/tAtz74UE', data, method: 'POST', use_token }),//新增支出大类
    newoutSList: (data) => http_1.http({ url: '/33jC5o0e', data, method: 'POST', use_token }),//新增支出大类
    removeoutBgList: (data) => http_1.http({ url: '/vHMS4y4y', data, method: 'DELETE', use_token }),//删除支出大类
    removeoutSmList: (data) => http_1.http({ url: '/6hBDphw1', data, method: 'DELETE', use_token }),//删除支出小类
    borrowList: (data) => http_1.http({ url: '/fT4n1bMf', data, method: 'GET', use_token }),//借入借出列表
    borrowNew: (data) => http_1.http({ url: '/DbpqD7YF', data, method: 'POST', use_token }),//借入借出新增
    borrowSx: (data) => http_1.http({ url: '/6OIWLGFw', data, method: 'GET', use_token }),//借入借出筛选
    borrowCx: (data) => http_1.http({ url: '/Ua5yqsFr', data, method: 'GET', use_token }),//借入借出查询
    indexList: (data) => http_1.http({ url: '/rbSMr7hh', data, method: 'GET', use_token }),//应付款列表
    busList: (data) => http_1.http({ url: '/yD2Zqykv', data, method: 'GET', use_token }),//应付款列表
    busListXQ:(data) => http_1.http({ url: '/Jukg7vOP', data, method: 'GET', use_token }),//应付款详情
    busListCX: (data) => http_1.http({ url: '/tTyPfRLr', data, method: 'GET', use_token }),//应付款查询
    bkpList: (data) => http_1.http({ url: '/rbSMr7hh', data, method: 'GET', use_token }),//应收款列表
    bkpListCX: (data) => http_1.http({ url: '/1jhpavci', data, method: 'GET', use_token }),//应收款查询
    bkpListXQ: (data) => http_1.http({ url: '/uFhuFbnG', data, method: 'GET', use_token }),//应收款详情
    bkpListSXL: (data) => http_1.http({ url: '/TLFVOYZn', data, method: 'GET', use_token }),//应收款筛选
    bkpListSX: (data) => http_1.http({ url: '/0xpiciBb', data, method: 'GET', use_token }),//应收款筛选列表
  },
  purchaseInvoice:{
    getPurchaseInvoiceList: (data) => http_1.http({ url: '/86aAVWQI', data, method: 'GET' }),//获取销售单列表
  },
  finance2:{
    //获取收支记账列表
    getInoutList: (data) => http_1.http({ url: '/cUnVnzcg', data, method: 'GET', use_token}),
    //获取收支记账详情
    getInoutDetail: (data) => http_1.http({ url:'/D3b7XT20',data,method:'GET',use_token}),
    //收支筛选
    selectInout: (data) => http_1.http({ url: "/bGxPMN3s", data, method: 'GET', use_token}),
    //点击记收入大类显示下面的小类
    clickFirCateToSecCate: (data) => http_1.http({ url: '/UJVu86Jf', data, method: 'GET', use_token}),
    //获取借入借出列表
    getLoanList: (data) => http_1.http({ url:'/fT4n1bMf',data,method:'GET',use_token}),

    //借入借出详情
    getLoanDeatil: (data) => http_1.http({ url:'/yGGIls2f',data,method:'GET',use_token}),

    //转账列表
    transferList: (data) => http_1.http({ url:'/JpMmJmSb',data,method:'GET',use_token}),

    //转账详情
    getTransferDetail: (data) => http_1.http({ url:'/hG7BTCPz',data,method:'GET',use_token}),

    //转账新增
    addTransfers: (data) => http_1.http({ url:'/GMpSWmFM',data,method:'POST',use_token}),

    //查看流水列表
    getJournalList: (data) => http_1.http({ url:'/S1gxCBTo',data,method:'GET',use_token}),
    //查看流水详情
    getJournalDeatil: (data) => http_1.http({ url:'/yHGVzhml',data,method:'GET',use_token}),

    //收支查询
    getRevenue: (data) => http_1.http({
      url:'/iRzZsB0X',method:'GET',use_token
    }),

    //借入借出查询
    getLoan: (data) => http_1.http({ url:'/Ua5yqsFr',data,method:'GET',use_token}),

    //借入借出筛选
    selectRevenue: (data) => http_1.http({ url:'/6OIWLGFw',data,method:'GET',use_token}),

    //借入借出删除
    delRevnue: (data) => http_1.http({ url:'/52Rs1U6A',data,method:'DELETE',use_token}),

    //借入借出修改备注
    modifyBeizhu: (data) => http_1.http({ url:'/D8J0o4o0',data,method:'PUT',use_token}),

    //借入借出修改金额
    modifyMoney: (data) => http_1.http({ url:'/04dDV3Ck',data,method:'PUT',use_token}),

    //账户列表查询 可弹框
    getAccountList: (data) => http_1.http({ url:'/eiPM3VV6',data,method:'GET',use_token}),

    //转账筛选
    selectTransfer: (data) => http_1.http({ url:'/xu4vFrKG',data,method:'GET',use_token}),

    //转账查询
    getTransfer: (data) => http_1.http({ url:'/mlwoMTq7',method:'GET',use_token}),

    //员工列表查询
    getStaff: (data) => http_1.http({ url:'/PtbH5RVg',data,method:'GET',use_token}),

    //删除收支列表
    delRevenueList: (data) => http_1.http({ url:'/lwCCx253',data,method:'DELETE',use_token}),

    //收支类别查询
    getInOutList: (data) => http_1.http({ url:'/76z6ZmHz',data,method:'POST',use_token}),

    //固定资产列表
    getFixedList: (data) => http_1.http({ url:'/i9Ffp05H',data,method:'GET',use_token}),

    //固定资产详情
    getFixedDeatil: (data) => http_1.http({ url:'/ScDlwGeY',data,method:'GET',use_token}),

    //新增固定资产
    addFixedAssets: (data) => http_1.http({ url:'/2Jx2p1Nk',data,method:'POST',use_token}),

    //用户个人信息
    getMemberInfo: (data) => http_1.http({ url:'/OqnfVseq',data,method:'GET',use_token}),

    //固定资产种类增加
    addFixedAssetsCate: (data) => http_1.http({ url:'/lzGW4XkG',data,method:'POST',use_token}),

    //固定资产种类删除
    delFixedAssetsCate: (data) => http_1.http({ url:'/O8fCDGea',data,method:'DELETE',use_token}),

    //固定资产种类修改
    modifyFixedAssetsCate: (data) => http_1.http({ url:'/cYjCjTkO',data,method:'PUT',use_token}),

    //获取固定资产种类列表
    getFixedAssetsCateList: (data) => http_1.http({ url:'/9LzYwSvV',data,method:'GET',use_token}),

    //固定资产删除
    delFixedAssets: (data) => http_1.http({ url:'/gSWGQPFU',data,method:'DELETE',use_token}),

    //固定资产报废
    announceFixedAssets: (data) => http_1.http({ url:'/Ay7WgiTG',data,method:'PUT',use_token}),

    //固定资产闲置
    unusedFixedAssets: (data) => http_1.http({ url:'/AN7yairG',data,method:'PUT',use_token}),

    //固定资产移交
    transferFixedAssets: (data) => http_1.http({ url:'/OSLbyUPl',data,method:'PUT',use_token}),

    //固定资产修改
    modifyFixedAssets: (data) => http_1.http({ url:'/NGrA4Mc9',data,method:'PUT',use_token}),

    //固定资产查询
    queryFixedAssets: (data) => http_1.http({ url:'/2IbBKbwn',data,method:'GET',use_token}),

    //固定资产筛选
    selectFixedAssets: (data) => http_1.http({ url:'/6H1P9OAl',data,method:'GET',use_token}),

    //账户详情
    getAccountDetail: (data) => http_1.http({ url:'/9kDeedDM',data,method:'PUT',use_token}),

    //账户新增
    addAccount: (data) => http_1.http({ url:"/qqISq3PN",data,method:'POST',use_token}),

    //账户修改
    modifyAccount: (data) => http_1.http({ url:'/pG1haguk',data,method:'PUT',use_token}),

    //部门列表
    getBranchList: (data) => http_1.http({ url:'/bzk2rHiZ',data,method:'GET',use_token}),

    //账户删除
    delAccount: (data) => http_1.http({ url:"/4ofjFMLR",data,method:'DELETE',use_token}),

    //流水列表
    getTourList: (data) => http_1.http({ url:'/S1gxCBTo',data,method:'GET',use_token}),

    //流水详情
    getTourDetail: (data) => http_1.http({ url:'/yHGVzhml',data,method:'GET',use_token}),

    //流水查询
    queryElow: (data) => http_1.http({ url:'/uVIDgXG8',data,method:'GET',use_token}),
  },
	report:{
    // 获取热销商品列表
    getHotGoodsList: (data) => http_1.http({ url: '/MZIRUcW6', data, method: 'GET', use_token }),
    // 获取热销商品详细信息
    getHotGoodsInfo: (data) => http_1.http({ url: '/WHwSAK5G', data, method: 'GET', use_token }),
    // 获取采购月报
    getMonthNews: (data) => http_1.http({ url: '/Q626aV10', data, method: 'GET', use_token }),
    // 获取销售报表
    getSaleNews: (data) => http_1.http({ url: '/GuhNsY96', data, method: 'GET', use_token }),
    // 获取绩效列表
    getPerformanceList: (data) => http_1.http({ url: '/rocup83h', data, method: 'GET', use_token }),
    // 获取个人绩效信息
    getPerformanceInfo: (data) => http_1.http({ url: '/9vSjYGGC', data, method: 'GET', use_token }),
    //获取客户统计列表
    getCustomerStatisticsList: (data) => http_1.http({ url: '/Xm7Zxwvd', data, method: 'GET', use_token }),
    //获取客户统计详情
    getCustomerStatisticsInfo: (data) => http_1.http({ url: '/Om5MRA39', data, method: 'GET', use_token }),
    //获取供应商报表
    getSupplierReport: (data) => http_1.http({ url: '/76PdO9OV', data, method: 'GET', use_token }),
    //获取费用统计
    getStatisticsData: (data) => http_1.http({ url: '/lWavQUUh', data, method: 'GET', use_token }),
    //获取费用统计 全年
    getStatisticsDataByYear: (data) => http_1.http({ url: '/D7LzbAxV', method: 'GET', use_token }),
    //获取费用统计详情
    getStatisticsDetail: (data) => http_1.http({ url: '/okGTUk1b', data, method: 'GET', use_token }),
    //出入库金额
    getOutInMoney: (data) => http_1.http({ url: '/9OMOM3PY', data, method: 'GET', use_token }),
    //出入库金额详情
    getOutInMoneyDetail: (data) => http_1.http({ url: '/3ShiABhW', data, method: 'POST', use_token }),
    //获取商品入库列表
  	getPushGoodsList: (data) => http_1.http({ url: '/dSQ7JLjG', data, method: 'GET', use_token }),
    // 获取商品入库详情
    getPushGoodsInfo: (data) => http_1.http({ url: '/Cyf6QpKl', data, method: 'GET', use_token }),
    //获取出入库报表
    getMonthlyPurchase: (data) => http_1.http({ url: '/sJuQRdPt', data, method: 'GET', use_token }),
    //获取存货统计列表
    getStockStatisticsList: (data) => http_1.http({ url: '/JfTAJ1n2', data, method: 'GET', use_token }),
    //获取存货统计详情
    getStockStatisticsInfo: (data) => http_1.http({ url: '/8yK5Btuy', data, method: 'GET', use_token }),
    //获取仓库统计列表
    getWarehouseStatisticsList: (data) => http_1.http({ url: '/yoE42pDK', data, method: 'GET', use_token }),
    //获取仓库统计详情
    getWarehouseStatisticsInfo: (data) => http_1.http({ url: '/PloGDNSx', data, method: 'POST', use_token }),
    //获取商品出入库列表
    getDepositGoodsList: (data) => http_1.http({ url: '/dSQ7JLjG', data, method: 'POST', use_token }),
    // 获取商品出入库详情
    getDepositGoodsInfo: (data) => http_1.http({ url: '/Cyf6QpKl', data, method: 'GET', use_token }),
    //现金流量
    getCashFlow: (data) => http_1.http({ url: '/j0gXzBP3', data, method: 'GET', use_token }),
    //现金流量年度概要
    getCashFlowByYear: (data) => http_1.http({ url: '/evkq3V3V', method: 'GET', use_token }),
    //采购入库商品列表
    getPurchaseGoodsList: (data) => http_1.http({ url: '/0DK5dLqy', data, method: 'GET', use_token }),
    //采购入库商品详情
    getPurchaseGoodsDetail: (data) => http_1.http({ url: '/yG5syVPM', data, method: 'GET', use_token }),
	}
};