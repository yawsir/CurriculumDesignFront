<template>
    <div id="food_comments">
        <div class="inner">
            <img class="big-pic" :src="food.img_src" alt="">
            <div class="food-detail">
                <h5 class="food-name">{{food.food_name}}</h5>
                <div class="flex-wrap">
                    <p class="price">￥{{food.food_price}}</p>
                    <el-button type="primary" @click="addToCart(food)">加入购物车</el-button>
                </div>
                
                <div class="the-comments">
                    <comment-item v-for="(comment, index) in commentsList" :key="index" :commentInfo="comment"></comment-item>
                </div>

            </div>

        </div>
        <span class="close-icon" @click="clickClose">×</span>
    </div>
</template>


<script>
import CommentItem from './CommentItem.vue'
import InterFace from '../config/interface.js'
const apiAddr = InterFace.apiAddr
export default {
    name: "food_comments",
    props: {
        food: Object, 
        clickClose: Function,
        addToCart: Function,
        commentsList: Array
    },
    data() {
        return {
            apiAddr: apiAddr
        }
    },
    methods: {
        testApi(){
            this.$http.get('')
            .then((res) => {
                console.log('请求api成功')
                console.log(res)
            })
        }
    },
    components: {
        CommentItem
    },
    updated(){
        // console.log('更新属性了')
        
    },
    mounted(){
    }
}
</script>


<style lang="scss" scoped>
@import '../config/colorConfig.scss';
#food_comments{
    background: $BASIC_WHITE;
    position: fixed;
    width: 60%;
    height: 360px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    text-align: left;
    padding: 10px 20px;
    box-sizing: border-box;
    .inner{
        width: 95%;
        height: 95%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        box-sizing: border-box;
        .big-pic{
            width: 300px;
            height: 300px;
        }
        .food-detail{
            flex-grow: 1;
            margin-left: 10px;
            height: 300px;
            overflow: hidden;
            .food-name{
                font-size: 18px;
                border-bottom: 1px solid $LEVEL_1_BORDER;
                height: 40px;
            }
            .flex-wrap{
                display: flex;
                justify-content: space-between;
                margin: 10px 0;
                align-items: center;
                height: 40px;
                .price{
                    color: #f00;
                    font-size: 28px;
                }
            }
            .the-comments{
                height: 220px;
                overflow-y: scroll;
                box-sizing: border-box;
                padding-bottom: 40px;
            }
            
        }
    }
    .close-icon{
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        border: 1px solid $LEVEL_2_BORDER;
        cursor: pointer;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 18px;
    }
    
}

</style>