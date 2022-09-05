<template>
  <ul class="types">
    <li :class="value==='_'"
        @click="selectType('_')">
      支出
    </li>
    <li :class="value==='+'"
        @click="selectType('+')">
      收入
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class types extends Vue {
  //不用管是否有初始值
  @Prop() readonly value!: string;

  // type = this.value.toString();

  selectType(type: string) {
    if (type !== '_' && type !== '+') {
      throw  new Error('type is undefined');
    }
    //没有初始值，更新默认值
    this.$emit('update:value', type);
  }
}
</script>

<style lang="scss" scoped>
.types {
  background: #EBEEF3;
  display: flex;
  text-align: center;
  font-size: 20px;
  justify-content: center;
  align-items: center;

  li {
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 0 20px;

    .selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }


}
</style>