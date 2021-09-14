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
            <text-border title="基本信息" >
              <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">

                <a-form-model-item label="船舶设施概况" required prop="emergencyPlanName" hasFeedback>
                  <a-input v-model="model.facilityOverview"    placeholder="请输入船舶设施概况"/>
                </a-form-model-item>

                <a-form-model-item label="主要性能数据" required prop="processDetail" hasFeedback>
                  <a-input v-model="model.processDetail"    placeholder="请输入主要性能数据"/>
                </a-form-model-item>

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

                <a-form-model-item label="气象和海况"  prop="weatherAndSeaState" hasFeedback>
                  <a-textarea
                    placeholder="气象和海况"
                    :auto-size="{ minRows: 2, maxRows: 6 }"
                    v-model="model.weatherAndSeaState"
                  />
                </a-form-model-item>

                <a-form-model-item label="详细经过"  prop="port" hasFeedback>
                  <a-input v-model="model.detail"    placeholder="请输入详细经过"/>
                </a-form-model-item>

                <a-form-model-item label="损害情况"  prop="damage" hasFeedback>
                  <a-textarea
                    placeholder="输入损害情况"
                    :auto-size="{ minRows: 2, maxRows: 6 }"
                    v-model="model.damage"
                  />
                </a-form-model-item>

                <a-form-model-item label="沉没概位"  prop="sinkingPosition" hasFeedback>
                  <a-textarea
                    placeholder="输入沉没概位"
                    :auto-size="{ minRows: 2, maxRows: 6 }"
                    v-model="model.sinkingPosition"
                  />
                </a-form-model-item>

                <a-form-model-item label="其他报告"  prop="otherSituation" hasFeedback>
                  <a-textarea
                    placeholder="请输入其他报告"
                    :auto-size="{ minRows: 2, maxRows: 6 }"
                    v-model="model.otherSituation"
                  />
                </a-form-model-item>

                <a-form-model-item label="填写人"  prop="fillPerson" hasFeedback>
                  <a-input v-model="model.fillPerson"  :disabled="true"   placeholder="请输入填写人"/>
                </a-form-model-item>

                <a-form-model-item label="上传时间"  prop="uploadTime" hasFeedback >
                  <a-date-picker valueFormat="YYYY-MM-DD" style="width: 100%;" v-model="model.uploadTime" :disabled="true" />
                </a-form-model-item>

              </a-form-model>
            </text-border>
          </div>
          <div class="item-right">
            <text-border title="文件上传">
              <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" >
                <file-upload></file-upload>
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
import TextBorder from './TextBorder'
import { uuid } from '@tinymce/tinymce-vue/lib/es2015/Utils'
import { copyObj } from 'codemirror/src/util/misc'
import FileUpload from './FileUpload'

export default {
  name: "ReportModal",
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
    FileUpload,
    TextBorder,
  },

  methods: {
    add () {
      this.edit({});
      let myData = new Date();
      this.model.updateTime = myData.toLocaleDateString();
      this.model.reporter = this.$store.getters.userInfo.realname;
      this.model.emergencyInfoId =
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