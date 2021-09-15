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
                  处理中
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
          <a @click="viewData()">详细</a>
          <a-divider type="vertical" />
          <a @click="editData()">编辑</a>
          <a-divider type="vertical" />
          <a>下载</a>
          <a-divider type="vertical" />
          <a>归档</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <a-col offset="20" :span="2">
      <a-button v-if="selectedRowKeys.length > 0" type="primary">
        发送
      </a-button>
    </a-col>

    <a-col offset="0.2" :span="2">
      <a-button type="danger">
        返回
      </a-button>
    </a-col>

    <!--ref相当于html里的id-->
    <viewModal ref="viewModal"></viewModal>
    <editModal ref="editModal"></editModal>
  </a-card>
</template>

<script>

  import editModal from './modules/editModal'
  import viewModal from './modules/viewModal'
export default {
  name: "UserList",
  components:{viewModal,editModal},

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
          complaint_verify_result:'属实',
          complaint_status: '处理完成',
          user_id: '阿西莫夫',
          upload_time: '2021-01-02',
          // is_archived:'已归档',
        },
        {
          complaint_id: '001',
          complaint_type: "管理",
          complaint_be_depart_id: '引航六科',
          complaint_title:"管理存在一些问题",
          complaint_time: '2021-01-01',
          complaint_verify_result:'属实',
          complaint_status: '处理完成',
          user_id: '阿西莫夫',
          upload_time: '2021-01-02',
          // is_archived:'已归档',
        },
        {
          complaint_id: '001',
          complaint_type: "管理",
          complaint_be_depart_id: '引航六科',
          complaint_title:"管理存在一些问题",
          complaint_time: '2021-01-01',
          complaint_verify_result:'属实',
          complaint_status: '处理完成',
          user_id: '阿西莫夫',
          upload_time: '2021-01-02',
          // is_archived:'未归档',
        },
        {
          complaint_id: '001',
          complaint_type: "管理",
          complaint_be_depart_id: '引航六科',
          complaint_title:"管理存在一些问题",
          complaint_time: '2021-01-01',
          complaint_verify_result:'属实',
          complaint_status: '处理中',
          user_id: '阿西莫夫',
          upload_time: '2021-01-02',
          // is_archived:'未归档',
        },
        {
          complaint_id: '001',
          complaint_type: "管理",
          complaint_be_depart_id: '引航六科',
          complaint_title:"管理存在一些问题",
          complaint_time: '2021-01-01',
          complaint_verify_result:'属实',
          complaint_status: '处理中',
          user_id: '阿西莫夫',
          upload_time: '2021-01-02',
          // is_archived:'未归档',
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
          title: '核实结果',
          align: "center",
          width: 100,
          dataIndex: 'complaint_verify_result'
        },
        {
          title: '处理情况',
          align: "center",
          width: 100,
          dataIndex: "complaint_status"
        },

        {
          title: '填写人',
          align: "center",
          width: 100,
          dataIndex: 'user_id'
        },
        // {
        //   title: '是否归档',
        //   align: "center",
        //   width: 90,
        //   dataIndex: 'is_archived'
        // },
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
    editData(){
      this.$refs.editModal.showModal()

    },
    viewData(){
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