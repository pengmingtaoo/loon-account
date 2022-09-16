<template>
  <layout class="statistics">
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    type:{{type}}<br/>
    interval:{{interval}}
  </layout>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import Types from '@/components/money/Types.vue';
import Tabs from '@/components/Tabs.vue';

@Component({
  components: {Tabs, Types}
})
export default class Statistics extends Vue {
  type = '_';
  interval='day';
  intervalList = [{text: '天', value: 'day'},
    {text: '周', value: 'week'},
    {text: '月', value: 'month'},];
  typeList=[
    {text: '支出', value: '_'},
    {text: '收入', value: '+'},
  ]
}
</script>

<style lang="scss" scoped>
.statistics ::v-deep .type-tabs-item {
  width: 50%;
  margin: 0;
  background: white;

  &.selected {
    background: #EBEEF3;

    &::after {
      display: none;
    }
  }

}
</style>