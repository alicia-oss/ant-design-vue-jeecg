<template>
  <div>
  <a-modal
    style="padding-bottom: 10px;width: 35%;"
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
        <text-border title="基本信息">
        <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">

          <a-form-model-item label="人员姓名" required prop="employeeName" hasFeedback>
            <a-auto-complete
              :data-source="inputData.employeeId"
              @change="handleCompleteName"
              placeholder="请输入人员姓名"
              v-model="model.employeeName"
            ></a-auto-complete>
          </a-form-model-item>

          <a-form-model-item label="人员编号" required prop="employeeId" hasFeedback>
            <a-auto-complete
              :data-source="inputData.employeeId"
              @change="handleCompleteId"
              placeholder="请输入人员编号"
              v-model="model.employeeId"
              ></a-auto-complete>
          </a-form-model-item>


          <a-form-model-item label="所属部门"  prop="departName" hasFeedback >
            <a-select placeholder="请输入所属部门" v-model="model.departName">
              <a-select-option v-for="item in inputData.apartment" :value="item">
                {{item}}
              </a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item label="职责"  prop="rescuePeopleDuty" hasFeedback >
            <a-select placeholder="请输入职责" v-model="model.rescuePeopleDuty">
              <a-select-option v-for="item in inputData.rescuePeopleDuty" :value="item">
                {{item}}
              </a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item label="电话号码"  prop="phone" hasFeedback >
            <a-input  placeholder="请输入电话号码"  v-model="model.phone"/>
          </a-form-model-item>

          <a-form-model-item label="上传人"  prop="uploadUserId" hasFeedback >
            <a-input  placeholder="请输入上传人"  v-model="model.uploadUserId" :disabled="true"/>
          </a-form-model-item>

          <a-form-model-item  label="上传日期"  prop="uploadDate" hasFeedback >
            <a-date-picker style="width: 100%;" valueFormat="YYYY-MM-DD" v-model="model.uploadDate" :disabled="true" />
          </a-form-model-item>

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
        employeeId:["0441-张三","0442-王五","0443-赵四"],
        apartment:["测试部门01","测试部门02","测试部门03","测试部门04"],
        rescuePeopleDuty:["总指挥","副总指挥","成员"]
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
      this.model.uploadDate = myData.toLocaleDateString();
      this.model.uploadUserId = this.$store.getters.userInfo.id;
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
    handleCompleteName(){
      let temp = this.model.employeeName.split("-");
      this.model.employeeId = temp[0];
      this.model.employeeName = temp[1];
      // this.model.apartment = "测试部门01";
    },

    handleCompleteId(){
      let temp = this.model.employeeId.split("-");
      this.model.employeeId = temp[0];
      this.model.employeeName = temp[1];
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

 .item-right{
   flex: 1 ;
   height: auto;
 }

 .title{
   font-size: 20px;
 }


</style>