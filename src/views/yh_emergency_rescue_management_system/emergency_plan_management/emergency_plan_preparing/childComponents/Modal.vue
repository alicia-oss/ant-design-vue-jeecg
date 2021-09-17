<template>
  <div>
  <a-modal
    :width="800"
    style="padding-bottom: 10px"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    @ok="handleOk"
    cancelText="关闭">

        <template slot="footer">
          <a-button style="margin: 10px" key="back" @click="handleCancel" >
            取消
          </a-button>

          <a-button style="margin: 10px" key="back" @click="handleReset" >
            重置
          </a-button>

          <a-button style="margin: 10px" key="submit" type="primary" :loading="loading" @click="handleOk">
            提交审批
          </a-button>

          <a-button style="margin: 10px" key="submitNow" type="danger" :loading="loading" @click="handleNow" >
            立即发布
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
        <text-border title="基本信息">
        <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">


          <a-form-model-item label="预案名称" required prop="emergencyPlanName" hasFeedback>
            <a-input v-model="model.emergencyPlanName"    placeholder="请输入应急预案名称"/>
          </a-form-model-item>


          <a-form-item label='预案种类'>
            <a-select placeholder="请选择预案种类" v-model="model.emergencyPlanCategory">
              <a-select-option v-for="item in inputData.emergencyPlanCategory" :value="item">
                {{item}}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-model-item label="制定日期"  prop="specifiedTime" hasFeedback>
            <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.specifiedTime" />
          </a-form-model-item>

          <a-form-model-item label="版本号" required prop="version" hasFeedback>
            <a-input v-model="model.version"    placeholder="请输入版本号"/>
          </a-form-model-item>

          <a-form-item label='部门'>
            <a-select placeholder="请选择部门" v-model="model.departName">
              <a-select-option v-for="item in inputData.departName" :value="item">
                {{item}}
              </a-select-option>
            </a-select>
          </a-form-item>


          <a-form-model-item label="填写人"  prop="version" hasFeedback>
            <a-input v-model="model.fillPerson"  :disabled="true"   placeholder="请输入填写人"/>
          </a-form-model-item>

          <a-form-model-item label="修改日期"  prop="uploadDate" hasFeedback >
            <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.updateTime" :disabled="true" />
          </a-form-model-item>

        </a-form-model>
        </text-border>
      </div>
      <div class="item-right">
        <text-border title="证件上传">
        <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">
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
        emergencyPlanCategory:["综合应急预案" , "专项应急预案"] ,
        applicationState:["编辑中","审批中","通过","未通过","被退回"],
        isReleased:['已发布','未发布'],
        departName:["部门1","部门2"]
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
    File
  },

  methods: {
    add () {
      this.edit({});
      let myData = new Date();
      this.model.updateTime = myData.toLocaleDateString();
      this.model.fillPerson = this.$store.getters.userInfo.realname;
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
      this.$refs.form.validate(valid=>{
        if(valid) {
          if(this.method === "add"){
            this.model.emergencyPlanId = uuid("");
            this.model.isReleased = "未发布";
            this.model.applicationState='审批中';
            copyObj(this.model,modelData);
            this.$emit("ok",{method:"add",modelData:modelData})
          }
          else if(this.method === "edit"){
            copyObj(this.model,modelData);
            this.$emit("ok",{method:"edit",modelData:modelData})
          }
          this.close();
        }
      })

    },
    handleComplete(){
      let temp = this.model.employeeId.split("-");
      this.model.employeeId = temp[0];
      this.model.employeeName = temp[1];
      // this.model.apartment = "测试部门01";
    },

    handleCancel () {
      this.close()
    },

    handleNow(){
      let modelData = new Object();
      this.$refs.form.validate(valid=>{
        if(valid) {
          if(this.method === "add"){
            this.model.emergencyPlanId = uuid("");
            this.model.isReleased = "已发布";
            this.model.applicationState='通过';
            copyObj(this.model,modelData);
            this.$emit("ok",{method:"add",modelData:modelData})
          }
          else if(this.method === "edit"){
            copyObj(this.model,modelData);
            this.$emit("ok",{method:"edit",modelData:modelData})
          }
          this.close();
        }
      })
    },

    handleReset(){
      this.model = add();
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