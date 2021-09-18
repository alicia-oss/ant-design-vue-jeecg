<template>
  <div>
    <h1 :style="{ marginBottom: '20px' }">{{ title }}</h1>
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale" :onClick="handleClick">
      <v-tooltip :showTitle="false" dataKey="item*percent" />
      <v-axis />
      <v-legend dataKey="item" />
      <v-pie position="percent" color="item" :v-style="pieStyle" :label="labelConfig" />
      <v-coord type="theta" />
    </v-chart>
  </div>
</template>

<script>
  const DataSet = require('@antv/data-set')
  import { ChartEventMixins } from './mixins/ChartMixins'

  export default {
    name: 'Pie',
    mixins: [ChartEventMixins],
    props: {
      title: {
        type: String,
        default: ''
      },
      height: {
        type: Number,
        default: 400
      },
      dataSource: {
        type: Array,
        default: () => [
          { item: '小事故', count: 22 },
          { item: '一般事故', count: 10 },
          { item: '较大事故', count: 8 },
          { item: '重大事故', count: 5 },
          { item: '特别重大事故', count: 3 },
        ]
      }
    },
    data() {
      return {
        scale: [{
          dataKey: 'percent',
          min: 0,
          formatter: '.0%'
        }],
        pieStyle: {
          stroke: '#fff',
          lineWidth: 1
        },
        labelConfig: ['percent', {
          formatter: (val, item) => {
            return item.point.item + ': ' + val
          }
        }]
      }
    },
    computed: {
      data() {
        let dv = new DataSet.View().source(this.dataSource)
        // 计算数据百分比
        dv.transform({
          type: 'percent',
          field: 'count',
          dimension: 'item',
          as: 'percent'
        })
        return dv.rows
      }
    }
  }
</script>