<template>
 <div>
   <a-spin :spinning="confirmLoading">
     <div >

       <a-row class="table">
           <div class="item">
             <text-border title="基本信息" >
               <a-form-model ref="form" :label-col="labelCol" :wrapper-col="wrapperCol" :model="model"
               >
                 <a-form-model-item label="员工姓名" required prop="pilotName" hasFeedback>
                   <a-input v-model="model.pilotName" :readOnly="true"   placeholder=""/>
                 </a-form-model-item>

                 <a-form-model-item label="汉语拼音" required prop="nameSpell" hasFeedback>
                   <a-input v-model="model.nameSpell" :readOnly="true"   placeholder=""/>
                 </a-form-model-item>

                 <a-form-model-item label="性别"  prop="gender" hasFeedback >
                   <a-input  placeholder="" :readOnly="true"  v-model="model.gender"/>
                 </a-form-model-item>

                 <a-form-model-item label="出生日期" required prop="birthDate" hasFeedback>
                   <a-input v-model="model.birthDate"  :readOnly="true"  placeholder=""/>

                 </a-form-model-item>

                 <a-form-model-item label="籍贯"  prop="nativePlace" hasFeedback >
                   <a-input  placeholder="" :readOnly="true"  v-model="model.nativePlace"/>
                 </a-form-model-item>

                 <a-form-model-item label="民族"  prop="nation" hasFeedback >
                   <a-input  placeholder="" :readOnly="true"  v-model="model.nation"/>
                 </a-form-model-item>


               </a-form-model>
             </text-border>
           </div>
         <div class="item">
           <text-border>
             <a-form-model ref="form" :label-col="labelCol" :wrapper-col="wrapperCol" :model="model">
           <a-form-model-item label="毕业院校"  prop="graduatedSchool" hasFeedback >
             <a-input  placeholder="" :readOnly="true"  v-model="model.graduatedSchool"/>
           </a-form-model-item>

           <a-form-model-item label="所学专业"  prop="studyMajor" hasFeedback >
             <a-input  placeholder="" :readOnly="true"  v-model="model.studyMajor"/>
           </a-form-model-item>

           <a-form-model-item label="文化程度"  prop="eduDegree" hasFeedback >
             <a-input  placeholder="" :readOnly="true"  v-model="model.eduDegree"/>
           </a-form-model-item>


           <a-form-model-item label="上传人"   prop="uploadUser" hasFeedback >
             <a-input  placeholder=""  :readOnly="true" v-model="model.uploadUser" :disabled="true"/>
           </a-form-model-item>

           <a-form-model-item label="上传日期"  prop="uploadDate" hasFeedback >
             <a-input  placeholder=""  :readOnly="true" v-model="model.uploadDate" :disabled="true"/>
           </a-form-model-item>

           <a-form-model-item label="备注"  prop="remarks" hasFeedback >
             <a-input  placeholder=""  :readOnly="true" v-model="model.remarks" :disabled="true"/>
           </a-form-model-item>
             </a-form-model>
           </text-border>
         </div>

       </a-row>
       <div class="item-right">
         <text-border title="相关文件">
           <carousel :value="model.uploadFileName"></carousel>
         </text-border>
       </div>
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