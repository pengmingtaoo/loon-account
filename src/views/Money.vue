<template>
  <layout classPrefix="layout" class="moneyLayout">
    <Number-pad :value.sync="record.amount" @submit="saveRecord"/>
    <FormItem field-name="备注" placeholder="请在这里输入备注"
        @update:value="onUpdateNotes"/>
    <Tagss/>
    <Types :value.sync="record.type"/>
  </layout>
</template>

<script lang="ts">
import NumberPad from '@/components/money/NumberPad.vue';
import FormItem from '@/components/money/FormItem.vue';
import Tagss from '@/components/money/Tagss.vue';
import Types from '@/components/money/Types.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component({
  components: {
    NumberPad, FormItem, Tagss, Types
  },
})
export default class Money extends Vue {
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
    this.$store.commit('createRecord',this.record);
  }
}
</script>

<style lang="scss" scoped>


</style>