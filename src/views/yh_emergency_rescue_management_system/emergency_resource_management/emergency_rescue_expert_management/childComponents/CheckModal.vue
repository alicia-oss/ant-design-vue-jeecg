<template>
  <a-modal
    :footer="null"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    cancelText="关闭">

    <template slot="title">
      <div class="title">
        <a-icon type="form" style="color: #1890ff;margin-right: 10px"></a-icon>{{title}}
      </div>
    </template>

    <a-spin :spinning="confirmLoading">
      <div class="table" style="overflow: scroll">
        <div class="item">
          <text-border title="基本信息" height="510px">
          <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" >

            <a-form-model-item label="姓名" required prop="expertName" hasFeedback>
<!--              <a-input v-model="model.employeeId"    placeholder="请输入员工编号"/>-->
              {{model.expertName}}
            </a-form-model-item>

            <a-form-model-item label="职责" required prop="expertDuty" hasFeedback >
<!--              <a-input  placeholder="请输入部门"  v-model="model.apartment"/>-->
              {{model.expertDuty}}
            </a-form-model-item>

            <a-form-model-item label="所在部门" required prop="departName" hasFeedback>
<!--              <a-input v-model="model.certNum"    placeholder="请输入证书编号"/>-->
              {{model.departName}}
            </a-form-model-item>

            <a-form-model-item label="联系方式" prop="phone" hasFeedback>
              <!--              <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.issueDate" />-->
              {{model.phone}}
            </a-form-model-item>

            <a-form-model-item label="备注" prop="memo" hasFeedback>
<!--              <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.issueDate" />-->
              {{model.memo}}
            </a-form-model-item>

            <a-form-model-item label="是否本单位"  prop="isCompany" hasFeedback>
              <!--              <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.issueDate" />-->
              {{model.isCompany}}
            </a-form-model-item>

            <a-form-model-item label="上传人"  prop="uploadPerson" hasFeedback>
              <!--              <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.issueDate" />-->
              {{model.uploadPerson}}
            </a-form-model-item>

            <a-form-model-item label="上传时间"  prop="uploadTime" hasFeedback >
<!--              <a-input  placeholder="请输入发证机关"  v-model="model.issuingAuthority"/>-->
              {{model.uploadTime}}
            </a-form-model-item>


           </a-form-model>
          </text-border>
        </div>
<!--        <div class="item">-->
<!--          <text-border title="相关证件" height="510px">-->
<!--          <file-list :value="model.uploadFileName" ref="fileList"></file-list>-->
<!--          </text-border>-->
<!--        </div>-->
      </div>

    </a-spin>


  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'

import FileList from './FileList'
import TextBorder from './TextBorder'
export default {
  name: "CheckModal",
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
        xs: { span: 10 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      confirmLoading: false,
      form: this.$form.createForm(this),

    }
  },
   components:{
  //   FileList,
     TextBorder
   },
  created () {
  },
  methods: {
    check (record) {
      this.model = Object.assign({}, record);
      // this.$refs.fileList.initFileList();
      this.visible = true;
    },
    close () {
      // this.$refs.fileList.close();
      this.$refs.form.resetFields();
      this.$emit('close');
      this.visible = false;
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
.title{
  font-size: 20px;
}
</style>