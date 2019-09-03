<template>
    <div id="login">
        <div class="container" :class="{'right-panel-active': rightPanelActive}">
            <div class="form-container sign-up-container">
                <form>
                    <span>注册属于你的账号</span>
                    <input type="text" v-model="signUp.account" placeholder="账号" required/>
                    <p class="tip account-tip">{{signUpAccountTip}}</p>
                    <input type="password" v-model="signUp.pwd" placeholder="密码" required/>
                    <p class="tip pwd-tip">{{signUpPwdTip}}</p>
                    <input type="password" v-model="signUp.confirmPwd" placeholder="确认密码" required/>
                    <p class="tip confirm-pwd-tip">{{signUpConfirmPwdTip}}</p>
                </form>
                <button @click="doSignUp" :disabled="!isSignUpVerifyPass">注册</button>
            </div>
            <div class="form-container sign-in-container">
                <form>
                    <span>登录您的账号</span>
                    <input type="text" v-model="signIn.account" placeholder="账号" required/>
                    <p class="tip">{{signInAccountTip}}</p>
                    <input type="password" v-model="signIn.pwd" placeholder="密码" required/>
                    <p class="tip">{{signInPwdTip}}</p>
                </form>
                <button @click="doSignIn" :disabled="!isSignInVerifyPass">登录</button>
            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>欢迎回来</h1>
                        <p>与我们保持联系请登录您的个人信息</p>
                        <button class="ghost" id="signIn" @click="switchMode">登录</button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1>欢迎光临</h1>
                        <p>输入您的个人资料，并与我们一起开始旅程</p>
                        <button class="ghost" id="signUp" @click="switchMode">注册</button>
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
export default {
    name: "login",

    data() {
        return {
            rightPanelActive: false,//注册登录页面的切换
            
            signIn: {
                account: '',          //登录时填写的账号
                pwd: '',             //登录时填写的密码
            },
            signUp: {
                account: '',          //注册填写的账号
                pwd: '',              //注册填写的密码
                confirmPwd: '',      //注册填写的确认密码
            },

        }
    },
    methods: {
        switchMode(){
            this.rightPanelActive = !this.rightPanelActive
        },
        doSignIn(){
            // alert('登录')
            // this.$router.push({path: '/home/order'})
            if(this.isSignInVerifyPass){
                //弹出滑动验证码
                this.getVerification((res) => {
                    if(res.ret == 0){
                        console.log('验证成功')
                        this.$router.push({path: '/home/order'})
                    }
                })
            }
        },
        doSignUp(){ //点击注册
            if(this.isSignUpVerifyPass){
                //弹出滑动验证码
                this.getVerification((res) => {
                    if(res.ret == 0){
                        console.log('验证成功')
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
        }

    },
    computed: {
        signUpConfirmPwdTip(){    //注册账号的提示
            if(!this.signUp.confirmPwd){
                return '确认密码不能为空'
            }
            if(this.signUp.pwd !== this.signUp.confirmPwd){
                return '两次输入的密码不同'
            }
            return ''
        },
        signUpPwdTip(){           //注册密码的提示
            if(!this.signUp.pwd){
                return '密码不能为空'
            }
            return ''
        },
        signUpAccountTip(){       //注册确认密码的提示
            if(!this.signUp.account){
                return '账号不能为空'
            }
            return ''
        },
        isSignUpVerifyPass(){      //注册验证是否通过
            if(this.signUpPwdTip || this.signUpConfirmPwdTip || this.signUpAccountTip){
                return false
            }
            return true
        },
        signInAccountTip(){      //登录账号提示
            if(!this.signIn.account){
                return '账号不能为空'
            }
            return ''
        },
        signInPwdTip(){     //登录密码提示
            if(!this.signIn.pwd){
                return '密码不能为空'
            }
            return ''
        },
        isSignInVerifyPass(){
            if(this.signInAccountTip || this.signInPwdTip){
                return false
            }
            return true
        }
    },
    mounted(){
    }
};
</script>


<style scoped>
*{
    box-sizing: border-box;
}
#login{
    font-family: 'Montserrat', sans-serif;
    background: #f6f5f7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url('../assets/images/loginBg.png');
    background-size: cover;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
h1 {
    font-weight: bold;
    margin: 0;
    color: beige;
}

p {
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
}

span {
    font-size: 12px;
    color: beige;
}

a {
    color: #fff;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
}
.container {
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
    opacity: 0.8;
}

.form-container form {
    background: rgba(45, 52, 54, 1.0);
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.form-container button{
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
}

.social-container {
    margin: 20px 0;
}

.social-container a {
    border: 1px solid #ddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
}


.form-container input {
    background: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
}

button {
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background: #ff4b2b;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    /* transition: transform 80ms ease-in; */
}

input[type=text] {
    width: 240px;
    text-align: center;
    background: transparent;
    border: none;
    border-bottom: 1px solid #fff;
    font-family: 'PLay', sans-serif;
    font-size: 16px;
    font-weight: 200px;
    padding: 10px 0;
    transition: border 0.5s;
    outline: none;
    color: #fff;
    font-weight: bold;
}
.tip{
    font-size: 14px;
    letter-spacing: 0.5px;
    color: #f00;
    margin: 0;
}



input[type=password] {
    width: 240px;
    text-align: center;
    background: transparent;
    border: none;
    border-bottom: 1px solid #fff;
    font-family: 'PLay', sans-serif;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0;
    transition: border 0.5s;
    outline: none;
    color: #fff;
}

input[type=email] {
    width: 240px;
    text-align: center;
    background: transparent;
    border: none;
    border-bottom: 1px solid #fff;
    font-family: 'PLay', sans-serif;
    font-size: 16px;
    font-weight: 200px;
    padding: 10px 0;
    transition: border 0.5s;
    outline: none;
    color: #fff;
    font-weight: bold;
}


button:hover {
    background: #ff5b3e;
}
button:active{
    background: #f13412;
}

button:focus {
    outline: none;
}
button:disabled{
    background: #cdcdcd;
    border: #cdcdcd;
}

/* button.ghost {
    background: transparent;
    border-color: #ff4b2b;
    background-color: #ff4b2b
} */

.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}

.sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
}

.sign-up-container {
    left: 0;
    width: 50%;
    z-index: 1;
    opacity: 0;
}

.overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
}

.overlay {
    background: transparent;
    background: linear-gradient(to right, #ff4b2b, #ff416c) no repeat 0 0 /cover;
    color: #fff;
    position: absolute;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay-panel {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 40px;
    height: 100%;
    width: 50%;
    text-align: center;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay-right {
    right: 0;
    transform: translateX(0);
}

.overlay-left {
    transform: translateX(-20%);
}

/*....Animation....*/

/*....Move signin to the right....*/
.container.right-panel-active .sign-in-container {
    transform: translateX(100%);
}

/*....Move overlay to the left....*/
.container.right-panel-active .overlay-container {
    transform: translateX(-100%);
}

/*....Bring sign up over sign in....*/
.container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
}

/*...Move overlay back to right....*/
.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.container.right-panel-active .overlay-left {
    transform: translateX(0);
}

.container.right-panel-active .overlay-right {
    transform: translateX(20%);
}
</style>