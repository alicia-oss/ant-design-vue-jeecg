
import FileUpload from '@comp/yh_components/tools/file/FileUpload'
import TextBorder from '@comp/yh_components/border/TextBorder'
import FileList from '@comp/yh_components/tools/file/FileList'
import { uuid } from '@tinymce/tinymce-vue/lib/es2015/Utils'
import { copyObj } from 'codemirror/src/util/misc'
import { httpAction } from '@api/manage'
import upload from 'ant-design-vue/lib/vc-upload/src/request'

export const ModalMixin = {
  data(){
    return {
      method:"",
      loading:false,
      title:"操作",
      visible: false,
      model: {},
      layout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 14 },
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
      confirmLoading: false,
    }
  },
  components:{
    TextBorder,
    FileUpload,
    FileList
  },
  methods: {
    add () {
      this.edit({});
      let myData = new Date();
      // this.model.uploadDate = myData.toLocaleDateString();
      // var time1 = new Date().Format("yyyy-MM-dd");
      // var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss")
      this.model.uploadDate = myData.Format("yyyy-MM-dd");
      this.model.uploadUserId = this.$store.getters.userInfo.realname;
    },
    edit (record) {
      this.model = Object.assign({}, record);
      this.visible = true;
    },
    close () {
      if(this.method !== 'check'){
        this.$refs.formAdd.resetFields();
      }
      else {
        this.$refs.formCheck.resetFields();
      }
      this.$emit('close');
      this.visible = false;
    },


    // handleOk(){
    //   let modelData = new Object();
    //   copyObj(this.model,modelData);
    //   this.$refs.formAdd.validate(valid=>{
    //     if(valid) {
    //       if(this.method === "add"){
    //         this.model.serviceBookId = uuid("");
    //         this.$emit("ok",{method:"add",modelData:modelData})
    //       }
    //       else if(this.method === "edit"){
    //         this.$emit("ok",{method:"edit",modelData:modelData})
    //       }
    //       this.close();
    //     }
    //   })
    // },

    handleOk(){
      const that = this;
      this.$refs.formAdd.validate(valid=>{
        if(valid) {
          that.confirmLoading = true;
          let httpurl = '';
          let method = '';
          if(this.method === "add"){
            httpurl+=this.url.add;
            method = 'post';
          }
          else if(this.method === "edit"){
            httpurl+=this.url.edit;
            method = 'put';
          }
          httpAction(httpurl,this.model,method).then((res)=>{
            if(res.success){
              that.$message.success(res.message);
              that.$emit('ok');
            }else{
              that.$message.warning(res.message);
            }
          }).finally(() => {
            that.confirmLoading = false;
            that.close();
          })
        }
      })
    },

    handleCancel () {
      this.close()
    },

    handleReset(){
      this.add();
    },

    //check模式
    handleLast(){

    },

    handleNext(){

    },

  }
}