<template>
  <v-chart :forceFit="true" :height="height" :data="data" :scale="scale" :onClick="handleClick">
    <v-tooltip :showTitle="false" dataKey="item*percent"/>
    <v-axis/>
    <v-legend dataKey="item"/>
    <v-pie position="percent" color="item" :v-style="pieStyle" :label="labelConfig"/>
    <v-coord type="theta"/>
  </v-chart>
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
        default: 254
      },
      dataSource: {
        type: Array,
        default: () => [
          { item: '安全类投诉', count: 2 },
          { item: '服务类投诉', count: 8 },
          { item: '设备类投诉', count: 5 },
          { item: '人事类投诉', count: 5 },
          { item: '其他投诉', count: 3 },
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