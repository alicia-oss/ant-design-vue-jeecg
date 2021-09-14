<template>
  <div>
    <a-modal
      :width="900"
      style="padding-bottom: 10px"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >

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
            <text-border >
              <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" >

                <a-form-model-item label="应急信息名称" required prop="emergencyPlanName" hasFeedback>
                  <a-input v-model="model.emergencyPlanName"  :read-only="true"    placeholder="请输入应急预案名称"/>
                </a-form-model-item>


<!--                <a-form-item label='预案种类'>-->
<!--                  <a-input v-model="model.emergencyPlanCategory"  :read-only="true"  />-->
<!--                </a-form-item>-->

                <a-form-model-item label="发生时间" required  prop="specifiedTime" hasFeedback>
                  <a-input v-model="model.specifiedTime"  :read-only="true"  />
                </a-form-model-item>

                <a-form-model-item label="发生地点" required prop="occurSite" hasFeedback>
                  <a-textarea
                    :read-only="true"
                    placeholder="输入发生地点"
                    :auto-size="{ minRows: 2, maxRows: 6 }"
                    v-model="model.occurSite"
                  />
                </a-form-model-item>

                <a-form-model-item label="海况"  prop="seaState" hasFeedback>
                  <a-textarea
                    :read-only="true"
                    placeholder="请输入海况"
                    :auto-size="{ minRows: 2, maxRows: 6 }"
                    v-model="model.seaState"
                  />
                </a-form-model-item>

                <a-form-model-item label="呼号"  required prop="callSign" hasFeedback>
                  <a-input v-model="model.callSign"  :read-only="true"   placeholder="呼号"/>
                </a-form-model-item>

                <a-form-model-item label="事故概况"  prop="accidentOverview" hasFeedback>
                  <a-textarea
                    :read-only="true"
                    placeholder="输入事故概况"
                    :auto-size="{ minRows: 2, maxRows: 6 }"
                    v-model="model.accidentOverview"
                  />
                </a-form-model-item>

                <a-form-item label='国籍'>
                  <a-input v-model="model.nationality"  :read-only="true"   placeholder="国籍"/>
                </a-form-item>

                <a-form-model-item label="起迄港"  prop="port" hasFeedback>
                  <a-input v-model="model.port" :read-only="true"   placeholder="请输入起迄港"/>
                </a-form-model-item>
              </a-form-model>
            </text-border>
          </div>
          <div class="item-right">
            <text-border>
              <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  :model="model" >

                <a-form-model-item label="船舶/设施所有者"  prop="owner" hasFeedback>
                  <a-input v-model="model.owner"  :read-only="true"   placeholder="船舶/设施所有者"/>
                </a-form-model-item>

                <a-form-model-item label="受伤人数"  prop="injury" hasFeedback>
                  <a-input v-model="model.injury"  :read-only="true"  placeholder="请输入受伤人数"/>
                </a-form-model-item>

                <a-form-model-item label="死亡人数"  prop="death" hasFeedback>
                  <a-input v-model="model.death"  :read-only="true"   placeholder="请输入死亡人数"/>
                </a-form-model-item>

                <a-form-model-item label="损害情况"  prop="damage" hasFeedback>
                  <a-textarea
                    :read-only="true"
                    placeholder="输入损害情况"
                    :auto-size="{ minRows: 2, maxRows: 6 }"
                    v-model="model.damage"
                  />
                </a-form-model-item>

                <a-form-model-item label="求助要求"  prop="salvageRequest" hasFeedback>
                  <a-textarea
                    :read-only="true"
                    placeholder="输入求助要求"
                    :auto-size="{ minRows: 2, maxRows: 6 }"
                    v-model="model.salvageRequest"
                  />
                </a-form-model-item>

                <a-form-model-item label="报告人"  prop="reporter" hasFeedback>
                  <a-input v-model="model.reporter" :read-only="true"     placeholder="请输入填写人"/>
                </a-form-model-item>

                <a-form-model-item label="处理状态" required prop="emergencyInfoProcessStatus" hasFeedback>
                  <a-input v-model="model.emergencyInfoProcessStatus" :read-only="true" placeholder="请输入处理状态" />
                </a-form-model-item>

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
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
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
    },

    handleLast(){

    },

    handleNext(){

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

.item-right{
  flex: 1 ;
  height: auto;
}

.title{
  font-size: 20px;
}
</style>