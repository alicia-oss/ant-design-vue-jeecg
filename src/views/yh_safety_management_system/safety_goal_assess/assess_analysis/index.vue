<template>
<a-card :bordered="false">
  <a-tabs defaultActiveKey="1">

    <a-tab-pane tab="浏览与打印" >
      <bar-and-line :height="height"/>

    </a-tab-pane>
    <!-- 饼图 -->
    <a-tab-pane tab="饼图" key="7">
      <pie title="饼图" :height="height"/>
    </a-tab-pane>
  </a-tabs>
</a-card>
</template>

<script>
  import Pie from './modules/Pie'

  export default {
    name: 'ViserChartDemo',
    components: {
      Pie
    },
    data() {
      return {
        height: 420,
      }
    },
    created() {
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
