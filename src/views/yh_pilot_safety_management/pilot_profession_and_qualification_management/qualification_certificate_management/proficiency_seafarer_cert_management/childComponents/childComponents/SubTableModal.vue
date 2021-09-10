<template>
  <div>
    <a-modal
      :width="800"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      @ok="handleOk"
      cancelText="关闭">

      <template slot="title">
        <div class="title">
          <a-icon type="form" style="color: #1890ff;margin-right: 10px"></a-icon>{{title}}
        </div>
      </template>
      <a-spin :spinning="confirmLoading">
        <div class="table">
          <div class="item">
            <text-border title="证书信息" height="510px">
              <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">

                <a-form-model-item label="证书种类" required prop="certProficiencyCate" hasFeedback>
                  <a-select placeholder="请选择证书种类" v-model="model.certProficiencyCate">
                    <a-select-option v-for="item in inputData.certProficiencyCate" :value="item.value">
                      {{item.value}}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>

                <a-form-model-item label="公约条款" required prop="clause" hasFeedback>
                  <a-input v-model="model.clause"    placeholder="请输入公约条款"/>
                </a-form-model-item>

<!--                <a-form-model-item label="证书编号" required prop="certNum" hasFeedback>-->
<!--                  <a-input v-model="model.certNum"    placeholder="请输入证书编号"/>-->
<!--                </a-form-model-item>-->

                <a-form-model-item label="签发日期"  prop="issueDate" hasFeedback>
                  <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.issueDate" />
                </a-form-model-item>

<!--                <a-form-model-item label="发证机关"  prop="issuingAuthority" hasFeedback >-->
<!--                  &lt;!&ndash;            <a-input  placeholder="请输入发证机关"  v-model="model.issuingAuthority"/>&ndash;&gt;-->
<!--                  <a-select placeholder="请输入发证机关" v-model="model.issuingAuthority">-->
<!--                    <a-select-option v-for="item in inputData.issuingAuthority" :value="item">-->
<!--                      {{item}}-->
<!--                    </a-select-option>-->
<!--                  </a-select>-->
<!--                </a-form-model-item>-->


                <a-form-model-item label="有效日期"  prop="uploadDate" hasFeedback >
                  <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.validity"  />
                </a-form-model-item>


                <!--        <a-form-model-item label="个人简介"  prop="content" hasFeedback>-->
                <!--          <a-input  type="textarea" placeholder="请输入个人简介"  v-model="model.content"/>-->
                <!--        </a-form-model-item>-->

              </a-form-model>
            </text-border>
         </div>
        </div>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
import { httpAction } from '@/api/manage'

import TextBorder from '../TextBorder'
import { uuid } from '@tinymce/tinymce-vue/lib/es2015/Utils'
import { copyObj } from 'codemirror/src/util/misc'
export default {
  name: "SubTableModal",
  data () {
    return {
      method:"",
      loading:false,
      title:"操作",
      visible: false,
      inputData: {
        certProficiencyCate:[
          {
            key:1,
            value:"熟悉和基本安全培训合格证"
          },
          {
            key:2,
            value:"精通救生艇筏和救助艇培训合格证"
          },
          {
            key:3,
            value:"高级消防培训合格证"
          },
          {
            key:4,
            value:"大型船舶操纵特殊培训合格证"
          },
        ]
      },
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
      // form: this.$form.createForm(this),
      validatorRules:{

        // email: [
        //   { required: false, type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        // ]
      },
      url: {
        add: "/wzh/yhHealthCert/add",
        edit: "/wzh/yhHealthCert/edit",
        addFile:"/sys/common/upload"
      },
    }
  },
  components:{
    TextBorder,
  },

  methods: {
    add () {
      this.edit({});
      console.log(this.model)
      this.visible = true;
    },
    edit (record) {
      console.log(record);
      this.model = Object.assign({}, record);
      this.visible = true;
    },
    close () {
      this.$refs.form.resetFields();
      this.$emit('close');
      this.visible = false;
    },


    handleOk(){
      let modelData = new Object();
      copyObj(this.model,modelData);
      this.$refs.form.validate(valid=>{
        if(valid) {
          if(this.method === "add"){
            //更改
            modelData.proficiencyCertSubId = uuid("");
            modelData.proficiencyCertMainId = uuid("");
            this.$emit("ok",{method:"add",modelData:modelData})
          }
          else if(this.method === "edit"){
            this.$emit("ok",{method:"edit",modelData:modelData})
          }
          this.close();
        }
      })

    },
    handleComplete(){

      // this.model.apartment = "测试部门01";
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