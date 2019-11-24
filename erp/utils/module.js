/**
 * title tarbar标题
 * settingTitle 设置标题
 * edit 是否可编辑
 * checked 是否选中
 * url 路由地址
 * src 图片地址
 */
const manageModule = [
  {
    id:0,
    title:'销售',
    settingTitle:'销售自定义',
    checked:true,
    modules: [
      {
        text:'客户',
        src:'/images/market-cus.png',
        url:'/market/pages/customer/customer',
        edit: true,
        checked:true
      },
      {
        text: '销售单',
        src: '/images/market-ticket.png',
        url: '/market/pages/order_select/order_select?type=sale',
        edit: true,
        checked: true
      },
      {
        text: '采购单',
        src: '/images/market-purchase.png',
        url: '/market/pages/order_select/order_select?type=purchase',
        edit: true,
        checked: true
      },
      {
        text: '拍照开单',
        src: '/images/market-photo.png',
        url: '',
        edit: true,
        checked: true
      },
      {
        text: '供应商',
        src: '/images/market-supplier.png',
        url: '/market/pages/supplier_mes_list/supplier_mes_list',
        edit: true,
        checked: true
      },
      {
        text: '销售退货',
        src: '/images/market-return.png',
        url: '/market/pages/order_select/order_select?type=saleRefund',
        edit: true,
        checked: true
      },
      {
        text: '采购退货',
        src: '/images/market-preturn.png',
        url: '/market/pages/order_select/order_select?type=purchaseRefund',
        edit: true,
        checked: true
      },
      {
        text: '单据',
        src: '/images/module-bills.png',
        url: '/market/pages/business_invoice/business_invoice',
        edit: false,
        checked: true
      }
    ]
  },
  {
    id: 1,
    title:'统计报表',
    settingTitle: '报表自定义',
    checked: true,
    modules:[
      {
        text: '销售报表',
        src: '/images/re-sale.png',
        url: '/report/pages/sale_news/sale_news',
        edit: true,
        checked: true
      },
      {
        text: '热销商品',
        src: '/images/re-goods.png',
        url: '/report/pages/hot_goods/hot_goods',
        edit: true,
        checked: true
      },
      {
        text: '采购月报',
        src: '/images/re-purchase.png',
        url: '/report/pages/month_ news/month_ news',
        edit: true,
        checked: true
      },
      {
        text: '个人绩效',
        src: '/images/re-performance.png',
        url: '/report/pages/personal_performance/personal_performance',
        edit: true,
        checked: true
      },
      {
        text: '客户统计',
        src: '/images/re-cus.png',
        url: '/report/pages/customer_statistics/customer_statistics',
        edit: true,
        checked: true
      },
      {
        text: '供应商报表',
        src: '/images/re-apply.png',
        url: '/report/pages/supplier_report/supplier_report',
        edit: true,
        checked: true
      },
      {
        text: '销售出库报表',
        src: '/images/re-saleo.png',
        url: '/report/pages/sales_outbound_report/sales_outbound_report',
        edit: true,
        checked: true
      },
      {
        text: '销售出库商品',
        src: '/images/re-saleg.png',
        url: '/report/pages/sales_outbound/sales_outbound',
        edit: true,
        checked: true
      },
      {
        text: '采购入库月报',
        src: '/images/re-pur.png',
        url: '/report/pages/monthly_purchase/monthly_purchase',
        edit: true,
        checked: true
      },
      {
        text: '采购入库商品',
        src: '/images/re-in.png',
        url: '/report/pages/purchase_goods/purchase_goods',
        edit: true,
        checked: false
      },
      {
        text: '费用统计',
        src: '/images/re-cost.png',
        url: '/report/pages/cost_statistics/cost_statistics',
        edit: true,
        checked: false
      },
      {
        text: '现金流量',
        src: '/images/re-m.png',
        url: '/report/pages/cash_flow/cash_flow',
        edit: true,
        checked: false
      },
      {
        text: '出库金额',
        src: '/images/re-outm.png',
        url: '/report/pages/outbound_amount/outbound_amount',
        edit: true,
        checked: false
      },
      {
        text: '商品出库',
        src: '/images/re-out.png',
        url: '/report/pages/outbound_statistics/outbound_statistics',
        edit: true,
        checked: false
      },
      {
        text: '入库金额',
        src: '/images/re-inm.png',
        url: '/report/pages/amount_inventory/amount_inventory',
        edit: true,
        checked: false
      },
      {
        text: '商品入库',
        src: '/images/re-ins.png',
        url: '/report/pages/library_statistics/library_statistics',
        edit: true,
        checked: false
      },
      {
        text: '仓库统计',
        src: '/images/re-stock.png',
        url: '/report/pages/warehouse_statistics/warehouse_statistics',
        edit: true,
        checked: false
      },
      {
        text: '存货统计',
        src: '/images/re-sg.png',
        url: '/report/pages/inventory_statistics/inventory_statistics',
        edit: true,
        checked: false
      }
    ]
  },
  {
    id: 2,
    title:'财务',
    settingTitle: '财务自定义',
    checked: true,
    modules: [
      {
        text: '记收入',
        src: '/images/cw-in.png',
        url: '/finance/pages/income/income',
        edit: true,
        checked: true
      },
      {
        text: '记支出',
        src: '/images/cw-out.png',
        url: '/finance/pages/expenditure/expenditure',
        edit: true,
        checked: true
      },
      {
        text: '账户',
        src: '/images/cw-account.png',
        url: '/finance/pages/bus_accounts/bus_accounts',
        edit: true,
        checked: true
      },
      {
        text: '应收款',
        src: '/images/cw-gathering.png',
        url: '/finance/pages/finance_bkp/finance_bkp',
        edit: true,
        checked: true
      },
      {
        text: '应付款',
        src: '/images/cw-pay.png',
        url: '/finance/pages/bus_list/bus_list',
        edit: true,
        checked: true
      },
      {
        text: '转账',
        src: '/images/cw-to.png',
        url: '/finance/pages/bus_transfer/bus_transfer',
        edit: true,
        checked: true
      },
      {
        text: '借入借出',
        src: '/images/cw-br.png',
        url: '/finance/pages/borrow_list/borrow_list',
        edit: true,
        checked: true
      },
      {
        text: '固定资产',
        src: '/images/cw-gd.png',
        url: '/finance/pages/bus_fixed_assets/bus_fixed_assets',
        edit: true,
        checked: true
      },
      {
        text: '明细',
        src: '/images/cw-detail.png',
        url: '/finance/pages/bus_definite/bus_definite',
        edit: false,
        checked: true
      }
    ]
  },
  {
    id: 3,
    title:'仓库管理',
    settingTitle: '库存自定义',
    checked: true,
    modules: [
      {
        text: '商品',
        src: '/images/kc-goods.png',
        url: '/warehouse/pages/goods/goods?modulesId=' + 1,
        edit: true,
        checked: true
      },
      {
        text: '库存',
        src: '/images/kc-kc.png',
        url: '/warehouse/pages/goods/goods?modulesId=' + 2,
        edit: true,
        checked: true
      },
      {
        text: '出库',
        src: '/images/kc-out.png',
        url: '/warehouse/pages/stock_removal/stock_removal',
        edit: true,
        checked: true
      },
      {
        text: '入库',
        src: '/images/kc-in.png',
        url: '/warehouse/pages/godown_entry_nostate/godown_entry_nostate',
        edit: true,
        checked: true
      },
      {
        text: '仓库',
        src: '/images/kc-warehouse.png',
        url: '/warehouse/pages/storages/storages',
        edit: true,
        checked: true
      },
      {
        text: '库存查询',
        src: '/images/kc-select.png',
        url: '/warehouse/pages/select/select',
        edit: true,
        checked: true
      },
      {
        text: '调拨',
        src: '/images/kc-allot.png',
        url: '/warehouse/pages/allot/allot',
        edit: true,
        checked: true
      },
      {
        text: '盘点',
        src: '/images/kc-check.png',
        url: '/warehouse/pages/check/check',
        edit: true,
        checked: true
      },
      {
        text: '单据',
        src: '/images/module-bills.png',
        url: '/warehouse/pages/invoices/invoices',
        edit: false,
        checked: true
      }
    ]
  }
]
module.exports = {
  manageModule: manageModule
}