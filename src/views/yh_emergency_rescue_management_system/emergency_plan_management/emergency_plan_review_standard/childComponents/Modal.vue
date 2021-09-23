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
        <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">


          <a-form-model-item label="预案标准类别" required prop="emergencyPlanCategory" hasFeedback>
            <a-select placeholder="请选择应急预案类型" @select="()=>{this.show = true}" v-model="model.emergencyPlanCategory">-->
                              <a-select-option v-for="item in inputData.emergencyPlanCategory" :readOnly="disableSubmit" :value="item">
                                {{ item }}
                              </a-select-option>
                            </a-select>
          </a-form-model-item>

          <a-form-model-item label="发布/修改日期"  prop="establishmentTime" hasFeedback>
            <a-date-picker style="width: 100%"  valueFormat="YYYY-MM-DD" v-model="model.establishmentTime" />
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
        emergencyPlanCategory:['综合应急预案', '专项应急预案' , '现场处置方案'],
        employeeId:["张三-0441","王五-0442","赵四-0443"],
        apartment:["测试部门01","测试部门02","测试部门03","测试部门04"],
      },
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