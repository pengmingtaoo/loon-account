<template>
  <layout classPrefix="layout" class="moneyLayout">
    <Number-pad :value.sync="record.amount" @submit="saveRecord"/>
    <FormItem field-name="备注" placeholder="请在这里输入备注"
        @update:value="onUpdateNotes"/>
    <Tagss :data-soure.sync="tagss" @update:value="onUpdateTags"/>
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
  tagss = tagsList;
  //收集的数据记录record
  record: RecordItem = {tags: [], notes: '', type: '_', amount: 0};
  //收集之后存入数组
  recordStorage: RecordItem[] = recordStorage;

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

////深拷贝，每次push之前复制一份
  saveRecord() {
    recordListModel.create(this.record)
  }

  @Watch('recordStorage')
  onRecordStorageChange() {
    recordListModel.save();//往数据里添加东西
  }
}
</script>

<style lang="scss" scoped>


</style>