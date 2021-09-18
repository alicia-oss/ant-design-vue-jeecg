<template>
  <a-card :bordered="false">

    <!--     查询区域 -->
    <div class="table-page-search-wrapper">
      <a-row :gutter="30">
        <a-col :span="18">
          <a-form layout="inline" @keyup.enter.native="searchQuery">
            <a-row :gutter="30">
              <a-col :xl="8" :lg="9" :md="10" :sm="24">
                <a-form-item label="员工姓名">
                  <j-input placeholder="请输入名称模糊查询" v-model="queryParam.employeeName"></j-input>
                </a-form-item>
              </a-col>

              <a-col :xl="8" :lg="9" :md="10" :sm="24">
                <a-form-item label="证书编号">
                  <j-input placeholder="请输入注册号码模糊查询" v-model="queryParam.certNum"></j-input>
                </a-form-item>
              </a-col>

              <a-col :xl="8" :lg="9" :md="10" :sm="24">
                <a-form-item label="证书种类">
                  <!--              <j-input placeholder="请输入注册号码模糊查询" v-model="queryParam.certNum"></j-input>-->
                  <a-select placeholder="请输入证书种类" v-model="queryParam.certType">
                    <a-select-option v-for="item in certDir" :value="item">
                      {{ item }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>


              <template v-if="toggleSearchStatus">
                <a-col :xl="8" :lg="9" :md="10" :sm="24">
                  <a-form-item label="签发机关">
                    <j-input placeholder="请输入签发机关名称模糊查询" v-model="queryParam.issuingAuthority"></j-input>
                  </a-form-item>
                </a-col>

                <a-col :xl="8" :lg="9" :md="10" :sm="24">
                  <a-form-item label="签发日期">
                    <a-range-picker v-model="queryParam.issueDate"
                                    format="YYYY-MM-DD"
                                    :placeholder="['开始时间', '结束时间']"
                                    @change="onIssueDateChange" />
                  </a-form-item>
                </a-col>

                <a-col :xl="8" :lg="9" :md="10" :sm="24">
                  <a-form-item label="到期时间">
                    <a-range-picker v-model="queryParam.validity"
                                    format="YYYY-MM-DD"
                                    :placeholder="['开始时间', '结束时间']"
                                    @change="onIssueDateChange" />
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
      <a-button type="primary" icon="download" >导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" >

      </a-upload>

      <a-button style="margin-left: 8px"  v-if="selectedRowKeys.length > 0"> 批量提醒
        <a-icon type="bell" style="font-size: 16px;color: skyblue"/>
      </a-button>

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
        :rowKey="record=>record.employeeId"
        :columns="defColumns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="warning">
         <a-icon type="warning" style="color: red;font-size: 20px" />
        </span>

        <span slot="action" slot-scope="text, record">
        <a-switch checked-children="开" un-checked-children="关" default-unchecked />

        </span>

      </a-table>
    </div>
    <!-- table区域-end -->



  </a-card>
</template>

<script>

export default {
  name: 'index.vue',
  data(){
    return{
      selectedRowKeys:[],
      /* 查询条件-请不要在queryParam中声明非字符串值的属性 */
      queryParam: {},
      /* 数据源 */
      certDir:[
        "引航员健康证",
        "船业适任证",
        "熟悉和基本安全培训合格证",
        '精通救生艇筏和救助艇培训合格证',
        '高级消防培训合格证',
        '大型船舶操纵特殊培训合格证'
      ],
      dataSource:[
        {
          certType:"引航员健康证",
          employeeName:"张三",
          employeeId:"4221",
          certNum:"136782678",
          issuingAuthority:"海事局",
          issueDate:"2020-9-10",
          validity:"2021-9-10",
        },
        {
          certType:"熟悉和基本安全培训合格证",
          employeeName:"许海峰",
          employeeId:"4222",
          certNum:"136786238",
          issuingAuthority:"海事局",
          issueDate:"2019-8-10",
          validity:"2021-9-10",
        },
        {
          certType:"引航员健康证",
          employeeName:"李海鹏",
          employeeId:"4223",
          certNum:"136786728",
          issuingAuthority:"海事局",
          issueDate:"2020-9-10",
          validity:"2021-9-10",
        },
        {
          certType:"引航员健康证",
          employeeName:"赵海清",
          employeeId:"4224",
          certNum:"136718678",
          issuingAuthority:"海事局",
          issueDate:"2020-9-10",
          validity:"2021-9-10",
        },
        {
          certType:"引航员健康证",
          employeeName:"张海燕",
          employeeId:"4225",
          certNum:"136783678",
          issuingAuthority:"海事局",
          issueDate:"2020-9-10",
          validity:"2021-9-10",
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
          title: '预警',
          dataIndex: '',
          width: 60,
          align: "center",
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'warning'
          },

        },
        {
          title: '员工姓名',
          align: "center",
          dataIndex: 'employeeName'
        },
        {
          title: '员工编号',
          align: "center",
          dataIndex: 'employeeId'
        },
        {
          title: '证书种类',
          align: "center",
          dataIndex: 'certType'
        },
        {
          title: '证书编号',
          align: "center",
          dataIndex: 'certNum'
        },
        {
          title: '签发机关',
          align: 'center',
          dataIndex: 'issuingAuthority'
        },
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

      settingColumns:[],

      toggleSearchStatus:false
    }
  },
  components:{

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

    batchDel(){

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