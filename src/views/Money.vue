<template>
  <layout classPrefix="layout" class="layout">
    <Number-pad @update:value="onUpdateNumberPad" @submit="saveRecord"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags @update:value="onUpdateTags"/>
    <!--    <Types :value="record.type" @update:value="onUpdateType"/>-->
    {{recordList}}

    <Types :value.sync="record.type"/>
  </layout>

</template>

<script lang="ts">

import NumberPad from '@/components/money/NumberPad.vue';
import Tags from '@/components/money/Tags.vue';
import Types from '@/components/money/Types.vue';
import Notes from '@/components/money/Note.vue';
import moment from "moment"

import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';

window.localStorage.setItem('version', '1');//数据库版本

type Record = {
  tags: string
  notes: string
  type: string
  amount: number //数据类型
  createdAt?: Date|string //类/构造函数
}

@Component({
  components: {Notes, Types, Tags, NumberPad}
})
export default class Money extends Vue {
  record: Record = {tags: '其他', notes: '', type: '-', amount: 0};
  //收集提交的记录
  recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
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
    const record2: Record = JSON.parse(JSON.stringify(this.record));
    // record2.createdAt=moment(new Date()).format("YYYY年MM月DD日 hh:mm:ss");
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }

  @Watch('recordList')
  onRecordListChange() {
    window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
  }


formatDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth()<10?'0'+date.getMonth():date.getMonth();
  const day =date.getDate()<10?'0'+date.getDate():date.getDate();
  const hours = date.getHours()<10?'0'+date.getHours():date.getHours();
  const min = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
  const sec = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();
  return year+'年'+month+'月'+day+'日  '+hours+':'+min+':'+sec;
}
}

</script>

<style lang="scss" scoped>

.layout {
  //min-width: 300px;

}
</style>