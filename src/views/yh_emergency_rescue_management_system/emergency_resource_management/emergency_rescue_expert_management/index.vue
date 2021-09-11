<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
    <a-form-model layout="inline">
      <a-row :gutter="48">
        <a-col :md="6"
               :sm="24">
      <a-form-model-item label="职务" v-model="queryParam.expertDuty">
        <a-select default-value="11">
          <a-select-option value="11">
            11
          </a-select-option>
          <a-select-option value="22">
            22
          </a-select-option>
        </a-select>
      </a-form-model-item>
        </a-col>
        <a-col :md="6"
               :sm="24">
      <a-form-model-item label="是否为本单位" v-model="queryParam.isCompany">
        <a-select default-value="1">
          <a-select-option value="1">
            是
          </a-select-option>
          <a-select-option value="0">
            否
          </a-select-option>
        </a-select>
      </a-form-model-item>
        </a-col>
        <a-col :md="6"
               :sm="24">
      <a-form-model-item label="姓名">
        <a-input v-model="queryParam.name" placeholder="请输入姓名">

        </a-input>
      </a-form-model-item>
        </a-col>
          <a-col :md="4"
                 :sm="24">
      <a-form-model-item>
        <a-button
          type="primary"
          html-type="submit"
        >
          查询
        </a-button>
      </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    </div>
    <div class="table-operator">
      <a-row>
        <a-button type="primary" @click="handleAdd()">
          添加
        </a-button>
        <a-button type="primary" @click="handleDelete()">
          删除
        </a-button>
        <a-button type="primary">
          导出
        </a-button>
      </a-row>
    </div>

    <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
      <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
      selectedRowKeys.length }}</a>项
      <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      <span style="float:right;">
          <a @click="loadData()"><a-icon type="sync" />刷新</a>
          <a-divider type="vertical" />
        <!--          <a-popover title="自定义列" trigger="click" placement="leftBottom">-->
        <!--            <template slot="content">-->
        <!--              <a-checkbox-group @change="onColSettingsChange" v-model="settingColumns" :defaultValue="settingColumns">-->
        <!--                <a-row style="width: 400px">-->
        <!--                  <template v-for="(item,index) in defColumns">-->
        <!--                    <template v-if="item.key!='rowIndex'&& item.dataIndex!='action'">-->
        <!--                        <a-col :span="12"><a-checkbox :value="item.dataIndex"><j-ellipsis :value="item.title" :length="10"></j-ellipsis></a-checkbox></a-col>-->
        <!--                    </template>-->
        <!--                  </template>-->
        <!--                </a-row>-->
        <!--              </a-checkbox-group>-->
        <!--            </template>-->
        <!--            <a><a-icon type="setting" />设置</a>-->
        <!--          </a-popover>-->
        </span>
    </div>

    <div>
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

        <!--        <div slot="filterDropdown">-->
        <!--          <a-card>-->
        <!--            &lt;!&ndash;            表头第一行&ndash;&gt;-->
        <!--            <a-checkbox-group @change="onColSettingsChange" v-model="settingColumns" :defaultValue="settingColumns">-->
        <!--              <a-row style="width: 400px">-->
        <!--                <template v-for="(item,index) in defColumns">-->
        <!--                  <template v-if="item.key!='rowIndex'&& item.dataIndex!='action'">-->
        <!--                    <a-col :span="12"><a-checkbox :value="item.dataIndex"><j-ellipsis :value="item.title" :length="10"></j-ellipsis></a-checkbox></a-col>-->
        <!--                  </template>-->
        <!--                </template>-->
        <!--              </a-row>-->
        <!--            </a-checkbox-group>-->
        <!--          </a-card>-->
        <!--        </div>-->
        <!--        <a-icon slot="filterIcon" type='setting' :style="{ fontSize:'16px',color:  '#108ee9' }" />-->

        <span slot="action" slot-scope="text, record">
          <a @click="()=>handleCheak(record)">详细 </a>
          <a @click="handleEdit(record)">修改</a>

        </span>

      </a-table>
    </div>

    <modal ref="modalForm" @ok="modalFormOk"></modal>
    <check-modal ref="checkModal"></check-modal>

  </a-card>
</template>

<script>
import STable from '@/components/table/'
import ATextarea from "ant-design-vue/es/input/TextArea"
import AInput from "ant-design-vue/es/input/Input"
import moment from "moment"
import axios from 'axios';
import { getRoleList, getServiceList, getApplicationList } from '@/api/manage'
import { submitApplication, getApproveTask } from '@/api/api'
import {copyObj} from "codemirror/src/util/misc";
import Modal from "./childComponents/Modal";
import CheckModal from "./childComponents/CheckModal";
export default {
  name: "TableList",
  components: {
    AInput,
    ATextarea,
    STable
  },
  data () {
    return {
      toggleSearchStatus:false,
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


      visibleCreateModal: false,
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
      form: null,
      mdl: {},

      // 高级搜索 展开/关闭
      advanced: true,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '职责',
          dataIndex: 'expertDuty'
        },
        {
          title: '姓名',
          dataIndex: 'expertName'
        },
        {
          title: '是否本单位',
          dataIndex: 'isCompany',
          // sorter: true,
          // needTotal: true,
          /* customRender: (text) => text + ' 次' */
        },
        {
          title: '联系方式',
          dataIndex: 'phone',
          // needTotal: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: "center",
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'action'
          }
        }
      ],

      dataSource:[{
        id:1,
        expertDuty:"专家组组长",
        expertName:"张三",
        departName:"保卫科",
        phone:"13811111",
        memo:"备注",
        isCompany:"否",
        uploadFileName:"",
        uploadPerson:"张三",
        uploadTime:"2021-9-11"
      }],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getApplicationList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      },

      selectedRowKeys: [],
      settingColumns:[],
      selectedRows: []
    }
  },
  created () {
    getRoleList({ t: new Date() })
  },

  components:{
    Modal,
    CheckModal
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
      this.$refs.modalForm.title = "编辑物资信息";
      this.$refs.modalForm.method = "edit";
      this.$refs.modalForm.disableSubmit = false;

    },

    handleAdd(){
      this.$refs.modalForm.add();
      this.$refs.modalForm.title = "添加应急物资信息";
      this.$refs.modalForm.method = "add";
      this.$refs.modalForm.disableSubmit = false;
    },

    handleDelete(id){
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(item => item.id !== id);
    },

    handleCheak(record){
      this.$refs.checkModal.check(record);
      this.$refs.checkModal.title = "查看物资信息";
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
          console.log(this.dataSource);
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

  },
  watch: {
    /*
    'selectedRows': function (selectedRows) {
      this.needTotalList = this.needTotalList.map(item => {
        return {
          ...item,
          total: selectedRows.reduce( (sum, val) => {
            return sum + val[item.dataIndex]
          }, 0)
        }
      })
    }
    */
  }
}
</script>