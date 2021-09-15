<template>
  <div :style="{ padding: '0 0 32px 32px' }">
    <h4 :style="{ marginBottom: '20px' }">{{ title }}</h4>
    <v-chart :forceFit="true" :height="height" :data="dataSource" :scale="scale" >
      <v-tooltip/>
      <v-axis/>
      <v-bar position="year*sales"/>
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
          { year: '1951 年', sales: 38 },
          { year: '1952 年', sales: 52 },
          { year: '1956 年', sales: 61 },
          { year: '1957 年', sales: 145 },
          { year: '1958 年', sales: 48 },
          { year: '1959 年', sales: 38 },
          { year: '1960 年', sales: 38 },
          { year: '1962 年', sales: 38 },
        ],
        scale : [{
          dataKey: 'sales',
          tickInterval: 20,
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