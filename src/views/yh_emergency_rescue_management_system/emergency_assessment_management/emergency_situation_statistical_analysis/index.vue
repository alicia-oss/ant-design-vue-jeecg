<template>
  <a-card :bordered="false">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="事故统计">
        Content of Tab Pane 1
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

export default {
  name: 'complaint_analysis',
  components: {
    Pie,
    Bar
  },
  data() {
    return {
      inputData:{
        year:['2021','2020','2019','2018']
      }

    }
  },
  created() {
  },
  methods: {

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
