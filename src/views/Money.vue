<template>
  <layout classPrefix="layout" class="layout">
    <Number-pad @update:value="onUpdateNumberPad" @submit="saveRecord"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags @update:value="onUpdateTags"/>
    <!--    <Types :value="record.type" @update:value="onUpdateType"/>-->
    {{ record }}
    <Types :value.sync="record.type"/>
  </layout>

</template>

<script lang="ts">

import NumberPad from '@/components/money/NumberPad.vue';
import Tags from '@/components/money/Tags.vue';
import Types from '@/components/money/Types.vue';
import Notes from '@/components/money/Note.vue';

import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';

type Record = {
  tags: string
  notes: string
  type: string
  amount: number
}

@Component({
  components: {Notes, Types, Tags, NumberPad}
})
export default class Money extends Vue {
  record: Record = {tags: '其他', notes: '', type: '-', amount: 0};
  //收集提交的记录
  recordList: Record[] = [];
  name = 'Money';

  onUpdateTags(value: string) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  // onUpdateType(value:string){
  //   this.record.type = value;
  // }
  onUpdateNumberPad(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    //深拷贝
    const record2 = JSON.parse(JSON.stringify(this.record));
    this.recordList.push(record2);
  }
  @Watch('recordList')
  onRecordListChange(){
    window.localStorage.setItem('recordList',JSON.stringify(this.recordList));
  }
}
</script>

<style lang="scss" scoped>

.layout {
  //min-width: 300px;

}
</style>