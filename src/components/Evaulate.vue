<template>
    <div id="evaluate">
        <el-collapse v-model="activeNames">
            
            <el-collapse-item  v-for="(item, index) in commentsList" :key="index" :name="index">
                <template slot="title">
                    <div class="item_inner">
                        <img class="food_avatar" :src="foodInfos[index].foodImg|imgUrlFilter" alt />
                        <p class="food_name">{{foodInfos[index].foodName}}</p>
                        <el-tag type="success" class="tag" v-if="item.comment_status">已评价</el-tag>
                        <el-tag type="info" class="tag" v-else>未评价</el-tag>
                    </div>
                </template>
                <div class="write_evaluate" v-if="!item.comment_status">
                    <div class="evaluate_score">
                        <p>请打分</p>
                        <el-rate v-model="item.comment_rate" :max="5"  text-color="#ff9900" show-text></el-rate>
                    </div>
                    
                    <div class="evaluate_content">
                        <textarea v-model="item.comment_content"></textarea>
                        <el-button type="primary" @click="publishComment(item.food_id, index)">发表评论</el-button>
                    </div>
                </div>
                <div class="get_evaluation" v-else>
                    <div class="evaluate_score">
                        <p>评分</p>
                        <el-rate :value="item.comment_rate" :max="5" :disabled="true" text-color="#ff9900"></el-rate>
                    </div>
                    <p class="evaluation_content">{{item.comment_content}}</p>
                </div>
            </el-collapse-item>
            
        </el-collapse>
    </div>
</template>


<script>
import Utils from '../utils/util.js'
import Qs from 'qs'
import Interface from '../config/interface.js'
export default {
    name: "evaluate",
    props: {
        commentsList: Array,
        orderid: String,
        foodInfos: Array
    },
    data() {
        return {
            activeNames: [],
            content: '',
            apiAddr: Interface.apiAddr
        };
    },
    methods: {
        publishComment(foodId, index){
            const userInfo = Utils.storage.get('userInfo')
            let p = {
                order_id: this.orderid,
                user_id: userInfo.userId,
                food_id: foodId,
                comment_content: this.commentsList[index].comment_content,
                comment_rate: this.commentsList[index].comment_rate
            }
            console.log(p)
            this.$http.post(`${this.apiAddr}comment/publishComment`, Qs.stringify(p))
            .then(res => {
                console.log(res)
                if(res.data.code == 200){
                    this.commentsList[index].comment_status = 1
                }
            })
        }
    }
};
</script>


<style lang="scss" scoped>
@import '../config/colorConfig.scss';
#evaluate {
    .item_inner {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        .food_avatar {
            height: 100%;
            border-radius: 50%;
            margin-left: 5%;
        }
        .food_name {
            margin: 0 10px;
        }

    }
    .write_evaluate{
        font-size: 12px;
        color: $SECONDARY_TEXT;
        width: 90%;
        margin: 5px auto;
        .evaluate_score{
            display: flex;
            p{
                margin-right: 8px;
            }
        }
        .evaluate_content{
            width: 100%;
            text-align: right;
            textarea{
                width: 100%;
                min-height: 50px;
                padding: 10px;
                resize: none;
            }
        }
    }
    .get_evaluation{
        font-size: 12px;
        color: $SECONDARY_TEXT;
        width: 90%;
        margin: 5px auto;
        .evaluate_score{
            display: flex;
            p{
                margin-right: 8px;
            }
            
        }
        .evaluation_content{
            text-align: left;
        }
    }
}
</style>