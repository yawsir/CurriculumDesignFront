<template>
    <div id="order_detail">
        <h4>订单详情</h4>
        <div class="order_status">
            <p class="status">{{dataList.order_status?'已支付':'未支付'}}</p>
            <p class="time">下单日期{{dataList.order_date}}</p>
        </div>
        <div class="order_info">
            <p class="order_number">订单号：{{dataList.order_number}}</p>
            <div class="info_pay">
                <h5 class="title">菜品信息</h5>
                <ul class="pay_header">
                    <li>菜品</li>
                    <li>数量</li>
                    <li>金额</li>
                </ul>
                <ul class="pay_content">
                    <li class="food" v-for="(item, index) in dataList.food_list" :key="index">
                        <p class="food_name">{{item.food_name}}</p>
                        <p class="food_count">{{item.food_count}}</p>
                        <p class="food_pay">{{item.food_price}}</p>
                    </li> 
                    <ul class="other">
                        <li>
                            <p class="other_name">餐盒费</p>
                            <p class="place"></p>
                            <p class="other_fee">{{dataList.boxes_fee}}</p>
                        </li>
                        <li>
                            <p class="other_name">配送费</p>
                            <p class="place"></p>
                            <p class="other_fee">{{dataList.shipping_fee}}</p>
                        </li>
                    </ul>
                </ul>
                <p class="total_pay">实际支付：<span class="pay">{{dataList.order_payment}}</span></p>
            </div>

            <div class="info_distribution">
                <h5 class="title">菜品评价</h5>
                
                <evaluate/>
            </div>
        </div>
    </div>
</template>


<script>
import Interface from '../config/interface.js'
import Evaluate from '../components/Evaulate.vue'
export default {
    name: "order_detail",
    components: {
        Evaluate
    },
    data() {
        return {
            apiAddr: Interface.apiAddr,
            dataList: {}
        }
    },
    methods: {
        getDetail(orderid){
            this.$http.get(`${this.apiAddr}getOrderDetail`) //?order_id=${orderid}
            .then((res) => {
                console.log(res)
                this.dataList = res.data
            })
        }
    },
    mounted(){
        this.getDetail(this.$route.query.orderid)
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