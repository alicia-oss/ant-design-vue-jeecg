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

    <template slot="result" slot-scope="record,index">
      <a-radio-group  @change="resultChange(record,index)">
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
</div>
</template>

<script>
export default {
  name: 'ReviewTable',
  data(){
    return{
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
          planReviewResult:0,
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

      defColumns:[
        {
          title: '评审项目',
          align: "center",
          colSpan: 2,
          width: '15%',
          dataIndex: 'reviewTotal',
          ellipsis:true,
          customRender: (text, row, index) => {
            console.log(row);
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
            console.log(row);
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
    resultChange(record,index){
      console.log(record);
      this.dataSource[index].planReviewResult = record;
    }
  }
}
</script>

<style scoped>

</style>