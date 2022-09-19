<template>
  <layout classPrefix="layout" class="moneyLayout">
    <Number-pad :value.sync="record.amount" @submit="saveRecord"/>
    <FormItem field-name="备注" placeholder="请在这里输入备注"
        @update:value="onUpdateNotes" :value="record.notes"/>
    <Tagss @update:value="record.tags=$event"/>
    <Tabs :dataSource="recordTypeList" :value.sync="record.type"
    class-prefix="tabs"/>
  </layout>
</template>

<script lang="ts">
import NumberPad from '@/components/money/NumberPad.vue';
import FormItem from '@/components/money/FormItem.vue';
import Tagss from '@/components/money/Tagss.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import recordTypeList from '@/constants/recordTypeList';
import Tabs from '@/components/Tabs.vue';

@Component({
  components: {
    Tabs,NumberPad, FormItem, Tagss,
  },
})
export default class Money extends Vue {
  recordTypeList = recordTypeList;
  //收集的数据记录record
  record: RecordItem = {tags: [], notes: '', type: '_', amount: 0};

  get recordList(){
    return this.$store.state.recordList;
  }

  created(){
    this.$store.commit('fetchRecords')
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

////深拷贝，每次push之前复制一份
  saveRecord() {
    if(!this.record.tags || this.record.tags.length===0){
      return window.alert('请选择标签');
    }
    this.$store.commit('createRecord',this.record);
    this.record.notes= '';
    if(this.$store.state.createRecordError===null){
      window.alert('已保存');
    }
  }
}
</script>

<style lang="scss" scoped>
.moneyLayout ::v-deep .tabs-tabs-item{
  margin: 0 20px;
}

</style>