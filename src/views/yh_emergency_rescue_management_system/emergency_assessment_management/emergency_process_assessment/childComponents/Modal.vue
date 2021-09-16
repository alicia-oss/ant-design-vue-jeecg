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

          <a-form-model-item label="应急事故名称" required prop="emergencyInfoName" hasFeedback>
            <a-select placeholder="请选择应急信息名称" v-model="model.emergencyInfoName">
              <a-select-option v-for="item in inputData.emergencyInfoName" :value="item">
                {{item}}
              </a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item label="评估单位" required prop="assessmentInstitution" hasFeedback >
            <a-input v-model="model.assessmentInstitution"    placeholder="请输入评估单位名称" />
          </a-form-model-item>

          <a-form-model-item label="总结评估"  prop="summaryAssessment" hasFeedback>
            <a-textarea
              placeholder="请输入总结评估"
              :auto-size="{ minRows: 2, maxRows: 6 }"
              v-model="model.summaryAssessment"
            />
          </a-form-model-item>

          <a-form-model-item label="反馈与建议" >
            <a-textarea
              placeholder="请输入反馈与建议"
              :auto-size="{ minRows: 2, maxRows: 6 }"
              v-model="model.feedbackAndSuggestion"
            />
          </a-form-model-item>

          <a-form-model-item label="评估时间"  prop="assessmentTime" hasFeedback >
            <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.assessmentTime" :disabled="true" />
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
        emergencyInfoName:["应急信息001","应急信息002","应急信息003","应急信息004","应急信息005"],
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
        emergencyInfoName: [
          { required: true, message: '请选择应急信息名称!' },
          // { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        assessmentInstitution: [
          { required: true, message: '请输入评估单位!' },
          // { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        summaryAssessment: [
          { required: true, message: '请输入总结评估!' },
          // { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ]
      },
      url: {
        //待修改
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
      this.model.assessmentTime = myData.toLocaleDateString();
      // this.model.uploadUserId = this.$store.getters.userInfo.realname;
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
            this.model.processAssessmentId = uuid("");
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
      let tempName = this.model.emergencyInfoName;
      let temp = this.model.emergencyInfoName.split("-");
      this.model.emergencyInfoName = temp[0];
      this.model.emergencyProcessId = temp[1];

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