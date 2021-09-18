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

            <a-form-model-item label="应急预案名称" required prop="emergencyPlanName" hasFeedback>
              {{model.emergencyPlanName}}
            </a-form-model-item>

            <a-form-item label='预案种类'>
              {{model.emergencyPlanCategory}}
            </a-form-item>

            <a-form-model-item label="制定日期"  prop="specifiedTime" hasFeedback>
              {{model.specifiedTime}}
            </a-form-model-item>

            <a-form-model-item label="版本号" required prop="version" hasFeedback>
              {{model.version}}
            </a-form-model-item>

            <a-form-item label='部门'>
              {{model.departName}}
            </a-form-item>

            <a-form-model-item label="申请日期" required prop="applyTime" hasFeedback>
              {{model.applyTime}}
            </a-form-model-item>


            <a-form-model-item label="填写人" required prop="version" hasFeedback>
            {{model.fillPerson}}
            </a-form-model-item>

            <a-form-model-item label="修改日期"  prop="updateTime" hasFeedback >
             {{model.updateTime}}
            </a-form-model-item>

            <a-form-model-item label="申请状态"  prop="updateTime" hasFeedback >
              {{model.applicationState}}
            </a-form-model-item>

            <a-form-model-item label="发布状态"  prop="updateTime" hasFeedback >
              {{model.isReleased}}
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