<template>
  <a-card :bordered="false">

    <!-- 操作按钮区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="30">
          <a-col :xl="6" :lg="9" :md="10" :sm="24">
            <a-form-item label="应急预案类型">
              <a-select placeholder="请选择应急预案类型" @select="()=>{this.show = true}" v-model="queryParam.emergencyPlanCategory">
                <a-select-option v-for="item in inputData.emergencyPlanCategory" :readOnly="disableSubmit" :value="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>


          <a-col :xl="4" :lg="9" :md="10" :sm="24">
            <a-button @click="handleAdd" type="primary" icon="plus">创建应急预案评审标准</a-button>
          </a-col>

          <a-col :xl="4" :lg="9" :md="10" :sm="24" v-show="show">
            <a-button @click="handleAddSub" type="primary"   icon="plus">新增应急预案评审指标</a-button>
            <a-button
              @click="batchDel"
              v-if="selectedRowKeys.length > 0"
              ghost
              type="primary"
              icon="delete">批量删除
            </a-button>
          </a-col>
        </a-row>


      </a-form>
    </div>

    <!-- table区域-begin -->
    <div>

      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;<a style="font-weight: 600">{{
          selectedRowKeys.length }}</a>项&nbsp;&nbsp;
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        v-show="show"
        :key="record=>record.planReviewDetailId"
        :columns="columns"
        size="middle"
        :indentSize="50"
        :pagination="false"
        :dataSource="dataSource"
        :loading="loading"
        :expandedRowKeys="expandedRowKeys"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @expandedRowsChange="handleExpandedRowsChange">


        <span slot="action" slot-scope="text, record">

          <a href="javascript:;" @click="handleDetail(record)">详情</a>
        <a-divider type="vertical"/>
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多 <a-icon type="down"/>
            </a>
            <a-menu slot="overlay">

              <a-menu-item>
                <a href="javascript:;" @click="handleAddSub(record)">添加下级</a>
              </a-menu-item>

              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
        <!-- 字符串超长截取省略号显示 -->
        <span slot="contentAndRequirement" slot-scope="text">
          <j-ellipsis :value="text" :length="35"/>
        </span>
        <!-- 字符串超长截取省略号显示-->

      </a-table>

    </div>
    <!-- table区域-end -->

    <permission-modal ref="modalForm" @ok="modalFormOk"></permission-modal>
<!--    <permission-data-rule-list ref="PermissionDataRuleList" @ok="modalFormOk"></permission-data-rule-list>-->

  </a-card>
</template>

<script>
import PermissionModal from './modules/PermissionModal'
import { getPermissionList } from '@/api/api'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import PermissionDataRuleList from './PermissionDataRuleList'
import JEllipsis from '@/components/jeecg/JEllipsis'
import { copyObj } from 'codemirror/src/util/misc'

const columns = [

  {
    title: '评审内容',
    dataIndex: 'contentAndRequirement',
    key: 'contentAndRequirement',
    scopedSlots: { customRender: 'contentAndRequirement' }
  },
  {
    title: '排序',
    dataIndex: 'seriaNum',
    key: 'seriaNum',
    align: "center",
    width:"90px",
  },

  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    scopedSlots: { customRender: 'action' },
    align: 'center',

  }
]

export default {
  name: 'index',

  // mixins: [JeecgListMixin],
  components: {
    // PermissionDataRuleList,
    PermissionModal,
    JEllipsis
  },
  data() {
    return {
      show:false,
      inputData:{
        emergencyPlanCategory:['综合应急预案', '专项应急预案' , '现场处置方案']
      },
      selectedRowKeys:[],
      /* 查询条件-请不要在queryParam中声明非字符串值的属性 */
      queryParam: {},
      cateSource:['综合应急预案', '专项应急预案' , '现场处置方案'],
      dataSource:[
        {
          // planReviewId:'',
          // emergencyPlanCategory:'综合应急预案',
          // establishmentTime:'',
          planReviewDetailId:'1',
          planReviewId:'333',
          fatherReviewId:"-1",
          contentAndRequirement:'港口用火安全准则',
          seriaNum:'1',
          children:[
            {
              planReviewDetailId:'1.1',
              planReviewId:'333',
              fatherReviewId:"1",
              contentAndRequirement:'港口TC-208用火限制及方法',
              seriaNum:'1.1',
            },
            {
              planReviewDetailId:'1.2',
              planReviewId:'333',
              fatherReviewId:"1",
              contentAndRequirement:'港口TC-818用火限制及方法',
              seriaNum:'1.1',
            },
            {
              planReviewDetailId:'1.3',
              planReviewId:'333',
              fatherReviewId:"1",
              contentAndRequirement:'港口TG-208用火限制及方法',
              seriaNum:'1.1',
            },

          ]
        }
      ],
      description: '预案标准制定',
      // 表头
      columns: columns,
      loading: false,
      // 展开的行，受控属性
      expandedRowKeys: [],
      url: {
        list: '/sys/permission/list',
        delete: '/sys/permission/delete',
        deleteBatch: '/sys/permission/deleteBatch'
      }
    }
  },
  methods: {
    onSelectChange(selectedRowKeys, selectionRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectionRows = selectionRows;
    },
    // 打开数据规则编辑
    handleDataRule(record) {
      // this.$refs.PermissionDataRuleList.edit(record)
    },
    handleAddSub(record) {
      this.$refs.modalForm.title = "添加指标";
      this.$refs.modalForm.disableSubmit = false;
      this.$refs.modalForm.edit({status:'1',permsType:'1',route:true,'fatherReviewId':record.planReviewDetailId,menuType:1});
    },

    searchQuery(){

    },

    handleExpandedRowsChange(expandedRows) {
      this.expandedRowKeys = expandedRows
    },

    handleEdit(record){
      this.$refs.modalForm.edit(record);
      this.$refs.modalForm.title = "编辑指标";
      this.$refs.modalForm.method = "edit";
      this.$refs.modalForm.disableSubmit = false;
    },
    batchDel(){

    },
    onClearSelected() {
      this.selectedRowKeys = [];
      this.selectionRows = [];
    },
    handleAdd(){
      this.$refs.modalForm.add();
      this.$refs.modalForm.method="add"
      this.$refs.modalForm.title = "创建应急预案评审标准";
      this.$refs.modalForm.disableSubmit = false;
    },

    handleDelete(id){
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(item => item.serviceBookId !== id);
    },

    handleDetail(record){
      this.$refs.modalForm.method="check"
      this.$refs.modalForm.edit(record);
      this.$refs.modalForm.title = "查看指标";
      this.$refs.modalForm.disableSubmit = true;
    },

    modalFormOk(data){
      if(data.method === "add"){
        this.dataSource.push(data.modelData);
      }
      else if(data.method === "edit") {
        const dataSource = [...this.dataSource];
        const target = dataSource.find(item => item.serviceBookId === data.modelData.serviceBookId);
        if (target) {
          copyObj(data.modelData,target);
          this.dataSource = dataSource;
        }
      }
    },
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>