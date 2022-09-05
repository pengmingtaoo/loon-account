<template>
  <layout classPrefix="layout" class="money">
<!--    <Number-pad @update:value="onUpdateNumberPad" @submit="saveRecord"/>-->
<!--    <Notes @update:value="onUpdateNotes"/>-->
    <Number-pad/>
    <Notes/>
    <TagsList v-if="record.type==='-'" class-prefix="money" :dynamic="true" :selected-tag.sync="record.tag" :tag-list="tagList" class="tag-list"/>
    <TagsList v-else-if="record.type === '+'" class-prefix="money" :dynamic="true" :selected-tag.sync="record.tag" :tag-list="incomeTags" class="tag-list"/>
    <!--        <Types :value="record.type" @update:value="onUpdateType"/>-->

  </layout>
</template>

<script lang="ts">

import NumberPad from '@/components/money/NumberPad.vue';
import Tags from '@/components/money/Tags.vue';
import Types from '@/components/money/Types.vue';
import Notes from '@/components/money/Note.vue';
import TagsList from '@/components/money/TagsList.vue';

import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from '@/components/models/recordListModel';
import moment from 'moment';
import tagsListModel from '@/components/models/tagsListModel';
import {defaultExpenseTags, defaultIncomeTags} from '@/contants/defaulsTags';

//收集提交的记录
const recordList = recordListModel.fetch();
const tagList = tagsListModel.fetch();


window.localStorage.setItem('version', '1');//数据库版本

@Component({
  components: {Notes, Types, Tags, NumberPad,TagsList}
})
export default class Money extends Vue {

  recordList : RecordItem[] = recordList;
  record: RecordItem = {tag: {name: 'food', value: '饮食'}, notes: '', type: '-', amount: 0};
  // record: RecordItem =this.initRecord();

  incomeTags=defaultExpenseTags;
  // eslint-disable-next-line no-undef
  get tagList(): TagItem[]{
    return this.$store.state.tagList;
  }
  //
  initRecord(){
    return {tag: {name: 'food', value: '餐饮'},
      type: '-',
      note: '',
      amount: 0
    };  //直接赋值不用声明；
  }

//   onUpdateTags(value: string) {
//     this.record.tag = value;
//   }
//
//   onUpdateNotes(value: string) {
//     this.record.notes = value;
//   }
//
//   onUpdateNumberPad(value: string) {
//     this.record.amount = parseFloat(value);
//   }
//
//   saveRecord() {
//     // 深拷贝
//     const record2: RecordItem = recordListModel.clone(this.record);
//     record2.createdAt = moment(new Date()).format('YYYY年MM月DD日 HH:mm:ss');
//     this.recordList.push(record2);
//   }
//
//   @Watch('recordList')
//   onRecordListChange() {
//     recordListModel.save(this.recordList);
//   }
//
}

</script>

<style lang="scss" scoped>

.layout {
  //min-width: 300px;

}
</style>