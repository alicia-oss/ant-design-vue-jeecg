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
        <a-collapse v-model="activeKey">
          <a-collapse-panel key="1" header="投诉信息" style="width:760px;font-size:20px">
            <div class="table">
              <div class="item">
                <text-border title="基本投诉信息">
                  <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">

                    <a-form-model-item label="投诉人/单位" required prop="registerNum" hasFeedback>
                      <a-input v-model="model.complaintPersonName"    placeholder="请输入投诉人姓名"  :read-only="true"/>
                    </a-form-model-item>

                    <a-form-model-item label="被投诉部门" required prop="registerNum" hasFeedback>
                      <a-input v-model="model.complaintBeDepartId"    placeholder="请输入被投诉部门"  :read-only="true"/>
                    </a-form-model-item>


                    <a-form-model-item label="被投诉人">
                      <a-input v-model="model.complaintBeId"    placeholder="请输入被投诉人姓名"  :read-only="true"/>
                    </a-form-model-item>

                    <a-form-model-item label="投诉日期"  prop="issueDate" hasFeedback>
                      <a-input  v-model="model.complaintTime"  :read-only="true" />
                    </a-form-model-item>

                    <a-form-model-item label="投诉方式" prop="complaint_type">
                      <a-input  v-model="model.complaintType"  :read-only="true" />
                    </a-form-model-item>

                    <a-form-model-item label="联系方式">
                      <a-input v-model="model.complaintPersonContact"  :read-only="true"/>
                    </a-form-model-item>

                    <a-form-model-item label="投诉内容" prop="complaint_title" >
                      <a-input v-model="model.complaintTitle" type="textarea" :auto-size="{ minRows: 4, maxRows: 6 }" :read-only="true"/>
                    </a-form-model-item>

                  </a-form-model>
                </text-border>
              </div>
              <div class="item">
                <text-border title="相关文件">
                  <file-list :value="model. uploadFileName" ref="fileList"></file-list>
                </text-border>
              </div>
            </div>


          </a-collapse-panel>
        <a-collapse-panel key="2" header="投诉反馈" style="width:760px;font-size:20px">
          <div class="table">
            <div class="item">
              <text-border title="投诉反馈信息">
                <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">
                  <a-form-model-item label="是否属实:" prop="complaintVerifyResult">
                    <a-radio-group v-model="model.complaintVerifyResult">
                      <a-radio v-for="item in inputData.complaintVerifyResult" :value="item">
                        {{item}}
                      </a-radio>
                    </a-radio-group>
                  </a-form-model-item>

                  <a-form-model-item label="核查内容" prop="complaintProcessingVerifyInfo" >
                  <a-input v-model="model.complaintProcessingVerifyInfo" type="textarea" :auto-size="{ minRows: 4, maxRows: 6 }" />
                </a-form-model-item>

                  <a-form-model-item label="处理详情" prop="complaintProcessingDealInfo" >
                    <a-input v-model="model.complaintProcessingDealInfo" type="textarea" :auto-size="{ minRows: 4, maxRows: 6 }" />
                  </a-form-model-item>


                </a-form-model>
              </text-border>
            </div>
            <div class="item">
              <text-border title="文件上传">
                <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">
                  <file-upload style="width: 100%" v-model="model.uploadFileName"></file-upload>
                </a-form-model>
              </text-border>
            </div>
          </div>


        </a-collapse-panel>
        </a-collapse>
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
      activeKey: ['2'],
      method:"",
      loading:false,
      title:"操作",
      visible: false,
      model: {},
      layout: {
        labelCol: { span: 5},//冒号对齐
        wrapperCol: { span: 14 },//输入框的长度
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
      inputData:{
        complaintBeDepartId:["部门1","部门2","部门3","部门4"],
        complaintType:["电话","邮件","其他"],
        complaintVerifyResult:["属实","不属实"]

      },
      confirmLoading: false,
      // form: this.$form.createForm(this),
      validatorRules:{
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
    TextBorder,
    FileUpload
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