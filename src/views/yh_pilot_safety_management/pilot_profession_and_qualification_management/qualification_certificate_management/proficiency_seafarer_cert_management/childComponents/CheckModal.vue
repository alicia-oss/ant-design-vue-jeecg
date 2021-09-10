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
        <a-row>
          <a-col :span="12">
            <div class="item">
              <text-border title="基本信息" height="430px">
                <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" >

                  <a-form-model-item label="员工编号" required prop="employeeId" hasFeedback>
                    <!--              <a-input v-model="model.employeeId"    placeholder="请输入员工编号"/>-->
                    {{model.employeeId}}
                  </a-form-model-item>

                  <a-form-model-item label="部门"  prop="apartment" hasFeedback >
                    <!--              <a-input  placeholder="请输入部门"  v-model="model.apartment"/>-->
                    {{model.apartment}}
                  </a-form-model-item>

                  <a-form-model-item label="证书编号" required prop="certNum" hasFeedback>
                    <!--              <a-input v-model="model.certNum"    placeholder="请输入证书编号"/>-->
                    {{model.certNum}}
                  </a-form-model-item>

                  <!--            <a-form-model-item label="签发日期"  prop="issueDate" hasFeedback>-->
                  <!--&lt;!&ndash;              <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.issueDate" />&ndash;&gt;-->
                  <!--              {{model.issueDate}}-->
                  <!--            </a-form-model-item>-->

                  <a-form-model-item label="发证机关"  prop="issuingAuthority" hasFeedback >
                    <!--              <a-input  placeholder="请输入发证机关"  v-model="model.issuingAuthority"/>-->
                    {{model.issuingAuthority}}
                  </a-form-model-item>

                  <a-form-model-item label="上传人"   prop="uploadUserId" hasFeedback >
                    <!--              <a-input  placeholder="请输入上传人"  v-model="model.uploadUserId" :disabled="true"/>-->
                    {{model.uploadUserId}}
                  </a-form-model-item>

                  <a-form-model-item label="上传日期"  prop="uploadDate" hasFeedback >
                    <!--              <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.uploadDate" :disabled="true" />-->
                    {{model.uploadDate}}
                  </a-form-model-item>

                </a-form-model>
              </text-border>
            </div>
          </a-col>

          <a-col :span="12">
            <div class="item">
              <text-border title="相关证件" height="430px">
                <file-list :value="model.uploadFileName" ref="fileList"></file-list>
              </text-border>
            </div>
          </a-col>
        </a-row>

        <a-row>
          <text-border class="cert-table" title="相关证书">
            <sub-table :dataSource="model.subList" :add-contain="false"></sub-table>
          </text-border>
        </a-row>


      </div>

    </a-spin>


  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import SubTable from  './SubTable'
  // from '@views/yh_pilot_safety_management/pilot_profession_and_qualification_management/qualification_certificate_management/proficiency_seafarer_cert_management/childComponents/SubTable'

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
    TextBorder,
    SubTable

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

  width: 100%;
}

.item{

}
.title{
  font-size: 20px;
}

.cert-table{
  margin-top: 30px;
}
</style>