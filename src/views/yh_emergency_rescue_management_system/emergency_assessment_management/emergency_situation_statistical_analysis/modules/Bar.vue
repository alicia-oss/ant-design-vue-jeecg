<template>
  <div :style="{ padding: '0 0 32px 32px' }">
    <h3 :style="{ marginBottom: '20px' }">{{ title }}</h3>
    <v-chart :forceFit="true" :height="height" :data="dataSource" :scale="scale" >
      <v-tooltip/>
      <v-axis/>
      <v-bar position="year*rec_num"/>
    </v-chart>
  </div>
</template>

<script>
  import { triggerWindowResizeEvent } from '@/utils/util'

  export default {
    name: 'Bar',
    props: {
      title: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        padding: ['auto', 'auto', '40', '50'],
        dataSource: [
          { year: '2018', rec_num: 12 },
          { year: '2019', rec_num: 8 },
          { year: '2020', rec_num: 5 },
          { year: '2021', rec_num: 5 },
        ],
        scale : [{
          dataKey: 'sales',
          tickInterval: 20, // 刻度间隔
        }],
        height: 400,
      }
    },
    computed: {
    },
    mounted() {
      triggerWindowResizeEvent()
    }
  }
</script>