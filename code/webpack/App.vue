@/page/zhuxue/util/show@/page/zhuxue/util/show<!--渲染模版-->
<template>
  <h1>{{ msg }}</h1>
</template>

<!--样式描述-->
<style scoped lang="scss">
  h1 {
    color: red;
  }
</style>

<!--组件逻辑-->
<script lang="ts">
  export default {
    data() {
      return {
        msg: 'Hello,Webpack123'
      }
    }
  }
</script>
