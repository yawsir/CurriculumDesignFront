<template>
    <div id="account">
        <div class="inner">
            <p> 地址：<span class="address" v-show="!isModifyAddress">{{userInfo.user_address}}</span>
                <input type="text" v-model="userInfo.user_address" v-show="isModifyAddress" @blur="switchModify"/>
                <i class="el-icon-edit" @click="switchModify"></i>
            </p>
            <p>性别：<span class="sex">{{userInfo.user_sex ? '男': '女'}}</span></p>
            <p>年龄:<span class="age">{{userInfo.user_age}}</span></p>
            <p>电话：<span class="tel">{{userInfo.user_tel}}</span></p>
            <p>邮箱：<span>{{userInfo.user_email}}</span></p>
            <p><el-button type="primary" size="mini" @click="isModifyPwd=!isModifyPwd">修改密码</el-button></p>
            <el-form :model="modifyPwdForm" :rules="rules" ref="modifyPwdForm" label-position="left" size="mini" 
                class="modify-pwd-form" :class="{'modify-pwd-form-active': isModifyPwd}">
                <el-form-item prop="oldPwd" label="原始密码">
                    <el-input v-model="modifyPwdForm.oldPwd" type="password" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item prop="newPwd" label="新密码">
                    <el-input v-model="modifyPwdForm.newPwd" type="password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="confirmPwd" label="确认密码">
                    <el-input v-model="modifyPwdForm.confirmPwd" type="password" auto-complete="off"></el-input>
                </el-form-item>
                <el-button type="success" @click="submitModify('modifyPwdForm')">提交</el-button>

            </el-form>
        </div>
    </div>
</template>

<script>
import Interface from '../config/interface.js'
import Utils from '../utils/util.js'
import Qs from 'qs'
import {Message} from 'element-ui'

export default {
    name: "account",
    data() {

        let validateConfirmPass = (rule, value, callback) => {
            if (value !== this.modifyPwdForm.newPwd) {
            callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        }
 
        return {
            userInfo: {
                
            },
            apiAddr: Interface.apiAddr,
            isModifyAddress: false,  //是否处于修改地址状态
            isModifyPwd: false,
            modifyPwdForm: {        //表单数据对象
                oldPwd: '',
                newPwd: '',
                confirmPwd: ''
            },
            rules: {                //表单验证规则 rules中的跪着名必须和表单数据对象modifyPwdForm中的属性名一样(坑坑坑)
                oldPwd: [
                    {required: true, message: '请输入原始密码',trigger: 'blur'}
                ],
                newPwd: [
                    {required: true, message: '请输入新密码', trigger: 'blur'}
                ],
                confirmPwd: [
                    {required: true, message: '请输入确认密码', trigger: 'blur'},
                    {validator:validateConfirmPass,trigger:'blur'}
                ]
            }
        }
    },
    methods: {
        switchModify() {    //修改地址
            this.isModifyAddress = !this.isModifyAddress;
            if (!this.isModifyAddress) {
                const localUserInfo = Utils.storage.get('userInfo')
                let p = {
                    user_name: localUserInfo.username,
                    newAddress: this.userInfo.user_address
                }
                console.log(p)
                this.$http.post(`${this.apiAddr}users/updateAddress`, Qs.stringify(p))
                .then((res) => {
                    if(res.data.code == 200){
                        this.getAlert('修改地址成功','success')
                    }
                })
            }
        },












        
        //确认修改密码
        submitModify(formRef){
            this.$refs[formRef].validate((valid) => {
                if (valid) {
                    alert('submit!')
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        getUserInfo(){  //获取用户信息
            const localUserInfo = Utils.storage.get('userInfo')
            let p = {
                user_name: localUserInfo.username
            }
            this.$http.post(`${this.apiAddr}users/getUserInfo`,Qs.stringify(p))    //?user_id=cookie中的user_id
            .then((res) => {
                console.log('用户信息')
                console.log(res)
                this.userInfo = res.data[0]
            })    
        },
        getAlert(message, type){    //弹窗
			Message({
				message,
				type
			})
		}  
    },
    mounted() {
        this.$emit("subMenuOpen", "/home/person/account")
        this.getUserInfo()
    }
}
</script>

<style lang="scss" scoped>
@import "../config/colorConfig.scss";
.inner {
    color: $SECONDARY_TEXT;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    p {
        text-align: left;
        margin: 10px 0;
        padding: 5px;
        span {
            color: $MAIN_TEXT;
            display: inline-block;
            padding-right: 5px;
        }
    }
    .modify-pwd-form{
        width: 40%;
        overflow: hidden;
        height: 0;
        transition: all 1s;
    }
    .modify-pwd-form-active{
        height: auto;
    }
}
</style>

