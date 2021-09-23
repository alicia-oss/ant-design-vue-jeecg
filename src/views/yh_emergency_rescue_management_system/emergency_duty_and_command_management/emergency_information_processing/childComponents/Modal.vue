<template>
  <div>
  <a-modal
    :width="900"
    style="padding-bottom: 10px;"
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
      <a-collapse v-model="activeKey">
        <a-collapse-panel key="1" header="应急事故信息" style="width:100%;font-size:20px">
          <div class="table">
            <div class="item">
              <text-border >
                <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" >
                  <a-form-model-item label="应急信息名称" required prop="emergencyPlanName" hasFeedback>
                    <a-input v-model="infoModal.emergencInfoName"  :read-only="true"    placeholder="请输入应急信息名称"/>
                  </a-form-model-item>

                  <a-form-model-item label="发生时间" required  prop="specifiedTime" hasFeedback>
                    <a-input v-model="infoModal.specifiedTime"  :read-only="true"  />
                  </a-form-model-item>

                  <a-form-model-item label="发生地点" required prop="occurSite" hasFeedback>
                    <a-textarea
                      :read-only="true"
                      placeholder="输入发生地点"
                      :auto-size="{ minRows: 2, maxRows: 6 }"
                      v-model="infoModal.occurSite"
                    />
                  </a-form-model-item>

                  <a-form-model-item label="海况"  prop="seaState" hasFeedback>
                    <a-textarea
                      :read-only="true"
                      placeholder="请输入海况"
                      :auto-size="{ minRows: 2, maxRows: 6 }"
                      v-model="infoModal.seaState"
                    />
                  </a-form-model-item>

                  <a-form-model-item label="呼号"  required prop="callSign" hasFeedback>
                    <a-input v-model="infoModal.callSign"  :read-only="true"   placeholder="呼号"/>
                  </a-form-model-item>

                  <a-form-model-item label="事故概况"  prop="accidentOverview" hasFeedback>
                    <a-textarea
                      :read-only="true"
                      placeholder="输入事故概况"
                      :auto-size="{ minRows: 2, maxRows: 6 }"
                      v-model="infoModal.accidentOverview"
                    />
                  </a-form-model-item>

                  <a-form-item label='国籍'>
                    <a-input v-model="infoModal.nationality"  :read-only="true"   placeholder="国籍"/>
                  </a-form-item>

                  <a-form-model-item label="起迄港"  prop="port" hasFeedback>
                    <a-input v-model="infoModal.port" :read-only="true"   placeholder="请输入起迄港"/>
                  </a-form-model-item>
                </a-form-model>
              </text-border>
            </div>
            <div class="item-right">
              <text-border>
                <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" >

                  <a-form-model-item label="船舶/设施所有者"  prop="owner" hasFeedback>
                    <a-input v-model="infoModal.owner"  :read-only="true"   placeholder="船舶/设施所有者"/>
                  </a-form-model-item>

                  <a-form-model-item label="受伤人数"  prop="injury" hasFeedback>
                    <a-input v-model="infoModal.injury"  :read-only="true"  placeholder="请输入受伤人数"/>
                  </a-form-model-item>

                  <a-form-model-item label="死亡人数"  prop="death" hasFeedback>
                    <a-input v-model="infoModal.death"  :read-only="true"   placeholder="请输入死亡人数"/>
                  </a-form-model-item>

                  <a-form-model-item label="损害情况"  prop="damage" hasFeedback>
                    <a-textarea
                      :read-only="true"
                      placeholder="输入损害情况"
                      :auto-size="{ minRows: 2, maxRows: 6 }"
                      v-model="infoModal.damage"
                    />
                  </a-form-model-item>

                  <a-form-model-item label="求助要求"  prop="salvageRequest" hasFeedback>
                    <a-textarea
                      :read-only="true"
                      placeholder="输入求助要求"
                      :auto-size="{ minRows: 2, maxRows: 6 }"
                      v-model="infoModal.salvageRequest"
                    />
                  </a-form-model-item>

                  <a-form-model-item label="报告人"  prop="reporter" hasFeedback>
                    <a-input v-model="infoModal.reporter" :read-only="true"     placeholder="请输入填写人"/>
                  </a-form-model-item>

                  <a-form-model-item label="处理状态" required prop="emergencyInfoProcessStatus" hasFeedback>
                    <a-input v-model="infoModal.emergencyInfoProcessStatus" :read-only="true" placeholder="请输入处理状态" />
                  </a-form-model-item>

                </a-form-model>
              </text-border>
            </div>
          </div>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="应急信息处理" style="width:100%;font-size:20px">
          <div class="table">
            <div class="item">

              <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">

                <a-form-model-item label="应急信息名称" required prop="emergencyInfoName" hasFeedback>
                  <a-select placeholder="请选择应急信息名称" v-model="model.emergencyInfoName">
                    <a-select-option v-for="item in inputData.emergencyInfoName" :value="item">
                      {{item}}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>

                <a-form-model-item label='处置方式' required prop="processType" hasFeedback>
                  <a-select placeholder="请选择处置方式" v-model="model.processType">
                    <a-select-option v-for="item in inputData.processType" :value="item">
                      {{item}}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>

                <a-form-model-item label="具体指示"  prop="processDetail" hasFeedback>
                  <a-textarea
                    placeholder="输入具体指示"
                    :auto-size="{ minRows: 2, maxRows: 6 }"
                    v-model="model.processDetail"
                  />
                </a-form-model-item>

              </a-form-model>
            </div>
          </div>
        </a-collapse-panel>
      </a-collapse>


    </a-spin>
  </a-modal>
  </div>
</template>

<script>
import { httpAction } from '@api/manage'
import  FileUpload from './FileUpload'
import TextBorder from './TextBorder'
import { uuid } from '@tinymce/tinymce-vue/lib/es2015/Utils'
import { copyObj } from 'codemirror/src/util/misc'
export default {
  name: "Modal",
  data () {
    return {
      activeKey: ['2'],
      method:"",
      loading:false,
      title:"操作",
      visible: false,
      inputData: {
        emergencyInfoName:["应急信息001","应急信息002","应急信息003","应急信息004","应急信息005"],
        processType:["启动应急预案","与相关部门联系"]
      },
      // inputData:[{id:"0441",name:"张三"},{id:"0442",name:"王五"}],
      model: {},
      // 应急事故信息
      infoModal:{
        emergencyInfoId:"001",
        emergencInfoName:"测试事故01",
        nameOfVesselOrFacility:"测试号AH091",
        callSign:"123324467",
        nationality:"中国",
        port:"青岛港",
        owner:"徐海波",
        occurTime:"2020-9-10",
        occurSite:"南湖9971-2121",
        seaState:"良",
        accidentOverview:"",
        injury:"",
        death:"",
        damage:"",
        salvageRequest:"",
        reporter:"",
        emergencyInfoProcessStatus:"",
        report:{
          accidentReportId:"",
          emergencyInfoId:'',
          facilityOverview:'',
          processDetail:'',
          owner:"",
          address:'',
          occurTime:"",
          occurSite:"",
          weatherAndSeaState:'',
          detail:'',
          damage:'',
          sinkingPosition:'',
          otherSituation:'',
          fillPerson:'',
          uploadFileName:'',
          uploadTime:''
        }
      },
      layout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 14 },
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
      confirmLoading: false,
      // form: this.$form.createForm(this),
      validatorRules:{
        emergencyInfoName: [
          { required: true, message: '请选择应急信息名称!' },
          // { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        processType: [
          { required: true, message: '请选择处置方式!' },
          // { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        // email: [
        //   { required: false, type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        // ]
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
      // let myData = new Date();
      // this.model.uploadDate = myData.toLocaleDateString();
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
            this.model.emergencyProcessId = uuid("");
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
      let tempName = this.model.emergencyInfoId;
      let temp = this.model.emergencyInfoId.split("-");
      this.model.emergencyInfoName = temp[0];
      this.model.emergencyInfoId = temp[1];

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