<template>
  <ul class="tabs">
    <li v-for="item in dataSource" :key="item.value"
        :class="liClass(item)" @click="select(item)">
      {{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSourceItem = { text: string, value: string }

@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array})
  dataSource!: DataSourceItem[];
  @Prop() readonly value!: string;//!不要关心初始值
  @Prop(String) classPrefix?: string;

  liClass (item:DataSourceItem) {
    return{
      selected: item.value=== this.value,
      [this.classPrefix+'-tabs-item']:this.classPrefix
    }
  }

  select(item: DataSourceItem) {
    this.$emit('update:value', item.value);
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  background: #EBEEF3;
  font-size: 20px;
  display: flex;
  justify-content: center;align-items: center;

  > li {
    height: 48px;
    width: 33.33%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected::after {
      content: '';
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      height: 4px;
      background: #333;
    }
  }
}
</style>