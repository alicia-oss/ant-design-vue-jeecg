<template>
  <div>
  <a-modal

    style="padding-bottom: 10px;width: 35%"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    @ok="handleOk"
    cancelText="关闭">

    <template slot="title">
      <div class="title">
        <a-icon type="form" style="color: #1890ff;margin-right: 10px"></a-icon>{{title}}
      </div>
    </template>
    <template slot="footer">
      <a-button style="margin: 10px" key="reset"  @click="handleReset" >
        重置
      </a-button>

      <a-button style="margin: 10px" key="back"  @click="handleCancel" >
        取消
      </a-button>

      <a-button style="margin: 10px" key="submit" type="primary" :loading="loading" @click="handleOk">
        保存
      </a-button>
    </template>

    <a-spin :spinning="confirmLoading">
      <div class="table">
      <div class="item">

        <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">

          <a-form-model-item label="应急事故名称" required prop="employeeName" hasFeedback>
            <a-input v-model="model.emergencInfoName"    placeholder="请输入应急事故名称"/>
          </a-form-model-item>

          <a-form-item label='处置方式'>
            <a-select placeholder="请选择处置方式" v-model="model.processType">
              <a-select-option v-for="item in inputData.processType" :value="item">
                {{item}}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-model-item label="具体措施"  prop="processDetail" hasFeedback>
            <a-textarea
              placeholder="输入具体措施"
              :auto-size="{ minRows: 2, maxRows: 6 }"
              v-model="model.processDetail"
            />
          </a-form-model-item>

        </a-form-model>
      </div>
      </div>

    </a-spin>
  </a-modal>
  </div>
</template>

<script>
import { httpAction } from '@/api/manage'
import  FileUpload from './FileUpload'
import TextBorder from './TextBorder'
import { uuid } from '@tinymce/tinymce-vue/lib/es2015/Utils'
import { copyObj } from 'codemirror/src/util/misc'
export default {
  name: "Modal",
  data () {
    return {
      method:"",
      loading:false,
      title:"操作",
      visible: false,
      inputData: {

        processType:["启动应急预案","与相关部门联系"]
      },
      // inputData:[{id:"0441",name:"张三"},{id:"0442",name:"王五"}],
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
      // form: this.$form.createForm(this),
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
    TextBorder,
    FileUpload
  },

  methods: {
    add () {
      this.edit({});
      let myData = new Date();
      this.model.uploadDate = myData.toLocaleDateString();
      this.model.uploadUserId = this.$store.getters.userInfo.realname;
      this.visible = true;
    },
    edit (record) {
      this.model = Object.assign({}, record);
      this.visible = true;
    },
    close () {
      this.$refs.form.resetFields();
      this.$emit('close');
      this.visible = false;
    },


    handleOk(){
      let modelData = new Object();
      copyObj(this.model,modelData);
      this.$refs.form.validate(valid=>{
        if(valid) {
          if(this.method === "add"){
            this.model.serviceBookId = uuid("");
            this.$emit("ok",{method:"add",modelData:modelData})
          }
          else if(this.method === "edit"){
            this.$emit("ok",{method:"edit",modelData:modelData})
          }
          this.close();
        }
      })

    },
    handleComplete(){
      let tempName = this.model.employeeName;
      let temp = this.model.employeeName.split("-");
      this.model.employeeName = temp[0];
      this.model.employeeId = temp[1];

    },

    handleCancel () {
      this.close()
    },

    handleReset(){
      this.add();
    }

  }
}
</script>

<style scoped>
 .table{
   display: flex ;
   width: 100%;
 }

 .item{
   flex: 1 ;
 }

 .item-right{
   flex: 1 ;
   height: auto;
 }

 .title{
   font-size: 20px;
 }


</style>