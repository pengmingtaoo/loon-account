<template>
    <ul class="types">
      <li :class="type==='_' && 'selected' "
          @click="selectType('_')">支出</li>
      <li :class="type==='+' && 'selected' "
          @click="selectType('+')">收入</li>
    </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';

@Component
export default class Types extends  Vue{

  type = '_' //'_' 表示支出 '+' 表示收入
  selectType(type:string){
    if(type!=='_' && type!=='+'){
      throw  new Error('type is undefined')
    }
    this.type = type;
  }
}
</script>

<style lang="scss" scoped>
.types {
  background: #EBEEF3;
  display: flex;
  text-align: center;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  > li {
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 0 20px;

    &.selected::after {
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