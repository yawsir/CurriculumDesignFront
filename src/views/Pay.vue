<template>
    <div id="pay">
        <h3>购物车</h3>
        <div class="order_info">
            <p class="order_number">订单号：111111</p>
            <div class="info_pay">
                <h5 class="title">菜品信息</h5>
                <ul class="pay_header">
                    <li>菜品</li>
                    <li>数量</li>
                    <li>金额</li>
                </ul>
                <ul class="pay_content">
                    <li class="food" v-for="(item, index) in cartInfo.cartList" :key="index">
                        <p class="food_name">{{item.food_name}}</p>
                        <p class="food_count">{{item.num}}</p>
                        <p class="food_pay">{{item.food_price}}</p>
                    </li> 
                    <ul class="other">
                        <li>
                            <p class="other_name">餐盒费</p>
                            <p class="place"></p>
                            <p class="other_fee">2</p>
                        </li>
                        <li>
                            <p class="other_name">配送费</p>
                            <p class="place"></p>
                            <p class="other_fee">5</p>
                        </li>
                    </ul>
                </ul>
                <p class="total_pay">实际支付：<span class="pay">{{realPrice}}</span></p>
            </div>
        </div>
        <div class="operate">
            <p class="user_address">收获地址:<span>{{userAddress}}</span></p>
            <el-button type="primary" @click="submitOrder" :disabled="!isPaid">提交订单</el-button>
        </div>
        <div class="pay_way">
            <el-select v-model="payWay" placeholder="选择支付方式">
                <el-option
                v-for="(item, index) in payWays"
                :key="index"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>

            <div class="qr_code">
                <img src="../assets/images/alipay.png" alt="">
            </div>
            <div class="operate">
                <el-button type="primary" @click="isPaid = true">模拟支付完成</el-button>
            </div>
        </div>
    </div>
</template>


<script>
import Utils from '../utils/util.js'
import ShopConfig from '../config/shopConfig.js'
import Interface from '../config/interface.js'
import Qs from 'qs'
export default {
    name: "pay",

    data() {
        return {
            cartInfo: {},
            payWay: 'weChat',
            payWays:[
                {
                    value: 'weChat',
                    label: '微信'
                },
                {
                    value: 'ali',
                    label: '支付宝'
                }
            ],
            apiAddr: Interface.apiAddr,
            userAddress: '',
            isPaid: false
        }
    },
    methods: {
        getCart(){  //获取购物车信息
            this.cartInfo = Utils.storage.get('cartInfo')
            console.log(this.cartInfo)
        },
        getUserAddress(){   //获取用户地址
            const localUserInfo = Utils.storage.get('userInfo')
            let p = {
                user_name: localUserInfo.username
            }
            this.$http.post(`${this.apiAddr}users/getUserInfo`,Qs.stringify(p))    //?user_id=cookie中的user_id
            .then((res) => {
                console.log(res)
                this.userAddress = res.data[0].user_address
            })    
        },
        submitOrder(){  //点击提交订单
            let foodListStr = ''
            for(let item of this.cartInfo.cartList){
                foodListStr += item.food_id + ':' + item.num + ','
            }
            // console.log(foodListStr)
            let localUserInfo = Utils.storage.get('userInfo')
            let p = {
                user_id: localUserInfo.userId,       //cookie中的user_id
                order_money: this.realPrice,
                address: this.userAddress,
                pay_method: this.payWay == 'ali' ? '支付宝' : '微信',
                food_list: foodListStr
            }
            console.log(p)
            this.$http.post(`${this.apiAddr}order/commitOrder`,Qs.stringify(p))
            .then((res) => {
                console.log(res)
            })
        }
    },
    mounted(){
        this.getCart()
        this.getUserAddress()
    },
    computed: {
        realPrice(){
            return this.cartInfo.foodTotalPrice + ShopConfig.shippingFee + ShopConfig.mealsFee
        }
    }
}
</script>


<style lang="scss" scoped>
@import '../config/colorConfig.scss';
.order_info{
        display: flex;
        width: 65%;
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

.operate{
    margin: 10px auto;
    text-align: right;
    width: 65%;
    .user_address{
        display: inline-block;
        margin-right: 50%;
        color: $SECONDARY_TEXT;
        span{
            color: $MAIN_TEXT;
        }
    }
}
.pay_way{
    width: 65%;
    margin: 10px auto;
    .qr_code{
        width: 200px;
        height: 200px;
        border: 1px solid #cdcdcd;
        margin: 10px auto;
        img{
            width: 100%;
            height: 100%;
        }
    }
}

</style>