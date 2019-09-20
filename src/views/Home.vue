<template>
    <div id="home">
        <div class="header">
            <div class="logo"><p>LOGO</p></div>

            <div class="nav">
                <el-menu
                    :default-active="subMenuIndex"
                    class="el-menu-demo"
                    mode="horizontal"
                    :router="true"
                    :backgroundColor="colorConfig.BASIC_WHITE"
                    :textColor="colorConfig.MAIN_TEXT"
                    :activeTextColor="colorConfig.PRIMARY"
                    @select="handleSelect"
                >
                    <el-menu-item index="/home/order">点餐</el-menu-item>
                    <el-menu-item index="/home/person/orderforms">个人中心</el-menu-item>
                </el-menu>
            </div>

            <div class="user_about">
                <div class="avatar">
                    <el-avatar
                        shape="circle"
                        size="medium"
                        fit="fit"
                        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                    ></el-avatar>
                </div>
                <div class="dropdown">
                    <el-dropdown :hide-on-click="true" trigger="hover" @command="onClickDropdownItem">
                        <span class="el-dropdown-link">
                            {{userInfo.username}}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-user" command="orderforms">我的订单</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-location-outline" command="account">我的地址</el-dropdown-item>
                            <el-dropdown-item :divided="true" icon="el-icon-switch-button">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>

        <router-view @subMenuOpen="onSubMenuOpen"> </router-view>
    </div>
</template>

<script>
import colorConfig from "../config/colorConfig";
import Utils from '../utils/util.js'
export default {
    name: "Home",
    data() {
        return {
            colorConfig: colorConfig,
            subMenuIndex: '/home/order',
            userInfo: {
            }
        };
    },
    methods: {
        handleSelect(key, keyPath) {    //点击导航栏
            // console.log(key, keyPath);
        },
        onClickDropdownItem(command){  //点击右上角下拉列表项
            if(command){
                this.$router.push({path: `/home/person/${command}`})
            }
        },
        onSubMenuOpen(subMenuIndex){
            this.subMenuIndex = subMenuIndex
        },
        getUsername(){  //获取local storage中的用户名
            this.userInfo = Utils.storage.get('userInfo')
        }
    },
    mounted(){
        this.getUsername()
    }
};
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    background: #ffffff;
    .logo{
        flex: 1;
        text-align: center;
        position: relative;
        p{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    .nav {
        flex: 3;
    }
    .user_about{
        flex: 1;
        display: flex;
        align-items: center;
        .avatar{
            flex: 1;
        }
        .dropdown{
            flex: 2;
            text-align: left;
        }
    }
    
}
</style>

