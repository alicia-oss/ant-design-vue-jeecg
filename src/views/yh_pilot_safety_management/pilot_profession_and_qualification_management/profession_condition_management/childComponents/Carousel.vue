<template>
<!--  <a-carousel arrows>-->
<!--    <div-->
<!--      slot="prevArrow"-->
<!--      slot-scope="props"-->
<!--      class="custom-slick-arrow"-->
<!--      style="left: 10px;zIndex: 1"-->
<!--    >-->
<!--      <a-icon type="left-circle" />-->
<!--    </div>-->
<!--    <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 10px">-->
<!--      <a-icon type="right-circle" />-->
<!--    </div>-->

<!--    <div class="image"  v-for="item in fileList" >-->
<!--      <img :src="item">-->
<!--    </div>-->
<!--    <div v-if="fileList.length === 0">-->
<!--      <a-empty></a-empty>-->
<!--    </div>-->

<!--  </a-carousel>-->
  <div>
    <swiper >
      <swiper-item v-for="item in fileList">
        <img :src="item">
      </swiper-item>
    </swiper>
    <a-empty v-if="fileList.length === 0" ></a-empty>
  </div>
</template>

<script>
import { getFileAccessHttpUrl } from '@api/manage'
import {
  Swiper,
  SwiperItem
} from './childComponents/swiper'

export default {
  name: 'Carousel',
  components: {
    Swiper,
    SwiperItem
  },
  data(){
    return {
      fileList: [],
    }
  },
  props:{
    value:""
  },
  methods:{
    initFileList(paths){
      if(!paths || paths.length==0){
        //return [];
        // update-begin- --- author:os_chengtgen ------ date:20190729 ---- for:issues:326,Jupload组件初始化bug
        this.fileList = [];
        return;
        // update-end- --- author:os_chengtgen ------ date:20190729 ---- for:issues:326,Jupload组件初始化bug
      }
      let fileList = [];
      let arr = paths.split("?")
      for(let a=0;a<arr.length;a++){
        let url = getFileAccessHttpUrl(arr[a]);
        fileList.push(url);
      }
      this.fileList = fileList;
    },
  },
  watch:{
    value:{
      immediate: true,
      handler(){
        let val = this.value;
        this.initFileList(val);
      }
    }
  }
}
</script>

<style scoped>
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 50%;
  /*line-height: 200px;*/
  overflow: hidden;
}


.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.image{
  align-self: center;
  /*height: 300px;*/
  width: 400px;
  overflow: hidden;
}
</style>