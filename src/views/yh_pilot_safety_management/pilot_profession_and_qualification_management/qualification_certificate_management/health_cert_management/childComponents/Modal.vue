<template>
  <div>
  <a-modal
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    @ok="handleOk"
    cancelText="关闭">

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

    <template slot="title">
      <div class="title">
        <a-icon type="form" style="color: #1890ff;margin-right: 10px"></a-icon>{{title}}
      </div>
    </template>

    <a-spin :spinning="confirmLoading">
      <div class="table">
      <div class="item">
        <text-border title="基本信息" height="510px">
        <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">

          <a-form-model-item label="员工编号" required prop="employeeId" hasFeedback>
<!--            <a-input v-model="model.employeeId"    placeholder="请输入员工编号"/>-->
            <a-auto-complete
              :data-source="inputData.employeeId"
              @change="handleComplete"
              placeholder="请输入员工编号"
              v-model="model.employeeId"
              ></a-auto-complete>

          </a-form-model-item>

          <a-form-model-item label="部门"  prop="apartment" hasFeedback >
<!--            <a-input  placeholder="请输入部门"  v-model="model.apartment"/>-->
            <a-select placeholder="请输入部门" v-model="model.apartment">
              <a-select-option v-for="item in inputData.apartment" :value="item">
                {{item}}
              </a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item label="证书编号" required prop="certNum" hasFeedback>
            <a-input v-model="model.certNum"    placeholder="请输入证书编号"/>
          </a-form-model-item>

          <a-form-model-item label="签发日期"  prop="issueDate" hasFeedback>
            <a-date-picker style="width: 100%;" valueFormat="YYYY-MM-DD" v-model="model.issueDate" />
          </a-form-model-item>

          <a-form-model-item label="发证机关"  prop="issuingAuthority" hasFeedback >
            <a-select placeholder="请输入发证机关" v-model="model.issuingAuthority">
              <a-select-option v-for="item in inputData.issuingAuthority" :value="item">
                {{item}}
              </a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item label="上传人"  prop="uploadUserId" hasFeedback >
            <a-input  placeholder="请输入上传人"  v-model="model.uploadUserId" :disabled="true"/>
          </a-form-model-item>

          <a-form-model-item label="上传日期"  prop="uploadDate" hasFeedback >
            <a-date-picker style="width: 100%;" valueFormat="YYYY-MM-DD" v-model="model.uploadDate" :disabled="true" />
          </a-form-model-item>


        </a-form-model>
        </text-border>
      </div>
      <div class="item">
        <text-border title="证件上传" height="510px">
        <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">
<!--            <file-upload ref="yhFileUpload" :url = "url.addFile"></file-upload>-->
            <file style="width: 100%" v-model="model.uploadFileName"></file>
        </a-form-model>
        </text-border>
      </div>
      </div>

    </a-spin>
  </a-modal>
  </div>
</template>

<script>
import { httpAction } from '@/api/manage'
import  File from './File'
import FileUpload from './FileUpload'
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
        employeeId:["0441-张三","0442-王五","0443-赵四"],
        apartment:["测试部门01","测试部门02","测试部门03","测试部门04"],
        issuingAuthority:["测试机关01","测试机关02","测试机关03"]
      },
      // inputData:[{id:"0441",name:"张三"},{id:"0442",name:"王五"}],
      model: {},
      layout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 14 },
      },
      labelCol: {
        xs: { span: 10 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
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
    FileUpload,
    TextBorder,
    File
  },

  methods: {
    add () {
      this.edit({});
      let myData = new Date();
      this.model.uploadDate = myData.toLocaleDateString();
      this.model.uploadUserId = this.$store.getters.userInfo.id;
      this.visible = true;
    },

    edit (record) {
      console.log(this.model.uploadFileName);
      this.model = Object.assign({}, record);
      this.visible = true;
    },

    close () {
      this.$refs.form.resetFields();
      this.$emit('close');
      this.visible = false;
    },

    handleReset(){
      this.add();
    },

    handleOk(){
      let modelData = new Object();
      copyObj(this.model,modelData);
      this.$refs.form.validate(valid=>{
        if(valid) {
          if(this.method === "add"){
            this.model.id = uuid("");
            console.log(this.model);
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
      let temp = this.model.employeeId.split("-");
      this.model.employeeId = temp[0];
      // this.model.apartment = "测试部门01";
    },

    handleCancel () {
      this.close()
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

 .title{
   font-size: 20px;
 }


</style>