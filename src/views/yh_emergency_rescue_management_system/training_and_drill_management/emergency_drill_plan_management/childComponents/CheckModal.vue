<template>
  <a-modal
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
          <text-border title="基本信息">
          <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" >

            <a-form-model-item label="计划名称" required prop="drillPlanName" hasFeedback>
              <!--            <a-input v-model="model.employeeId"    placeholder="请输入员工编号"/>-->
              <a-input v-model="model.drillPlanName"    placeholder="请输入计划名称" :read-only="true"/>

            </a-form-model-item>

            <a-form-model-item label="年度" required prop="drillYear" hasFeedback >
              <!--            <a-input  placeholder="请输入部门"  v-model="model.apartment"/>-->
              <a-input v-model="model.drillYear"    placeholder=""  :read-only="true"/>
            </a-form-model-item>

            <a-form-model-item label="填报时间" required prop="fillInTime" hasFeedback>
              <a-input v-model="model.fillInTime"    placeholder="请输入填报时间" :read-only="true"/>
            </a-form-model-item>

            <a-form-model-item label="负责人" prop="personInCharge" hasFeedback>
              <a-input v-model="model.personInCharge"    placeholder="请输入负责人姓名" :read-only="true"/>
            </a-form-model-item>

            <a-form-model-item label="联系电话" prop="phone" hasFeedback>
              <a-input v-model="model.phone"    placeholder="请输入联系电话" :read-only="true"/>
            </a-form-model-item>

            <a-form-model-item label="填写人"  prop="fillPerson" hasFeedback >
              <a-input v-model="model.fillPerson"    placeholder="李四"  :read-only="true"/>
            </a-form-model-item>

            <a-form-model-item label="申请时间"  prop="applyTime" hasFeedback>
              <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.applyTime" placeholder="2020-9-11" disabled/>
            </a-form-model-item>

            <a-form-model-item label="申请状态" required  prop="applicationState" hasFeedback >
              <!--            <a-input  placeholder="请输入发证机关"  v-model="model.issuingAuthority"/>-->
              <a-input v-model="model.applicationState"    placeholder="编辑中" disabled/>
            </a-form-model-item>

            <a-form-model-item label="发布状态" required  prop="isReleased" hasFeedback >
              <a-input v-model="model.isReleased"    placeholder="已发布" disabled/>
            </a-form-model-item>

           </a-form-model>
          </text-border>
        </div>
        <div class="item">
          <text-border title="相关证件">
            <file-list :value="model.uploadFileName" ref="fileList"></file-list>
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
      // this.$refs.fileList.close();
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