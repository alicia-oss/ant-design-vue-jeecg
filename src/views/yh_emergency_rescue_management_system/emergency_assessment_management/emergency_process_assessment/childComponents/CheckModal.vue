<template>
  <a-modal
    style="width: 35%;"
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
        <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" >

          <a-form-model-item label="应急事故名称" required prop="emergencyInfoName" hasFeedback>
            <a-input v-model="model.emergencyInfoName"  :read-only="true"  placeholder="选择应急事故名称"/>
          </a-form-model-item>

          <a-form-item label='评估单位'>
            <a-input v-model="model.assessmentInstitution"  :read-only="true"  placeholder="请输入应急事故名称"/>
          </a-form-item>

          <a-form-model-item label="总结评估"  prop="summaryAssessment" hasFeedback>
            <a-textarea
              :read-only="true"
              placeholder="请输入总结评估"
              :auto-size="{ minRows: 2, maxRows: 6 }"
              v-model="model.summaryAssessment"
            />
          </a-form-model-item>

          <a-form-model-item label="反馈与建议" >
            <a-textarea
              :read-only="true"
              placeholder="请输入反馈与建议"
              :auto-size="{ minRows: 2, maxRows: 6 }"
              v-model="model.feedbackAndSuggestion"
            />
          </a-form-model-item>

          <a-form-model-item label="评估时间"  prop="assessmentTime" hasFeedback >
            <a-input  v-model="model.assessmentTime" :read-only="true" />
          </a-form-model-item>

        </a-form-model>
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