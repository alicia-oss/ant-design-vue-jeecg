<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-row :gutter="30">
        <a-col :span="18">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="30">

          <a-col :xl="8" :lg="9" :md="10" :sm="24">
            <a-form-item label="员工编号">
              <j-input placeholder="请输入名称模糊查询" v-model="queryParam.employeeId"></j-input>
            </a-form-item>
          </a-col>

          <a-col :xl="8" :lg="9" :md="10" :sm="24">
            <a-form-item label="证书编号">
              <j-input placeholder="请输入名称模糊查询" v-model="queryParam.certNum"></j-input>
            </a-form-item>
          </a-col>

            <a-col :xl="8" :lg="9" :md="10" :sm="24">
              <a-form-item label="签发日期">
                <a-range-picker v-model="queryParam.issueDate"
                                format="YYYY-MM-DD"
                                :placeholder="['开始时间', '结束时间']"/>
              </a-form-item>
            </a-col>


        </a-row>
      </a-form>
    </a-col>
        <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </a-col>
          </span>
  </a-row>
</div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <!--      <a-button type="primary" icon="plus" @click="jump">创建单据</a-button>-->
      <!--      <a-button type="primary" icon="plus" @click="onetomany">一对多</a-button>-->

      <!-- 高级查询区域 -->
      <!--      <j-super-query :fieldList="fieldList" ref="superQueryModal" @handleSuperQuery="handleSuperQuery"></j-super-query>-->

      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
          <a-menu-item key="2" >
            <a-icon type="download"/>
            导出
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
          selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        <span style="float:right;">
          <a @click="loadData()"><a-icon type="sync" />刷新</a>
          <a-divider type="vertical" />
        </span>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="record=>record.certNum"
        :columns="defColumns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <div slot="filterDropdown">
          <a-card>
            <!--            表头第一行-->
            <a-checkbox-group @change="onColSettingsChange" v-model="settingColumns" :defaultValue="settingColumns">
              <a-row style="width: 400px">
                <template v-for="(item,index) in defColumns">
                  <template v-if="item.key!='rowIndex'&& item.dataIndex!='action'">
                    <a-col :span="12"><a-checkbox :value="item.dataIndex"><j-ellipsis :value="item.title" :length="10"></j-ellipsis></a-checkbox></a-col>
                  </template>
                </template>
              </a-row>
            </a-checkbox-group>
          </a-card>
        </div>
        <a-icon slot="filterIcon" type='setting' :style="{ fontSize:'16px',color:  '#108ee9' }" />

        <span slot="action" slot-scope="text, record">
          <a @click="()=>handleCheak(record)">详情</a>
                 <a-divider type="vertical"/>
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.serviceBookId)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
              <a-menu-item>
                 <a>过往版本</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <modal ref="modalForm" @ok="modalFormOk"></modal>
    <check-modal ref="checkModal"></check-modal>
    <!-- 一对多表单区域 -->
    <!--    <JeecgDemoTabsModal ref="jeecgDemoTabsModal" @ok="modalFormOk"></JeecgDemoTabsModal>-->

  </a-card>
</template>

<script>
  // import JeecgDemoModal from '@/views/jeecg/modules/JeecgDemoModal';
  import JSuperQuery from '@/components/jeecg/JSuperQuery.vue';
  import Modal from './childComponents/Model'
  import CheckModal from './childComponents/CheckModal';
  import JInput from '@/components/jeecg/JInput.vue';
  // import JeecgDemoTabsModal from './modules/JeecgDemoTabsModal'
  import {initDictOptions, filterDictText,filterDictTextByCache} from '@/components/dict/JDictSelectUtil'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import Vue from 'vue'
  import { filterObj } from '@/utils/util';
  import { copyObj } from 'codemirror/src/util/misc'

  //高级查询modal需要参数
  const superQueryFieldList=[
    // {
    //   type: "string",
    //   value: "name",
    //   text: "用户名"
    // }
  ]
  export default {
    name: "index.vue",
    mixins:[JeecgListMixin],
    components: {
      Modal,
      JSuperQuery,
      JInput,
      CheckModal
    },
    data() {
      return {
        description: '单表示例列表',
        //字典数组缓存
        sexDictOptions: [],
        importExcelUrl:`${window._CONFIG['domianURL']}/test/jeecgDemo/importExcel`,
        //表头
        columns:[],
        //列设置
        settingColumns:[],
        ipagination:{
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '20', '30'],
          showTotal: (total, range) => {
            return range[0] + "-" + range[1] + " 共" + total + "条"
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0
        },
        //列定义
        defColumns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '员工姓名',
            align: "center",
            dataIndex: 'employeeName',
            ellipsis: true,
          },
          {
            title: '员工编号',
            align: "center",
            dataIndex: 'employeeId',
            ellipsis: true,
          },
          {
            title: '证书编号',
            align: "center",
            dataIndex: 'certNum',
            ellipsis: true,
          },
          {
            title: '证书等级',
            align: "center",
            dataIndex: 'cert_class',
          },
          // {
          //   title: '性别',
          //   align: "center",
          //   dataIndex: 'sex',
          //   customRender: (text) => {
          //     //字典值替换通用方法
          //     return filterDictTextByCache('sex', text);
          //   }
          // },
          {
            title: '签发日期',
            align: "center",
            dataIndex: 'issueDate'
          },
          {
            title: '有效期至',
            align: "center",
            dataIndex: 'validity'
          },

          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {
              filterDropdown: 'filterDropdown',
              filterIcon: 'filterIcon',
              customRender: 'action'
            },
          }
        ],
        dataSource:[{
          Id:1,
          employeeName:"张三",
          employeeId:'0001',
          certNum:"10000",
          cert_class:"一级",
          issueDate:"2021-9-9",
          validity:"2026-9-9",
          cert_type:"海港引航员",
          pilotage_area:"所有海域",
          pilotage_limit:"无限制",
          upload_user:"王五",
          upload_date:"2021-9-9"
        },
          {
            Id:2,
            employeeName:"李四",
            employeeId:'0002',
            certNum:"10086",
            cert_class:"一级",
            issueDate:"2021-9-11",
            validity:"2026-9-11",
            cert_type:"海港引航员",
            pilotage_area:"所有海域",
            pilotage_limit:"无限制",
            upload_user:"王五",
            upload_date:"2021-9-9"
          },
          {
            Id:3,
            employeeName:"王六",
            employeeId:'0003',
            certNum:"10012",
            cert_class:"二级",
            issueDate:"2021-9-9",
            validity:"2026-9-9",
            cert_type:"海港引航员",
            pilotage_area:"所有海域",
            pilotage_limit:"无限制",
            upload_user:"王五",
            upload_date:"2021-9-9"
          },]
        // url: {
        //   //请求列表数据的地址
        //   list: "/wzh/yhHealthCert/list",
        //   delete: "/wzh/yhHealthCert/delete",
        //   deleteBatch: "/wzh/yhHealthCert/deleteBatch",
        //   exportXlsUrl: "/test/jeecgDemo/exportXls"
        // },
        // fieldList:superQueryFieldList
      }
    },
    methods: {
      searchQuery(){

      },

      loadData(){

      },

      searchReset(){

      },

      onIssueDateChange: function (value, dateString) {
        console.log(dateString[0],dateString[1]);
        this.queryParam.birthday_begin=dateString[0];
        this.queryParam.birthday_end=dateString[1];
      },

      handleToggleSearch(){
        this.toggleSearchStatus = !this.toggleSearchStatus;
      },

      onClearSelected() {
        this.selectedRowKeys = [];
        this.selectionRows = [];
      },

      onColSettingsChange(){

      },

      handleEdit(record){
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑适任证书";
        this.$refs.modalForm.method = "edit";
        this.$refs.modalForm.disableSubmit = false;

      },

      handleAdd(){
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新增适任证书";
        this.$refs.modalForm.method = "add";
        this.$refs.modalForm.disableSubmit = false;
      },

      handleDelete(id){
        const dataSource = [...this.dataSource];
        this.dataSource = dataSource.filter(item => item.certNum !== id);
      },

      handleCheak(record){
        this.$refs.checkModal.check(record);
        this.$refs.checkModal.title = "查看适任证书";
        this.$refs.checkModal.confirmLoading = false;
      },

      batchDel(){

      },

      // 加载数据
      modalFormOk(data){
        if(data.method === "add"){
          this.dataSource.push(data.modelData);
        }
        else if(data.method === "edit") {
          const dataSource = [...this.dataSource];
          const target = dataSource.find(item => item.id === data.modelData.id);
          if (target) {
            copyObj(data.modelData,target);
            this.dataSource = dataSource;
          }
        }
      },

      handleTableChange(pagination, filters, sorter) {
        // //分页、排序、筛选变化时触发
        // //TODO 筛选
        // console.log(pagination)
        // if (Object.keys(sorter).length > 0) {
        //   this.isorter.column = sorter.field;
        //   this.isorter.order = "ascend" == sorter.order ? "asc" : "desc"
        // }
        // this.ipagination = pagination;
        // this.loadData();
      },

      onSelectChange(selectedRowKeys, selectionRows) {
        this.selectedRowKeys = selectedRowKeys;
        this.selectionRows = selectionRows;
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>