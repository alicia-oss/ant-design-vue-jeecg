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
        <div class="item">
          <text-border title="基本信息">
          <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" >
            <a-form-model-item label="员工姓名" required prop="employeeName" hasFeedback>
              <a-input v-model="model.employeeName" placeholder="请输入员工编号"  :read-only="true"/>
            </a-form-model-item>
            <a-form-model-item label="证书编号" required prop="certNum" hasFeedback>
              <a-input v-model="model.certNum" placeholder="请输入证书编号"  :read-only="true"/>
            </a-form-model-item>
            <a-form-model-item label="证书类别">
              <a-input v-model="model.cert_type" placeholder="请输入证书编号"  :read-only="true"/>
            </a-form-model-item>
            <a-form-model-item label="证书等级">
              <a-select v-model="model.cert_class" placeholder="请选择证书等级" :read-only="true">
                <a-select-option value="一级">一级</a-select-option>
                <a-select-option value="二级">二级</a-select-option>
                <a-select-option value="三级">三级</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="签发日期" prop="issuingDate" hasFeedback>
              <a-input  v-model="model.issueDate" :read-only="true"/>
            </a-form-model-item>
            <a-form-model-item label="发证机关" prop="issuingAuthority" hasFeedback>
              <a-input placeholder="请输入发证机关" v-model="model.issuingAuthority"  :read-only="true"/>
            </a-form-model-item>
            <a-form-model-item label="上传人">
              <a-input placeholder="王五" v-model="model.uploadUserId"  :read-only="true"/>
            </a-form-model-item>
            <a-form-model-item label="上传日期">
              <a-input placeholder="2021-9-11" v-model="model.uploadDate" :read-only="true" />
            </a-form-model-item>
          </a-form-model>
          </text-border>
        </div>
        <div class="item">
          <text-border title="相关证件" >
            <file-list :value="model.uploadFileName" ref="fileList"></file-list>
          </text-border>
        </div>
      </div>
    </a-spin>
  </a-modal>
</template>

<script>
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