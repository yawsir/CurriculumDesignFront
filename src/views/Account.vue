<template>
    <div id="account">
        账号信息
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

</style>

