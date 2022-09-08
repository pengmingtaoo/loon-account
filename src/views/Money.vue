<template>
  <layout classPrefix="layout" class="moneyLayout">
    <Number-pad :value.sync="record.amount" @submit="saveRecord"/>
    <FormItem
        field-name="备注"
        placeholder="请在这里输入备注"
        @update:value="onUpdateNotes"/>
    <div>{{record}}</div>
    <div>{{recordStorage}}</div>
    <Tagss :data-soure.sync="tags" @update:value="onUpdateTags"/>
    <!--    <Types :value="record.type" @update:value="onUpdateType"/>-->
    <Types :value.sync="record.type"/>
  </layout>
</template>

<script lang="ts">
import NumberPad from '@/components/money/NumberPad.vue';
import FormItem from '@/components/money/FormItem.vue';
import Tagss from '@/components/money/Tagss.vue';
import Types from '@/components/money/Types.vue';
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import moment from 'moment';
import recordListModel from '@/components/models/recordListModel';
import tagsListModel from '@/components/models/tagsListModel';

const recordStorage = recordListModel.fetch();
const tagsList = tagsListModel.fetch();

@Component({
  components: {
    NumberPad, FormItem, Tagss, Types
  }
})
export default class Money extends Vue {
  tags = tagsList;

  //收集的数据记录record
  record: RecordItem = {tags: [], notes: '', type: '_', amount: 0};
  //收集之后存入数组
  recordStorage: RecordItem[] = recordStorage;

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  // onUpdateTypes(value:string) {
  //   this.record.type = value;
  // }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  // onUpdateAmount(value:string) {
  //   this.record.amount = parseFloat(value);
  // }
////深拷贝，每次push之前复制一份
  saveRecord() {
    const deepClone: RecordItem = recordListModel.clone(this.record);
    deepClone.createdDate = moment(new Date()).format('YYYY年MM月DD日 HH:mm:ss');
    this.recordStorage.push(deepClone);//更新数据
    console.log('recordStorage');
    console.log(recordStorage);
  }

  @Watch('recordStorage')
  onRecordStorageChange() {
    recordListModel.save(this.recordStorage);//往数据里添加东西
  }
}
</script>

<style lang="scss" scoped>


</style>