<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    @ok="handleOk"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <div class="table">
        <div class="item">
          <text-border title="基本信息">
          <a-form-model ref="form" :label-col="labelCol" :wrapper-col="wrapperCol" :model="model"
                        :rules="validatorRules">
            <a-form-model-item label="员工姓名" required prop="employeeName" hasFeedback>
              <a-input v-model="model.employeeName" placeholder="请输入员工编号" />
            </a-form-model-item>
            <a-form-model-item label="证书编号" required prop="certNum" hasFeedback>
              <a-input v-model="model.certNum" placeholder="请输入证书编号" />
            </a-form-model-item>
            <a-form-model-item label="证书类别">
              <a-select v-model="model.cert_type" placeholder="请选择证书类别">
                <a-select-option value="海港引航员">海港引航员</a-select-option>
                <a-select-option value="内河引航员">内河引航员</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="证书等级">
              <a-select v-model="model.cert_class" placeholder="请选择证书等级">
                <a-select-option value="一级">一级</a-select-option>
                <a-select-option value="二级">二级</a-select-option>
                <a-select-option value="三级">三级</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="签发日期" prop="issuingDate" hasFeedback>
              <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.issueDate" />
            </a-form-model-item>
            <a-form-model-item label="发证机关" prop="issuingAuthority" hasFeedback>
              <a-input placeholder="请输入发证机关" v-model="model.issuingAuthority" />
            </a-form-model-item>
            <a-form-model-item label="上传人">
              <a-input placeholder="王五" v-model="model.uploadUserId" disabled />
            </a-form-model-item>
            <a-form-model-item label="上传日期">
              <a-input placeholder="2021-9-11" v-model="model.uploadDate" disabled />
            </a-form-model-item>
          </a-form-model>
          </text-border>

        </div>
        <div class="item-right">
          <text-border title="证件上传">
            <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">
              <!--            <file-upload ref="yhFileUpload" :url = "url.addFile"></file-upload>-->
              <file style="width: 100%" v-model="model.uploadFileName"></file>
            </a-form-model>
          </text-border>
      </div>
      </div>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import TextBorder from './TextBorder'
import File from './File'
import FileList from './FileList'
import { copyObj } from 'codemirror/src/util/misc'
import { uuid } from '@tinymce/tinymce-vue/lib/es2015/Utils'
export default {
  name: "Modal",
  data () {
    return {
      loading:false,
      title:"操作",
      visible: false,
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
      form: this.$form.createForm(this),
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
    File,
    FileList,
    TextBorder
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
      console.log(this.model.uploadFileName);
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
            this.model.id = uuid("");
            console.log(this.model);
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
      let temp = this.model.employeeId.split("-");
      this.model.employeeId = temp[0];
      // this.model.apartment = "测试部门01";
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