<template>
  <div>
  <a-modal
    :width="800"
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
    <a-spin :spinning="confirmLoading">
      <div class="table">
      <div class="item">
        <text-border title="基本信息" height="510px">
        <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">

          <a-form-model-item label="物资名称" required prop="materialName" hasFeedback>
<!--            <a-input v-model="model.employeeId"    placeholder="请输入员工编号"/>-->
            <a-auto-complete
              :data-source="inputData.materialName"
              @change="handleComplete"
              placeholder="请输入物资名称"
              v-model="model.materialName"
              ></a-auto-complete>

          </a-form-model-item>

          <a-form-model-item label="物资型号"  prop="materialModel" hasFeedback >
<!--            <a-input  placeholder="请输入部门"  v-model="model.apartment"/>-->
            <a-input v-model="model.materialModel"    placeholder="请输入物资型号"/>
          </a-form-model-item>

          <a-form-model-item label="物资数量" required prop="materialQuantity" hasFeedback>
            <a-input v-model="model.materialQuantity"    placeholder="请输入物资数量"/>
          </a-form-model-item>

          <a-form-model-item label="备注或规格" required prop="memo" hasFeedback>
            <a-input v-model="model.memo"    placeholder="请输入物资数量"/>
          </a-form-model-item>

          <a-form-model-item label="部门名称"  prop="department" hasFeedback>
            <a-input v-model="model.department"    placeholder="请输入部门名称"/>
          </a-form-model-item>

          <a-form-model-item label="存放地址"  prop="storageAddress" hasFeedback>
            <a-input v-model="model.storageAddress"    placeholder="请输入存放地址"/>
          </a-form-model-item>

          <a-form-model-item label="有效期至"  prop="validityUntilTime" hasFeedback >
<!--            <a-input  placeholder="请输入发证机关"  v-model="model.issuingAuthority"/>-->
            <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.validityUntilTime" />
          </a-form-model-item>


          <!--        <a-form-model-item label="个人简介"  prop="content" hasFeedback>-->
          <!--          <a-input  type="textarea" placeholder="请输入个人简介"  v-model="model.content"/>-->
          <!--        </a-form-model-item>-->

        </a-form-model>
        </text-border>
      </div>
<!--      <div class="item">-->
<!--        <text-border title="证件上传" height="510px">-->
<!--        <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">-->
<!--&lt;!&ndash;            <file-upload ref="yhFileUpload" :url = "url.addFile"></file-upload>&ndash;&gt;-->
<!--            <file style="width: 100%" v-model="model.uploadFileName"></file>-->
<!--        </a-form-model>-->
<!--        </text-border>-->
<!--      </div>-->
      </div>

    </a-spin>
  </a-modal>
  </div>
</template>

<script>
import { httpAction } from '@/api/manage'
import  File from './File'
import FileUpload from './FileUpload'
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
        issuingAuthority:["测试机关01","测试机关02","测试机关03"]
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
    FileUpload,
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
    // handleOk () {
    //   this.model.uploadUserId="";
    //   this.model.uploadFileName = this.$refs.yhFileUpload.uploadFileName;
    //   this.loading = true;
    //   const that = this;
    //   // 触发表单验证
    //   this.$refs.form.validate(valid => {
    //     if (valid) {
    //       that.confirmLoading = true;
    //       let httpurl = '';
    //       let method = '';
    //       if(!this.model.id){
    //         httpurl+=this.url.add;
    //         method = 'post';
    //       }else{
    //         httpurl+=this.url.edit;
    //         method = 'put';
    //       }
    //       httpAction(httpurl,this.model,method).then((res)=>{
    //         if(res.success){
    //           that.$message.success(res.message);
    //           that.$emit('ok');
    //         }else{
    //           that.$message.warning(res.message);
    //         }
    //       }).finally(() => {
    //         that.confirmLoading = false;
    //         that.close();
    //       })
    //     }
    //   })
    // },
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

 .title{
   font-size: 20px;
 }


</style>