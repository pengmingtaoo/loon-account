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

import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import model from '@/model';
import moment from 'moment';

window.localStorage.setItem('version', '1');//数据库版本


@Component({
  components: {Notes, Types, Tags, NumberPad}
})
export default class Money extends Vue {
  record: RecordItem = {tags: '其他', notes: '', type: '-', amount: 0};
  //收集提交的记录
   recordList = model.fetch();

  name = 'Money';

  onUpdateTags(value: string) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateNumberPad(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    //深拷贝
    const record2: RecordItem = model.clone(this.record);
    record2.createdAt=moment(new Date()).format("YYYY年MM月DD日 hh:mm:ss");
    this.recordList.push(record2);
  }

  @Watch('recordList')
  onRecordListChange() {
    model.save(this.recordList);
  }

}

</script>

<style lang="scss" scoped>

.layout {
  //min-width: 300px;

}
</style>