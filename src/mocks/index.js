import Mock from 'mockjs'
import Interface from '../config/interface.js'
const api = Interface.mockApi
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
Mock.mock(`${api}getfood`, 'get', (req) => {
    
    return Mock.mock({
        success: true,
        'list|3-10': [
            {
                cateId: '@word(3,7)',
                cateTitle: '@cword(3,5)',
                'foodList|3-10':[
                    {
                        foodId: '@increment(1)',
                        foodName: '@cword(3,5)',
                        rate: '@integer(1,5)',
                        sales: '@integer(100, 1500)',
                        price: '@integer(10, 100)',
                        img_src: '@image(100x100, @color())'
                    }
                ]
            }
        ]
    })
})

Mock.mock(`${api}getorder`, 'get', (req) => {
    return Mock.mock({
        success: true,
        'list|5-20': [
            {
                order_id: '@increment(1)',
                foodName: '@cword(3,5)',
                order_number: '@string(number, 12)',
                order_date: '@date(yyyy-MM-dd HH:mm)',
                status: '订单已完成',
                pay: '@integer(10, 100)',
                img_src: '@image(100x100, @color())'
            }
        ]
    })
})

Mock.mock(RegExp(api + ".*"), 'get', (req) => {
    // console.log(req)
    return Mock.mock({
        success: true,
        info: {
            'food_list|2-5': [
                {
                    food_name: '@cword(3,5)',
                    food_count: '@integer(1,3)',
                    singal_price: '@integer(5,20)'
                }
            ],
            boxes_fee: 3,
            shipping_fee: 5
        }
    })
})







