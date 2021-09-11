<template>
  <a-modal
    :footer="null"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    cancelText="关闭">

    <template slot="title" style="overflow: scroll">
      <div class="title">
        <a-icon type="form" style="color: #1890ff;margin-right: 10px"></a-icon>{{title}}
      </div>
    </template>

    <a-spin :spinning="confirmLoading">
      <div class="table" style="overflow: scroll">
        <div class="item">
          <text-border title="基本信息" height="600px">
          <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" >

            <a-form-model-item label="计划名称" required prop="drillPlanName" hasFeedback>
<!--              <a-input v-model="model.employeeId"    placeholder="请输入员工编号"/>-->
              {{model.drillPlanName}}
            </a-form-model-item>

            <a-form-model-item label="年度" required prop="drillYear" hasFeedback >
<!--              <a-input  placeholder="请输入部门"  v-model="model.apartment"/>-->
              {{model.drillYear}}
            </a-form-model-item>

            <a-form-model-item label="填报时间" required prop="fillInTime" hasFeedback>
<!--              <a-input v-model="model.certNum"    placeholder="请输入证书编号"/>-->
              {{model.fillInTime}}
            </a-form-model-item>

            <a-form-model-item label="负责人" prop="personInCharge" hasFeedback>
              <!--              <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.issueDate" />-->
              {{model.personInCharge}}
            </a-form-model-item>

            <a-form-model-item label="联系电话" prop="phone" hasFeedback>
<!--              <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.issueDate" />-->
              {{model.phone}}
            </a-form-model-item>

            <a-form-model-item label="填写人"  prop="fillName" hasFeedback>
              <!--              <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.issueDate" />-->
              {{model.fillPerson}}
            </a-form-model-item>

            <a-form-model-item label="申请时间"  prop="applyTime" hasFeedback>
              <!--              <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.issueDate" />-->
              {{model.applyTime}}
            </a-form-model-item>

            <a-form-model-item label="申请状态"  prop="applicationState" hasFeedback >
<!--              <a-input  placeholder="请输入发证机关"  v-model="model.issuingAuthority"/>-->
              {{model.applicationState}}
            </a-form-model-item>

            <a-form-model-item label="发布状态"  prop="isReleased" hasFeedback >
              <!--              <a-input  placeholder="请输入发证机关"  v-model="model.issuingAuthority"/>-->
              {{model.isReleased}}
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