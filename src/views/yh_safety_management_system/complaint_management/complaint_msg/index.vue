<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" >
        <a-row :gutter="24">
          <a-col :md="8" :sm="10">
            <a-form-item label="投诉类型:">
              <a-select default-value="" style="width: 200px">
                <a-select-option value="1">
                  安全问题
                </a-select-option>
                <a-select-option value="2">
                  管理问题
                </a-select-option>
                <a-select-option value="3">
                  设备问题
                </a-select-option>
                <a-select-option value="4">
                  人事问题
                </a-select-option>
              </a-select>
            </a-form-item>

          </a-col>
          <a-col :md="8" :sm="10">
            <a-form-item label="处理状态:">
              <a-select default-value="" style="width: 200px">
                <a-select-option value="1">
                  未处理
                </a-select-option>
                <a-select-option value="2">
                  待处理
                </a-select-option>
                <a-select-option value="3">
                  已处理
                </a-select-option>
              </a-select>
            </a-form-item>

          </a-col>


          <a-col :md="4" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" icon="search">查询</a-button>
              <a-button type="primary" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px">
      <a-button type="primary" icon="delete" @click="addData()">添加</a-button>
      <a-button type="primary" icon="delete" @click="delData()">删除</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay" >
          <a-menu-item key="1">
            <a-icon type="delete" @click="delData()"/>
            删除
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="lock"/>
            导出选中文件清单
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
      <!-- 提示所选择的item项   -->
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项&nbsp;&nbsp;
        <a style="margin-left: 24px">清空</a>
      </div>

      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="testdata"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
       >


        <span slot="action" slot-scope="text, record">
          <a @click="showData()">详细</a>
          <a-divider type="vertical" />
          <a>编辑</a>
          <a-divider type="vertical" />
          <a>下载</a>
          <!--<div :disabled="record.complaint_status=='处理完成'" style="display: inline-block">-->
            <!--<a-divider type="vertical" />-->
            <!--<a >归档</a>-->
          <!--</div>-->
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <a-col offset="20" :span="2">
      <a-button type="primary">
        发送
      </a-button>
    </a-col>

    <a-col offset="0.2" :span="2">
      <a-button type="danger">
        返回
      </a-button>
    </a-col>
<!--ref相当于html里的id-->
    <addModal ref="addModal"></addModal>
    <viewModal ref="viewModal"></viewModal>


  </a-card>
</template>



<script>
  import addModal from './modules/addModal'
  import viewModal from './modules/viewModal'
  export default {
  name: "UserList",
  components:{addModal,viewModal},
  data() {

    return {
      description: '这是投诉信息管理页面',
      visibleCreateModal: false,
      queryParam: {},
      testdata: [
        {
          complaint_id: '001',
          complaint_type: "管理",
          complaint_be_depart_id: '引航六科',
          complaint_title:"管理存在一些问题",
          complaint_time: '2021-01-01',
          complaint_person_name:"牛顿",
          user_id: '阿西莫夫',
          upload_time: '2021-01-02',
          complaint_status: '未处理',
        },
        {
          complaint_id: '002',
          complaint_type: "管理",
          complaint_be_depart_id: '设备部',
          complaint_title:"设备老旧",
          complaint_time: '2021-01-01',
          complaint_person_name:"牛顿",
          user_id: '张三',
          upload_time: '2021-01-02',
          complaint_status: '未处理',
        },
        {
          complaint_id: '003',
          complaint_type: "管理",
          complaint_be_depart_id: '财务部',
          complaint_title:"报销不及时",
          complaint_time: '2021-03-04',
          complaint_person_name:"汪曾祺",
          user_id: '对接部门',
          upload_time: '2021-03-05',
          complaint_status: '处理中',
        },
        {
          complaint_id: '004',
          complaint_type: "管理",
          complaint_be_depart_id: '引航六科',
          complaint_title:"管理存在一些问题",
          complaint_time: '2021-01-01',
          complaint_person_name:"牛顿",
          user_id: '巡查部门',
          upload_time: '2021-01-02',
          complaint_status: '处理完成',
        },
        {
          complaint_id: '005',
          complaint_type: "管理",
          complaint_be_depart_id: '引航六科',
          complaint_title:"管理存在一些问题",
          complaint_time: '2021-01-01',
          complaint_person_name:"牛顿",
          user_id: '引航员吴涛',
          upload_time: '2021-01-02',
          complaint_status: '处理完成',
        },],
      columns: [
        {
          title: '编号',
          align: "center",
          dataIndex: 'complaint_id',
          width: 80,
          sorter: true
        },
        {
          title: '投诉类型',
          align: "center",
          width: 80,
          dataIndex: 'complaint_type'
        },
        {
          title: '被投诉部门',
          align: "center",
          width: 100,
          dataIndex: 'complaint_be_depart_id'
        },
        {
          title: '投诉内容',
          align: "center",
          width: 200,
          dataIndex: 'complaint_title'
        },
        {
          title: '投诉时间',
          align: "center",
          width: 100,
          dataIndex: 'complaint_time',
          // scopedSlots: {customRender: "avatarslot"}
        },
        {
          title: '投诉人/单位',
          align: "center",
          width: 120,
          dataIndex: 'complaint_person_name',
        },

        {
          title: '处理状态',
          align: "center",
          width: 100,
          dataIndex: 'complaint_status'
        },
        {
          title: '填写人',
          align: "center",
          width: 100,
          dataIndex: 'user_id'
        },
        {
          title: '上传时间',
          align: "center",
          width: 90,
          dataIndex: 'upload_time'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: {customRender: 'action'},
          align: "center",
          width: 200
        }
      ],
      dateFormat: 'YYYY-MM-DD',
      selectedRowKeys: []
    }
  },
  methods: {
    start() {
      this.loading = true
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false
        this.selectedRowKeys = []
      }, 1000)
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    delData(){
      if(this.selectedRowKeys.length<=0){
        this.$message.warning("请选择一条记录！");
        return false
      }
      let self=this
      this.$confirm({
        title:'确认删除',
        content:"是否删除选中数据？",
        okText: '确定',
        cancelText: '取消',
        icon: 'exclamation-circle',
        onOk:()=>{
          this.$message.success("批量删除用户成功")
        }
      })
    },
    addData(){
      this.$refs.addModal.showModal()

    },
    showData(){
      this.$refs.viewModal.showModal()

    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }

  }

}
</script>

<style scoped>
@import '~@assets/less/common.less';

</style>