<template>
    <div id="favourite">
        喜欢的菜
    </div>
</template>

<script>
export default {
    name: '',
    data(){
        return {
            
        }
    },
    mounted(){
      this.$emit('subMenuOpen', '/home/person/favourite')  
    }
}
</script>

<style lang="scss" scoped>

</style>

