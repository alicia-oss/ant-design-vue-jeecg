<template>
  <a-modal
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    cancelText="关闭">

    <template slot="title">
      <div class="title">
        <a-icon type="monitor" style="color: #1890ff;margin-right: 10px"></a-icon>{{title}}
      </div>
    </template>

    <template slot="footer">
      <a-button  style="margin: 10px" key="last"  @click="handleLast" >
        上一条
      </a-button>

      <a-button  style="margin: 10px" key="next"  @click="handleNext" >
        下一条
      </a-button>

      <a-button style="margin: 10px" key="submit" type="primary" :loading="loading" @click="handleCancel">
        关闭
      </a-button>
    </template>

    <a-spin :spinning="confirmLoading">
      <div class="table">
        <div class="item">
          <text-border title="基本信息" >


           <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" >
            <a-form-model-item label="员工姓名" required prop="employeeName" hasFeedback>
              <a-input v-model="model.employeeName"    placeholder="请输入员工姓名" :read-only="true" />
            </a-form-model-item>

            <a-form-model-item label="员工编号" required prop="employeeId" hasFeedback>
              <a-input v-model="model.employeeId"    placeholder="请输入员工编号" :read-only="true" />
            </a-form-model-item>


            <a-form-model-item label="注册号码" required prop="registerNum" hasFeedback>
              <a-input v-model="model.registerNum"    placeholder="请输入注册号码"  :read-only="true" />
<!--              {{model.registerNum}}-->
            </a-form-model-item>

            <a-form-model-item label="签发日期"  prop="issueDate" hasFeedback>
<!--              <a-date-picker valueFormat="YYYY-MM-DD"  style="width: 100%" v-model="model.issueDate"  :disabled="true" />-->
              <a-input  placeholder="请输入签发日期"  v-model="model.issueDate"  :read-only="true" />
            </a-form-model-item>

            <a-form-model-item label="发证机关"  prop="issuingAuthority" hasFeedback >
              <a-input  placeholder="请输入发证机关"  v-model="model.issuingAuthority"  :read-only="true" />
<!--              {{model.issuingAuthority}}-->
            </a-form-model-item>

            <a-form-model-item label="上传人"   prop="uploadUserId" hasFeedback >
              <a-input  placeholder="请输入上传人"  v-model="model.uploadUserId"  :read-only="true" />
<!--              {{model.uploadUserId}}-->
            </a-form-model-item>

            <a-form-model-item label="上传日期"  prop="uploadDate" hasFeedback >
<!--              <a-date-picker valueFormat="YYYY-MM-DD" style="width: 100%" v-model="model.uploadDate"  :disabled="true"  />-->
              <a-input  placeholder="请输入上传日期"  v-model="model.uploadDate"  :read-only="true" />
<!--              {{model.uploadDate}}-->
            </a-form-model-item>

           </a-form-model>
          </text-border>
        </div>
        <div class="item">
          <text-border title="相关证件">
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
        sm: { span:6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
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
    },
    handleLast(){

    },

    handleNext(){

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