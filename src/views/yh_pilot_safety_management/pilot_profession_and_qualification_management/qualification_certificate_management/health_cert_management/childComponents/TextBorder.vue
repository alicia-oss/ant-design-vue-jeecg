<template>
<div class="textBorder" :style="{height:height}">
  <span class="title">
    {{title}}
  </span>
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'TextBorder',
  props:{
    title:"",
    height:""
  }
}
</script>

<style scoped>
.textBorder{
  position: relative;
  box-sizing: border-box;
  margin: 3px;
  border: 0.5px solid rgba(0, 0, 0, 0.15);
  padding: 30px 10px 10px 10px !important;
}
.title{
  font-size: 20px;
  display:block;
  padding: 10px 5px;
  /*居中*/
  /*left: 37%;*/
  top:-25px;
  align-self: center;
  position:absolute;
  background: white;
}
</style>