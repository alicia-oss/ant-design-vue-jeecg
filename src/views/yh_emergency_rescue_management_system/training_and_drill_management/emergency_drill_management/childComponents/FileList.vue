<template>
  <a-table
    :columns="defColumns"
    :dataSource="fileList"
    :pagination="false"
    :rowKey="record=>record.uid"
  >
     <span slot="action" slot-scope="record">
          <a @click="handlePreview(record)">预览</a>
          <a-divider type="vertical"/>
         <a @click="handleDownload(record)">下载</a>
     </span>

  </a-table>
</template>

<script>
  import { getFileAccessHttpUrl } from '@api/manage'
  const uidGenerator=()=>{
    return '-'+parseInt(Math.random()*10000+1,10);
  }
  const getFileName=(path)=>{
    if(path.lastIndexOf("\\")>=0){
      let reg=new RegExp("\\\\","g");
      path = path.replace(reg,"/");
    }
    return path.substring(path.lastIndexOf("/")+1);
  }
  export default {
    name: 'FileList',
    props:{
      value:{
        type:[String],
        required:false
      },
    },
    data(){
      return{
        defColumns: [
          {
            title: "文件名",
            align: "center",
            dataIndex: 'name',
            ellipsis: true,
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {
              filterDropdown: 'filterDropdown',
              filterIcon: 'filterIcon',
              customRender: 'action'
            },
          }
        ],
        fileList:[]
      }
    },

    methods:{
      handlePreview(){

      },
      handleDownload(){

      },
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
          fileList.push({
            uid:uidGenerator(),
            name:getFileName(arr[a]),
            status: 'done',
            url: url,
            response:{
              status:"history",
              message:arr[a]
            }
          })
        }
        this.fileList = fileList
      },

      close(){
        this.fileList = [];
      }
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

</style>