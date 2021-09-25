<template>
  <div>
  <a-popconfirm v-if="record.isReleased==false" title="确定发布吗?" @confirm="onChange(record)" @cancel="onCancel(record)">

    <!--            <a-input  placeholder="请输入发证机关"  v-model="model.issuingAuthority"/>-->
    <a-switch :checked="record.isReleased" checked-children="" un-checked-children="" default-unchecked/>
  </a-popconfirm>
  <a-popconfirm v-if="record.isReleased==true" title="确定取消发布吗?" @confirm="onChange(record)" @cancel="onCancel(record)">

    <!--            <a-input  placeholder="请输入发证机关"  v-model="model.issuingAuthority"/>-->
    <a-switch  :checked="record.isReleased" checked-children="" un-checked-children="" default-unchecked/>
  </a-popconfirm>
  </div>
</template>

<script>
    export default {
        name: 'Approval',
        data:{
          model:{},
        },
      props:{
          record:{
            type:Object,
            required:true
          }
      },
      methods:{
        ok(record){
          this.$emit('Approval',record);
        },
          init(record){
            this.model=Object.assign({},record);
          },
        onCancel(record){

        },
        onChange(record){
          if(record.isReleased==false){
            record.isReleased=true;
            this.ok(record);
          }
          else if(record.isReleased==true) {
            record.isReleased=false;
            this.ok(record);
          }
        },

      }
    }

</script>

<style scoped>

</style>