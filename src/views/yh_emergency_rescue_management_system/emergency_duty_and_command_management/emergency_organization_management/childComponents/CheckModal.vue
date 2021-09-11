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
          <text-border title="基本信息" >
          <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" >

            <a-form-model-item label="员工编号" required prop="rescuePeopleId" hasFeedback>
              {{model.rescuePeopleId}}
            </a-form-model-item>

            <a-form-model-item label="员工姓名" required prop="rescuePeopleName" hasFeedback>
              {{model.rescuePeopleName}}
            </a-form-model-item>


            <a-form-model-item label="所属部门" required prop="departName" hasFeedback>
              {{model.departName}}
            </a-form-model-item>

            <a-form-model-item label="职责"  prop="phone" hasFeedback >
              {{model.rescuePeopleDuty}}
            </a-form-model-item>

            <a-form-model-item label="电话号码"  prop="phone" hasFeedback >
              {{model.phone}}
            </a-form-model-item>

            <a-form-model-item label="上传人"   prop="uploadUserId" hasFeedback >
              {{model.uploadUserId}}
            </a-form-model-item>

            <a-form-model-item label="上传日期"  prop="uploadDate" hasFeedback >
<!--              <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.uploadDate" :disabled="true" />-->
              {{model.uploadDate}}
            </a-form-model-item>

           </a-form-model>
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