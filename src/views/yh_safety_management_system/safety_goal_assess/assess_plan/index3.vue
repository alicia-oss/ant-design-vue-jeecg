<template xmlns:margin-left="http://www.w3.org/1999/xhtml">
  <a-card>
    <div>
      <a-row>
        <div style="margin-bottom:50px;position: relative;">
          <div style="margin-left:20px;position: absolute;left: 0;top:5px;">考核年度:</div>
          <YearPicker style="margin-left:20px;position: absolute;left: 90px;" v-model="year" @input="handlerInput"
                      :year-disable="'after'"/>
          <div style="margin-left:20px;position: absolute;left: 340px;top:5px;">考核月份:</div>
          <a-cascader style="width: 192px;margin-left:20px;position: absolute;left: 410px;" :options="options_month"
                      placeholder="请选择" @change="onChange"/>
          <div style="margin-left:20px;position: absolute;left: 670px;top:5px;">考核部门:</div>
          <a-cascader style="width: 192px;margin-left:20px;position: absolute;left: 740px;" :options="options_dep"
                      placeholder="请选择"/>
          <a-button type="primary" style="width: 64px;margin-left:20px;position: absolute;left: 1050px;">
            查询
          </a-button>
        </div>
      </a-row>

      <a-row>
        <a-col :span="2">
          <a-button type="primary">
            添加
          </a-button>
        </a-col>

        <a-col offset="0.2" :span="2">
          <a-button type="danger">
            删除
          </a-button>
        </a-col>

        <div style="height: 32px;line-height: 32px;">
          <template v-if="hasSelected">
            {{ `Selected ${selectedRowKeys.length} items` }}
          </template>

        </div>


      </a-row>
      <br>
      <a-table
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :columns="columns"
        :data-source="data ">
        <span slot="action" slot-scope="text, record">
          <a>详细 {{ record.name }}</a>
          <a-divider type="vertical"/>
          <a>修改</a>
          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">更多<a-icon type="down" />
            </a>
            <a-menu slot="overlay">
      <a-menu-item>
        <a href="javascript:;">导出</a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
        </span>
      </a-table>
    </div>
  </a-card>
</template>

<script>
import YearPicker from './modules/YearPicker'

const columns = [
  {
    dataIndex: 'isSelected',
    key: 'isSelected'
  },
  {
    title: '考核年度',
    dataIndex: 'assess_year',
    key: 'assess_year'
  },
  {
    title: '考核月份',
    dataIndex: 'assess_month',
    key: 'assess_month'
  },
  {
    title: '考核部门',
    key: 'assess_dep',
    dataIndex: 'assess_dep'
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
const data = [
  {
    key: '1',
    assess_year: '2020年',
    assess_month: '1月份',
    assess_dep: '五科室考核'
  },
  {
    key: '2',
    assess_year: '2021年',
    assess_month: '4月份',
    assess_dep: '六科室考核'
  },
  {
    key: '3',
    assess_year: '2021年',
    assess_month: '9月份',
    assess_dep: '六科室考核'
  }
]
const options_month = [
  {
    value: '1',
    label: '1'
  },
  {
    value: '2',
    label: '2'
  },
  {
    value: '3',
    label: '3'
  },
  {
    value: '4',
    label: '4'
  },
  {
    value: '5',
    label: '5'
  },
  {
    value: '6',
    label: '6'
  },
  {
    value: '7',
    label: '7'
  },
  {
    value: '8',
    label: '8'
  },
  {
    value: '9',
    label: '9'
  },
  {
    value: '10',
    label: '10'
  },
  {
    value: '11',
    label: '11'
  },
  {
    value: '12',
    label: '12'
  }
]
const options_dep = [
  {
    value: '1',
    label: '一部'
  },
  {
    value: '2',
    label: '二部'
  },
  {
    value: '3',
    label: '三部'
  },
  {
    value: '4',
    label: '四部'
  },
  {
    value: '5',
    label: '五部'
  },
  {
    value: '6',
    label: '六部'
  }

]
let date = new Date()
let y = date.getFullYear()


export default {
  name: 'assessList',
  components: {
    YearPicker
  },
  data() {
    return {
      options_month,
      options_dep,
      data,
      columns,
      year: y,
      selectedRowKeys: []
    }
  },
  methods: {
    onChange(value) {
      console.log(value)
    },
    handlerInput() {
      console.log(this.year)

    },
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

</style>