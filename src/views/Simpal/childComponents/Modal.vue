<template>
  <div>
    <a-modal
      :width="800"
      style="padding-bottom: 10px"
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

      <template slot="footer" >
        <div v-if="method!=='check'">
          <a-button style="margin: 10px" key="reset"  @click="handleReset" >
            重置
          </a-button>
          <a-button style="margin: 10px" key="back"  @click="handleCancel" >
            取消
          </a-button>
          <a-button style="margin: 10px" key="submit" type="primary" :loading="loading" @click="handleOk">
            保存
          </a-button>
        </div>

        <div v-else>
          <a-button  style="margin: 10px" key="last"  @click="handleLast" >
            上一条
          </a-button>
          <a-button  style="margin: 10px" key="next"  @click="handleNext" >
            下一条
          </a-button>

          <a-button style="margin: 10px" key="submit" type="primary" :loading="loading" @click="handleCancel">
            关闭
          </a-button>
        </div>
      </template>

      <a-spin :spinning="confirmLoading">
        <div class="table" v-show="method !=='check'">
          <div class="item">
            <text-border title="基本信息">
              <a-form-model ref="formAdd"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">

                <a-form-model-item label="员工编号" required prop="employeeId" hasFeedback>
                  <a-auto-complete
                    :data-source="inputData.employeeId"
                    @change="handleComplete"
                    placeholder="请输入员工编号"
                    v-model="model.employeeId"
                  ></a-auto-complete>

                </a-form-model-item>

                <a-form-model-item label="部门"  prop="apartment" hasFeedback >
                  <!--            <a-input  placeholder="请输入部门"  v-model="model.apartment"/>-->
                  <a-select placeholder="请输入部门" v-model="model.apartment">
                    <a-select-option v-for="item in inputData.apartment" :value="item">
                      {{item}}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>

                <a-form-model-item label="证书编号" required prop="certNum" hasFeedback>
                  <a-input v-model="model.certNum"    placeholder="请输入证书编号"/>
                </a-form-model-item>

                <a-form-model-item label="签发日期"  prop="issueDate" hasFeedback>
                  <a-date-picker style="width: 100%;" valueFormat="YYYY-MM-DD" v-model="model.issueDate" />
                </a-form-model-item>

                <a-form-model-item label="发证机关"  prop="issuingAuthority" hasFeedback >
                  <a-select placeholder="请输入发证机关" v-model="model.issuingAuthority">
                    <a-select-option v-for="item in inputData.issuingAuthority" :value="item">
                      {{item}}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>

                <a-form-model-item label="上传人"  prop="uploadUserId" hasFeedback >
                  <a-input  placeholder="请输入上传人"  v-model="model.uploadUserId" :disabled="true"/>
                </a-form-model-item>

                <a-form-model-item label="上传日期"  prop="uploadDate" hasFeedback >
                  <a-date-picker style="width: 100%;" valueFormat="YYYY-MM-DD" v-model="model.uploadDate" :disabled="true" />
                </a-form-model-item>
              </a-form-model>
            </text-border>
          </div>
          <div class="item" >
            <text-border title="证件上传">
              <a-form-model  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" :rules="validatorRules">
                <file-upload style="width: 100%" v-model="model.uploadFileName"></file-upload>
              </a-form-model>
            </text-border>
          </div>
        </div>
        <div class="table" v-show="method === 'check'" >
          <div class="item">
            <text-border title="基本信息" >
              <a-form-model ref="formCheck"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" >
                <a-form-model-item label="员工编号" required prop="employeeId" hasFeedback>
                  <a-input v-model="model.employeeId"    placeholder="请输入员工编号" :read-only="true"/>
                </a-form-model-item>

                <a-form-model-item label="部门"  prop="apartment" hasFeedback >
                  <a-input  placeholder="请输入部门"  v-model="model.apartment" :read-only="true"/>

                </a-form-model-item>

                <a-form-model-item label="证书编号" required prop="certNum" hasFeedback>
                  <a-input v-model="model.certNum"  placeholder="请输入证书编号" :read-only="true"/>

                </a-form-model-item>

                <a-form-model-item label="签发日期"  prop="issueDate" hasFeedback>
                  <a-input v-model="model.issueDate" :read-only="true"/>

                </a-form-model-item>

                <a-form-model-item label="发证机关"  prop="issuingAuthority" hasFeedback >
                  <a-input  placeholder="请输入发证机关"  v-model="model.issuingAuthority" :read-only="true"/>
                </a-form-model-item>

                <a-form-model-item label="上传人"   prop="uploadUserId" hasFeedback >
                  <a-input  placeholder="请输入上传人"  v-model="model.uploadUserId" :read-only="true"/>
                </a-form-model-item>

                <a-form-model-item label="上传日期"  prop="uploadDate" hasFeedback >
                  <a-input valueFormat="YYYY-MM-DD" v-model="model.uploadDate" :read-only="true" />
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
  </div>
</template>

<script>

import { ModalMixin } from '@comp/yh_components/modal/ModalMixin'

export default {
  name: "Modal",
  mixins:[ModalMixin],
  data () {
    return {

      inputData: {
        employeeId:["张三-0441","王五-0442","赵四-0443"],
        apartment:["测试部门01","测试部门02","测试部门03","测试部门04"],
      },

      validatorRules:{},

      url: {
        add: "/test/jeecgDemo/add",
        edit: "/test/jeecgDemo/edit",
      },
    }
  },

  methods: {

    handleComplete(){
      let tempName = this.model.employeeName;
      let temp = this.model.employeeName.split("-");
      this.model.employeeName = temp[0];
      this.model.employeeId = temp[1];
    },

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