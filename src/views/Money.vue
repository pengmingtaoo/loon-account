<template>
  <layout classPrefix="layout" class="moneyLayout">
    <Number-pad :value.sync="record.amount" @submit="saveRecord"/>
    <FormItem field-name="备注" placeholder="请在这里输入备注"
        @update:value="onUpdateNotes" :value="record.notes"/>

    <TagsList v-if="record.type === '+'" class-prefix="money" :dynamic="true" :selected-tag.sync="record.tags" :tag-list="incomeTags" />
    <TagsList v-else-if="record.type ==='_'" class-prefix="money" :dynamic="true" :selected-tag.sync="record.tags" :tag-list="tagList" />

    <Tabs :dataSource="recordTypeList" :value.sync="record.type"
    class-prefix="tabs"/>
  </layout>
</template>

<script lang="ts">
import NumberPad from '@/components/money/NumberPad.vue';
import FormItem from '@/components/money/FormItem.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import recordTypeList from '@/constants/recordTypeList';
import Tabs from '@/components/Tabs.vue';
import TagsList from '@/components/money/TagsList.vue';
import { defaultIncomeTags} from '@/constants/defaulsTags';

@Component({
  components: {
    TagsList,Tabs,NumberPad, FormItem
  },
})
export default class Money extends Vue {
  recordTypeList = recordTypeList;
  incomeTags=defaultIncomeTags;

  //收集的数据记录record
  record: RecordItem = {tags: {name:'other',value:'其他'}, notes: '', type: '_', amount: 0};

  get recordList(){
    return this.$store.state.recordList;
  }


  get tagList(){
    return this.$store.state.tagList;
  }

  // created(){
  //   this.$store.commit('fetchRecords');
  // }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

////深拷贝，每次push之前复制一份
  saveRecord() {
    if(!this.record.tags){
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
.money-tags{
  flex-grow: 1;
}
</style>