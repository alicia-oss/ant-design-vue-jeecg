<template>
  <a-drawer
    :title="title"
    :width="drawerWidth"
    @close="handleCancel"
    :visible="visible"
    :confirmLoading="confirmLoading">

    <div :style="{width: '100%',border: '1px solid #e9e9e9',padding: '10px 16px',background: '#fff',}">
    <a-spin :spinning="confirmLoading">
      <a-form-model ref="form" :model="model" :rules="validatorRules">

        <a-form-model-item v-show="method !== 'edit'" label="新建类型" :labelCol="labelCol" :wrapperCol="wrapperCol" >
          <a-radio-group  v-model="model.menuType">
            <a-radio :value="0">应急预案评审标准</a-radio>
            <a-radio :value="1">新指标</a-radio>
          </a-radio-group>
        </a-form-model-item>


        <a-form-model-item
          v-show="model.menuType == 0"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          prop="emergencyPlanCategory"
          label="应急预案类型">
          <a-select placeholder="请输入应急预案类型" v-model="model.emergencyPlanCategory">
            <a-select-option v-for="item in inputData.emergencyPlanCategory" :readOnly="disableSubmit" :value="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item
          v-show="model.menuType == 0"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="制定时间"
          prop="establishmentTime"
          hasFeedback >
          <a-date-picker valueFormat="YYYY-MM-DD" v-model="model.establishmentTime" :disabled="true" />
        </a-form-model-item>


        <a-form-model-item
          v-show="model.menuType == 1"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="请输入指标评审内容"
          prop="contentAndRequirement"
          hasFeedback >
          <a-input placeholder="请输入指标评审内容" v-model="model.contentAndRequirement" :readOnly="disableSubmit"/>
        </a-form-model-item>


        <a-form-model-item
          v-show="model.menuType==1"
          label="父级指标"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :validate-status="validateStatus"
          :hasFeedback="true"
          :required="true">
          <span slot="help">{{ validateStatus=='error'?'请选择父级指标':'&nbsp;&nbsp;' }}</span>
          <a-tree-select
            style="width:100%"
            :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
            :treeData="treeData"
            v-model="model.fatherReviewId"
            placeholder="请选择父级指标"
            :disabled="disableSubmit"
            @change="handleParentIdChange">
          </a-tree-select>
        </a-form-model-item>


        <a-form-model-item
          v-show="model.menuType == 1"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          prop="seriaNum"
          label="排序">
          <a-input-number placeholder="请输入指标排序" v-model="model.seriaNum" style="width: 200px" :readOnly="disableSubmit"/>
        </a-form-model-item>


      </a-form-model>

      <!-- 选择图标 -->
    </a-spin>
      <a-row :style="{textAlign:'right'}">
        <a-button :style="{marginRight: '8px'}" @click="handleCancel">
          关闭
        </a-button>
        <a-button :disabled="disableSubmit" @click="handleOk" type="primary">确定</a-button>
      </a-row>
    </div>
  </a-drawer>
</template>

<script>
  import {addPermission,editPermission,queryTreeList, duplicateCheck} from '@/api/api'
  import Icons from './icon/Icons'

  export default {
    name: "PermissionModal",
    components: {Icons},
    data () {
      return {
        inputData:{
          emergencyPlanCategory:['综合应急预案', '专项应急预案' , '现场处置方案']
        },
        drawerWidth:700,
        treeData:[],
        title:"操作",
        method:"",
        visible: false,
        disableSubmit:false,
        model: {},
        show:true,//根据菜单类型，动态显示隐藏表单元素
        menuLabel:'菜单名称',
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        iconChooseVisible: false,
        validateStatus:""
      }
    },
    computed:{
      validatorRules:function() {
        return {
          name:[{ required: true, message: '请输入菜单标题!' }],
          component:[{ required: this.show, message: '请输入前端组件!' }],
          url: [{ required: this.show, message: '请输入菜单路径!' }],
          permsType: [{ required: true, message: '请输入授权策略!' }],
          perms:[{ required: false, message: '请输入授权标识!' },{validator: this.validatePerms }]
        }
      }
    },
    created () {
    },
    methods: {
      loadTree(){
        this.treeData =  [
          {
            title: '港口用火安全准则',
            value: '1',
            key: '0-0',
            children: [
              {
                title: '港口TC-208用火限制及方法',
                value: '1.1',
                key: '0-0-1',
              },
            ],
          },
          {
            title: '无',
            value: '0-1',
            key: '0-1',
          },
        ];
        // var that = this;
        // queryTreeList().then((res)=>{
        //   if(res.success){
        //     console.log(res)
        //     that.treeData = [];
        //     let treeList = res.result.treeList
        //     for(let a=0;a<treeList.length;a++){
        //       let temp = treeList[a];
        //       temp.isLeaf = temp.leaf;
        //       that.treeData.push(temp);
        //     }
        //   }
        // });
      },
      add () {
        //初始化默认值
        this.edit({status:'1', permsType:'1', sortNo:1.0, route:true, menuType:0 });
      },
      edit (record) {
        this.resetScreenSize(); // 调用此方法,根据屏幕宽度自适应调整抽屉的宽度
        this.model = Object.assign({}, record);

        //根据菜单类型，动态展示页面字段
        console.log('record: ',record)
        this.visible = true;
        this.loadTree();
      },
      close () {
        this.$emit('close');
        this.disableSubmit = false;
        this.visible = false;
        this.$refs.form.resetFields();
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        that.confirmLoading = false;
        that.close();
      },
      handleCancel () {
        this.close()
      },
      validateNumber(rule, value, callback){
        if(!value || new RegExp(/^[0-9]*[1-9][0-9]*$/).test(value)){
          callback();
        }else{
          callback("请输入正整数!");
        }
      },
      validatePerms(rule, value, callback){

      },


      selectIcons(){
        this.iconChooseVisible = true
      },
      handleIconCancel () {
        this.iconChooseVisible = false
      },
      handleIconChoose (value) {
        console.log(value)
        this.model.icon = value
        this.iconChooseVisible = false
      },
      // 根据屏幕变化,设置抽屉尺寸
      resetScreenSize(){
        let screenWidth = document.body.clientWidth;
        if(screenWidth < 500){
          this.drawerWidth = screenWidth;
        }else{
          this.drawerWidth = 700;
        }
      },
      handleParentIdChange(value){
        if(!value){
          this.validateStatus="error"
        }else{
          this.validateStatus="success"
        }
      }
    }
  }
</script>

<style scoped>

</style>