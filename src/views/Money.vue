<template>
  <layout classPrefix="layout" class="layout">
    <Number-pad @update:value="onUpdateNumberPad"/>
    <Notes  @update:value="onUpdateNotes"/>
    <Tags @update:value="onUpdateTags"/>
<!--    <Types :value="record.type" @update:value="onUpdateType"/>-->
    {{record}}
    <Types :value.sync="record.type"/>
  </layout>

</template>

<script lang="ts">

import NumberPad from '@/components/money/NumberPad.vue';
import Tags from '@/components/money/Tags.vue';
import Types from '@/components/money/Types.vue';
import Notes from '@/components/money/Note.vue';

import Vue from 'vue';
import {Component} from 'vue-property-decorator';

type Record = {
  tags:string
  notes:string
  type:string
  amount:number
}

@Component({
  components: {Notes,Types, Tags, NumberPad}
})
export default class Money extends Vue{
  record:Record = {tags:'其他',notes:'',type:'-',amount:0 }
  name='Money';



  onUpdateTags(value:string){
    this.record.tags = value;
  }
  onUpdateNotes(value:string){
    this.record.notes = value;
  }
  // onUpdateType(value:string){
  //   this.record.type = value;
  // }
  onUpdateNumberPad(value:string){
    this.record.amount = parseFloat(value);
  }
}
</script>

<style lang="scss" scoped>

.layout {
  //min-width: 300px;

}
</style>