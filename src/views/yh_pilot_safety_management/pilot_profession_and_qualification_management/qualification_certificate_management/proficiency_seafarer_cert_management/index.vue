<template>
  <div>
  <a-card :bordered="false" class="item">

    <!--     查询区域 -->
    <div class="table-page-search-wrapper">
      <a-row :gutter="30">
        <a-col :span="18">
          <a-form layout="inline" @keyup.enter.native="searchQuery">
            <a-row :gutter="30">
              <a-col :xl="8" :lg="9" :md="10" :sm="24">
                <a-form-item label="员工名称">
                  <j-input placeholder="请输入名称模糊查询" v-model="queryParam.employeeName"></j-input>
                </a-form-item>
              </a-col>

              <a-col :xl="8" :lg="9" :md="10" :sm="24">
                <a-form-item label="证书编号">
                  <j-input placeholder="请输入证书编号模糊查询" v-model="queryParam.certNum"></j-input>
                </a-form-item>
              </a-col>

              <a-col :xl="8" :lg="9" :md="10" :sm="24">
                <a-form-item label="签发机关">
                  <j-input placeholder="请输入签发机关名称模糊查询" v-model="queryParam.issuingAuthority"></j-input>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>

        <a-col :span="6">
           <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button  @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
<!--              <a @click="handleToggleSearch" style="margin-left: 8px">-->
<!--                {{ toggleSearchStatus ? '收起' : '展开' }}-->
<!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
<!--              </a>-->
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

    <div class="ant-alert ant-alert-info" style="margin-bottom: -25px;">
      <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        checkedKeys.length }}</a>项
      <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      <span style="float:right;">
          <a @click="loadData()"><a-icon type="sync" />刷新</a>
          <a-divider type="vertical" />
           <i class="anticon anticon-info-circle ant-alert-icon"></i> 共 <a style="font-weight: 600">{{
          dataSource.length }}</a>项
        </span>
    </div>

  </a-card>
    <a-row  class="table">

        <a-card :bordered="false"  class="item tree">
          <template slot="title" >
            <div style="font-size: 20px">列表</div>
          </template>
          <div style="height: 100%">
        <a-tree
                :showLine="true"
          checkable
          :checkedKeys="checkedKeys"
          :autoExpandParent="true"
          :tree-data="treeData"
          @select="onTreeSelect"
          @check="onTreeCheck"
        >
          <template #title="{ key: treeKey, title }">
            <a-dropdown :trigger="['contextmenu']">
              <span>{{ title }}</span>
              <template #overlay>
                <a-menu @click="({ key: menuKey }) => onContextMenuClick(treeKey, menuKey)">

                  <a-menu-item key="1">删除</a-menu-item>
                  <a-menu-item key="2">查看</a-menu-item>

                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </a-tree>
          </div>
        </a-card>

        <a-card :bordered="false" class="item detail">
          <template slot="title">
            <div style="font-size: 20px;">
              <a-icon type="form" style="color: #1890ff;margin-right: 10px"></a-icon>合格证详情
              <a-button v-if="selectedKeys.length !== 0" style="margin-left: 80%" type="primary" @click="handleEdit(dataSource[0])">编辑</a-button>
            </div>
          </template>

        <info-table v-if="selectedKeys.length !== 0" ref="infoTable" :model="dataSource[0]"></info-table>
          <a-empty v-else></a-empty>
        </a-card>

    </a-row>

    <!-- 表单区域 -->
    <modal ref="modalForm" @ok="modalFormOk"></modal>




  </div>
</template>

<script>
import Modal from './childComponents/Modal'
import { copyObj } from 'codemirror/src/util/misc'
import CheckModal from './childComponents/CheckModal'
import SubTable  from './childComponents/SubTable'
import InfoTable from './childComponents/InfoTable'


export default {
  name: 'index.vue',
  data(){
    return{
      //控制只有一个展开项
      expendedKeys:[],
      checkedKeys:[],
      selectedKeys:[],
      treeData:[
        {
          title:"合格证列表",
          key:'0-0',
          children: [
            {
              title:'海清风',
              key:'0-0-1'
            },
            {
              title:'海起飞',
              key:'0-0-2'
            },
            {
              title:'海清风',
              key:'0-0-3'
            },
            {
              title:'海清风',
              key:'0-0-4'
            }

          ]
        },

      ],


      selectedRowKeys:[],
      /* 查询条件-请不要在queryParam中声明非字符串值的属性 */
      queryParam: {},
      /* 数据源 */
      dataSource:[
        {
          proficiencyCertMainId:"123213",
          employeeId:"1",
          employeeName:"海清风",
          certNum:"0001",
          issuingAuthority:"海事局",
          uploadFileName:"",
          uploadUserId:"",
          uploadDate:"",
          subList:[],
        },
        {
          proficiencyCertMainId:"123214",
          employeeId:"2",
          certNum:"0002",
          issuingAuthority:"海事局",
          uploadFileName:"",
          uploadUserId:"",
          uploadDate:"",
          subList:[
            // {
            //   proficiencyCertSubId:"",
            //   proficiencyCertMainId:"",
            //   certProficiencyCate:"",
            //   clause:"",
            //   issueDate:"",
            //   validity:""
            // }
          ]
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

      //


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
          title: '员工编号',
          align: "center",
          dataIndex: 'employeeId'
        },
        {
          title: '证书编号',
          align: "center",
          dataIndex: 'certNum'
        },
        {
          title: '发证机关',
          align: "center",
          dataIndex: 'issuingAuthority'
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
    CheckModal,
    SubTable,
    InfoTable
  },
  methods:{
    //搜索方法
    searchQuery(){

    },

    loadData(){

    },

    //点击展开图标触发
    onTreeExpand(expandedKeys) {
      console.log('onExpand', expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },


    onTreeCheck(checkedKeys) {
      console.log('onCheck', checkedKeys);
      this.checkedKeys = checkedKeys;
    },


    onTreeSelect(selectedKeys, info) {
      this.selectedKeys = selectedKeys;
      // this.$refs.infoTable.check(this.dataSource[0]);

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
      this.$refs.modalForm.title = "编辑引航员健康证";
      this.$refs.modalForm.method = "edit";
      this.$refs.modalForm.disableSubmit = false;
    },

    handleAdd(){
      this.$refs.modalForm.add();
      this.$refs.modalForm.title = "新增引航员健康证";
      this.$refs.modalForm.method = "add";
      this.$refs.modalForm.disableSubmit = false;
    },

    handleDelete(id){
      console.log(id);
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(item => item.proficiencyCertMainId !== id);
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
        const target = dataSource.find(item => item.proficiencyCertMainId === data.modelData.proficiencyCertMainId);
        if (target) {
          copyObj(data.modelData,target);
          this.dataSource = dataSource;
          console.log(this.dataSource);
        }
      }
    },

    // 鼠标右键菜单
    onContextMenuClick(treeKey, menuKey){

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

  }

}
</script>

<style scoped>

.table{
  display: flex ;
}

.tree{
  flex: 1 auto;
  box-sizing: border-box;
  margin-right: 4px;
  margin-top: 7px;
}

/*.item{*/
/*  padding: 10px 24px !important;*/
/*}*/

.detail{
  flex: 10 auto;
  box-sizing: border-box;
  margin-left: 4px;
  margin-top: 7px;
}


</style>