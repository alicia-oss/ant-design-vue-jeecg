<template>
  <div>
    <div class="table-operator" v-if="addContain">
      <a-button @click="handleAdd" type="primary" icon="plus" >新增</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <a-table
      :pagination="false"
      :columns="defColumns"
      :bordered="true"
      :rowKey="record=>record.proficiencyCertSubId"
      :data-source="dataSource"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      @change="handleTableChange">
      <span slot="action" slot-scope="record" >
          <a @click="handleEdit(record)">修改</a>
          <a-divider type="vertical"/>
         <a @click="handleDelete(record.proficiencyCertSubId)">删除</a>
     </span>
    </a-table>

    <sub-table-modal ref="subModal" @ok="modalFormOk"></sub-table-modal>


  </div>

</template>

<script>
import SubTableModal from './childComponents/SubTableModal'
import { copyObj } from 'codemirror/src/util/misc'

export default {
  name: 'SubTable',
  components:{
    SubTableModal
  },
  props:{
    addContain:{
      type:Boolean,
      default:true
    },
    dataSource:{
      type:Array,
      default:()=>[]
    }
  },
  data(){
    return{
      selectedRowKeys:[],
      defColumns: [

        {
          title: '证书种类',
          align: 'center',
          dataIndex: 'certProficiencyCate',
          scopedSlots: { customRender: 'certProficiencyCate' },
        },
        {
          title: '公约条款',
          align: 'center',
          dataIndex: 'clause',
          scopedSlots: { customRender: 'clause' },
        },
        {
          title: '签发日期',
          align: 'center',
          dataIndex: 'issueDate',
          scopedSlots: { customRender: 'clause' },
        },
        {
          title: '有效期至',
          align: 'center',
          dataIndex: 'validity',
          scopedSlots: { customRender: 'clause' },
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: "center",
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'action'
          },
        }
      ],

    }
  },
  methods:{
    handleTableChange(){

    },

    onSelectChange(selectedRowKeys, selectionRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectionRows = selectionRows;
    },
    // 增加一条
    handleAdd(){
      this.$refs.subModal.add();
      this.$refs.subModal.title = "新增证书";
      this.$refs.subModal.method = "add";
      this.$refs.subModal.disableSubmit = false;
    },

    handleEdit(record){
      console.log(record);
      this.$refs.subModal.edit(record);
      this.$refs.subModal.title = "修改证书";
      this.$refs.subModal.method = "edit";
      this.$refs.subModal.disableSubmit = false;
    },

    handleDelete(id){
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(item => item.proficiencyCertSubId !== id);
    },

    batchDel(){

    },

    // 加载数据
    modalFormOk(data){
      if(data.method === "add"){
        console.log(data.modelData);
        this.dataSource.push(data.modelData);
        console.log(this.dataSource);
      }
      else if(data.method === "edit") {
        const dataSource = [...this.dataSource];
        const target = dataSource.find(item => item.proficiencyCertSubId === data.modelData.proficiencyCertSubId);
        if (target) {
          copyObj(data.modelData,target);
          this.dataSource = dataSource;
        }
      }
    },

  },

  watch:{
    dataSource:{
      immediate: true,
      handler(){
        console.log(this.dataSource);
      }
    }
  }
}
</script>

<style scoped>
.table-operator{

}
.editable-row-operations a {
  margin-right: 8px;
}
</style>