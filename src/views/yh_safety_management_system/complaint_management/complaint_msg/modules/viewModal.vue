<template>
  <div>

        <a-modal
      title="投诉信息详情"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      :width="800"

        >
          <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="complaint_person_name" label="投诉人" prop="complaint_person_name">
          <a-input
            readOnly="true"
            v-model="form.complaint_person_name"
            @blur="
          () => {
            $refs.complaint_person_name.onFieldBlur();
          }
        "
          />
        </a-form-model-item>
        <a-form-model-item label="被投诉部门" prop="complaint_be_depart_id">

          <a-select v-model="form.complaint_be_depart_id" placeholder="请选择投诉类型" disabled="disabled">
            <a-select-option value="dep1">
              一科室
            </a-select-option>
            <a-select-option value="dep2">
              二科室
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="被投诉人">
          <a-input readonly="readonly" v-model="form.complaint_be_id" />
        </a-form-model-item>


        <a-form-model-item label="投诉日期"  prop="complaint_time">
          <a-date-picker
            disabled="disabled"
            v-model="form.complaint_time"
            show-time
            type="date"
            placeholder="请选择投诉日期"
            style="width: 100%;"
          />

        </a-form-model-item>
        <a-form-model-item label="投诉方式" prop="complaint_type">
          <a-radio-group v-model="form.complaint_type" disabled="disabled" >
            <a-radio value="0">
              电话
            </a-radio>
            <a-radio value="1">
              邮件
            </a-radio>
            <a-radio value="2">
              其他投诉
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item ref="complaint_person_contact" label="联系方式" prop="complaint_person_contact">
          <a-input readOnly="true"
            v-model="form.complaint_person_contact"
            @blur="
          () => {
            $refs.complaint_person_contact.onFieldBlur();
          }
        "
          />
        </a-form-model-item>
        <a-form-model-item label="投诉内容" prop="complaint_title">
          <a-input readOnly="true" v-model="form.complaint_title" type="textarea" :auto-size="{ minRows: 4, maxRows: 6 }" />
        </a-form-model-item>

            <a-form-model-item label="补充文件">
              <span style="display: inline;margin-left: 0;margin-right:20px;padding-left: 10px" title="2021-9-10-投诉详情补充.TXT" class="ant-upload-list-item-name">9.6晚 会议纪要.TXT</span>
              <a-button size="small" type="primary" >
                下载
              </a-button>
            </a-form-model-item>



          </a-form-model>

    </a-modal>

  </div>
</template>
<script>
  name:'lookModal'
  export default {
    data() {
      return {
        visible: false,
        confirmLoading: false,
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
        form: {
          complaint_person_name: '江航',
          complaint_be_depart_id:'一科室',
          complaint_time:"2021-9-8",
          complaint_type:"0",
          complaint_person_contact: '17720564195',
          complaint_title:'安全问题值得注意，有以下两点 1.XXXXXX 2.XXXX',
          complaint_be_id:'王明'
        },

        }
      },

    methods: {
      showModal() {
        this.visible = true;
      },
      handleOk(e) {
        this.visible=false;
      },
      handleCancel(e) {
        console.log('Clicked cancel button');
        this.visible = false;
      },

    },
  };
</script>