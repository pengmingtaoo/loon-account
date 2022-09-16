<template>
  <ul class="types">
    <li class="item"
        :class="{selected:value==='_',[classPrefix+'-item']:classPrefix}"
        @click="selectType('_')">支出
    </li>
    <li class="item"
        :class="{selected:value==='+',[classPrefix+'-item']:classPrefix}"
        @click="selectType('+')">收入</li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch,Prop} from 'vue-property-decorator';

@Component
export default class types extends  Vue{
  @Prop() readonly value!:string;//!不要关心初始值
  @Prop(String) classPrefix?:string;
  // type = '_'; //'_' 表示支出 '+' 表示收入
  selectType(type:string){
    if(type!=='_' && type!=='+'){
      throw  new Error('type is undefined')
    }
    this.$emit('update:value',type);
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