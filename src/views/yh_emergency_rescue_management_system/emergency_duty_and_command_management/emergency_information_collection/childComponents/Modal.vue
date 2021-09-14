<template>
  <div>
  <a-modal
    :width="900"
    style="padding-bottom: 10px"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    @ok="handleOk"
    >

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
        <text-border >
        <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">

          <a-form-model-item label="应急信息名称" required prop="emergencyPlanName" hasFeedback>
            <a-input v-model="model.emergencyPlanName"    placeholder="请输入应急预案名称"/>
          </a-form-model-item>


<!--          <a-form-item label='预案种类'>-->
<!--            <a-select placeholder="请选择预案种类" required v-model="model.emergencyPlanCategory">-->
<!--              <a-select-option v-for="item in inputData.emergencyPlanCategory" :value="item">-->
<!--                {{item}}-->
<!--              </a-select-option>-->
<!--            </a-select>-->
<!--          </a-form-item>-->

          <a-form-model-item label="发生时间" required prop="occurTime" hasFeedback>
            <a-date-picker valueFormat="YYYY-MM-DD" style="width: 100%;" v-model="model.occurTime" />
          </a-form-model-item>

          <a-form-model-item label="发生地点" required prop="occurSite" hasFeedback>
            <a-textarea
              placeholder="输入发生地点"
              :auto-size="{ minRows: 2, maxRows: 6 }"
              v-model="model.occurSite"
            />
          </a-form-model-item>

          <a-form-model-item label="海况"  prop="seaState" hasFeedback>
            <a-textarea
              placeholder="请输入海况"
              :auto-size="{ minRows: 2, maxRows: 6 }"
              v-model="model.seaState"
            />
          </a-form-model-item>

          <a-form-model-item label="呼号" required prop="callSign" hasFeedback>
            <a-input v-model="model.callSign"    placeholder="呼号"/>
          </a-form-model-item>

          <a-form-model-item label="事故概况"  prop="accidentOverview" hasFeedback>
            <a-textarea
            placeholder="输入事故概况"
            :auto-size="{ minRows: 2, maxRows: 6 }"
            v-model="model.accidentOverview"
          />
          </a-form-model-item>

          <a-form-item label='国籍'>
            <a-select placeholder="请选择国籍" v-model="model.nationality">
              <a-select-option v-for="item in inputData.nationality" :value="item">
                {{item}}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-model-item label="起迄港"  prop="port" hasFeedback>
            <a-input v-model="model.port"    placeholder="请输入起迄港"/>
          </a-form-model-item>


        </a-form-model>
        </text-border>
      </div>
      <div class="item-right">
        <text-border >
        <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" >

          <a-form-model-item label="船舶/设施所有者"  prop="owner" hasFeedback>
            <a-input v-model="model.owner"    placeholder="船舶/设施所有者"/>
          </a-form-model-item>

          <a-form-model-item label="受伤人数"  prop="injury" hasFeedback>
            <a-input v-model="model.injury"    placeholder="请输入受伤人数"/>
          </a-form-model-item>

          <a-form-model-item label="死亡人数"  prop="death" hasFeedback>
            <a-input v-model="model.death"    placeholder="请输入死亡人数"/>
          </a-form-model-item>

          <a-form-model-item label="损害情况"  prop="damage" hasFeedback>
            <a-textarea
              placeholder="输入损害情况"
              :auto-size="{ minRows: 2, maxRows: 6 }"
              v-model="model.damage"
            />
          </a-form-model-item>

          <a-form-model-item label="求助要求"  prop="salvageRequest" hasFeedback>
            <a-textarea
              placeholder="输入求助要求"
              :auto-size="{ minRows: 2, maxRows: 6 }"
              v-model="model.salvageRequest"
            />
          </a-form-model-item>

          <a-form-model-item label="报告人"  prop="version" hasFeedback>
            <a-input v-model="model.reporter"  :disabled="true"   placeholder="请输入填写人"/>
          </a-form-model-item>

<!--          <a-form-model-item label="处理状态" required prop="version" hasFeedback>-->
<!--            <a-input v-model="model.emergencyInfoProcessStatus"  :disabled="true"  placeholder="请输入版本号"/>-->
<!--          </a-form-model-item>-->


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
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
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
    FileUpload
  },

  methods: {
    add () {
      this.edit({});
      let myData = new Date();
      this.model.updateTime = myData.toLocaleDateString();
      this.model.reporter = this.$store.getters.userInfo.realname;
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
            this.model.emergencyInfoId = uuid("");
            this.model.emergencyInfoProcessStatus='未处理';
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