<template>
  <a-card :bordered="false">

    <!--     查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="30">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="投诉搜索">
              <j-input placeholder="请输入关键字查询"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="被投诉部门:">
              <a-select default-value="">
                <a-select-option value="1">
                  部门1
                </a-select-option>
                <a-select-option value="2">
                  部门2
                </a-select-option>
                <a-select-option value="3">
                  部门3
                </a-select-option>
                <a-select-option value="4">
                  部门4
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="处理状态:">
              <a-select default-value="">
                <a-select-option value="0">
                  未处理
                </a-select-option>
                <a-select-option value="1">
                  正在处理
                </a-select-option>
                <a-select-option value="2">
                  处理完成
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>



          <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button  @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </a-col>
          </span>
        </a-row>
      </a-form>
    </div>

    <!--     操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary" icon="download" >导出</a-button>
      <!-- 高级查询区域 -->
      <!--      <j-super-query :fieldList="fieldList" ref="superQueryModal" @handleSuperQuery="handleSuperQuery"></j-super-query>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>


    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        <span style="float:right;">
          <a @click="loadData()" style="margin-right: 24px"><a-icon type="sync"  />刷新</a>
           <i class="anticon anticon-info-circle ant-alert-icon" ></i> 共 <a style="font-weight: 600">{{
            dataSource.length}}</a>项
          <a-divider type="vertical" />
        </span>
      </div>



      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="record=>record.complaint_id"
        :columns="defColumns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">


        <span slot="action" slot-scope="text, record">
          <a @click="()=>handleCheak(record)">详情</a>
          <a-divider type="vertical"/>
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.complaintId)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
              <a-menu-item>
                归档
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


  </a-card>
</template>

<script>
import Modal from './childComponents/Modal'
import { copyObj } from 'codemirror/src/util/misc'
import CheckModal from './childComponents/CheckModal'
export default {
  name: 'index.vue',
  data(){
    return{
      selectedRowKeys:[],
      /* 查询条件-请不要在queryParam中声明非字符串值的属性 */
      queryParam: {},
      /* 数据源 */
      dataSource:[
        {
          complaintId:'0001',
          complaintBeDepartId: '引航六科',
          complaintTitle:"管理存在一些问题",
          complaintTime: '2021-09-11',
          complaintPersonName:"王行",
          userId: '王行',
          uploadTime: '2021-09-11',
          complaintStatus: '未处理',
          complaintBeId:'谢三',
          complaintType:'电话',
          complaintPersonContact:'83754541',
          uploadFileName:'',
          complaintProcessingId:'001',
          complaintDealTime:'2021-09-12',
          complaintVerifyResult:'属实',
          complaintProcessingVerifyInfo:'经核查，投诉内容属实。',
          complaintProcessingDealInfo:'对管理人员已加强培训',
          isArchived:"归档",
          feedbackUserId:'王明',





        },
        {

          complaintId:'0002',
          complaintBeDepartId: '安技科',
          complaintTitle:"在处理流程中，安技科…",
          complaintTime: '2021-08-30',
          complaintPersonName:"张章",
          userId: '张章',
          uploadTime: '2021-08-31',
          complaintStatus: '正在处理',
          complaintBeId:'无',
          complaintType:'电话',
          complaintPersonContact:'17720564195',
          uploadFileName:'',
          complaintProcessingId:'002',
          complaintDealTime:'2021-09-1',
          complaintVerifyResult:'属实',
          complaintProcessingVerifyInfo:'经核查，投诉内容属实。',
          complaintProcessingDealInfo:'对安技科已加强培训',
          isArchived:"归档",
          feedbackUserId:'王明',

        },
        {

          complaintId:'0003',
          complaintBeDepartId: '引航一科',
          complaintTitle:"组织生活方面，我认为…",
          complaintTime: '2021-08-06',
          complaintPersonName:"吴明",
          userId: '吴明',
          uploadTime: '2021-08-07',
          complaintStatus: '处理完成',
          complaintBeId:'王二',
          complaintType:'邮件',
          complaintPersonContact:'1360289220@qq.com',
          uploadFileName:'',
          complaintProcessingId:'002',
          complaintDealTime:'2021-09-1',
          complaintVerifyResult:'属实',
          complaintProcessingVerifyInfo:'经核查，投诉内容属实。',
          complaintProcessingDealInfo:'对引航一科已加强培训',
          isArchived:"归档",
          feedbackUserId:'王明',

        },

      ],
      /* 分页参数 */
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

      // 默认列
      defColumns: [
        {
          title: '编号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: "center",
          customRender: function (t, r, index) {
            return parseInt(index) + 1;
          }
        },
        {
          title: '被投诉部门',
          align: "center",
          dataIndex: 'complaintBeDepartId',
          width:120,
        },
        {
          title: '投诉内容',
          align: "center",
          dataIndex: 'complaintTitle',
          width:250,
        },

        {
          title: '是否属实',
          align: "center",
          width: 120,
          dataIndex: 'complaintVerifyResult',
        },
        {
          title: '处理日期',
          align: "center",
          width: 120,
          dataIndex: 'complaintDealTime',
        },
        {
          title:"处理详情",
          align: "center",
          width: 250,
          dataIndex: 'complaintProcessingDealInfo'
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

      settingColumns:[],

      toggleSearchStatus:false
    }
  },
  components:{
    Modal,
    CheckModal
  },
  methods:{
    //搜索方法
    searchQuery(){

    },

    loadData(){

    },

    searchReset(){

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
      this.$refs.modalForm.title = "编辑反馈信息";
      this.$refs.modalForm.method = "edit";
      this.$refs.modalForm.disableSubmit = false;

    },

    handleDelete(id){
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(item => item.complaintd !== id);
    },

    handleCheak(record){
      this.$refs.checkModal.check(record);
      this.$refs.checkModal.title = "查看反馈信息";
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
        const target = dataSource.find(item => item.complaintId === data.modelData.complaintId);
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

</style>