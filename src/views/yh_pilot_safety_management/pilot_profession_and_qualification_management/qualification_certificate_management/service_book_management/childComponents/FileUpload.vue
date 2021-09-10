<template>
  <div>
    <a-upload
      :action="getUrl"
      :multiple="true"
      :file-list="fileList"
      @change="handleChange"
      :before-upload="beforeFileUpload"
      @preview="handlePreview"
    >
      <a-button> <a-icon type="upload" /> Upload </a-button>
    </a-upload>
  </div>
</template>

<script>
import {Base64} from "js-base64";
export default {
  name:'FileDemo',
  props:{
    url:""
  },
  data(){
    return{
      fileList: [
        // {
        //   // uid: '-1',
        //   // name: 'xxx.png',
        //   // status: 'done',
        //   // url: 'http://www.baidu.com/xxx.png',
        // },
      ],
      uploadFileName:""


    }
  },
  methods: {
    handleChange(info) {
      let fileList = [...info.fileList];
      // 1. Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new
      // fileList = fileList.slice(-2);
      let temp = new String();
      for (const fileListKey in fileList) {
        temp +=fileListKey.name;
        temp +="?";
      }
      this.uploadFileName = temp;

      // 3.上传是否成功提示
      const status = info.file.status;
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
        return;
      }

      // 2. read from response and show file link
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response;
        }
        return file;
      });
      this.fileList = fileList;
    },

    beforeFileUpload(file) {
      let FileExt = file.name.replace(/.+\./, "");
      if (['jpg','png','gif','tif','bmp','mp3','mp4','avi','mov','rmvb','rm','mpg','wmv','wav','flv','doc','docx','xls','xlsx','rtf','ppt','pdf','wps','rar','zip'].indexOf(FileExt.toLowerCase()) === -1){
          this.$message.error({
            content:'请上传后缀名为.jpg,.png,.gif,.tif,.bmp,.mp3,.mp4,.avi,.mov,.rmvb,.rm,.mpg,.wmv,.wav,.flv,.doc,.docx,.xls,.xlsx,.rtf,.ppt,.pdf,.wps,rar,zip的文件！',
            duration: 2
             })
          return false;
      }
    },

    handlePreview(info){
      if(info.status === 'done') {
        if (info && info.name) {
          let url = window._CONFIG['onlinePreviewDomainURL'] + '?url=' + encodeURIComponent("http://localhost:8080/jeecgboot/file/"+info.name)
          window.open(url, '_blank')
        }
      }
    },

    getDefaultData(uploadFileName){
      this.fileList = new Array();
      console.log(uploadFileName);
      if(uploadFileName!=[] && uploadFileName!=undefined){
        for (let i = 0;i<uploadFileName.length;i++) {
          let temp = new Object();
          temp.uid = i.toString();
          temp.name = uploadFileName[i];
          temp.status = 'done';
          temp.url =  uploadFileName[i];
          this.fileList.add(temp);
        }
      }

    }


    //   handleDownload(item){
    //     // window.open(item.url);
    //     // console.log(item);
    //     // 不打开播放 要解决跨域
    //     fetch(item.url,{mode: 'no-cors'}).then(res => res.blob()).then(blob => {
    //       const a = document.createElement('a');
    //       document.body.appendChild(a)
    //       a.style.display = 'none'
    //       // 使用获取到的blob对象创建的url
    //       const url = window.URL.createObjectURL(blob);
    //       a.href = url;
    //       // 指定下载的文件名
    //       a.download = item.name;
    //       a.click();
    //       document.body.removeChild(a)
    //       // 移除blob对象的url
    //       window.URL.revokeObjectURL(url);
    //     });
    //     }
  },

  computed:{
    getUrl :function() {
      return window._CONFIG['domianURL'] + this.url;
    }
  },
  created() {


  }

}
</script>

<style>

</style>