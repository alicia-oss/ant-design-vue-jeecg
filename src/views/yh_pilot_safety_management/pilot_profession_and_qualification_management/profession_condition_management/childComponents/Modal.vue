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
          <a-icon type="form" style="color: #1890ff;margin-right: 10px"></a-icon>
          {{ title }}
        </div>
      </template>
      <template slot="footer">
        <a-button style="margin: 10px" key="reset"  @click="handleReset" >
          重置
        </a-button>
        <a-button style="margin: 10px" key="back"  @click="handleCancel" >
          取消
        </a-button>
        <a-button style="margin: 10px" key="submit" type="primary" :loading="loading" @click="handleOk">
          保存
        </a-button>
      </template>

      <a-spin :spinning="confirmLoading">
        <div class="table">
          <a-row>
            <a-col :span="12">
              <div class="item">
                <text-border title="基本信息" >
                  <a-form-model ref="form" :label-col="labelCol" :wrapper-col="wrapperCol" :model="model"
                  >
                    <a-form-model-item label="员工姓名" required prop="pilotName" hasFeedback>
                      <a-input v-model="model.pilotName"    placeholder=""/>
                    </a-form-model-item>

                    <a-form-model-item label="汉语拼音" required prop="nameSpell" hasFeedback>
                      <a-input v-model="model.nameSpell"    placeholder=""/>
                    </a-form-model-item>

                    <a-form-model-item label="性别"  prop="gender" hasFeedback >
                      <a-input  placeholder=""   v-model="model.gender"/>
                    </a-form-model-item>

                    <a-form-model-item label="出生日期" required prop="birthDate" hasFeedback>
                      <a-input v-model="model.birthDate"    placeholder=""/>

                    </a-form-model-item>

                    <a-form-model-item label="籍贯"  prop="nativePlace" hasFeedback >
                      <a-input  placeholder=""   v-model="model.nativePlace"/>
                    </a-form-model-item>

                    <a-form-model-item label="民族"  prop="nation" hasFeedback >
                      <a-input  placeholder=""   v-model="model.nation"/>
                    </a-form-model-item>


                  </a-form-model>
                </text-border>
              </div>
            </a-col>
            <a-col :span="12">
              <div class="item">
                <text-border>
                  <a-form-model ref="form" :label-col="labelCol" :wrapper-col="wrapperCol" :model="model">
                    <a-form-model-item label="毕业院校"  prop="graduatedSchool" hasFeedback >
                      <a-input  placeholder=""   v-model="model.graduatedSchool"/>
                    </a-form-model-item>

                    <a-form-model-item label="所学专业"  prop="studyMajor" hasFeedback >
                      <a-input  placeholder=""   v-model="model.studyMajor"/>
                    </a-form-model-item>

                    <a-form-model-item label="文化程度"  prop="eduDegree" hasFeedback >
                      <a-input  placeholder=""  v-model="model.eduDegree"/>
                    </a-form-model-item>


                    <a-form-model-item label="上传人"   prop="uploadUser" hasFeedback >
                      <a-input  placeholder=""  :readOnly="true" v-model="model.uploadUser" :disabled="true"/>
                    </a-form-model-item>

                    <a-form-model-item label="上传日期"  prop="uploadDate" hasFeedback >
                      <a-input  placeholder="" :readOnly="true"  v-model="model.uploadDate" :disabled="true"/>
                    </a-form-model-item>

                    <a-form-model-item label="备注"  prop="remarks" hasFeedback >
                      <a-input  placeholder=""   v-model="model.remarks" :disabled="true"/>
                    </a-form-model-item>
                  </a-form-model>
                </text-border>
              </div>
            </a-col>
          </a-row>
          <a-row>

              <div style="margin-top: 30px">
                <text-border title="证件上传" :height="height">
                  <a-form-model ref="form" :label-col="labelCol" :wrapper-col="wrapperCol" :model="model"
                                :rules="validatorRules">
                    <!--            <file-upload ref="yhFileUpload" :url = "url.addFile"></file-upload>-->
                    <file style="width: 100%" v-model="model.uploadFileName"></file>
                  </a-form-model>
                </text-border>
              </div>

          </a-row>
          <a-row>
            <text-border class="cert-table" title="增加证书">
             <sub-table :dataSource="model.subList"></sub-table>
            </text-border>
          </a-row>
        </div>


      </a-spin>
    </a-modal>
  </div>
</template>

<script>
import { httpAction } from '@api/manage'
import File from './File'
import TextBorder from './TextBorder'
import SubTable from './SubTable'

import { uuid } from '@tinymce/tinymce-vue/lib/es2015/Utils'
import { copyObj } from 'codemirror/src/util/misc'

export default {
  name: 'Modal',
  data() {
    return {
      height: '430px',
      method: '',
      loading: false,
      title: '操作',
      visible: false,
      inputData: {
        employeeId: ['0441-张三', '0442-王五', '0443-赵四'],
        apartment: ['测试部门01', '测试部门02', '测试部门03', '测试部门04'],
        issuingAuthority: ['测试机关01', '测试机关02', '测试机关03']
      },
      // inputData:[{id:"0441",name:"张三"},{id:"0442",name:"王五"}],
      model: {},
      layout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 14 }
      },
      labelCol: {
        xs: { span: 10 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      // form: this.$form.createForm(this),
      validatorRules: {
        certId: [
          { required: true, message: '请输入证书编号!' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        employeeId: [
          { required: true, message: '请输入员工编号!' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ]
        // email: [
        //   { required: false, type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        // ]
      },
      url: {
        add: '/wzh/yhHealthCert/add',
        edit: '/wzh/yhHealthCert/edit',
        addFile: '/sys/common/upload'
      },
    }
  },
  components: {
    TextBorder,
    File,
    SubTable
  },

  methods: {
    add() {
      this.edit({})
      this.model.subList = [];
      let myData = new Date()
      this.model.uploadDate = myData.toLocaleDateString()
      this.model.uploadUserId = this.$store.getters.userInfo.id
      this.visible = true
    },
    edit(record) {
      this.model = Object.assign({}, record)
      this.visible = true
    },
    close() {
      this.$refs.form.resetFields()
      this.$emit('close')
      this.visible = false
    },

    handleOk() {
      console.log(this.model)
      let modelData = new Object()
      copyObj(this.model, modelData)
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.method === 'add') {
            modelData.proficiencyCertMainId = uuid('');
            //没有subList
            this.$emit('ok', { method: 'add', modelData: modelData })
          } else if (this.method === 'edit') {
            this.$emit('ok', { method: 'edit', modelData: modelData })
          }
          this.close()
        }
      })

    },
    handleComplete() {
      let temp = this.model.employeeId.split('-')
      this.model.employeeId = temp[0]
      // this.model.apartment = "测试部门01";
    },

    handleCancel() {
      this.close()
    },

  }
}
</script>

<style scoped>
.table {
  width: 100%;
}


.title {
  font-size: 20px;
}

.cert-table {
  margin-top: 30px;
}

</style>