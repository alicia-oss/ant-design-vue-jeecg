<template>
<div>
  <a-table
    ref="table"
    size="middle"
    bordered
    :pagination="false"
    :rowKey="record=>record.planReviewDetailId"
    :columns="defColumns"
    :dataSource="dataSource"
>

    <template slot="result" slot-scope="index,record">
      <a-radio-group  @change="resultChange(index,record)" v-model="record.planReviewResult" :disabled="!submitAble" >
        <a-radio :value="0">
          符合
        </a-radio>
        <a-radio :value="1">
          基本符合
        </a-radio>
        <a-radio :value="2">
          不符合
        </a-radio>
      </a-radio-group>
    </template>
  </a-table>
<a-row style="margin-top: 30px" :gutter="30">
  <a-col :span="18">
    <a-form-model ref="form"  :label-col="labelCol" :wrapper-col="wrapperCol"  >
      <a-form-model-item label="评审结果说明"  style="text-align: left" prop="emergencyPlanName" hasFeedback>
        <a-textarea :read-only="!submitAble"
          placeholder="请输入评审结果说明"
          :auto-size="{ minRows: 2, maxRows: 8 }"
          v-model="resultDescription"
        />
      </a-form-model-item>
    </a-form-model>
  </a-col>

  <a-col :span="6">
    <div class="button-group" v-show="submitAble">
      <div class="item">
        <a-button style="width: 80%; height: 40px;  ">
           重置
        </a-button>
      </div>

        <div class="item">
          <a-button style="width: 80%;height: 40px; ">
            取消
          </a-button>
        </div>

        <div class="item">
          <a-button type="primary" style="width: 80%; height: 40px;">
            完成
          </a-button>
        </div>

    </div>

  </a-col>

</a-row>



</div>
</template>

<script>
export default {
  name: 'ReviewTable',
  props:{
    submitAble:true
  },
  data(){
    return{
      resultDescription:'',
      dataSource:[
        {
          planReviewDetailId:'145',
          planReviewId:'333',
          fatherReviewId:"1",
          length:5,
          subLength:3,
          reviewTotal:"港口用火安全准则",
          reviewSub:'准则01',
          seriaNum:1,
          contentAndRequirement:"港口TC-208用火限制及方法",
          planReviewResult:1,
          resultDescription:'',
        },
        {
          planReviewDetailId:'1.1',
          planReviewId:'333',
          fatherReviewId:"1",
          length:5,
          reviewTotal:"港口用火安全准则",
          reviewSub:'准则01',
          subLength:3,
          seriaNum:2,
          contentAndRequirement:"港口TC-306用火限制及方法",
          planReviewResult:0,
          resultDescription:'',
        },
        {
          planReviewDetailId:'1.11',
          planReviewId:'333',
          fatherReviewId:"1",
          length:5,
          reviewTotal:"港口用火安全准则",
          reviewSub:'准则01',
          subLength:3,
          seriaNum:3,
          contentAndRequirement:"港口TC-306用火限制及方法",
          planReviewResult:0,
          resultDescription:'',
        },
        {
          planReviewDetailId:'13',
          planReviewId:'333',
          fatherReviewId:"1",
          length:5,
          reviewTotal:"港口用火安全准则",
          reviewSub:'准则02',
          subLength:2,
          seriaNum:1,
          contentAndRequirement:"港口TC-208用火限制及方法",
          planReviewResult:0,
          resultDescription:'',
        },
        {
          planReviewDetailId:'1.111',
          planReviewId:'333',
          fatherReviewId:"1",
          length:5,
          reviewTotal:"港口用火安全准则",
          reviewSub:'准则02',
          subLength:2,
          seriaNum:2,
          contentAndRequirement:"港口TC-306用火限制及方法",
          planReviewResult:0,
          resultDescription:'',
        },
        {
          planReviewDetailId:'1111',
          planReviewId:'333',
          fatherReviewId:"1",
          reviewSub:'',
          length:2,
          subLength:0,
          reviewTotal:"港口用水安全准则",
          seriaNum:1,
          contentAndRequirement:"港口TC-908用水限制及方法",
          planReviewResult:0,
          resultDescription:'',
        },
        {
          planReviewDetailId:'1.221',
          planReviewId:'333',
          fatherReviewId:"1",
          reviewSub:'',
          length:2,
          subLength:0,
          reviewTotal:"港口用水安全准则",
          seriaNum:2,
          contentAndRequirement:"港口TC-33336用水限制及方法",
          planReviewResult:0,
          resultDescription:'',
        },
      ],

      layout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 14 },
      },
      labelCol: {
        xs: { span: 6 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 21 },
      },

      defColumns:[
        {
          title: '评审项目',
          align: "center",
          colSpan: 2,
          width: '15%',
          dataIndex: 'reviewTotal',
          ellipsis:true,
          customRender: (text, row, index) => {
            const obj = {
              children: <span>{text}</span>,
              attrs: {},
            };
            if (index > 0 && row.reviewTotal == this.dataSource[index-1].reviewTotal)  {
              obj.attrs.rowSpan = 0;
              }
            else{
              obj.attrs.rowSpan = row.length;
            }

            if(row.reviewSub === ""){
              obj.attrs.colSpan = 2;
            }
            else{
              obj.attrs.colSpan = 1;
            }
            return obj;
          },
        },
        {
          title: '子评审项目',
          align: "center",
          dataIndex: 'reviewSub',
          width: '15%',
          colSpan: 0,
          ellipsis:true,
          customRender: (text, row, index) => {
            const obj = {
              children: <span>{text}</span>,
              attrs: {},
            };

            if(row.reviewSub !== ""){
              obj.attrs.colSpan=1;
            }
            else{
              obj.attrs.colSpan=0;
            }

            if (index > 0 && row.reviewSub == this.dataSource[index-1].reviewSub)  {
              obj.attrs.rowSpan = 0;
            }
            else{
              obj.attrs.rowSpan = row.subLength;
            }

            return obj;
          }
        },

        {
          title: '序号',
          align: "center",
          width:"60px",
          ellipsis:true,
          dataIndex: 'seriaNum'
        },
        {
          title: '评审内容及要求',
          align: 'center',
          ellipsis:true,
          dataIndex: 'contentAndRequirement'
        },
        {
          title:'评审结果',
          align: 'center',
          width: '300px',
          dataIndex: 'planReviewResult',
          scopedSlots:{
            customRender: 'result'
          }
        }
      ]
    }
  },
  methods:{
    resultChange(index,record){

    }
  }
}
</script>

<style scoped>

.button-group{
  display: flex;
  justify-content:space-between;
}

.item{
  flex: 1;
  text-align: right;

}
</style>