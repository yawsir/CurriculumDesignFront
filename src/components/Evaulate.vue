<template>
    <div id="evaluate">
        <el-collapse v-model="activeNames">
            
            <el-collapse-item name="1">
                <template slot="title">
                    <div class="item_inner">
                        <img class="food_avatar" src="../assets/images/1.jpg" alt />
                        <p class="food_name">菜名</p>
                        <el-tag type="info" class="tag">未评价</el-tag>
                    </div>
                </template>
                <div class="write_evaluate" v-if="true">
                    <div class="evaluate_score">
                        <p>请打分</p>
                        <el-rate :value="0" :max="5"  text-color="#ff9900" show-text></el-rate>
                    </div>
                    
                    <div class="evaluate_content">
                        <textarea></textarea>
                        <el-button type="primary">发表评论</el-button>
                    </div>
                </div>
                <div class="get_evaluation" v-else>
                    <div class="evaluate_score">
                        <p>评分</p>
                        <el-rate :value="3" :max="5"  text-color="#ff9900"></el-rate>
                    </div>
                    <p class="evaluation_content">否决ad开否家老就老三老</p>
                </div>
            </el-collapse-item>

            <el-collapse-item name="2">
                <template slot="title">
                    <div class="item_inner">
                        <img class="food_avatar" src="../assets/images/1.jpg" alt />
                        <p class="food_name">菜名</p>
                        <el-tag type="success" class="tag">已评价</el-tag>
                    </div>
                </template>
                <div class="write_evaluate" v-if="false">
                    <div class="evaluate_score">
                        <p>请打分</p>
                        <el-rate :value="0" :max="5"  text-color="#ff9900" show-text></el-rate>
                    </div>
                    
                    <div class="evaluate_content">
                        <textarea></textarea>
                        <el-button type="primary">发表评论</el-button>
                    </div>
                </div>
                <div class="get_evaluation" v-else>
                    <div class="evaluate_score">
                        <p>评分</p>
                        <el-rate :value="2" :max="5" disabled text-color="#ff9900"></el-rate>
                    </div>
                    <p class="evaluation_content">否决ad开否家老就老三老</p>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>


<script>
export default {
    name: "evaluate",

    data() {
        return {
            activeNames: [],
            content: ''
        };
    },
    methods: {}
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