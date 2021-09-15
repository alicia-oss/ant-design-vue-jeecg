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
          <text-border>
          <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" >

            <a-form-model-item label="物资名称" required prop="materialName" hasFeedback>
              <!--            <a-input v-model="model.employeeId"    placeholder="请输入员工编号"/>-->
              <a-input v-model="model.materialName"    placeholder="请输入物资型号"  :read-only="true"/>

            </a-form-model-item>

            <a-form-model-item label="物资型号"  prop="materialModel" hasFeedback >
              <!--            <a-input  placeholder="请输入部门"  v-model="model.apartment"/>-->
              <a-input v-model="model.materialModel"    placeholder="请输入物资型号" :read-only="true"/>
            </a-form-model-item>

            <a-form-model-item label="物资数量" required prop="materialQuantity" hasFeedback>
              <a-input v-model="model.materialQuantity"    placeholder="请输入物资数量" :read-only="true"/>
            </a-form-model-item>

            <a-form-model-item label="备注或规格" required prop="memo" hasFeedback>
              <a-input v-model="model.memo"    placeholder="请输入物资数量" :read-only="true"/>
            </a-form-model-item>

            <a-form-model-item label="部门名称"  prop="department" hasFeedback>
              <a-input v-model="model.department"    placeholder="请输入部门名称" :read-only="true"/>
            </a-form-model-item>

            <a-form-model-item label="存放地址"  prop="storageAddress" hasFeedback>
              <a-input v-model="model.storageAddress"    placeholder="请输入存放地址" :read-only="true"/>
            </a-form-model-item>

            <a-form-model-item label="有效期至"  prop="validityUntilTime" hasFeedback >
              <!--            <a-input  placeholder="请输入发证机关"  v-model="model.issuingAuthority"/>-->
              <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.validityUntilTime" disabled/>
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