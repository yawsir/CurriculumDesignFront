<template>
    <div id="account">
        <div class="inner">
            <p class="adderss">地址：1231312</p>
            <p class="sex">性别：男</p>
            <p class="age">年龄: </p>
            <p class="tel">电话：</p>
            <p class="emain">邮箱：</p>

        </div>
    </div>
</template>

<script>
export default {
    name: '',
    data(){
        return {

        }
    },
    mounted() {
      this.$emit('subMenuOpen', '/home/person/account')  
    },
}
</script>

<style lang="scss" scoped>
.inner{
    padding: 10px;
    p{
        text-align: left;

    }
}
</style>

