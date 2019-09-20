<template>
    <div class="comment-item">
        <div class="user-info">
            <img src="../assets/images/3.jpg" alt class="user-avator" />
        </div>
        <div class="user-comment">
            <p class="user-name">{{commentInfo.comment_user}}</p>
            <div class="food-rate">
                <el-rate :value="commentInfo.comment_rate" :max="5" disabled text-color="#ff9900"></el-rate>
            </div>
            <p class="food-comment">{{commentInfo.comment_text}}</p>
            <p class="comment-date">{{commentInfo.comment_date}}</p>
        </div>
    </div>
</template>


<script>
export default {
    name: "comment-item",
    props: {
        commentInfo: Object
    },
    data() {
        return {};
    },
    methods: {}
};
</script>


<style lang="scss" scoped>
.comment-item {
    width: 100%;
    display: flex;
    border-bottom: 1px solid $LEVEL_1_BORDER;
    align-items: center;
    padding: 3px 0;
    .user-info{
        .user-avator{
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
        
    }
    .user-comment{
        flex-grow: 1;
        margin-left: 10px; 
        font-size: 12px;
        color: $SECONDARY_TEXT;
        .food-rate{
            margin: 3px 0;
        }
        .food-comment{
            padding-bottom: 3px;
            color: $MAIN_TEXT;
        }
        .comment-date{
            text-align: right;
            padding-right: 5px;
        }
    }
}
</style>