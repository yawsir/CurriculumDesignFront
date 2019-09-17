<template>
    <div id="order">
        <div class="order_header">
            <ul class="sort_way_list">
                <li
                    class="sort_way"
                    :class="{sort_way_active: command.indexOf('default') == 0 }"
                    @click="handleCommand('defaultSort')"
                >默认排序</li>
                <li class="sort_way">
                    <el-dropdown
                        :hide-on-click="true"
                        trigger="hover"
                        @command="handleCommand"
                        :show-timeout="50"
                    >
                        <span
                            class="el-dropdown-link"
                            :class="{sort_way_active: command.indexOf('rate') == 0 }"
                        >
                            评分
                            <i class="el-icon-arrow-down"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="rateHighToLow">由高到低</el-dropdown-item>
                            <el-dropdown-item command="rateLowToHigh">由低到高</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
                <li class="sort_way">
                    <el-dropdown
                        :hide-on-click="true"
                        trigger="hover"
                        @command="handleCommand"
                        :show-timeout="50"
                    >
                        <span
                            class="el-dropdown-link"
                            :class="{sort_way_active: command.indexOf('sales') == 0 }"
                        >
                            销量
                            <i class="el-icon-arrow-down"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="salesHighToLow">由高到低</el-dropdown-item>
                            <el-dropdown-item command="salesLowToHigh">由低到高</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
                <li class="sort_way">
                    <el-dropdown
                        :hide-on-click="true"
                        trigger="hover"
                        @command="handleCommand"
                        :show-timeout="50"
                    >
                        <span
                            class="el-dropdown-link"
                            :class="{sort_way_active: command.indexOf('price') == 0 }"
                        >
                            价格
                            <i class="el-icon-arrow-down"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="priceHighToLow">由高到低</el-dropdown-item>
                            <el-dropdown-item command="priceLowToHigh">由低到高</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
            </ul>

            <div class="search">
                <input type="search" placeholder="搜你想吃的" />
                <span>
                    <i class="el-icon-search"></i>
                </span>
            </div>
        </div>

        <div class="order_content">
            <div class="food">
                <div class="cate_menu_top">
                    <ul class="cate_list">
                        <li
                            class="cate_item"
                            v-for="(item, index) in dataList"
                            :key="index"
                            :class="{cate_item_active: currentCateIndex == index}"
                            @click="handleCateClick(index)"
                        >{{item.cate_title}}</li>
                    </ul>
                </div>
                <div class="cate_menu_aside" v-show="showAside">
                    <ul class="cate_list">
                        <li
                            class="cate_item"
                            v-for="(item, index) in dataList"
                            :key="index"
                            :class="{cate_item_active: currentCateIndex == index}"
                            @click="handleCateClick(index)"
                        >{{item.cate_title}}</li>
                    </ul>
                </div>

                <ul class="food_cate_list">
                    <li class="food_cate_item" v-for="(item, index) in dataList" :key="index">
                        <h3 class="cate_title">{{item.cate_title}}</h3>
                        <ul class="food_list clearfix">
                            <li class="food_item" v-for="(food, foodIndex) in item.food_list" :key="foodIndex">
                                <img :src="food.img_src" @click="getComments(food)"/>
                                <div class="food_info">
                                    <p class="food_name">{{food.food_name}}</p>
                                    <div class="foot_rate">
                                        <el-rate
                                            :value="food.food_rate"
                                            :max="5"
                                            disabled
                                            text-color="#ff9900"
                                        ></el-rate>
                                    </div>
                                    <p class="food_sale">累计售出{{food.food_sale_count}}份</p>
                                    <p class="food_price">￥{{food.food_price}}</p>
                                </div>
                                <div class="add_to_cart" @click="addToCart(food)">加入购物车</div>
                            </li>
                            
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="notification">
                <h3 class="title">商家公告</h3>
                <p class="noti_content">商家公告内容商家公告内容商家公告内容商家公告内容</p>
            </div>

            <div class="cart">
                <div class="cart_header">
                    <p class="title">购物车</p>
                    <div class="clear_btn" @click="clearCart">清空购物车<i class="el-icon-delete"></i></div>
                    
                </div>

                <div class="cart_content" v-show="cartList.length > 0">
                    <ul class="food_list">
                        <li class="food_item" v-for="(item, index) in cartList" :key="index">
                            <p class="food_name">{{item.food_name}}</p>
                            <div class="counter">
                                <el-input-number 
                                v-model="item.num"
                                @change="changeFoodCount(item, index)" 
                                :min="0"
                                :max="Infinity"
                                size="small"
                                label="描述文字">
                                </el-input-number>
                            </div>
                            <p class="food_price">￥{{item.food_price}}</p>
                        </li>
                        <li class="fixed_fee">
                            <p class="fixed_fee_name">餐盒费</p>
                            <p class="fixed_fee_price">￥{{boxesFee}}</p>
                        </li>
                        <li class="fixed_fee">
                            <p class="fixed_fee_name">配送费(不计入起送价)</p>
                            <p class="fixed_fee_price">￥{{shippingFee}}</p>
                        </li>
                        <li class="total">
                            <p>共<span class="total_count">{{foodTotalCount}}</span>份，总计<span class="total_price">￥{{foodTotalPrice + boxesFee + shippingFee}}</span></p>
                        </li>
                    </ul>
                    
                </div>

                <div class="cart_footer">
                    <div class="icon"><i class="el-icon-shopping-cart-2"></i></div>
                    <div class="submit_btn" :class="{unsendable: !sendable}" @click="submitOrder">{{sendable ? '立即下单': `还差${sendingFee - foodTotalPrice - boxesFee}元起送` }}</div>
                </div>
            </div>
        </div>

        <div class="cover" v-show="commentsShow"></div>
        <food-comments :clickClose="clickCommentsClose" 
        :addToCart="addToCart"
        v-show="commentsShow" :food="clickFood"
        :commentsList="commentsList"
        ></food-comments>
    </div>
</template>

<script>
import Interface from '../config/interface.js'
import FoodComments from '../components/FoodComments.vue'
const apiAddr = Interface.apiAddr
export default {
    name: "Orders",
    data() {
        return {
            command: "defaultSort",
            dataList: [],
            currentCateIndex: 0, //当前选中的分类索引
            showAside: false,
            cateListToPageTop: 0,    //菜单列表距离文档顶部的距离
            cateItemsOffsetTop: [],     //各个分类距离浏览器顶部的距离 做页内跳转用
            cartList: [],            //购物车数据
            boxesFee: 1,            //餐盒费
            shippingFee: 3,         //配送费
            sendingFee: 15,          //起送费
            apiAddr,
            commentsShow: false,     //控制评论弹窗
            clickFood: {},      //点击的食品 传给FoodComments组件 获取评论
            commentsList: []
        };  
    },
    methods: {
        handleCommand(command) {    //点击排序
            this.command = command
            // console.log(command)
            let dataList = this.dataList
            switch (command){
                case 'rateHighToLow': console.log('rateHighToLow')
                for(let cates of dataList){
                    cates.food_list.sort((food1, food2) => food2.food_rate - food1.food_rate)
                }
                break
                case 'rateLowToHigh': console.log('rateLowToHigh')
                for(let cates of dataList){
                    cates.food_list.sort((food1, food2) => food1.food_rate - food2.food_rate)
                }
                break
                case 'salesHighToLow': console.log('salesHighToLow')
                for(let cates of dataList){
                    cates.food_list.sort((food1, food2) => food2.food_sale_count - food1.food_sale_count)
                }
                break
                case 'salesLowToHigh': console.log('salesLowToHigh')
                for(let cates of dataList){
                    cates.food_list.sort((food1, food2) => food1.food_sale_count - food2.food_sale_count)
                }
                break
                case 'priceHighToLow': console.log('priceHighToLow')
                for(let cates of dataList){
                    cates.food_list.sort((food1, food2) => food2.food_price - food1.food_price)
                }
                break
                case 'priceLowToHigh': console.log('priceLowToHigh')
                for(let cates of dataList){
                    cates.food_list.sort((food1, food2) => food1.food_price - food2.food_price)
                }
                break
                default: console.log('defaultSort')
            }
            this.dataList = dataList
        },
        handleCateClick(index) {    //点击分类
            this.currentCateIndex = index
            // console.log(index)
            let cates = document.querySelectorAll('.food_cate_item')
            window.scrollTo(0, cates[index].offsetTop)
        },
        handleScroll(){             //监听滚动条滚动
            // console.log(this.cateItemsOffsetTop)
            if(document.documentElement.scrollTop > this.cateListToPageTop){
                this.showAside = true
            }else{
                this.showAside = false
            }
            let t = document.documentElement.scrollTop
            if(t < this.cateItemsOffsetTop[0]){
                this.currentCateIndex = 0
                return
            }
            if(t > this.cateItemsOffsetTop[this.cateItemsOffsetTop.length-1]){
                this.currentCateIndex = this.cateItemsOffsetTop.length-1
                return
            }
            for(let i=0; i<this.cateItemsOffsetTop.length-1;i++){
                if(t > this.cateItemsOffsetTop[i] && t < this.cateItemsOffsetTop[i+1]){
                    this.currentCateIndex = i
                    break;
                }  
            }
            
            
        },
        getElementToPageTop(el){    //获取元素距离页面顶端的距离
            if(el.parentElement){
                return this.getElementToPageTop(el.parentElement) + el.offsetTop
            }
            return el.offsetTop
        },
        changeFoodCount(item, index){          //购物车内菜品的加减
            if(item.num == 0){
                this.cartList.splice(index, 1)
            }
        },
        addToCart(food){
            //遍历cartList 看有没有相同的菜品 如果有在原有基础上num+1
            //如果没有 新增数组项
            for(let i in this.cartList){
                //购物车内有要添加的菜品
                if(this.cartList[i].foodId === food.food_id){
                    ++this.cartList[i].num
                    return
                }
            }
            //购物车内没有要添加的菜品
            let {food_id, food_name, food_price} = food
            this.cartList.unshift({
                food_id,
                food_name,
                food_price,
                num: 1
            })

        },
        clearCart(){    //清空购物车
            this.cartList = []
        },
        submitOrder(){  //提交订单
            if(!this.sendable){
                alert("未达到起送价")
            }else{
                console.log(this.cartList)
                this.$router.push({path: '/pay'})
            }
        },
        listenScroll(){ //绑定滚动条
            let cates = document.querySelectorAll('.food_cate_item')
            this.cateListToPageTop = this.getElementToPageTop(document.querySelector('.food_cate_list'))
            window.addEventListener('scroll', this.handleScroll, true);  // 监听（绑定）滚轮滚动事件
            let cateItemsOffsetTop = []
            for(let i=0; i < cates.length; i++){
                cateItemsOffsetTop[i] = cates[i].offsetTop
            }
            this.cateItemsOffsetTop = cateItemsOffsetTop
        },
        getFoodList(){      //获取菜品信息
            this.$http.get(this.apiAddr+ 'getfood')
            .then((res) => {
                console.log(res)
                this.dataList = res.data.cate_list

            })
        },
        clickCommentsClose(){
            this.commentsShow = !this.commentsShow
        },
        getComments(food){  //获取评论
            // console.log(food)
            this.commentsShow = !this.commentsShow
            // this.commentsOption.foodIndex = foodIndex
            this.clickFood = food
            this.$http.get(`${this.apiAddr}getFoodComments`)    //这后面还要传参food_id
            .then((res) => {
                console.log(res)
                this.commentsList = res.data.comments_list
            })
        }
    },
    computed: {
        //购物车菜品总数
        foodTotalCount(){
            let totalCount = 0
            for(let i in this.cartList){
                totalCount += this.cartList[i].num
            }
            return totalCount
        },
        foodTotalPrice(){   //购物车内食物总价格
            let totalPrice = 0
            for(let i in this.cartList){
                totalPrice += this.cartList[i].food_price * this.cartList[i].num
            }
            return totalPrice
        },
        sendable(){     //是否达到配送条件
            return this.foodTotalPrice + this.boxesFee >= this.sendingFee
        },
        
    },
    components: {
        FoodComments
    },
    mounted(){
        this.$emit('subMenuOpen', '/home/order')       //使首页导航栏更新
        this.getFoodList()
    },
    updated(){
        this.listenScroll()
    }
    
};
</script>

<style lang="scss" scoped>
#order {
    background: #ffffff;
}
.order_header {
    width: 63%;
    display: flex;
    padding: 10px 0;
    margin: 10px auto;
    box-sizing: border-box;
    align-items: center;
    background: #ffffff;
    .sort_way_list {
        flex: 4;
        display: flex;
        align-items: center;
        .sort_way {
            flex: 1;
            &:nth-child(1) {
                cursor: pointer;
            }
            &:nth-child(n + 2) {
                border-left: 1px solid #ebeef5;
            }
        }
        .sort_way_active {
            color: #409eff;
        }
    }
    .search {
        flex: 2;
        position: relative;
        input[type="search"] {
            width: 100%;
            height: 25px;
            padding: 0 10px;
            border: 1px solid #e4e7ed;
        }
        span {
            position: absolute;
            display: block;
            right: 10px;
            top: 0;
            height: 100%;
            line-height: 25px;
            color: #c0c4cc;
        }
    }
}

.order_content {
    width: 100%;
    background: #f7f7f7;
    display: flex;
    position: relative;
    padding-top: 30px;
    .food {
        flex: 5;
        margin-left: 10%;
        box-sizing: border-box;
        .cate_menu_top {
            width: 90%;
            margin: 10px auto;
            display: flex;
            background: #ffffff;
            padding: 5px;
            box-sizing: border-box;
            .cate_list {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex-wrap: wrap;
                .cate_item {
                    width: 20%;
                    padding: 10px;
                    box-sizing: border-box;
                    margin: 2px 0;
                    transition-property: background-color;
                    transition-duration: 0.5s;
                    &:hover {
                        background: #409eff77;
                        color: #ffffff;
                    }
                }
                .cate_item_active {
                    color: #fff;
                    background: #68aff5;
                }
            }
        }
        .cate_menu_aside {
            height: 300px;
            position: fixed;
            top: 0;
            left: 0;
            width: 12%;
            font-size: 12px;
            .cate_list {
                width: 100%;
                padding: 0 10% 0 20%;
                box-sizing: border-box;
                .cate_item {
                    width: 100%;
                    padding: 15px 15px 15px 0px;
                    text-align: right;
                    border-right: 2px solid #ebeef5;
                    transition-property: background-color;
                    transition-duration: 0.5s;
                    &:hover {
                        background: #409effaa;
                        color: #ffffff;
                    }
                }
                .cate_item_active {
                    color: #fff;
                    background: #409eff;
                }
            }
        }
        .food_cate_list {
            width: 90%;
            margin: 0 auto;
            .food_cate_item {
                width: 100%;
                margin: 10px 0;
                box-sizing: border-box;
                padding: 10px 0;
                .cate_title {
                    width: 50%;
                    text-align: left;
                    margin-bottom: 10px;
                    font-weight: bold;
                    font-size: 20px;
                    padding-left: 20px;
                }
                .food_list {
                    width: 100%;
                    .food_item {
                        float: left;
                        width: 49%;
                        display: flex;
                        position: relative;
                        margin-top: 10px;
                        border: 1px solid #e4e7ed;
                        box-sizing: border-box;
                        &:nth-child(2n){
                            margin-left: 2%;
                        }
                        img {
                            flex: 1;
                            height: 100px;
                        }
                        .food_info {
                            flex: 3;
                            display: flex;
                            flex-direction: column;
                            justify-content: flex-start;
                            align-items: flex-start;
                            padding-left: 8px;
                            padding-top: 20px;
                            box-sizing: border-box;
                            flex-wrap: wrap;
                            .food_name {
                                flex: 1;
                                font-size: 16px;
                                font-weight: bold;
                                margin: 1px 0;
                            }
                            .food_rate{
                                flex: 1;
                                margin: 1px 0;

                            }
                            .food_sale{
                                flex: 1;
                                font-size: 12px;
                                margin: 1px 0;

                            }
                            .food_price {
                                flex: 3;
                                font-size: 16px;
                                color: #f00;
                                font-weight: bold;
                                padding-top: 5px;
                            }
                        }
                        .add_to_cart {
                            position: absolute;
                            bottom: 5px;
                            right: 10px;
                            background: #409eff;
                            border-radius: 50px;
                            padding: 5px 10px;
                            font: 14px/1 "微软雅黑";
                            color: #fff;
                            cursor: pointer;
                            &:hover{
                                background: #1787f8;
                            }
                        }
                    }
                }
            }
        }
    }
    .notification {
        flex: 2;
        height: 300px;
        border: 1px solid #dcdfe6;
        background: #fff;
        .title{
            background: #409eff;
            color: #fff;
            padding: 8px 0;
        }
        .noti_content{
            padding: 10px 10px;
        }
    }
    .cart{
        width: 24.5%;
        position: fixed;
        right: 2.5%;
        bottom: 0;
        background: #fff;
        transition-property: height;
        transition-duration: .3s;
        .cart_header{
            display: flex;
            justify-content: space-around;
            border-top: 1px solid #dcdfe6;
            .title{
                flex: 1;
                padding: 10px;
            }
            .clear_btn{
                flex: 1;
                padding: 10px;
                background: #c0c4cc;
                cursor: pointer;
                &:hover{
                    background: #dce0e9;
                }
            }
        }
        .cart_content{
        margin-bottom: 50px;
        max-height: 300px;
        overflow-y: auto;
            .food_list{
                padding: 0 10px;
                .food_item{
                    display: flex;
                    align-items: center;
                    height: 35px;
                    border-bottom: 1px solid #dcdfe6;
                    background: #fff;
                    padding: 5px 0;
                    .food_name{
                        flex: 2;
                        text-align: left;
                        height: 100%;
                        line-height: 35px;
                    }
                    .counter{
                        flex: 1;
                        text-align: left;
                        height: 100%;
                        line-height: 35px;
                    }
                    .food_price{
                        flex: 1;
                        text-align: right;
                        height: 100%;
                        line-height: 35px;

                    }
                }
                .fixed_fee{
                    display: flex;
                    border-bottom: 1px solid #dcdfe6;
                    background: #fff;
                    padding: 5px 0;
                    height: 35px;
                    .fixed_fee_name{
                        flex: 3;
                        text-align: left;
                        height: 100%;
                        line-height: 35px;
                    }
                    .fixed_fee_price{
                        flex: 1;
                        text-align: right;
                        height: 100%;
                        line-height: 35px;
                    }
                }
                .total{
                    background: #fff;
                    padding: 30px 0 3px 0;
                    p{
                        text-align: right;
                        .total_count{
                            color: #e6a23c;
                        }
                        .total_price{
                            color: #f00;
                            font-size: 30px;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
        .cart_footer{
            width: 100%;
            display: flex;
            align-items: center;
            position: absolute;
            bottom: 0;
            .icon{
                flex: 3;
                background: #333;
                color: #fff;
                height: 50px;
                line-height: 50px;
                text-align: left;
                padding-left: 10px;
                i{
                    font-size: 50px;
                }
            }
            .submit_btn{
                flex: 2;
                background: #409eff;
                height: 50px;
                line-height: 50px;
                color: #fff;
                cursor: pointer;
                &:hover{
                    background: #68aff5;
                }
            }
            .unsendable{
                background: #909399;
                &:hover{
                    background: #909399;
                }
            }
        }
    }
}

.cover{
    background: #B3B3B477;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
}
</style>

