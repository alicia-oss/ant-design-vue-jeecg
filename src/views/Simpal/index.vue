<template>
  <a-card :bordered="false">
    <!--     查询区域 -->
    <div class="table-page-search-wrapper">
      <a-row :gutter="30">
        <a-col :span="17">
          <a-form layout="inline" @keyup.enter.native="searchQuery">

            <!--              添加查询框-->
            <a-row :gutter="30">
              <a-col :xl="queryCol.xl" :lg="queryCol.lg" :md="queryCol.md" :sm="queryCol.sm">
                <a-form-item label="员工编号">
                  <j-input placeholder="请输入名称模糊查询" v-model="queryParam.employeeId"></j-input>
                </a-form-item>
              </a-col>

              <a-col :xl="queryCol.xl" :lg="queryCol.lg" :md="queryCol.md" :sm="queryCol.sm">
                <a-form-item label="证书编号">
                  <j-input placeholder="请输入名称模糊查询" v-model="queryParam.certNum"></j-input>
                </a-form-item>
              </a-col>

              <a-col :xl="queryCol.xl" :lg="queryCol.lg" :md="queryCol.md" :sm="queryCol.sm">
                <a-form-item label="部门">
                  <j-input placeholder="请输入名称模糊查询" v-model="queryParam.apartment"></j-input>
                </a-form-item>
              </a-col>


              <template v-if="toggleSearchStatus">

                <a-col :xl="queryCol.xl" :lg="queryCol.lg" :md="queryCol.md" :sm="queryCol.sm">
                  <a-form-item label="签发日期">
                    <a-range-picker v-model="queryParam.issueDate"
                                    format="YYYY-MM-DD"
                                    :placeholder="['开始时间', '结束时间']"
                                    @change="onIssueDateChange" />
                  </a-form-item>
                </a-col>

              </template>

            </a-row>
            <!--            完-->

          </a-form>
        </a-col>

        <a-col :span="7">
           <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-col :xl="queryCol.xl" :lg="queryCol.lg" :md="queryCol.md" :sm="queryCol.sm">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </a-col>
          </span>
        </a-col>
      </a-row>
    </div>

    <!--     操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download">导出</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete" />
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <!--     table区域-begin-->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
          selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        <span style="float:right;">
          <a @click="loadData()"><a-icon type="sync" />刷新</a>
          <a-divider type="vertical" />
            <a-popover title="自定义列" trigger="click" placement="leftBottom">
            <template slot="content">
              <a-checkbox-group @change="onColSettingsChange" v-model="settingColumns" :defaultValue="settingColumns">
                <a-row style="width: 400px">
                  <template v-for="(item,index) in defColumns">
                    <template v-if="item.key!='rowIndex'&& item.dataIndex!='action'">
                        <a-col :span="12"><a-checkbox :value="item.dataIndex"><j-ellipsis :value="item.title" :length="10"></j-ellipsis></a-checkbox></a-col>
                    </template>
                  </template>
                </a-row>
              </a-checkbox-group>
            </template>
            <a><a-icon type="setting" />设置</a>
          </a-popover>

        </span>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="record=>record.id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="()=>handleDetail(record)">详情</a>
                 <a-divider type="vertical" />
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
                      <a-menu-item>
                  <a>下载</a>
              </a-menu-item>

               <a-menu-item>
                  <a>预览</a>
              </a-menu-item>

              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.serviceBookId)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>


      </a-table>
    </div>

    <modal ref="modalForm" @ok="modalFormOk"></modal>


  </a-card>
</template>

<script>

import { ListMixin } from '@comp/yh_components/simpleList/ListMixin'
import Modal from './childComponents/Modal'
import JInput from '@comp/jeecg/JInput'
import { copyObj } from 'codemirror/src/util/misc'
import { initDictOptions } from '@comp/dict/JDictSelectUtil'
import Vue from 'vue'

export default {
  name: 'index.vue',
  mixins: [ListMixin],
  data() {
    return {
      // 列修改
      defColumns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '员工姓名',
          align: 'center',
          dataIndex: 'employeeName'
        },
        {
          title: '员工编号',
          align: 'center',
          dataIndex: 'employeeId'
        },
        {
          title: '证书编号',
          align: 'center',
          dataIndex: 'certNum'
        },
        {
          title: '部门',
          align: 'center',
          dataIndex: 'apartment'
        },
        {
          title: '签发日期',
          align: 'center',
          dataIndex: 'issueDate'
        },

        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'action'
          }
        }
      ],
      columns: [],
      settingColumns: [],
      //导入接口url
      importExcelUrl: `${window._CONFIG['domianURL']}/test/jeecgDemo/importExcel`,
      // 需要修改默认排序方式的请重新isorter
      url: {
        list: "/test/jeecgDemo/list",
        delete: "/test/jeecgDemo/delete",
        deleteBatch: "/test/jeecgDemo/deleteBatch",
        exportXlsUrl: "/test/jeecgDemo/exportXls"
      },
    }
  },
  components: {
    JInput,
    Modal,
  },
  methods: {
    // initDictConfig() {
    //   console.log("--我才是真的方法!--")
    //   //初始化字典 - 性别  根据自己的需要去拿
    //   initDictOptions('sex').then((res) => {
    //     if (res.success) {
    //       this.sexDictOptions = res.result;
    //     }
    //   });
    // },

    handleEdit(record) {
      this.$refs.modalForm.edit(record);
      this.$refs.modalForm.method = "edit";
      this.$refs.modalForm.disableSubmit = false;
      this.$refs.modalForm.title = "编辑船员服务簿";
    },

    handleAdd() {
      this.$refs.modalForm.add();
      this.$refs.modalForm.method = "add";
      this.$refs.modalForm.disableSubmit = false;
      this.$refs.modalForm.title = "新增船员服务簿";
    },

    handleDetail(record) {
      this.$refs.modalForm.method = "check";
      this.$refs.modalForm.edit(record);
      this.$refs.modalForm.disableSubmit = true;
      this.$refs.modalForm.title = "查看船员服务簿";
    },

    //查询参数需要自己设计，去上面的查询框里面改，举例如下
    // onBirthdayChange: function (value, dateString) {
    //   // console.log(dateString[0],dateString[1]);
    //   this.queryParam.birthday_begin=dateString[0];
    //   this.queryParam.birthday_end=dateString[1];
    // },
    onIssueDateChange: function(value, dateString) {
      this.queryParam.issueDate_begin = dateString[0];
      this.queryParam.birthday_end = dateString[1];
    },



  },

}
</script>

<style scoped>

</style>