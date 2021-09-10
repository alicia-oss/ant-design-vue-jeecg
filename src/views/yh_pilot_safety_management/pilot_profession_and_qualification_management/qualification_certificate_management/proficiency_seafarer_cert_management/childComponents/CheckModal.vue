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
      <div class="table">
        <div class="item">
          <text-border title="基本信息" height="510px">
          <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" >

            <a-form-model-item label="员工编号" required prop="employeeId" hasFeedback>
<!--              <a-input v-model="model.employeeId"    placeholder="请输入员工编号"/>-->
              {{model.employeeId}}
            </a-form-model-item>

            <a-form-model-item label="部门"  prop="apartment" hasFeedback >
<!--              <a-input  placeholder="请输入部门"  v-model="model.apartment"/>-->
              {{model.apartment}}
            </a-form-model-item>

            <a-form-model-item label="证书编号" required prop="certNum" hasFeedback>
<!--              <a-input v-model="model.certNum"    placeholder="请输入证书编号"/>-->
              {{model.certNum}}
            </a-form-model-item>

<!--            <a-form-model-item label="签发日期"  prop="issueDate" hasFeedback>-->
<!--&lt;!&ndash;              <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.issueDate" />&ndash;&gt;-->
<!--              {{model.issueDate}}-->
<!--            </a-form-model-item>-->

            <a-form-model-item label="发证机关"  prop="issuingAuthority" hasFeedback >
<!--              <a-input  placeholder="请输入发证机关"  v-model="model.issuingAuthority"/>-->
              {{model.issuingAuthority}}
            </a-form-model-item>

            <a-form-model-item label="上传人"   prop="uploadUserId" hasFeedback >
<!--              <a-input  placeholder="请输入上传人"  v-model="model.uploadUserId" :disabled="true"/>-->
              {{model.uploadUserId}}
            </a-form-model-item>

            <a-form-model-item label="上传日期"  prop="uploadDate" hasFeedback >
<!--              <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.uploadDate" :disabled="true" />-->
              {{model.uploadDate}}
            </a-form-model-item>

           </a-form-model>
          </text-border>
        </div>
        <div class="item">
          <text-border title="相关证件" height="510px">
          <file-list :value="model.uploadFileName" ref="fileList"></file-list>
          </text-border>
        </div>
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
    FileList,
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
      this.$refs.fileList.close();
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