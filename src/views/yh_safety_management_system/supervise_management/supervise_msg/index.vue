<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="12">
            <a-form-item label="督察通告">
              <a-input placeholder="请输入督察通告" v-model="queryParam.username"></a-input>
<!--              <j-input placeholder="输入账号模糊查询" v-model="queryParam.username"></j-input>-->
            </a-form-item>
          </a-col>


          <a-col :md="6" :sm="12">
            <a-form-item label="督察时间">
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
      <a-button @click="handleModalVisible1(true)" type="primary" icon="plus" >添加督察通告</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('用户信息')">导出督察清单</a-button>

      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            <a-icon type="delete" @click="batchDel"/>
            删除
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="lock" @click="batchFrozen('2')"/>
            发布
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
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
          <a @click="handleEdit(record)" >发布</a>
          <a-divider type="vertical" />

          <a @click="handleModalVisible2(true)" >详情查看</a>
          <a-divider type="vertical" />

          <a @click="handleEdit(record)" >删除</a>
        </span>

      </a-table>

    </div>
    <!-- table区域-end -->

    <user-modal ref="modalForm" @ok="modalFormOk"></user-modal>

    <password-modal ref="passwordmodal" @ok="passwordModalOk"></password-modal>

    <sys-user-agent-modal ref="sysUserAgentModal"></sys-user-agent-modal>

    <!--  添加督察通告窗口  -->
    <a-modal destroyOnClose
             :visible="visibleCreateModal1"
             :width="1000"
             @ok="handleCreateModalOk1"
             @cancel="handleCreateModalCancel1">
      <template slot="title">
        <span>
          <Iconfont type="icon-zu" /> 添加督察通告
        </span>
      </template>
      <a-row :gutter="24">
        <!-- 左侧 -->
        <a-col :md="14" :sm="12">
          <a-form style="margin-top: 8px"
                  :form="createForm">
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="督察通告">
              <a-input placeholder="" class="modelwidth"
                       v-decorator="['qualityTableName', {rules:[{ required: true, message: '请输入主题表名称！' }]}]" />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="督察内容">
              <a-textarea
                v-model="value"
                placeholder="Controlled autosize"
                :auto-size="{ minRows: 3}"
              />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="督察负责人">
              <a-input placeholder="" class="modelwidth"
                       v-decorator="['qualityTableName', {rules:[{ required: true, message: '请输入主题表名称！' }]}]" />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="督察组人员">
              <a-input placeholder="" class="modelwidth"
                       v-decorator="['qualityTableName', {rules:[{ required: true, message: '请输入主题表名称！' }]}]" />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="督察开始时间">
              <a-date-picker class="modelwidth" v-decorator="['date-picker', config]" />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="督察结束时间">
              <a-date-picker class="modelwidth" v-decorator="['date-picker', config]" />
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
            @change="handleChangedate"
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

    <!--  督察通告浏览详情页面  -->
    <a-modal destroyOnClose
             :visible="visibleCreateModal2"
             :width="800"
             @ok="handleCreateModalOk2"
             @cancel="handleCreateModalCancel2">
      <template slot="title">
        <span>
          <Iconfont type="icon-zu" /> 督察通告详情
        </span>
      </template>
      <template slot="footer">
        <a-button key="back" @click="handleCreateModalCancel2">
          取消
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleCreateModalOk2">
          确定
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleCreateModalchange2">
          修改
        </a-button>
      </template>
      <a-row :gutter="24">
        <a-col :md="24" :sm="48">
          <a-form style="margin-top: 8px"
                  :form="createForm">
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="督察通告">
              <a-input placeholder="" class="modelwidth" :disabled="alterdisabled"
                       v-decorator="['qualityTableName', {rules:[{ required: true, message: '请输入主题表名称！' }]}]" />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="督察内容">
              <a-textarea :disabled="alterdisabled"
                v-model="value"
                placeholder="Controlled autosize"
                :auto-size="{ minRows: 3}"
              />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="督察结果">
              <a-textarea :disabled="alterdisabled"
                          v-model="value"
                          placeholder="Controlled autosize"
                          :auto-size="{ minRows: 3}"
              />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="督察负责人">
              <a-input placeholder="" class="modelwidth" :disabled="alterdisabled"
                       v-decorator="['qualityTableName', {rules:[{ required: true, message: '请输入主题表名称！' }]}]" />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="督察组人员">
              <a-input placeholder="" class="modelwidth" :disabled="alterdisabled"
                       v-decorator="['qualityTableName', {rules:[{ required: true, message: '请输入主题表名称！' }]}]" />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="督察开始时间">
              <a-date-picker :disabled="alterdisabled" class="modelwidth" v-decorator="['date-picker', config]" />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="督察结束时间">
              <a-date-picker  :disabled="alterdisabled" class="modelwidth" v-decorator="['date-picker', config]" />
            </a-form-item>
            <a-form-item :labelCol="{ span: 5 }"
                         :wrapperCol="{ span: 15 }"
                         label="相关文件">
              <a-upload :disabled="alterdisabled"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :default-file-list="defaultFileList">
                <a-button> <a-icon type="upload" /> 上传 </a-button>
              </a-upload>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </a-modal>
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
import moment from 'moment'

export default {
  name: "Demo",
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
      description: '这是用户管理页面',
      queryParam: {},
      recycleBinVisible: false,
      visibleCreateModal1: false,
      visibleCreateModal2: false,
      alterdisabled: true,
       // 放表格中的数据
      testdata: [
        {
          supervise_title: '安全督察通知01',
          supervise_start_time: '2021-01-01',
          supervise_end_time: '2021-03-01',
          supervise_result: '整改结果',
          supervise_charge_user: '张三',
          is_release: '已发布',
        },
        {
          supervise_title: '安全督察通知01',
          supervise_start_time: '2021-01-01',
          supervise_end_time: '2021-03-01',
          supervise_result: '整改结果',
          supervise_charge_user: '张三',
          is_release: '已发布',
        },

      ],
      // 表格的表头
      columns: [
        {
          title: '督察通告',
          align: "center",
          dataIndex: 'supervise_title',
          width: 120,
          sorter: true
        },
        {
          title: '督察开始时间',
          align: "center",
          width: 100,
          dataIndex: 'supervise_start_time'
        },
        {
          title: '督察结束时间',
          align: "center",
          width: 100,
          dataIndex: 'supervise_end_time'
        },
        {
          title: '督察结果',
          align: "center",
          width: 80,
          dataIndex: 'supervise_result'
        },
        {
          title: '督察负责人',
          align: "center",
          width: 80,
          dataIndex: 'supervise_charge_user',
          sorter: true
        },

        {
          title: '是否发布',
          align: "center",
          width: 80,
          dataIndex: 'is_release'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: {customRender: 'action'},
          align: "center",
          width: 170
        }

      ],
      // 上传文件的已有文件
      defaultFileList: [
        {
          uid: '1',
          name: 'xxx.png',
          status: 'done',
          response: 'Server Error 500', // custom error message to show
          url: 'http://www.baidu.com/xxx.png',
        },
        {
          uid: '2',
          name: 'yyy.png',
          status: 'done',
          url: 'http://www.baidu.com/yyy.png',
        },
        {
          uid: '3',
          name: 'zzz.png',
          status: 'error',
          response: 'Server Error 500', // custom error message to show
          url: 'http://www.baidu.com/zzz.png',
        },
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
    handleChangedate({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
    moment, // 设置时间
    // 弹出框相关方法
    // 设置弹出框是否显示
    handleModalVisible1 (isVisible) {
      this.visibleCreateModal1 = isVisible;
    },
    handleCreateModalOk1 () {
      this.createForm.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }
        this.visibleCreateModal1 = false;
        this.$notification['success']({
          message: '添加文件成功',
          duration: 1,
          description: '添加文件'
        });
      })
    },
    handleCreateModalCancel1 () {
      this.visibleCreateModal1 = false;
    },

    handleModalVisible2 (isVisible) {
      this.visibleCreateModal2 = isVisible;
      this.alterdisabled = false;
    },
    handleCreateModalOk2 () {
      this.createForm.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }
        this.visibleCreateModal2 = false;
        this.$notification['success']({
          message: '添加文件成功',
          duration: 1,
          description: '添加文件'
        });
      })
    },
    handleCreateModalCancel2 () {
      this.visibleCreateModal2 = false;
    },
    handleCreateModalchange2(){
      this.alterdisabled = false;
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
@import '~@assets/less/common.less'
.modelwidth {
  width: 330px;
}
</style>