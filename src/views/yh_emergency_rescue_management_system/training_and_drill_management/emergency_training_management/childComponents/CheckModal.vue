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

            <a-form-model-item label="计划名称" required prop="drillPlan" hasFeedback>
              <!--            <a-input v-model="model.employeeId"    placeholder="请输入员工编号"/>-->
              <a-input v-model="model.drillPlan"    placeholder="请输入计划名称" :read-only="true"/>

            </a-form-model-item>

            <a-form-model-item label="演练名称" required prop="drillName" hasFeedback >
              <!--            <a-input  placeholder="请输入部门"  v-model="model.apartment"/>-->
              <a-input v-model="model.drillName"    placeholder="请输入演练名称"  :read-only="true"/>
            </a-form-model-item>

            <a-form-model-item label="组织部门" required prop="organizeDepart" hasFeedback>
              <a-input v-model="model.organizeDepart"    placeholder="请输入填报时间" :read-only="true"/>
            </a-form-model-item>

            <a-form-model-item label="负责人" prop="personInCharge" hasFeedback>
              <a-input v-model="model.personInCharge"    placeholder="请输入负责人姓名" :read-only="true"/>
            </a-form-model-item>

            <a-form-model-item label="开始时间" prop="startTime" hasFeedback>
              <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.startTime" placeholder="" disabled/>
            </a-form-model-item>

            <a-form-model-item label="结束时间"  prop="endTime" hasFeedback >
              <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.endTime" placeholder="" disabled/>
            </a-form-model-item>

            <a-form-model-item label="演练方式"  prop="drillMethod" hasFeedback>
              <a-input v-model="model.drillMethod"    placeholder="请输入演练方式" :read-only="true"/>
            </a-form-model-item>

            <a-form-model-item label="演练地点"  prop="drillSite" hasFeedback>
              <a-input v-model="model.drillSite"    placeholder="请输入演练地点" :read-only="true"/>
            </a-form-model-item>

           </a-form-model>
          </text-border>
        </div>
        <div class="item">
          <text-border>
            <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" >
              <a-form-model-item label="演练内容"  prop="drillContent" hasFeedback>
                <a-input v-model="model.drillContent"    placeholder="请输入演练内容" :read-only="true"/>
              </a-form-model-item>

              <a-form-model-item label="参与人员"  prop="participants" hasFeedback>
                <a-input v-model="model.participants"    placeholder="请输入参与人员" :read-only="true"/>
              </a-form-model-item>

              <a-form-model-item label="演练上传时间"  prop="uploadPlanTime" hasFeedback>
                <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.uploadPlanTime" placeholder="2021-9-11" disabled/>
              </a-form-model-item>

              <a-form-model-item label="评估效果"  prop="evaluation" hasFeedback>
                <a-input v-model="model.evaluation"    placeholder="请输入演练评估效果" :read-only="true"/>
              </a-form-model-item>

              <a-form-model-item label="文件上传人"  prop="uploadEvaluationPerson" hasFeedback>
                <a-input v-model="model.uploadEvaluationPerson"    placeholder="请输入评估文件上传人" :read-only="true"/>
              </a-form-model-item>

              <a-form-model-item label="评估上传时间"  prop="uploadEvaluationTime" hasFeedback>
                <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.uploadEvaluationTime" placeholder="2021-9-11" disabled/>
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
      <div class="item">
        <text-border title="演练证件">
          <file-list :value="model.uploadFileName" ref="fileList"></file-list>
        </text-border>
      </div>
      <div class="item">
        <text-border title="评估证件">
          <file-list :value="model.uploadEvaluationFileName" ref="fileList"></file-list>
        </text-border>
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