<template>
 <div>
   <a-spin :spinning="confirmLoading">
     <div >

       <a-row class="table">
           <div class="item">
             <text-border title="基本信息" >
               <a-form-model ref="form" :label-col="labelCol" :wrapper-col="wrapperCol" :model="model"
               >
                 <a-form-model-item label="员工姓名" required prop="employeeName" hasFeedback>
                   <a-input v-model="model.employeeName" :readOnly="true"   placeholder=""/>
                 </a-form-model-item>

                 <a-form-model-item label="员工编号" required prop="employeeId" hasFeedback>
                   <a-input v-model="model.employeeId" :readOnly="true"   placeholder=""/>
                 </a-form-model-item>

                 <a-form-model-item label="部门"  prop="apartment" hasFeedback >
                   <a-input  placeholder="" :readOnly="true"  v-model="model.apartment"/>
                 </a-form-model-item>

                 <a-form-model-item label="证书编号" required prop="certNum" hasFeedback>
                   <a-input v-model="model.certNum"  :readOnly="true"  placeholder=""/>

                 </a-form-model-item>

                 <a-form-model-item label="发证机关"  prop="issuingAuthority" hasFeedback >
                                 <a-input  placeholder="" :readOnly="true"  v-model="model.issuingAuthority"/>
                 </a-form-model-item>

                 <a-form-model-item label="上传人"   prop="uploadUserId" hasFeedback >
                                 <a-input  placeholder=""  :readOnly="true" v-model="model.uploadUserId" :disabled="true"/>
                 </a-form-model-item>

                 <a-form-model-item label="上传日期"  prop="uploadDate" hasFeedback >
                   <a-input  placeholder=""  :readOnly="true" v-model="model.uploadDate" :disabled="true"/>
                 </a-form-model-item>

               </a-form-model>
             </text-border>
           </div>
           <div class="item-right">
             <text-border title="相关文件">
               <carousel :value="model.uploadFileName"></carousel>
             </text-border>
           </div>
       </a-row>
       <a-row>
         <text-border class="cert-table" title="证书列表">
           <sub-table :dataSource="model.subList"></sub-table>
         </text-border>
       </a-row>
     </div>
   </a-spin>
 </div>

</template>

<script>
import TextBorder from './TextBorder'
import Carousel from './Carousel'
import SubTable from './SubTable'

export default {
  name: 'InfoTable',
  props:{
    model: {},
  },
  data(){
    return {
      confirmLoading:false,

      layout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 14 },
      },
      labelCol: {
        xs: { span: 10 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      form: this.$form.createForm(this),
    }
  },
  components:{
    TextBorder,
    Carousel,
    SubTable
  },
  methods:{
    check (record) {
      this.model = Object.assign({}, record);
      // this.$refs.fileList.initFileList();
      this.visible = true;
    },
    close () {
      // this.$refs.fileList.close();
      this.$refs.form.resetFields();
      this.$emit('close');
      this.visible = false;
    },

    handleCancel () {
      this.close()
    }
  }
}
</script>

<style scoped>
.table{
  display: flex ;
  width: 100%;
}

.item{
  flex: 1 ;
}

.item-right{
  flex: 1 ;
  height: auto;
}

.cert-table{
  margin-top: 30px;
}
</style>