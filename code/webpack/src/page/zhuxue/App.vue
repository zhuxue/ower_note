<!--渲染模版-->
<template>
  <div class="container">
     <h1>
       {{ msg }}

       <span></span>


       <div @click="tt">
         我四你大爷
       </div>

     </h1>



  </div>

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
        msg: 'Hello,Webpack',
        es: "345"
      }
    },
    methods:{
      tt() {

      }
    }
  }
</script>
