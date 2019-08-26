<template>
    <div id="person">
        <div class="person_nav">
            <el-menu
                :default-active="subMenuIndex"
                mode="vertical"
                class="el-menu-demo"
                :router="true"
                :backgroundColor="colorConfig.BASIC_WHITE"
                :textColor="colorConfig.MAIN_TEXT"
                :activeTextColor="colorConfig.PRIMARY"
            >
                <el-menu-item index="/home/person/orderforms">
                    <i class="el-icon-document"></i>
                    <span slot="title">我的订单</span>
                </el-menu-item>
                <el-menu-item index="/home/person/account">
                    <i class="el-icon-user"></i>
                    <span slot="title">我的账号</span>
                </el-menu-item>
                <el-menu-item index="/home/person/favourite">
                    <i class="el-icon-star-off"></i>
                    <span slot="title">我喜欢的菜</span>
                </el-menu-item>
                
            </el-menu>
        </div>

        <div class="person_content">
            <router-view @subMenuOpen="onSubMenuOpen"></router-view>
        </div>
    </div>
</template>

<script>
import ColorConfig from '../config/colorConfig'
export default {
    name: "Person",
    data() {
        return {
            colorConfig: ColorConfig,
            subMenuIndex: '/home/person/orderforms'
        }
    },
    methods: {
        onSubMenuOpen(subMenuIndex){
            this.subMenuIndex = subMenuIndex
        }
    },
    mounted(){
        this.$emit('subMenuOpen', '/home/person/orderforms')
    }
};
</script>

<style lang="scss" scoped>
@import "../config/colorConfig.scss";
#person {
    background: $BASIC_WHITE;
    margin-top: 10px;
    display: flex;
    overflow: hidden;
    background: #f7f7f7;
    .person_nav{
        flex: 1;
        padding-bottom: 1000px;
        margin-bottom: -1000px;
        background: #fff;
        border-right: 1px solid $LEVEL_3_BORDER;
        .el-menu-demo{
            border: 0;
        }
    }
    .person_content{
        flex: 4;
        background: $BASIC_WHITE;
        padding-bottom: 1000px;
        margin-bottom: -1000px;
        border-bottom: 1px solid $LEVEL_3_BORDER;
    }
}
</style>

