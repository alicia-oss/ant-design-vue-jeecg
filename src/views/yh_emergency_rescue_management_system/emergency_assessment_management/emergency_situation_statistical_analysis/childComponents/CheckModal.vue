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
          <text-border title="基本信息" >
          <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" >

            <a-form-model-item label="事故名称" required prop="accidentName" hasFeedback>
              <a-input v-model="model.accidentName"  :readonly="true"/>
            </a-form-model-item>

            <a-form-model-item label="发生时间"  required prop="occurTime" hasFeedback>
              <a-input v-model="model.occurTime" :readonly="true"/>
            </a-form-model-item>

            <a-form-item label='事故类别'>
              <a-input v-model="model.accidentCategory" :readonly="true"/>
            </a-form-item>

            <a-form-item label='事故严重等级'>
              <a-input v-model="model.accidentSevereDegree" :readonly="true"/>
            </a-form-item>

            <a-form-model-item label="经济损失" prop="economicLoss" hasFeedback>
              <a-input v-model="model.economicLoss" :readonly="true"/>
            </a-form-model-item>

            <a-form-model-item label="上传人" required prop="version" hasFeedback>
              <a-input v-model="model.uploadPerson" :readonly="true"/>
            </a-form-model-item>

            <a-form-model-item label="上传时间"  prop="uploadTime" hasFeedback >
              <a-input v-model="model.uploadTime" :readonly="true"/>
            </a-form-model-item>

           </a-form-model>
          </text-border>
        </div>
        <div class="item">
          <text-border title="上传文件">
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