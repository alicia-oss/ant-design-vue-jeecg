<template>
  <router-view></router-view>
</template>

<script>
import STable from '@/components/table/'
import ATextarea from "ant-design-vue/es/input/TextArea"
import AInput from "ant-design-vue/es/input/Input"
import moment from "moment"
import axios from 'axios';
import { getRoleList, getServiceList, getApplicationList } from '@/api/manage'
import { submitApplication, getApproveTask } from '@/api/api'
export default {
  name: "Index.vue",
  components: {
  },
  data(){
    return{

    }
  },
  methods:{

  },
  created () {

  },

}
</script>