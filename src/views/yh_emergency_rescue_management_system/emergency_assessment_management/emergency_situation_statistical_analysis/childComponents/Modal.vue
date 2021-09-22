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
        <text-border title="基本信息">
        <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">


          <a-form-model-item label="事故名称" required prop="accidentName" hasFeedback>
            <a-input v-model="model.accidentName"    placeholder="请输入事故名称"/>
          </a-form-model-item>

          <a-form-model-item label="发生时间" required prop="occurTime" hasFeedback>
            <a-date-picker valueFormat="YYYY-MM-DD" style="width: 100%;" v-model="model.occurTime" />
          </a-form-model-item>

          <a-form-item label='事故类别'>
            <a-select placeholder="请选择事故类别" v-model="model.accidentCategory">
              <a-select-option v-for="item in inputData.accidentCategory" :value="item">
                {{item}}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label='事故严重等级'>
            <a-select placeholder="请选择事故严重等级" v-model="model.accidentSevereDegree">
              <a-select-option v-for="item in inputData.accidentSevereDegree" :value="item">
                {{item}}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-model-item label="经济损失" prop="economicLoss" hasFeedback>
            <a-input v-model="model.economicLoss"    placeholder="请输入经济损失"/>
          </a-form-model-item>

          <a-form-model-item label="上传人"  prop="uploadPerson" hasFeedback>
            <a-input v-model="model.uploadPerson"  :disabled="true"   placeholder="请输入上传人"/>
          </a-form-model-item>

          <a-form-model-item label="上传时间"  prop="uploadTime" hasFeedback >
            <a-date-picker valueFormat="YYYY-MM-DD" style="width: 100%;" v-model="model.uploadTime" :disabled="true" />
          </a-form-model-item>

        </a-form-model>
        </text-border>
      </div>
      <div class="item-right">
        <text-border title="上传文件">
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
        accidentCategory:["碰撞事故" , "搁浅事故", "触礁事故", "浪损事故", "火灾、爆炸事故"
          , "风灾事故", "沉没事故", "操作性污染事故", "在航行中发生影响适航性能的机件或重要属具的损坏或灭失", "搁浅事故"
          , "引航员登/离轮坠落伤害", "其他引起人员伤亡、直接经济损失或者水域环境污染的水上交通事故", "对水上人命安全、水域环境构成威胁的险情"] ,
        accidentSevereDegree:["特别重大事故","重大事故","较大事故","一般事故","小事故"]
      },
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
        accidentName: [
          { required: true, message: '请输入事故名称!' },
          // { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        occurTime: [
          { required: true, message: '请选择发生时间!' },
          // { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
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
      this.model.uploadTime = myData.toLocaleDateString();
      this.model.uploadPerson = this.$store.getters.userInfo.realname;
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
            this.model.accidentInvestigationId = uuid("");
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
      // let temp = this.model.employeeId.split("-");
      // this.model.employeeId = temp[0];
      // this.model.employeeName = temp[1];
      // this.model.apartment = "测试部门01";
    },

    handleCancel () {
      this.close()
    },

    // handleNow(){
    //   let modelData = new Object();
    //   this.$refs.form.validate(valid=>{
    //     if(valid) {
    //       if(this.method === "add"){
    //         this.model.emergencyPlanId = uuid("");
    //         copyObj(this.model,modelData);
    //         this.$emit("ok",{method:"add",modelData:modelData})
    //       }
    //       else if(this.method === "edit"){
    //         copyObj(this.model,modelData);
    //         this.$emit("ok",{method:"edit",modelData:modelData})
    //       }
    //       this.close();
    //     }
    //   })
    // },

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