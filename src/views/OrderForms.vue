<template>
    <div id="order_forms">
        <div class="order_header">
            <ul class="title_list">
                <li class="title_item">下单时间</li>
                <li class="title_item">订单内容</li>
                <li class="title_item">支付金额(元)</li>
                <li class="title_item">操作</li>
            </ul>
        </div>

        <div class="order_content">
            <ul class="content_list">
                <li class="order_item" v-for="(item, index) in dataList.order_list" :key="index">
                    <ul class="item_info_list">
                        <li class="item_date">{{item.order_date}}</li>
                        <li class="item_content" @click="doOrderDetail(item.order_id)">
                            <img :src="item.img_src" alt />
                            <div class="item_description">
                                <p class="item_food">{{item.food_name}}</p>
                                <p class="item_number">{{item.order_number}}</p>
                            </div>
                        </li>
                        <li class="item_pay">{{item.order_payment}}</li>
                        <li class="item_operate">
                            <el-button type="info" size="mini" plain>查看详情</el-button>
                        </li>
                    </ul>
                </li>
            </ul>
            <el-pagination
                layout="prev, pager, next"
                :total="dataList.total_count"
                :page-size="5"
                :background="true"
                @current-change="currentChange"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import Interface from '../config/interface.js'
export default {
    name: "order_forms",
    data() {
        return {
            api: Interface.apiAddr,
            dataList: []
        }
    },
    methods: {
        doOrderDetail(order_id){//点击订单详情
            this.$router.push({path: `/home/person/orderdetail?orderid=${order_id}`})
        },
        getOrder(){//获取订单列表
            this.$http.get(this.api+'getorder')
            .then((res) => {
                console.log(res)
                this.dataList = res.data
            })
        },
        currentChange(currentPage){    //切换页码
            console.log(currentPage)
        }
    },
    mounted() {
        this.$emit('subMenuOpen', '/home/person/orderforms')  
        this.getOrder()
          
    },
};
</script>

<style lang="scss" scoped>
@import "../config/colorConfig.scss";
#order_forms {
    .order_header {
        font-size: 12px;
        color: $SECONDARY_TEXT;
        .title_list {
            width: 100%;
            background: #eee;
            display: flex;
            padding: 5px;
            box-sizing: border-box;
            .title_item {
                &:nth-child(1) {
                    flex: 1;
                }
                &:nth-child(2) {
                    flex: 4;
                }
                &:nth-child(3) {
                    flex: 1;
                }
                &:nth-child(4) {
                    flex: 1;
                }
                &:nth-child(5) {
                    flex: 1;
                }
            }
        }
    }
    .order_content {
        font-size: 12px;
        color: $SECONDARY_TEXT;
        .content_list{
            .order_item{
                background: $BASIC_WHITE;
                // border-bottom: 1px solid $LEVEL_3_BORDER;
                .item_info_list{
                    display: flex;
                    align-items: center;
                    .item_date{
                        flex: 1;
                    }
                    .item_content{
                        flex: 4;
                        display: flex;
                        align-items: center;
                        box-sizing: border-box;
                        border-left: 1px solid $LEVEL_3_BORDER;
                        position: relative;
                        padding: 20px 0;
                        cursor: pointer;
                        &:after{
                            content: "";
                            display: block;
                            background: $BASIC_WHITE;
                            width: 10px;
                            height: 10px;
                            border-radius: 50%;
                            position: absolute;
                            top: 50%;
                            left: -5px;
                            transform: translateY(-50%);
                            z-index: 10;
                            border: 2px solid $LEVEL_3_BORDER;
                            box-sizing: border-box;
                        }
                        img{
                            width: 70px;
                            height: 70px;
                            border-radius: 50%;
                            margin-left: 35px;
                        }
                        .item_description{
                            margin: 10px;
                            p{
                                margin: 10px 0;
                            }
                        }

                    }
                    .item_pay{
                        flex: 1;
                        font-weight: bold;
                    }
                    .item_status{
                        flex: 1
                    }
                    .item_operate{
                        flex: 1;
                    }
                }
            }
        }
    }
}
</style>

