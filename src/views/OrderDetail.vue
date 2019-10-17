<template>
    <div id="order_detail">
        <h4>订单详情</h4>
        <div class="order_status">
            <p class="status">{{dataList.order.order_status?'已支付':'未支付'}}</p>
            <p class="time">下单日期{{dataList.order.order_date}}</p>
        </div>
        <div class="order_info">
            <p class="order_number">订单号：{{dataList.order.order_id}}</p>
            <div class="info_pay">
                <h5 class="title">菜品信息</h5>
                <ul class="pay_header">
                    <li>菜品</li>
                    <li>数量</li>
                    <li>金额</li>
                </ul>
                <ul class="pay_content">
                    <li class="food" v-for="(item, index) in dataList.goodsInfo" :key="index">
                        <p class="food_name">{{item.goods_name}}</p>
                        <p class="food_count">{{item.goods_amount}}</p>
                        <p class="food_pay">{{item.goods_price}}</p>
                    </li> 
                    <ul class="other">
                        <li>
                            <p class="other_name">餐盒费</p>
                            <p class="place"></p>
                            <p class="other_fee">{{shopConfig.mealsFee}}</p>
                        </li>
                        <li>
                            <p class="other_name">配送费</p>
                            <p class="place"></p>
                            <p class="other_fee">{{shopConfig.shippingFee}}</p>
                        </li>
                    </ul>
                </ul>
                <p class="total_pay">实际支付：<span class="pay">{{dataList.order.order_money}}</span></p>
            </div>

            <div class="info_distribution">
                <h5 class="title">菜品评价</h5>
                
                <evaluate :commentsList="commentsList" :orderid="$route.query.orderid" :foodInfos="foodInfos"/>
            </div>
        </div>
    </div>
</template>


<script>
import Interface from '../config/interface.js'
import Evaluate from '../components/Evaulate.vue'
import ShopConfig from '../config/shopConfig.js'
import Utils from '../utils/util.js'
import Qs from 'qs'
export default {
    name: "order_detail",
    components: {
        Evaluate,
    },
    data() {
        return {
            apiAddr: Interface.apiAddr,
            dataList: { //本页菜品数据
                order: {
                    order_status: 0
                }
            },
            shopConfig: ShopConfig,
            isLoading: false,
            commentsList: [],    //用户对本订单的评价数据
            foodInfos: []   //本单所有菜品的名字
        }
    },
    methods: {
        getDetail(orderid){ //获取订单详情
            this.$http.get(`${this.apiAddr}order/orderDetail?order_id=${orderid}`) //
            .then((res) => {
                console.log('订单')
                console.log(res)
                let foodInfos = []  //本单所有菜品的名字
                for(let goods of res.data.goodsInfo){
                    foodInfos.push(
                        {
                            foodName:goods.goods_name,
                            foodImg: goods.goods_picture
                        }
                    )
                }
                console.log(foodInfos)
                this.foodInfos = foodInfos
                this.dataList = res.data
                // console.log(this.dataList.order.order_status)
            })
        },
        getOwnComments(){   //获取个人对本单各个菜品的评价
            let localUserInfo = Utils.storage.get('userInfo') 
            let p = {
                user_id: localUserInfo.userId,
                order_id: this.$route.query.orderid
            }   
            // console.log(p)
            this.$http.post(`${this.apiAddr}comment/getOwnComment`, Qs.stringify(p))
            .then(res => {
                console.log('评价')
                console.log(res)
                this.commentsList = res.data.food_list
            })
        }
    },
    mounted(){
        this.getDetail(this.$route.query.orderid)
        // console.log(this.$route.query.orderid)
        this.getOwnComments()
    },
    computed: {
        
        
    },
}
</script>


<style lang="scss" scoped>
@import "../config/colorConfig.scss";
#order_detail{
    h4{
        text-align: left;
        height: 20px;
        line-height: 20px;
        padding: 8px;
        width: 95%;
        margin: 0 auto;
        border-bottom: 1px solid $LEVEL_2_BORDER;
    }
    .order_status{
        width: 95%;
        background: #FEFDEE;
        font-size: 12px;
        padding: 20px 50px;
        border: 1px solid #F8E5BB;
        box-sizing: border-box;
        margin: 10px auto;
        .status{
            text-align: left;
            margin-bottom: 20px;;
        }
        .time{
            text-align: left;
            color: $PLACE_TEXT;
        }
    }

    .order_info{
        display: flex;
        width: 95%;
        margin: 0 auto;
        flex-wrap: wrap;
        font-size: 14px;
        background: #f7f7f7;
        .order_number{
            width: 100%;
            padding: 10px;
            text-align: left;
        }
        .info_pay{
            flex: 1;
            font-size: 12px;
            color: $SECONDARY_TEXT;
            .title{
                text-align: left;
                padding: 5px;
                border-bottom: 1px solid $LEVEL_2_BORDER;
            }
            .pay_header{
                display: flex;
                border-bottom: 1px solid $LEVEL_2_BORDER;
                align-items: center;
                font-weight: bold;
                li{
                    text-align: center;
                    padding: 10px 5px;
                    &:nth-child(1){
                        flex: 3;
                    }
                    &:nth-child(2){
                        flex: 1;
                    }
                    &:nth-child(3){
                        flex: 1;
                    }
                }
            }
            .pay_content{
                .food{
                    display: flex;
                    p{
                        text-align: center;
                        padding: 10px 0;
                        &:nth-child(1){
                            flex: 3;
                        }
                        &:nth-child(2){
                            flex: 1;
                        }
                        &:nth-child(3){
                            flex: 1;
                        }
                    }
                    
                }
                .other{
                    border-bottom: 1px solid $LEVEL_1_BORDER;
                        li{
                            display: flex;
                            padding: 5px 0;
                            .other_name{
                                flex: 3;
                            }
                            .place{
                                flex: 1;
                            }
                            .other_fee{
                                flex: 1;
                            }
                        }
                    }
            }
            .total_pay{
                text-align: right;
                margin-right: 8%;
                padding: 10px 0;
                .pay{
                color: #f00;
                font-size: 20px;
                }
            }
        }
        .info_distribution{
            flex: 1;
            font-size: 12px;
            color: $SECONDARY_TEXT;
            border-left: 1px solid $LEVEL_2_BORDER;
            .title{
                text-align: left;
                padding: 5px;
                border-bottom: 1px solid $LEVEL_2_BORDER;
            }
        }
    }
}

</style>