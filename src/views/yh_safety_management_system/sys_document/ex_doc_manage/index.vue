<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="12">
            <a-form-item label="发文字号">
              <a-input placeholder="请输入发文字号" v-model="queryParam.username"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="12">
            <a-form-item label="文件名称">
              <a-input placeholder="请输入文件名称" v-model="queryParam.username"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="12">
            <a-form-item label="颁布时间">
              <a-range-picker @change="onChange" />
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
      <a-button @click="handleModalVisible(true)" type="primary" icon="plus" >上传外部文件</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('用户信息')">导出外部文件清单</a-button>
      <a-button type="primary" icon="delete" @click="batchDel">删除</a-button>
      <j-third-app-button biz-type="user" :selected-row-keys="selectedRowKeys" syncToApp syncToLocal @sync-finally="onSyncFinally"/>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            <a-icon type="delete" @click="batchDel"/>
            删除
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="lock" @click="batchFrozen('2')"/>
            导出选中文件清单
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
      <!--      <j-super-query :fieldList="superQueryFieldList" @handleSuperQuery="handleSuperQuery"/>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!-- 提示所选择的item项   -->
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项&nbsp;&nbsp;
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
            <a-avatar shape="square" :src="getAvatarView(record.avatar)" icon="user"/>
          </div>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="" >发布</a>

          <a-divider type="vertical" />
          <a @click="handleModalVisible(true)" >编辑</a>

          <a-divider type="vertical" />
          <a >下载</a>

          <a-divider type="vertical" />
          <a >浏览</a>

        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!--  添加文件弹窗  -->
    <a-modal destroyOnClose
             :visible="visibleCreateModal"
             :width="1000"
             @ok="handleCreateModalOk"
             @cancel="handleCreateModalCancel">
      <template slot="title">
        <span>
          <Iconfont type="icon-zu" /> 上传外部文件
        </span>
      </template>
      <a-row :gutter="24">
        <!-- 左侧 -->
        <a-col :md="14" :sm="12">
          <a-form style="margin-top: 8px"
                  :form="createForm">
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="发文字号">
              <a-input placeholder="" class="datepicker1"
                       v-decorator="['excode', {rules:[{ required: true, message: '请输入主题表名称！' }]}]" />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="文件名称">
              <a-input placeholder="" class="datepicker1"
                       v-decorator="['exname', {rules:[{ required: true, message: '请输入主题表描述！' }]}]" />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="颁布部门">
              <a-input placeholder="" class="datepicker1"
                       v-decorator="['expart', {rules:[{ required: true, message: '请输入主题表描述！' }]}]" />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="颁布时间">
              <a-date-picker class="datepicker1" v-decorator="['exptime', config]" />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="生效/发布时间">
              <a-date-picker class="datepicker1" v-decorator="['exetime', config]" />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="上传人">
              <a-input placeholder="" class="datepicker1"
                       v-decorator="['exuser', {rules:[{ required: true, message: '请输入主题表描述！' }]}]" />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="上传时间">
              <a-date-picker class="datepicker1" v-decorator="['extime', config]" :default-value="moment('2021-09', 'YYYY-MM')" disabled />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="备注">
              <a-input class="datepicker1" placeholder=""
                       v-decorator="['exnote', {rules:[{ required: true, message: '请输入主题表描述！' }]}]" />
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
import {putAction,getFileAccessHttpUrl} from '@/api/manage';
import {frozenBatch} from '@/api/api'
import {JeecgListMixin} from '@/mixins/JeecgListMixin'
import SysUserAgentModal from "@/views/system/modules/SysUserAgentModal";
import JInput from '@/components/jeecg/JInput'
import UserRecycleBinModal from '@/views/system/modules/UserRecycleBinModal'
import JSuperQuery from '@/components/jeecg/JSuperQuery'
import JThirdAppButton from '@/components/jeecgbiz/thirdApp/JThirdAppButton'
import moment from 'moment';

export default {
  name: "UserList",
  mixins: [JeecgListMixin],
  components: {
    JThirdAppButton,
    SysUserAgentModal,
    UserModal,
    PasswordModal,
    JInput,
    UserRecycleBinModal,
    JSuperQuery
  },
  data() {
    return {
      description: '这是外部文件清单页面',
      visibleCreateModal: false,
      createForm: this.$form.createForm(this, { name: 'createForm' }),
      queryParam: {},
      testdata: [
        {
          ex_number: '001',
          ex_name: '文件001',
          ex_depart: '引航6科',
          ex_proclaim_time: '2021-01-01',
          ex_indate: '2021-01-01',
          ex_note: '',
          user_id: 'admin',
          ex_uploadtime: '2021-01-01'
        },
        {
          ex_number: '001',
          ex_name: '文件001',
          ex_depart: '引航6科',
          ex_proclaim_time: '2021-01-01',
          ex_indate: '2021-01-01',
          ex_note: '',
          user_id: 'admin',
          ex_uploadtime: '2021-01-01'
        },
        {
          ex_number: '001',
          ex_name: '文件001',
          ex_depart: '引航6科',
          ex_proclaim_time: '2021-01-01',
          ex_indate: '2021-01-01',
          ex_note: '',
          user_id: 'admin',
          ex_uploadtime: '2021-01-01'
        },
        {
          ex_number: '001',
          ex_name: '文件001',
          ex_depart: '引航6科',
          ex_proclaim_time: '2021-01-01',
          ex_indate: '2021-01-01',
          ex_note: '',
          user_id: 'admin',
          ex_uploadtime: '2021-01-01'
        },],
      columns: [
        /*{
          title: '#',
          dataIndex: '',
          key:'rowIndex',
          width:60,
          align:"center",
          customRender:function (t,r,index) {
            return parseInt(index)+1;
          }
        },*/
        {
          title: '发文字号',
          align: "center",
          dataIndex: 'ex_number',
          width: 80,
          sorter: true
        },
        {
          title: '文件名称',
          align: "center",
          width: 140,
          dataIndex: 'ex_name',
        },
        {
          title: '颁布部门',
          align: "center",
          width: 120,
          dataIndex: 'ex_depart',
          // scopedSlots: {customRender: "avatarslot"}
        },

        {
          title: '颁布时间',
          align: "center",
          width: 100,
          dataIndex: 'ex_proclaim_time',
          sorter: true
        },
        {
          title: '生效/发布时间',
          align: "center",
          width: 100,
          dataIndex: 'ex_indate'
        },
        {
          title: '备注',
          align: "center",
          width: 100,
          dataIndex: 'ex_note'
        },
        {
          title: '上传者',
          align: "center",
          width: 100,
          dataIndex: 'user_id'
        },
        {
          title: '上传时间',
          align: "center",
          width: 100,
          dataIndex: 'ex_uploadtime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: {customRender: 'action'},
          align: "center",
          width: 200
        }
      ],
      superQueryFieldList: [
        { type: 'input', value: 'username', text: '用户账号', },
        { type: 'input', value: 'realname', text: '用户姓名', },
        { type: 'select', value: 'sex', text: '性别', dictCode: 'sex' },
      ],
      url: {
        syncUser: "/act/process/extActProcess/doSyncUser",
        list: "/sys/user/list",
        delete: "/sys/user/delete",
        deleteBatch: "/sys/user/deleteBatch",
        exportXlsUrl: "/sys/user/exportXls",
        importExcelUrl: "sys/user/importExcel",
      },
      dateFormat: 'YYYY-MM-DD',
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
  methods: {
    // 关联文件上传控件
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
    moment, // 设置时间
    // 设置弹出框是否显示
    handleModalVisible (isVisible) {
      this.visibleCreateModal = isVisible;
    },
    handleCreateModalOk () {
      this.createForm.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }
        this.visibleCreateModal = false;
        this.$notification['success']({
          message: '添加文件成功',
          duration: 1,
          description: '添加文件'
        });
      })
    },
    handleCreateModalCancel () {
      this.visibleCreateModal = false;
    },
    getAvatarView: function (avatar) {
      return getFileAccessHttpUrl(avatar)
    },

    batchFrozen: function (status) {
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning('请选择一条记录！');
        return false;
      } else {
        let ids = "";
        let that = this;
        let isAdmin = false;
        that.selectionRows.forEach(function (row) {
          if (row.username == 'admin') {
            isAdmin = true;
          }
        });
        if (isAdmin) {
          that.$message.warning('管理员账号不允许此操作,请重新选择！');
          return;
        }
        that.selectedRowKeys.forEach(function (val) {
          ids += val + ",";
        });
        that.$confirm({
          title: "确认操作",
          content: "是否" + (status == 1 ? "解冻" : "冻结") + "选中账号?",
          onOk: function () {
            frozenBatch({ids: ids, status: status}).then((res) => {
              if (res.success) {
                that.$message.success(res.message);
                that.loadData();
                that.onClearSelected();
              } else {
                that.$message.warning(res.message);
              }
            });
          }
        });
      }
    },
    handleMenuClick(e) {
      if (e.key == 1) {
        this.batchDel();
      } else if (e.key == 2) {
        this.batchFrozen(2);
      } else if (e.key == 3) {
        this.batchFrozen(1);
      }
    },
    handleFrozen: function (id, status, username) {
      let that = this;
      //TODO 后台校验管理员角色
      if ('admin' == username) {
        that.$message.warning('管理员账号不允许此操作！');
        return;
      }
      frozenBatch({ids: id, status: status}).then((res) => {
        if (res.success) {
          that.$message.success(res.message);
          that.loadData();
        } else {
          that.$message.warning(res.message);
        }
      });
    },
    handleChangePassword(username) {
      this.$refs.passwordmodal.show(username);
    },
    handleAgentSettings(username){
      this.$refs.sysUserAgentModal.agentSettings(username);
      this.$refs.sysUserAgentModal.title = "用户代理人设置";
    },
    passwordModalOk() {
      //TODO 密码修改完成 不需要刷新页面，可以把datasource中的数据更新一下
    },
    onSyncFinally({isToLocal}) {
      // 同步到本地时刷新下数据
      if (isToLocal) {
        this.loadData()
      }
    },
  }

}
</script>

<style scoped>
@import '~@assets/less/common.less';
.datepicker1 {
  width: 330px;
}
</style>