import Mock from 'mockjs'
const apiAddr = 'http://wwww.mock.com/api/'
// let dataList= [
//     {
//         cateId: 'hot',
//         cateTitle: '热销',
//         foodList: [
//             {foodId: 'h001', foodName: '脆骨肠', rate: 5, sales: 80, price: 2},
//             {foodId: 'h002', foodName: '面筋', rate: 5, sales: 50, price: 1},
//             {foodId: 'h003', foodName: '骨肉相连', rate: 5, sales: 80, price: 2},
//             {foodId: 'h004', foodName: '爆浆鸡排', rate: 5, sales: 50, price: 1}
//         ]
//     },
// ]
//首页点餐菜品列表
Mock.mock(`${apiAddr}goods/selectAll`, 'get', (req) => {
    
    return Mock.mock({
        success: true,
        'cate_list|3-10': [
            {
                
                cate_title: '@cword(3,5)',
                'food_list|3-10':[
                    {
                        food_id: '@increment(1)',
                        food_name: '@cword(3,5)',
                        food_rate: '@integer(1,5)',
                        food_sale_count: '@integer(100, 1500)',
                        food_price: '@integer(10, 100)',
                        img_src: '@dataImage(100x100, mock)'
                    }
                ]
            }
        ]
    })
})
//获取订单列表
Mock.mock(`${apiAddr}getorder`, 'get', (req) => {
    return Mock.mock({
        success: true,
        total_count: 1000,//两个值传其中一个就可以
        total_pages: 4,
        'order_list|5': [
            {
                food_name: '@cword(3,5)',
                order_number: '@string(number, 12)',
                order_date: '@date(yyyy-MM-dd HH:mm)',
                order_payment: '@integer(10, 100)',
                img_src: '@dataImage(100x100, mock)'
            }
        ]
    })
})



//获取某个菜品的评论
Mock.mock(`${apiAddr}getFoodComments`, 'get', (req) => {
    return Mock.mock({
        message: '成功',
        code: 200,
        'comments_list|5-10': [
            {
                username: '@cword(3, 5)',
                rate: '@integer(1,5)',
                content: '@cword(8,16)',
                date: '@date(yyyy-MM-dd)'
            }
        ]
        
    })
})

//获取订单详情
Mock.mock(`${apiAddr}getOrderDetail`, 'get', (req) => {
    return Mock.mock({
        message: '成功',
        code: 200,
        order_id: '201909172149',
        order_number: '20197813187',
        order_date: '@date(yyyy-MM-dd)',
        order_payment: 89,
        order_status: 1,
        boxes_fee: 2,
        shipping_fee: 5,
        'food_list|3-8': [
            {
                food_name: '@cword(3,5)',
                food_count: '@integer(1,3)',
                food_price: '@integer(20,80)'
            }
        ]
    })
})

//获取用户基本信息
Mock.mock(`${apiAddr}getUserInfo`, 'get', (req) => {
    return Mock.mock({
        code: 200,
        user_id: '13',
        user_address: '@cword(10,12)',
        user_sex: 1,
        user_tel: '@integer(11)',
        user_email: '184731897@qq.com',
        user_age: 21
    })
})

//修改地址
Mock.mock(`${apiAddr}modifyAddress`, 'post', (req) => {
    console.log(req)
    return {
        code: 200
    }
})

//提交订单
Mock.mock(`${apiAddr}commitOrder`, 'post', req => {
    console.log(req)
    return {
        code: 200
    }
})

//搜索菜品
Mock.mock(`${apiAddr}searchFood`, 'post', req => {
    console.log(req)
    return Mock.mock({
        code: 200,
        'food_list|5-8':[
            {
                food_id: '@increment(1)',
                food_name: '@cword(3,5)',
                food_rate: '@integer(1,5)',
                food_sale_count: '@integer(100, 1500)',
                food_price: '@integer(10, 100)',
                img_src: '@dataImage(100x100, mock)'
            }
        ]
    })
})

//注册
Mock.mock(`${apiAddr}users/register`, 'post', req => {
    console.log(req)
    return {
        code: 200
    }
})

//登录
Mock.mock(`${apiAddr}users/login`, 'post', req => {
    console.log(req)
    return {
        code: 200
    }
})

//查询账号是否可用
Mock.mock(`${apiAddr}users/isExist`, 'post', (req) => {
    
    return {
        code: 200
    }
})









