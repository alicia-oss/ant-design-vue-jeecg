<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="12">
            <a-form-item label="考核计划名称">
              <a-input placeholder="请输入考核计划名称" ></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="12">
            <a-form-item label="考核年度">
              <YearPicker  v-model="year" @input="handlerInput"
                          :year-disable="'after'"/>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="12">
            <a-form-item label="考核月份">
              <a-cascader  :options="options_month"
                           placeholder="请选择" @change="onChange"/>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="12">
            <a-form-item label="制定部门">
              <a-cascader :options="options_dep"
                          placeholder="请选择"/>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px">
      <a-button @click="handleModalVisible(true)" type="primary" icon="plus">添加绩效考核计划</a-button>
      <a-button type="primary" icon="delete" @click="batchDel">删除</a-button>
      <j-third-app-button biz-type="user" :selected-row-keys="selectedRowKeys" syncToApp syncToLocal
                          @sync-finally="onSyncFinally" />
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            <a-icon type="delete" @click="batchDel" />
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
      <!--      <j-super-query :fieldList="superQueryFieldList" @handleSuperQuery="handleSuperQuery"/>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!-- 提示所选择的item项   -->
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;<a
        style="font-weight: 600">{{ selectedRowKeys.length }}</a>项&nbsp;&nbsp;
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="testdata"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <template slot="avatarslot" slot-scope="text, record, index">
          <div class="anty-img-wrap">
            <a-avatar shape="square" :src="getAvatarView(record.avatar)" icon="user" />
          </div>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click=" ">发布</a>

          <a-divider type="vertical" />
          <a @click=" ">申请审批</a>

          <a-divider type="vertical" />
          <a @click="handleModalVisible(true)">编辑</a>

          <a-divider type="vertical" />
          <a @click=" ">下载</a>

          <a-divider type="vertical" />
          <a @click=" ">浏览</a>

        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!--  弹窗  -->
    <a-modal destroyOnClose
             :visible="visibleCreateModal"
             :width="1000"
             @ok="handleCreateModalOk"
             @cancel="handleCreateModalCancel">
      <template slot="title">
        <span>
          <Iconfont type="icon-zu" /> 添加绩效考核计划
        </span>
      </template>
      <a-row :gutter="24">
        <!-- 左侧 -->





        <a-col :md="14" :sm="12">

          <a-form style="margin-top: 8px"
                  :form="createForm">
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="考核计划名">
              <a-input placeholder="" class="datepicker1"
                       v-decorator="['qualityTableDescription', {rules:[{ required: true, message: '请输入主题表描述！' }]}]" />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="考核目的">
              <a-input placeholder="" class="datepicker1"
                       v-decorator="['qualityTableDescription', {rules:[{ required: true, message: '请输入主题表描述！' }]}]" />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="考核年度">
              <YearPicker  v-model="year" @input="handlerInput" class="datepicker1"
                           :year-disable="'after'"/>
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="考核月份">
              <a-cascader  :options="options_month" class="datepicker1"
                           placeholder="请选择" @change="onChange"/>
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="制定部门">
              <a-input placeholder="" class="datepicker1"
                       v-decorator="['qualityTableDescription', {rules:[{ required: true, message: '请输入主题表描述！' }]}]" />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="上传人">
              <a-input placeholder="" class="datepicker1"
                       v-decorator="['qualityTableDescription', {rules:[{ required: true, message: '请输入主题表描述！' }]}]" />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="上传时间">
              <a-date-picker class="datepicker1" v-decorator="['date-picker', config]"
                             :default-value="moment('2021-09', 'YYYY-MM')" disabled />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="备注">
              <a-input class="datepicker1" placeholder=""
                       v-decorator="['qualityTableDescription', {rules:[{ required: true, message: '请输入主题表描述！' }]}]" />
            </a-form-item>
          </a-form>
        </a-col>
        <!-- 右侧 -->
        <a-col :md="10" :sm="12">
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
              41/5000
              单击或拖动文件到此区域以上载
            </p>
            <p class="ant-upload-hint">
              支持单个或批量上传
            </p>
          </a-upload-dragger>
        </a-col>
      </a-row>
    </a-modal>


    <user-modal ref="modalForm" @ok="modalFormOk"></user-modal>

    <password-modal ref="passwordmodal" @ok="passwordModalOk"></password-modal>

    <sys-user-agent-modal ref="sysUserAgentModal"></sys-user-agent-modal>

  </a-card>
</template>

<script>
import UserModal from '@/views/system/modules/UserModal'
import PasswordModal from '@/views/system/modules/PasswordModal'
import { putAction, getFileAccessHttpUrl } from '@/api/manage'
import { frozenBatch } from '@/api/api'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import SysUserAgentModal from '@/views/system/modules/SysUserAgentModal'
import JInput from '@/components/jeecg/JInput'
import UserRecycleBinModal from '@/views/system/modules/UserRecycleBinModal'
import JSuperQuery from '@/components/jeecg/JSuperQuery'
import JThirdAppButton from '@/components/jeecgbiz/thirdApp/JThirdAppButton'
import moment from 'moment'
import YearPicker from './modules/YearPicker'

const options_month = [
  {
    value: '1',
    label: '1'
  },
  {
    value: '2',
    label: '2'
  },
  {
    value: '3',
    label: '3'
  },
  {
    value: '4',
    label: '4'
  },
  {
    value: '5',
    label: '5'
  },
  {
    value: '6',
    label: '6'
  },
  {
    value: '7',
    label: '7'
  },
  {
    value: '8',
    label: '8'
  },
  {
    value: '9',
    label: '9'
  },
  {
    value: '10',
    label: '10'
  },
  {
    value: '11',
    label: '11'
  },
  {
    value: '12',
    label: '12'
  }
]
const options_dep = [
  {
    value: '1',
    label: '一部'
  },
  {
    value: '2',
    label: '二部'
  },
  {
    value: '3',
    label: '三部'
  },
  {
    value: '4',
    label: '四部'
  },
  {
    value: '5',
    label: '五部'
  },
  {
    value: '6',
    label: '六部'
  }

]
let date = new Date()
let y = date.getFullYear()


export default {
  name: 'UserList',
  mixins: [JeecgListMixin],
  components: {
    JThirdAppButton,
    SysUserAgentModal,
    UserModal,
    PasswordModal,
    JInput,
    UserRecycleBinModal,
    JSuperQuery,
    YearPicker
  },
  data() {
    return {
      options_month,
      options_dep,
      year: y,
      description: '这是外部文件清单页面',
      visibleCreateModal: false,
      createForm: this.$form.createForm(this, { name: 'createForm' }),
      queryParam: {},
      testdata: [
        {
          ass_name: '考核计划1',
          ass_goal: '安全操作考核',
          ass_start_time: '2021-08-01',
          ass_end_time: '2021-10-01',
          ass_depart: '引航六科',
          ass_note:'',
        },
        {
          ass_name: '考核计划2',
          ass_goal: '安全操作考核',
          ass_start_time: '2021-08-01',
          ass_end_time: '2021-10-01',
          ass_depart: '引航六科',
          ass_note:'',
        },
      ],
      columns: [
        {
          title: '考核计划名',
          align: 'center',
          dataIndex: 'ass_name',
          width: 80,
          sorter: true
        },
        {
          title: '考核目的',
          align: 'center',
          width: 140,
          dataIndex: 'ass_goal'
        },
        {
          title: '考核开始时间',
          align: 'center',
          width: 120,
          dataIndex: 'ass_start_time'
        },

        {
          title: '考核结束时间',
          align: 'center',
          width: 100,
          dataIndex: 'ass_end_time',
          sorter: true
        },
        {
          title: '制定部门',
          align: 'center',
          width: 100,
          dataIndex: 'ass_depart',
          sorter: true
        },
        {
          title: '备注',
          align: 'center',
          width: 100,
          dataIndex: 'ass_note',
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center',
          width: 200
        }
      ],
      superQueryFieldList: [
        { type: 'input', value: 'username', text: '用户账号' },
        { type: 'input', value: 'realname', text: '用户姓名' },
        { type: 'select', value: 'sex', text: '性别', dictCode: 'sex' }
      ],
      url: {
        syncUser: '/act/process/extActProcess/doSyncUser',
        list: '/sys/user/list',
        delete: '/sys/user/delete',
        deleteBatch: '/sys/user/deleteBatch',
        exportXlsUrl: '/sys/user/exportXls',
        importExcelUrl: 'sys/user/importExcel'
      },
      dateFormat: 'YYYY-MM-DD'
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    // 关联文件上传控件
    handleChange(info) {
      const status = info.file.status
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    moment, // 设置时间
    // 设置弹出框是否显示
    handleModalVisible(isVisible) {
      this.visibleCreateModal = isVisible
    },
    handleCreateModalOk() {
      this.createForm.validateFields((err, fieldsValue) => {
        if (err) {
          return
        }
        this.visibleCreateModal = false
        this.$notification['success']({
          message: '添加文件成功',
          duration: 1,
          description: '添加文件'
        })
      })
    },
    handleCreateModalCancel() {
      this.visibleCreateModal = false
    },
    getAvatarView: function(avatar) {
      return getFileAccessHttpUrl(avatar)
    },

    batchFrozen: function(status) {
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning('请选择一条记录！')
        return false
      } else {
        let ids = ''
        let that = this
        let isAdmin = false
        that.selectionRows.forEach(function(row) {
          if (row.username == 'admin') {
            isAdmin = true
          }
        })
        if (isAdmin) {
          that.$message.warning('管理员账号不允许此操作,请重新选择！')
          return
        }
        that.selectedRowKeys.forEach(function(val) {
          ids += val + ','
        })
        that.$confirm({
          title: '确认操作',
          content: '是否' + (status == 1 ? '解冻' : '冻结') + '选中账号?',
          onOk: function() {
            frozenBatch({ ids: ids, status: status }).then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.loadData()
                that.onClearSelected()
              } else {
                that.$message.warning(res.message)
              }
            })
          }
        })
      }
    },
    handleMenuClick(e) {
      if (e.key == 1) {
        this.batchDel()
      } else if (e.key == 2) {
        this.batchFrozen(2)
      } else if (e.key == 3) {
        this.batchFrozen(1)
      }
    },
    handleFrozen: function(id, status, username) {
      let that = this
      //TODO 后台校验管理员角色
      if ('admin' == username) {
        that.$message.warning('管理员账号不允许此操作！')
        return
      }
      frozenBatch({ ids: id, status: status }).then((res) => {
        if (res.success) {
          that.$message.success(res.message)
          that.loadData()
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    handleChangePassword(username) {
      this.$refs.passwordmodal.show(username)
    },
    handleAgentSettings(username) {
      this.$refs.sysUserAgentModal.agentSettings(username)
      this.$refs.sysUserAgentModal.title = '用户代理人设置'
    },
    passwordModalOk() {
      //TODO 密码修改完成 不需要刷新页面，可以把datasource中的数据更新一下
    },
    onSyncFinally({ isToLocal }) {
      // 同步到本地时刷新下数据
      if (isToLocal) {
        this.loadData()
      }
    }
  }

}
</script>

<style scoped>
@import '~@assets/less/common.less';

.datepicker1 {
  width: 330px;
}
</style>