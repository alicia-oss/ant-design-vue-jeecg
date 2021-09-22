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
        <a-collapse v-model="activeKey">
          <a-collapse-panel key="1" header="投诉信息" style="width:760px;font-size:20px">
            <div class="table">
              <div class="item">
                <text-border title="基本投诉信息">
                  <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">

                    <a-form-model-item label="投诉人/单位" required prop="registerNum" hasFeedback>
                      <a-input v-model="model.complaintPersonName"    placeholder="请输入投诉人姓名"  :read-only="true"/>
                    </a-form-model-item>

                    <a-form-model-item label="被投诉部门" required prop="registerNum" hasFeedback>
                      <a-input v-model="model.complaintBeDepartId"    placeholder="请输入被投诉部门"  :read-only="true"/>
                    </a-form-model-item>


                    <a-form-model-item label="被投诉人">
                      <a-input v-model="model.complaintBeId"    placeholder="请输入被投诉人姓名"  :read-only="true"/>
                    </a-form-model-item>

                    <a-form-model-item label="投诉日期"  prop="issueDate" hasFeedback>
                      <a-input  v-model="model.complaintTime"  :read-only="true" />
                    </a-form-model-item>

                    <a-form-model-item label="投诉方式" prop="complaint_type">
                      <a-input  v-model="model.complaintType"  :read-only="true" />
                    </a-form-model-item>

                    <a-form-model-item label="联系方式">
                      <a-input v-model="model.complaintPersonContact"  :read-only="true"/>
                    </a-form-model-item>

                    <a-form-model-item label="投诉内容" prop="complaint_title" >
                      <a-input v-model="model.complaintTitle" type="textarea" :auto-size="{ minRows: 4, maxRows: 6 }" :read-only="true"/>
                    </a-form-model-item>

                  </a-form-model>
                </text-border>
              </div>
              <div class="item">
                <text-border title="相关文件">
                  <file-list :value="model. uploadFileName" ref="fileList"></file-list>
                </text-border>
              </div>
            </div>


          </a-collapse-panel>
          <a-collapse-panel key="2" header="投诉反馈" style="width:760px;font-size:20px">
            <div class="table">
              <div class="item">
                <text-border title="投诉反馈信息" >
                  <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">
                    <a-form-model-item label="是否属实:" prop="complaintVerifyResult">
                      <a-input v-model="model.complaintVerifyResult"  :read-only="true"/>

                    </a-form-model-item>

                    <a-form-model-item label="核查内容" prop="complaintProcessingVerifyInfo" >
                      <a-input v-model="model.complaintProcessingVerifyInfo" type="textarea" :auto-size="{ minRows: 4, maxRows: 6 }"  :read-only="true" />
                    </a-form-model-item>

                    <a-form-model-item label="处理详情" prop="complaintProcessingDealInfo" >
                      <a-input v-model="model.complaintProcessingDealInfo" type="textarea" :auto-size="{ minRows: 4, maxRows: 6 }"  :read-only="true"/>
                    </a-form-model-item>

                    <a-form-model-item label="填写人" prop="feedbackUserId" >
                      <a-input v-model="model.feedbackUserId"  :read-only="true"/>
                    </a-form-model-item>

                    <a-form-model-item label="填写时间" prop="complaintDealTime" >
                      <a-input v-model="model.complaintDealTime"  :read-only="true"/>
                    </a-form-model-item>

                  </a-form-model>
                </text-border>
              </div>
              <div class="item">
                <text-border title="相关文件">
                  <file-list :value="model. uploadFileName" ref="fileList"></file-list>
                </text-border>
              </div>

            </div>


          </a-collapse-panel>
        </a-collapse>
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
      activeKey: ['2'],
      loading:false,
      title:"操作",
      visible: false,
      model: {},
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 14 },
      },
      labelCol: {
        xs: { span: 10 },
        sm: { span:7 },
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