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
          { item: '2021年记录', count: 12 },
          { item: '2020年记录', count: 8 },
          { item: '2019年记录', count: 5 },
          { item: '2018年记录', count: 5 },
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