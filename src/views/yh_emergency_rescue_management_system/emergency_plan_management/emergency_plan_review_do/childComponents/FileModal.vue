<template>
  <div>
    <a-drawer
      :title="title"
      :width="drawerWidth"
      @close="handleCancel"
      :visible="visible"
      :confirmLoading="confirmLoading">

      <iframe style="width: 100%;" :height="height" :src="fileUrl">

      </iframe>
    </a-drawer>
  </div>

</template>

<script>
import { Base64 } from 'js-base64'

export default {
  name: 'FileModal',
  data(){
    return{
      title:"应急预案文件预览",
      visible:false,
      drawerWidth:700,
      height:500,
      fileUrl:"",
      confirmLoading:false
    }
  },
  methods:{
    open(){
      // let url = 'https://edu-image.nosdn.127.net/23FD7BBDAB641A1A00C0F9532E7BC8C7.png?imageView&thumbnail=510y288&quality=100';
      this.visible = true;
      let url = 'https://www.yozodcs.com/static/backstage/index.html?file=sample/example/preview/doctest/index.json'
      this.resetScreenSize();
      this.fileUrl = 'http://127.0.0.1:8012/onlinePreview'+ '?url=' + encodeURIComponent(Base64.encode(url));
      this.confirmLoading = true;
    },
    resetScreenSize(){
      let screenWidth = document.body.clientWidth;
      this.height  = document.body.clientHeight-100;
      if(screenWidth < 500){
        this.drawerWidth = screenWidth-100;
      }else{
        this.drawerWidth = 700;
      }
    },

    close(){
      this.visible = false;
    },

    handleCancel(){
      this.$emit('close');
      this.close();
    },



  }
}
</script>

<style scoped>

</style>