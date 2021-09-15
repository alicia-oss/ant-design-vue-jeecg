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

            <a-form-model-item label="救援方式" required prop="rescueType" hasFeedback>
              <!--            <a-input v-model="model.employeeId"    placeholder="请输入员工编号"/>-->
              <a-select default-value="0" v-model="model.rescueType" disabled>
                <a-select-option value="0">
                  医疗救援
                </a-select-option>
                <a-select-option value="1">
                  海事搜救
                </a-select-option>
              </a-select>

            </a-form-model-item>

            <a-form-model-item label="救援单位" required prop="externalDepartName" hasFeedback >
              <!--            <a-input  placeholder="请输入部门"  v-model="model.apartment"/>-->
              <a-input v-model="model.externalDepartName"    placeholder="请输入救援单位名称"  :read-only="true"/>
            </a-form-model-item>

            <a-form-model-item label="联系电话" required prop="phone" hasFeedback>
              <a-input v-model="model.phone"    placeholder="请输入联系方式" :read-only="true"/>
            </a-form-model-item>

            <a-form-model-item label="协议签订时间" required prop="protocolSignTime" hasFeedback>
              <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.protocolSignTime" placeholder="" disabled/>
            </a-form-model-item>

            <a-form-model-item label="有效期起" prop="validityStartTime" hasFeedback>
              <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.validityStartTime" placeholder="" disabled/>
            </a-form-model-item>

            <a-form-model-item label="有效期至"  prop="validityEndTime" hasFeedback >
              <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.validityEndTime" placeholder="" disabled/>
            </a-form-model-item>

            <a-form-model-item label="上传人" prop="uploadPerson" hasFeedback>
              <a-input v-model="model.uploadPerson"    placeholder="王五" read-only="true"/>
            </a-form-model-item>

            <a-form-model-item label="上传时间"  prop="uploadTime" hasFeedback >
              <!--            <a-input  placeholder="请输入发证机关"  v-model="model.issuingAuthority"/>-->
              <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.uploadTime" placeholder="2020-9-11" disabled/>
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