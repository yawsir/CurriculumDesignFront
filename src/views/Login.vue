<template>
    <div id="login">
        <div class="login-wrap">
			<div class="login-html">
				<input id="tab-1" type="radio" name="tab" class="sign-in" checked /><label for="tab-1" class="tab">登录</label>
				<input id="tab-2" type="radio" name="tab" class="sign-up" /><label for="tab-2" class="tab">注册</label>
				<div class="login-form">
					<div class="sign-in-htm">
						<form id="signInForm" @submit.prevent="signInFormSubmit">
							<div class="group">
								<label for="sign-in-user" class="label">用户名</label>
								<input id="sign-in-user" type="text" class="input" v-model="signInInfo.account" required />
							</div>
							<div class="group">
								<label for="sign-in-pass" class="label">密码</label>
								<input id="sign-in-pass" type="password" class="input" v-model="signInInfo.pwd" data-type="password" required/>
							</div>
							<div class="group">
								<input type="submit" class="button" value="登录" />
							</div>
						</form>
						<div class="hr"></div>
						<div class="foot-lnk">
							<a href="#forgot">忘记密码?</a>
						</div>
					</div>
					<div class="sign-up-htm">
						<form id="signUpForm" @submit.prevent="signUpFormSubmit">
						<div class="group">
							<label for="user" class="label">用户名</label>
							<input id="user" type="text" class="input" v-model="signUpInfo.account" @blur="changeAccount" required />
							<i class="sign-up-icon" :class="{'el-icon-circle-close': !signUpAccountCanUse,'el-icon-circle-check': signUpAccountCanUse}"></i>
						</div>
						<div class="group">
							<label for="realname" class="label">年龄</label>
							<input id="realname" type="number" class="input" v-model="signUpInfo.age" required/>
						</div>
						<div class="group">
							<span class="sex-label">性别</span>
							<div class="sex-radio">
								<el-radio-group v-model="signUpInfo.sex">
									<el-radio :label="'1'">男</el-radio>
									<el-radio :label="'0'">女</el-radio>
								</el-radio-group>
							</div>
						</div>
						<div class="group">
							<label for="email" class="label">邮箱</label>
							<input id="email" type="email" class="input" v-model="signUpInfo.email" required/>
						</div>
						<div class="group">
							<label for="tel" class="label">电话号码</label>
							<input id="tel" type="tel" class="input" v-model="signUpInfo.tel" required/>
						</div>
						<div class="group">
							<label for="pass" class="label">密码</label>
							<input id="pass" type="password" class="input" data-type="password" v-model="signUpInfo.pwd" required/>
						</div>
						<div class="group">
							<label for="cf-pass" class="label">确认密码</label>
							<input id="cf-pass" type="password" class="input" data-type="password" v-model="signUpInfo.confirmPwd" required/>
							<p class="confirmPwdTip" v-show="!isPwdSame">两次输入的密码不一致</p>
						</div>
						
						<div class="group">
							<input type="submit" class="button" value="注册" />
						</div>
						</form>
						<div class="hr"></div>
					</div>
				</div>
			</div>
		</div>
        <div id="TencentCaptcha"
            type="button">
        </div>
    </div>
</template>


<script>
import Interface from '../config/interface.js'
import qs from 'qs'
const apiAddr = Interface.apiAddr
import {Message} from 'element-ui'
import Utils from '../utils/util.js'
export default {
    name: "login",

    data() {
        return {
            rightPanelActive: false,//注册登录页面的切换
            apiAddr,
            signInInfo: {
                account: '',          //登录时填写的账号
                pwd: '',             //登录时填写的密码
            },
            signUpInfo: {
                account: '',
                age: '',
                email: '',
                tel: '',
                sex: '1', 	//1男 0女         
                pwd: '',
                confirmPwd: '',     

			},
			cancelAjax: null,	//取消ajax请求的函数变量
			signUpAccountCanUse: false

        }
    },
    methods: {
        signInFormSubmit(){		//提交登录表单
            // console.log(this.signInInfo)
            this.getVerification((res) => {
                if(res.ret == 0){
					console.log('验证成功')
					let p = {
						username:this.signInInfo.account,
						pwd: this.signInInfo.pwd
					}
					// this.$router.push({path: '/home/order'})
					this.$http.post(`${this.apiAddr}users/login`, qs.stringify(p))
					.then(res => {
						console.log(res)
						if(res.data.code == 200){	//用户名密码匹配
							//将user_id和username保存在local storage中
							const userInfo = {
								userId: res.data.user_id,
								username: res.data.user_name
							}
							Utils.storage.set('userInfo', JSON.stringify(userInfo))
							this.$router.push({path: '/home/order'})
						}else{	//用户名或密码错误
							this.getAlert('用户名密码错误', 'error')
						}
					})
                }
            })
        },
		signUpFormSubmit(){		//提交注册表单
			if(this.isPwdSame){
				this.getVerification((res) => {
					if(res.ret == 0){
						console.log('验证成功')
						let p = {
							username: this.signUpInfo.account,
							pwd: this.signUpInfo.pwd,
							age: this.signUpInfo.age,
							sex: this.signUpInfo.sex,
							email: this.signUpInfo.email,
							tel: this.signUpInfo.tel
						}
						//注册http://10.129.13.185:8080/Online_order_/users/register
						//${this.apiAddr}modifyAddress
						this.$http.post(`${this.apiAddr}users/register`, qs.stringify(p))
						.then(res => {
							// console.log(res)
							this.getAlert('注册成功', 'success')
						})
						.catch(err => {
							console.log(err)
						})
					}
				})
			}
            
		},
		//取消上一次ajax请求
		cancelRequest(){
			if(typeof this.cancelAjax ==='function'){
				this.cancelAjax('终止请求'); //取消请求
			}
    	},
		changeAccount(){		//注册时输入用户名
			// console.log(this.signInInfo.account)
			this.signUpAccountCanUse = false
			if(this.signUpInfo.account !== ''){
				this.$http.post(`${this.apiAddr}users/isExist`,
					qs.stringify({
						username:this.signUpInfo.account
					})
				)
				.then((res) => {
					// console.log(res)
					if(res.data.code == 200){
						this.signUpAccountCanUse = true
					}
						
					
				})
				.catch((err) => {
					if(this.$http.isCancel(err)){
						console.log('上次请求取消', err.message)
					}else{
						console.log(err)
					}
				})
			}
		},
        //弹出验证码
        getVerification(callback, options){
            new TencentCaptcha('2015742382',callback,options).show()
        },
        preventSubmit(){    //阻止表单的默认提交行为
            return false
		},
		getAlert(message, type){
			Message({
				message,
				type
			})
		}

    },
    computed: {
		isPwdSame(){
			if(this.signUpInfo.pwd !== '' && this.signUpInfo.pwd === this.signUpInfo.confirmPwd){
				return true
			}
			return false
		}
    },
    mounted(){
    }
};
</script>


<style scoped>
    *,:after,:before{box-sizing:border-box}
.clearfix:after,.clearfix:before{content:'';display:table}
.clearfix:after{clear:both;display:block}
#login{
    color:#6a6f8c;
	font:600 16px/18px 'Open Sans',sans-serif;
}
a{color:inherit;text-decoration:none;}
input, button {
  outline: none;
  border: none;
}
.login-wrap{
	width:100%;
	margin:auto;
	max-width:525px;
	min-height:670px;
	position:relative;
	background:url(../assets/images/loginBg.jpg) no-repeat center;
	box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
}
.login-html{
	width:100%;
	height:100%;
	position:absolute;
	padding:90px 70px 50px 70px;
	background:rgba(40,57,101,.9);
}
.login-html .sign-in-htm,
.login-html .sign-up-htm{
	top:0;
	left:0;
	right:0;
	bottom:0;
	position:absolute;
	-webkit-transform:rotateY(180deg);
	        transform:rotateY(180deg);
	-webkit-backface-visibility:hidden;
	        backface-visibility:hidden;
	-webkit-transition:all .4s linear;
	        transition:all .4s linear;
}
.login-html .sign-in,
.login-html .sign-up,
.login-form .group .check{
	display:none;
}
.login-html .tab,
.login-form .group .label,
.login-form .group .button{
	text-transform:uppercase;
}
.login-form .group .label{
    text-align: left;
}
.login-form .group .sex-label{
    color: #aaa;
    font-size: 12px;
    display: inline-block;
   position: relative;
   right: 128px;
}
.login-form .group .sex-radio{
     position: relative;
   right: 85px;
   display: inline-block;
}
.login-html .tab{
	font-size:22px;
	margin-right:15px;
	padding-bottom:5px;
	margin:0 15px 10px 0;
	display:inline-block;
	border-bottom:2px solid transparent;
}
.login-html .sign-in:checked + .tab,
.login-html .sign-up:checked + .tab{
	color:#fff;
	border-color:#1161ee;
}
.login-form{
	min-height:345px;
	position:relative;
	-webkit-perspective:1000px;
	        perspective:1000px;
	-webkit-transform-style:preserve-3d;
	        transform-style:preserve-3d;
}
.login-form .group{
	margin-bottom:15px;
	position: relative;
}
.login-form .group .confirmPwdTip{
	color:#F56C6C;
	font-size: 12px;
	text-align: left;
}
.login-form .group .label,
.login-form .group .input,
.login-form .group .button{
	width:100%;
	color:#fff;
	display:block;
}
.login-form .group .input,
.login-form .group .button{
	border:none;
	padding:5px 20px;
	border-radius:25px;
	background:rgba(255,255,255,.1);
}
.login-form .group input[data-type="password"]{
	/* text-security:circle; */
	-webkit-text-security:circle;
}
.login-form .group .label{
	color:#aaa;
	font-size:12px;
}
.login-form .group .button{
	background:#1161ee;
}
.login-form .group label .icon{
	width:15px;
	height:15px;
	border-radius:2px;
	position:relative;
	display:inline-block;
	background:rgba(255,255,255,.1);
}
.login-form .group .sign-up-icon{
	position: absolute;
	top: 50%;
	right: 5%;
}
.el-icon-circle-close{
	color: #f00;
}
.el-icon-circle-check{
	color:#0f0;
}
.login-form .group label .icon:before,
.login-form .group label .icon:after{
	content:'';
	width:10px;
	height:2px;
	background:#fff;
	position:absolute;
	-webkit-transition:all .2s ease-in-out 0s;
	        transition:all .2s ease-in-out 0s;
}
.login-form .group label .icon:before{
	left:3px;
	width:5px;
	bottom:6px;
	-webkit-transform:scale(0) rotate(0);
	    -ms-transform:scale(0) rotate(0);
	        transform:scale(0) rotate(0);
}
.login-form .group label .icon:after{
	top:6px;
	right:0;
	-webkit-transform:scale(0) rotate(0);
	    -ms-transform:scale(0) rotate(0);
	        transform:scale(0) rotate(0);
}
.login-form .group .check:checked + label{
	color:#fff;
}
.login-form .group .check:checked + label .icon{
	background:#1161ee;
}
.login-form .group .check:checked + label .icon:before{
	-webkit-transform:scale(1) rotate(45deg);
	    -ms-transform:scale(1) rotate(45deg);
	        transform:scale(1) rotate(45deg);
}
.login-form .group .check:checked + label .icon:after{
	-webkit-transform:scale(1) rotate(-45deg);
	    -ms-transform:scale(1) rotate(-45deg);
	        transform:scale(1) rotate(-45deg);
}
.login-html .sign-in:checked + .tab + .sign-up + .tab + .login-form .sign-in-htm{
	-webkit-transform:rotate(0);
	    -ms-transform:rotate(0);
	        transform:rotate(0);
}
.login-html .sign-up:checked + .tab + .login-form .sign-up-htm{
	-webkit-transform:rotate(0);
	    -ms-transform:rotate(0);
	        transform:rotate(0);
}

.hr{
	height:2px;
	margin:60px 0 50px 0;
	background:rgba(255,255,255,.2);
}
.foot-lnk{
	text-align:center;
}
</style>