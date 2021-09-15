<template>
  <div>

        <a-modal
      title="添加投诉信息"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      :width="1000"

        >
          <a-row :gutter="24">
            <!--左侧区域-->
            <a-col :md="16" :sm="12">
          <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="complaint_person_name" label="投诉人" prop="complaint_person_name">
          <a-input
            v-model="form.complaint_person_name"
            @blur="
          () => {
            $refs.complaint_person_name.onFieldBlur();
          }
        "
          />
        </a-form-model-item>
        <a-form-model-item label="被投诉部门" prop="complaint_be_depart_id">
          <a-select v-model="form.complaint_be_depart_id" placeholder="请选择投诉类型">
            <a-select-option value="dep1">
              一科室
            </a-select-option>
            <a-select-option value="dep2">
              二科室
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="被投诉人">
          <a-input v-model="form.complaint_be_id" />
        </a-form-model-item>


        <a-form-model-item label="投诉日期" required prop="complaint_time">
          <a-date-picker
            v-model="form.complaint_time"
            show-time
            type="date"
            placeholder="请选择投诉日期"
            style="width: 100%;"
          />

        </a-form-model-item>
        <a-form-model-item label="投诉方式" prop="complaint_type">
          <a-radio-group v-model="form.complaint_type">
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
          <a-input
            v-model="form.complaint_person_contact"
            @blur="
          () => {
            $refs.complaint_person_contact.onFieldBlur();
          }
        "
          />
        </a-form-model-item>
        <a-form-model-item label="投诉内容" prop="complaint_title">
          <a-input v-model="form.complaint_title" type="textarea" :auto-size="{ minRows: 4, maxRows: 6 }"/>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button size="small">
            取消
          </a-button>
          <a-button type="primary" style="margin-left: 10px;"  size="small" @click="onSubmit">
            确定
          </a-button>
        </a-form-model-item>

      </a-form-model>
            </a-col>
            <!--右侧区域-->
            <a-col :md="8" :sm="12">
              <!-- 文件上传 -->
              <a-upload-dragger
                name="file"
                :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                @change="handleChange"
              >
                <p class="ant-upload-drag-icon">
                  <a-icon type="inbox" />
                </p>
                <p class="ant-upload-text">
                  21/5000
                  单击或拖动文件到此区域以上载
                </p>
                <p class="ant-upload-hint">
                  支持单个或批量上传
                </p>
              </a-upload-dragger>
            </a-col>

          </a-row>
    </a-modal>

  </div>
</template>
<script>
  name:'addModal'
  export default {
    data() {
      return {
        visible: false,
        confirmLoading: false,
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
        form: {
          complaint_person_name: '',
          complaint_be_depart_id: undefined,
          complaint_time: undefined,
          complaint_type: [],
          complaint_person_contact: '',
          complaint_title:'',
          complaint_be_id:''
        },
        rules: {
          complaint_person_name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在3-5之间', trigger: 'blur' },
          ],

          complaint_be_depart_id:[
            { required: true, message: '请选择投诉部门', trigger: 'change' }
          ],
          complaint_type: [
            { required: true, message: '请选择投诉方式', trigger: 'change' },
          ],
          complaint_person_contact: [
            { required: true, message: '请输入联系方式', trigger: 'blur' },
            { min: 8, max: 30, message: '长度在8-20之间', trigger: 'blur' },
          ],
          complaint_title: [{ required: true, message: '请输入表格内容', trigger: 'blur' }],
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

      onSubmit() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          this.$message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          this.$message.error(`${info.file.name} file upload failed.`);
        }
      },
    },
  };
</script>