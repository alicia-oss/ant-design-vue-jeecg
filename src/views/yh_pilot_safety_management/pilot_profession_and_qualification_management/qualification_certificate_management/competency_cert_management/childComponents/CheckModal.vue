<template>
  <a-modal
    :footer="null"
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    cancelText="关闭">
    <!--    <template slot="">-->
    <!--      -->
    <!--    </template>-->
    <!--    <template slot="footer">-->
    <!--      <a-button key="back" @click="handleCancel" >-->
    <!--        取消-->
    <!--      </a-button>-->
    <!--      <a-button key="submit" type="primary" :loading="loading" @click="handleOk" v-if="footer">-->
    <!--        确认-->
    <!--      </a-button>-->
    <!--    </template>-->
    <a-spin :spinning="confirmLoading">
      <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">
        <a-form-model-item label="员工姓名" required prop="employeeName" hasFeedback>
          <!--          <a-input v-model="model.employeeId"    placeholder="请输入员工编号"/>-->
          {{model.employeeName}}
        </a-form-model-item>
        <a-form-model-item label="员工编号" required prop="employeeId" hasFeedback>
          <!--          <a-input v-model="model.employeeId"    placeholder="请输入员工编号"/>-->
          {{model.employeeId}}
        </a-form-model-item>
        <a-form-model-item label="证书编号" required prop="certNum" hasFeedback>
<!--          <a-input v-model="model.certNum"    placeholder="请输入证书编号"/>-->
          {{model.certNum}}
        </a-form-model-item>



        <a-form-model-item label="证书类别" required prop="cert_type" hasFeedback>
          <!--          <a-input v-model="model.employeeId"    placeholder="请输入员工编号"/>-->
          {{model.cert_type}}
        </a-form-model-item>

        <a-form-model-item label="证书等级" required prop="cert_type" hasFeedback>
          <!--          <a-input v-model="model.employeeId"    placeholder="请输入员工编号"/>-->
          {{model.cert_class}}
        </a-form-model-item>

        <a-form-model-item label="发证机关"  prop="issuingAuthority" hasFeedback >
          <!--          <a-input  placeholder="请输入发证机关"  v-model="model.issuingAuthority"/>-->
          {{model.issuingAuthority}}
        </a-form-model-item>


        <a-form-model-item label="签发日期"  prop="issuingDate" hasFeedback>
          <a-date-picker showTime valueFormat="YYYY-MM-DD" v-model="model.issueDate" disabled/>
        </a-form-model-item>

        <!--        <a-form-model-item label="生日"  prop="age" hasFeedback>-->
        <!--          <a-date-picker valueFormat="YYYY-MM-DD"  v-model="model.birthday"/>-->
        <!--        </a-form-model-item>-->
        <a-form-model-item label="有效期至"  prop="validity" hasFeedback>
          <a-date-picker showTime valueFormat="YYYY-MM-DD" v-model="model.validity" disabled/>
        </a-form-model-item>

        <a-form-model-item label="上传人"  prop="issuingAuthority" hasFeedback >
          <!--          <a-input  placeholder="请输入发证机关"  v-model="model.issuingAuthority"/>-->
          {{model.upload_user}}
        </a-form-model-item>
        <a-form-model-item label="上传日期"  prop="issuingAuthority" hasFeedback >
          <!--          <a-input  placeholder="请输入发证机关"  v-model="model.issuingAuthority"/>-->
          {{model.upload_date}}
        </a-form-model-item>



        <a-form-model-item label="文件列表"  prop="issuingAuthority" hasFeedback >

        </a-form-model-item>



        <!--        <a-form-model-item label="证件上传"  hasFeedback >-->
<!--          <file-upload :url = "addFile"></file-upload>-->
<!--        </a-form-model-item>-->
        <!--        <a-form-model-item label="个人简介"  prop="content" hasFeedback>-->
        <!--          <a-input  type="textarea" placeholder="请输入个人简介"  v-model="model.content"/>-->
        <!--        </a-form-model-item>-->

      </a-form-model>


<!--        <a-descriptions :column="1" title="">-->
<!--          <a-descriptions-item label="UserName">-->
<!--            Zhou Maomao-->
<!--          </a-descriptions-item>-->
<!--          <a-descriptions-item label="Telephone">-->
<!--            1810000000-->
<!--          </a-descriptions-item>-->
<!--          <a-descriptions-item label="Live">-->
<!--            Hangzhou, Zhejiang-->
<!--          </a-descriptions-item>-->
<!--          <a-descriptions-item label="Remark">-->
<!--            empty-->
<!--          </a-descriptions-item>-->
<!--          <a-descriptions-item label="Address">-->
<!--            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China-->
<!--          </a-descriptions-item>-->
<!--        </a-descriptions>-->

    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
export default {
  name: "CheckModal",
  data () {
    return {
      loading:false,
      title:"操作",
      visible: false,
      model: {

      },
      layout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 14 },
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
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
        cheak:"",
        add: "/test/jeecgDemo/add",
        edit: "/test/jeecgDemo/edit",
        addFile:"/demo"
      },
    }
  },
  components:{

  },
  created () {
  },
  methods: {
    add () {
      this.edit({});
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
    handleOk () {
      this.loading = true;
      const that = this;
      // 触发表单验证
      this.$refs.form.validate(valid => {
        if (valid) {
          that.confirmLoading = true;
          let httpurl = '';
          let method = '';
          if(!this.model.id){
            httpurl+=this.url.add;
            method = 'post';
          }else{
            httpurl+=this.url.edit;
            method = 'put';
          }
          httpAction(httpurl,this.model,method).then((res)=>{
            if(res.success){
              that.$message.success(res.message);
              that.$emit('ok');
            }else{
              that.$message.warning(res.message);
            }
          }).finally(() => {
            that.confirmLoading = false;
            that.close();
          })
        }
      })
    },
    handleCancel () {
      this.close()
    }
  }
}
</script>

<style scoped>

</style>