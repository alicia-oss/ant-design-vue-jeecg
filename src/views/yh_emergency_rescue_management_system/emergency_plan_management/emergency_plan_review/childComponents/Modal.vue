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

          <a-button style="margin: 10px" key="submit" type="primary" :loading="loading" @click="handleOk">
            完成评审
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

        <a-form-model ref="form" layout="inline"   :model="model" :rules="validatorRules">
          <a-row :gutter="30">
            <a-col :xl="8" :lg="9" :md="10" :sm="24">
              <a-form-model-item label="预案名称" required prop="emergencyPlanName" hasFeedback>
                <a-select placeholder="请选择预案种类" v-model="model.emergencyPlanName">
                  <a-select-option @select="handleNameSelect" v-for="item in inputData.emergencyPlanName" :value="item">
                    {{ item }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>

            <a-col :xl="8" :lg="9" :md="10" :sm="24">
              <a-form-item label="预案种类">
                <a-select placeholder="请选择预案种类" v-model="model.emergencyPlanCategory">
                  <a-select-option v-for="item in inputData.emergencyPlanCategory" :value="item">
                    {{ item }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :xl="8" :lg="9" :md="10" :sm="24">
              <a-form-model-item label="评审单位" prop="version" hasFeedback>
                <a-input v-model="model.reviewInstitution" placeholder="请输入填写机构" />
              </a-form-model-item>
            </a-col>

            <a-col :xl="8" :lg="9" :md="10" :sm="24">
              <a-form-model-item label="评审时间" prop="uploadDate" hasFeedback>
                <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.reviewTime" :disabled="true" />
              </a-form-model-item>
            </a-col>
          </a-row>

        </a-form-model>

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
        emergencyPlanName:['预案01','预案02'],
        emergencyPlanCategory:["综合应急预案" , "专项应急预案",'现场处置方案'] ,
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
        sm: { span: 5 },
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
      this.model.reviewTime = myData.toLocaleDateString();
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
    handleNameSelect(){
     this.model.emergencyPlanCategory = this.inputData.emergencyPlanCategory[0];

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