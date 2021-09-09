<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    @ok="handleOk"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">
        <a-form-model-item label="证书编号" required prop="certNum" hasFeedback>
          <a-input v-model="model.certNum"    placeholder="请输入证书编号"/>
        </a-form-model-item>

        <a-form-model-item label="员工编号" required prop="employeeId" hasFeedback>
          <a-input v-model="model.employeeId"    placeholder="请输入员工编号"/>
        </a-form-model-item>

        <a-form-model-item label="签发日期"  prop="issuingDate" hasFeedback>
          <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.issueDate" />
        </a-form-model-item>

        <a-form-model-item label="部门"  prop="apartment" hasFeedback >
          <a-input  placeholder="请输入部门"  v-model="model.apartment"/>
        </a-form-model-item>

        <a-form-model-item label="发证机关"  prop="issuingAuthority" hasFeedback >
          <a-input  placeholder="请输入发证机关"  v-model="model.issuingAuthority"/>
        </a-form-model-item>

        <a-form-model-item label="证件上传"  hasFeedback >
          <file-upload ref="yhFileUpload" :url = "url.addFile"></file-upload>
        </a-form-model-item>

        <a-form-model-item label="证件上传"  hasFeedback v-show="false">
          <a-input  placeholder="请输入发证机关"  v-model="model.uploadFileName"/>
        </a-form-model-item>


<!--        <a-form-model-item label="个人简介"  prop="content" hasFeedback>-->
<!--          <a-input  type="textarea" placeholder="请输入个人简介"  v-model="model.content"/>-->
<!--        </a-form-model-item>-->

      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import FileUpload from './FileUpload'
export default {
  name: "Modal",
  data () {
    return {
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
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules:{
        certId: [
          { required: true, message: '请输入证书编号!' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        employeeId: [
          { required: true, message: '请输入员工编号!' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        // email: [
        //   { required: false, type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        // ]
      },
      url: {
        add: "/wzh/yhHealthCert/add",
        edit: "/wzh/yhHealthCert/edit",
        addFile:"/sys/common/upload"
      },
    }
  },
  components:{
    FileUpload
  },
  created () {
  },
  methods: {
    add () {
      this.edit({});
    },
    edit (record) {
      this.model = Object.assign({}, record);
      this.visible = true;

      // 生成默认文件上传数据
      if(this.model.uploadFileName === undefined){
        console.log(1);
        let t = new Array();
        this.$refs.yhFileUpload.getDefaultData(t);
      }
      else{
        this.$refs.yhFileUpload.getDefaultData(this.model.uploadFileName);
      }
    },
    close () {
      this.$refs.form.resetFields();
      this.$emit('close');
      this.visible = false;
    },
    handleOk () {
      console.log(this.model);
      this.model.uploadUserId="";
      this.model.uploadFileName = this.$refs.yhFileUpload.uploadFileName;
      this.loading = true;
      const that = this;
      // 触发表单验证
      this.$refs.form.validate(valid => {
        if (valid) {
          that.confirmLoading = true;
          let httpurl = '';
          let method = '';
          if(!this.model.id){
            httpurl+=this.url.add;
            method = 'post';
          }else{
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
    }
  }
}
</script>

<style scoped>

</style>