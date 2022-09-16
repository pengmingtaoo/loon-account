<template>
  <layout class="statistics">
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    type:{{ type }}<br/>
    interval:{{ interval }}
  </layout>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  type = '_';
  interval = 'day';
  intervalList=intervalList;
  recordTypeList = recordTypeList;
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
.statistics ::v-deep .interval-tabs-item {
  width: 33.33%;
}

</style>