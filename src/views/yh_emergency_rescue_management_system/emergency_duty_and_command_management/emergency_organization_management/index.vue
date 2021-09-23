<template>
  <div>
        <a-card :bordered="false">

          <!--     查询区域 -->
          <div class="table-page-search-wrapper">
            <a-form layout="inline" @keyup.enter.native="searchQuery">

              <a-row :gutter="30">

                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                  <a-form-item label="员工姓名">
                    <j-input placeholder="请输入名称模糊查询" v-model="queryParam.employeeName"></j-input>
                  </a-form-item>
                </a-col>

                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                  <a-form-item label="岗位"  prop="rescuePeopleDuty" hasFeedback >
                    <a-select placeholder="请输入担任的岗位" v-model="dataSource.rescuePeopleDuty">
                      <a-select-option v-for="item in inputData.rescuePeopleDuty" :value="item">
                        {{item}}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>


                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                  <a-form-item label="所属部门"  prop="rescuePeopleDuty" hasFeedback >
                    <a-select placeholder="请选择部门" v-model="dataSource.departId">
                      <a-select-option v-for="item in inputData.apartment" :value="item">
                        {{item}}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                  <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                  <a-button  @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
                </a-col>
              </a-row>
            </a-form>
          </div>

          <!--     操作按钮区域 -->
          <div class="table-operator">
            <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>

            <a-upload name="file" :showUploadList="false" :multiple="false" >
              <a-button type="primary" icon="import">导入</a-button>
            </a-upload>

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
              <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a
              style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
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
              :rowKey="record=>record.serviceBookId"
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
          <check-modal ref="checkModal"></check-modal>
        </a-card>


  </div>

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
      treeData:[
        {
          title: '应急领导小组',
          key: '0-0',
          children: [
            {
              title: '总指挥',
              key: '0-0-1',
              // child: [
              //   { name: 'leaf', key: '0-0-0-0', disableCheckbox: true },
              //   { name: 'leaf', key: '0-0-0-1' },
              // ],
            },
            {
              title: '副总指挥',
              key: '0-0-2',
              // child: [{ key: '0-0-1-0', name: 'zcvc' }],
            },
            {
              title: '成员',
              key: '0-0-3',

            }
          ],
        },
      ],
      inputData: {
        employeeId:["0441-张三","0442-王五","0443-赵四"],
        apartment:["测试部门01","测试部门02","测试部门03","测试部门04"],
        rescuePeopleDuty:["总指挥","副总指挥","成员"]
      },
      queryParam: {},
      /* 数据源 */
      dataSource:[
        {
          id:"1232132",
          rescuePeopleDuty:"总指挥",
          employeeId:"0001",
          employeeName:"张海青",
          departId:"1",
          departName:"指挥部",
          phone:"145713213",
        },
        {
          id:"1232132",
          rescuePeopleDuty:"总指挥",
          employeeId:"0001",
          employeeName:"张海青",
          departId:"1",
          departName:"指挥部",
          phone:"145713213",
        },
        {
          id:"1232132",
          rescuePeopleDuty:"总指挥",
          employeeId:"0001",
          employeeName:"张海青",
          departId:"1",
          departName:"指挥部",
          phone:"145713213",
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
          title: '人员姓名',
          align: "center",
          dataIndex: 'employeeName'
        },
        {
          title: '人员编号',
          align: "center",
          dataIndex: 'employeeId'
        },

        {
          title: '所属部门',
          align: 'center',
          dataIndex: 'departName'
        },
        {
          title: '岗位',
          align: "center",
          dataIndex: 'rescuePeopleDuty'
        },
        {
          title: '电话号码',
          align: "center",
          dataIndex: 'phone'
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
      this.$refs.modalForm.title = "编辑船员服务簿";
      this.$refs.modalForm.method = "edit";
      this.$refs.modalForm.disableSubmit = false;

    },

    handleAdd(){
      this.$refs.modalForm.add();
      this.$refs.modalForm.title = "新增船员服务簿";
      this.$refs.modalForm.method = "add";
      this.$refs.modalForm.disableSubmit = false;
    },

    handleDelete(id){
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(item => item.serviceBookId !== id);
    },

    handleCheak(record){
      this.$refs.checkModal.check(record);
      this.$refs.checkModal.title = "查看船员服务簿";
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

    onSelect(){

    },

    onCheck(){

    }

  }

}
</script>

<style scoped>

</style>