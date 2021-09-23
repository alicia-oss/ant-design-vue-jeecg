<template>
  <a-card :bordered="false">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="事故统计">
        <div class="table-page-search-wrapper">
          <a-row :gutter="30">
            <a-col :span="18">
              <a-form layout="inline" @keyup.enter.native="searchQuery">
                <a-row :gutter="30">

                  <a-col :xl="8" :lg="9" :md="10" :sm="24">
                    <a-form-item label="事故名称">
                      <j-input placeholder="请输入名称模糊查询" v-model="queryParam.accidentName"></j-input>
                    </a-form-item>
                  </a-col>

                  <a-col :xl="8" :lg="9" :md="10" :sm="24">
                    <a-form-item label="发生时间">
                      <a-range-picker v-model="queryParam.occurTime"
                                      format="YYYY-MM-DD"
                                      :placeholder="['开始时间', '结束时间']"
                                      @change="onIssueDateChange" />
                    </a-form-item>
                  </a-col>

                  <a-col :xl="8" :lg="9" :md="10" :sm="24">
                    <a-form-item label="事故严重等级">
                      <a-select placeholder="请选择事故严重等级" v-model="queryParam.accidentSevereDegree">
                        <a-select-option v-for="item in inputData.accidentSevereDegree" :value="item">
                          {{item}}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>

                  <template v-if="toggleSearchStatus">
                    <a-col :xl="8" :lg="9" :md="10" :sm="24">
                      <a-form-item label='事故类别'>
                        <a-select placeholder="请选择事故类别" v-model="queryParam.accidentCategory">
                          <a-select-option v-for="item in inputData.accidentCategory" :value="item">
                            {{item}}
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>

                  </template>


                </a-row>
              </a-form>
            </a-col>

            <a-col :span="6">
           <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button  @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </a-col>
          </span>

            </a-col>

          </a-row>
        </div>

        <!--     操作按钮区域 -->
        <div class="table-operator">
          <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
          <!--      <a-button type="primary" icon="plus" @click="jump">创建单据</a-button>-->
          <!--      <a-button type="primary" icon="plus" @click="onetomany">一对多</a-button>-->
<!--          <a-button type="primary" icon="download" >导出</a-button>-->
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

        <!--     table区域-begin-->
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
            :rowKey="record=>record.accidentInvestigationId"
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
                <a>浏览</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.accidentInvestigationId)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
               <a-menu-item>
                  <a>下载</a>
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
      </a-tab-pane>

      <a-tab-pane key="2" tab="分析报表" force-render>
        <div class="table">
          <div class="item">
            <bar title="近四年每年发生事故数量"></bar>
          </div>
          <div class="item">
            <div>
              <a-select placeholder="请选择年份" style="width: 50%;">
                <a-select-option v-for="item in inputData.year" :value="item">
                  {{item}}
                </a-select-option>
              </a-select>
            </div>
            <div>
              <pie title="各级别事故占比"></pie>
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
import Pie from './modules/Pie'
import Bar from './modules/Bar'

import Modal from './childComponents/Modal'
import { copyObj } from 'codemirror/src/util/misc'
import CheckModal from './childComponents/CheckModal'

export default {
  name: 'complaint_analysis',
  components: {
    Pie,
    Bar,
    Modal,
    CheckModal
  },
  data() {
    return {
      selectedRowKeys:[],
      /* 查询条件-请不要在queryParam中声明非字符串值的属性 */
      queryParam: {},
      /* 数据源 */
      inputData:{
        year:['2021','2020','2019','2018'],
        accidentCategory:["碰撞事故" , "搁浅事故", "触礁事故", "浪损事故", "火灾、爆炸事故"
          , "风灾事故", "沉没事故", "操作性污染事故", "在航行中发生影响适航性能的机件或重要属具的损坏或灭失", "搁浅事故"
          , "引航员登/离轮坠落伤害", "其他引起人员伤亡、直接经济损失或者水域环境污染的水上交通事故", "对水上人命安全、水域环境构成威胁的险情"] ,
        accidentSevereDegree:["特别重大事故","重大事故","较大事故","一般事故","小事故"]
      }
      ,
      dataSource:[
        {
          accidentInvestigationId:"00001",
          accidentName:"青岛港船舶碰撞事故",
          occurTime:"2020-9-10",
          accidentCategory:"碰撞事故",
          accidentSevereDegree:"较大事故",
          economicLoss:"5",
          uploadFileName:"",
          uploadPerson:"张三",
          uploadTime:"2021-9-10"
        },
        {
          accidentInvestigationId:"00002",
          accidentName:"青岛港船舶搁浅事故",
          occurTime:"2019-9-10",
          accidentCategory:"搁浅事故",
          accidentSevereDegree:"一般事故",
          economicLoss:"1",
          uploadFileName:"",
          uploadPerson:"李四",
          uploadTime:"2021-9-10"
        },
        {
          accidentInvestigationId:"00003",
          accidentName:"青岛港船舶触礁事故",
          occurTime:"2021-9-10",
          accidentCategory:"触礁事故",
          accidentSevereDegree:"重大事故",
          economicLoss:"10",
          uploadFileName:"",
          uploadPerson:"王五",
          uploadTime:"2021-9-10"
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
          title: '事故名称',
          align: "center",
          dataIndex: 'accidentName'
        },

        {
          title: '发生时间',
          align: 'center',
          dataIndex: 'occurTime'
        },
        {
          title: '事故类别',
          align: "center",
          dataIndex: 'accidentCategory'
        },
        {
          title: '事故严重等级',
          align: "center",
          dataIndex: 'accidentSevereDegree'
        },
        {
          title: '经济损失（万元）',
          align: "center",
          dataIndex: 'economicLoss'
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
  created() {
  },
  methods: {
    handlePublish(record){


    },
    //搜索方法
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
      this.$refs.modalForm.title = "编辑事故调查情况";
      this.$refs.modalForm.method = "edit";
      this.$refs.modalForm.disableSubmit = false;

    },

    handleAdd(){
      this.$refs.modalForm.add();
      this.$refs.modalForm.title = "新增事故调查情况";
      this.$refs.modalForm.method = "add";
      this.$refs.modalForm.disableSubmit = false;
    },

    handleDelete(id){
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(item => item.accidentInvestigationId !== id);
    },

    handleCheak(record){
      this.$refs.checkModal.check(record);
      this.$refs.checkModal.title = "查看事故调查情况";
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
.table{
  display: flex;
}

.item{
  flex: 1;
}
</style>
