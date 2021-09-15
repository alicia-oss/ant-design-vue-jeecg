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
      <a-button type="primary" icon="download" @click="handleExportXls('用户信息')">导出外部文件清单</a-button>
      <j-third-app-button biz-type="user" :selected-row-keys="selectedRowKeys" syncToApp syncToLocal @sync-finally="onSyncFinally"/>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            <a-icon type="lock" @click="batchFrozen('1')"/>
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
          <a >下载</a>

          <a-divider type="vertical" />
          <a >浏览</a>

        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

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
          ex_number: '002',
          ex_name: '文件001',
          ex_depart: '引航6科',
          ex_proclaim_time: '2021-01-01',
          ex_indate: '2021-01-01',
          ex_note: '',
          user_id: 'admin',
          ex_uploadtime: '2021-01-01'
        },
        {
          ex_number: '003',
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
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
  methods: {
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
@import '~@assets/less/common.less'
</style>