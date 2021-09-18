<template>
 <div>
   <a-card :bordered="false">
     <a-page-header
       style="border-bottom: 1px solid rgb(235, 237, 240);padding-left: 0px"
       title="应急预案评审"
       @back="() => this.$router.go(-1)"
     />
     <a-form-model ref="form"    :model="model" >
       <a-row :gutter="30">
         <a-col :xl="6" :lg="8" :md="12" :sm="24">
           <a-form-model-item label="预案名称" prop="emergencyPlanName" hasFeedback>
             <a-select style="width: 100%;" :disabled="!edit" placeholder="请选择预案种类"  @select="handleNameSelect" v-model="model.emergencyPlanName">
               <a-select-option v-for="item in inputData.emergencyPlanName" :value="item">
                 {{ item }}
               </a-select-option>
             </a-select>
           </a-form-model-item>
         </a-col>

         <a-col :xl="6" :lg="8" :md="12" :sm="24">
           <a-form-model-item label="预案种类">
             <a-select style="width: 100%;" placeholder="请选择预案种类" :disabled="!edit" v-model="model.emergencyPlanCategory">
               <a-select-option v-for="item in inputData.emergencyPlanCategory" :value="item">
                 {{ item }}
               </a-select-option>
             </a-select>
           </a-form-model-item>
         </a-col>

         <a-col :xl="6" :lg="8" :md="12" :sm="24">
           <a-form-model-item label="评审单位" prop="version"  hasFeedback>
             <a-input v-model="model.reviewInstitution" :disabled="!edit" placeholder="请输入填写机构" />
           </a-form-model-item>
         </a-col>

         <a-col :xl="6" :lg="8" :md="12" :sm="24">
           <a-form-model-item label="评审时间" prop="uploadDate" hasFeedback>
             <a-date-picker valueFormat="YYYY-MM-DD" style="width: 100%;" v-model="model.reviewTime" :disabled="true" />
           </a-form-model-item>
         </a-col>
       </a-row>
     </a-form-model>

     <review-table :submit-able="edit" v-show="show" ></review-table>
     <file-modal ref="fileModal" @close="drawerClose"></file-modal>
     <div class="drawer">
       <div class="button" @click="drawerClick">
         <a-icon v-if="drawerState == false" type="double-left" />
         <a-icon v-else type="double-right" />
       </div>
     </div>
   </a-card>
 </div>
</template>

<script>
import ReviewTable from './childComponents/ReviewTable'
import FileModal from './childComponents/FileModal'

export default {
  name: 'index',
  data(){
    return{
      edit:true,
      drawerState:false,
      show:false,
      inputData: {
        emergencyPlanName:['预案01','预案02'],
        emergencyPlanCategory:["综合应急预案" , "专项应急预案",'现场处置方案'] ,
        applicationState:["编辑中","审批中","通过","未通过","被退回"],
        isReleased:['已发布','未发布'],
        departName:["部门1","部门2"]
      },
      model:{},
      //放标准的数据
      dataSource:[],
      //放预案的数据


    }
  },
  components:{
    ReviewTable,
    FileModal
  },
  methods:{
    handleNameSelect(){
      this.model.emergencyPlanCategory = this.inputData.emergencyPlanCategory[0];
      this.show = true;
    },
    drawerClick(){
      this.drawerState = !this.drawerState;
      this.$refs.fileModal.open();
    },

    drawerClose(){
      this.drawerState = false;
    }
  },

  activated() {
    console.log(this.$route.query);
    let myData = new Date();
    this.model.reviewTime = myData.toLocaleDateString();
    if(this.$route.query.id === '0'){
      this.edit = true;
      this.show = false;
    }
    else{
      this.model.emergencyPlanCategory= '综合应急预案';
      this.model.emergencyPlanName = '预案01';
      this.edit = false;
      this.show = true;
    }
  }

}
</script>

<style scoped>
.drawer{
  position: fixed;
  top: 45%;
  border: 0px;
  border-radius: 10px 0 0 10px;
  right: 0px;
  height: 90px;
  line-height: 90px;
  text-align: center;
  width: 30px;
  background: rgba(92, 96, 101, 0.30);
  cursor:pointer;
}

.drawer .button{
  font-size: 20px;

}
</style>