<template>
  <div class="numberPad">
    <div>
      <lable class="notes">
        <span class="name">备注</span>
        <input type="text" v-model="value" placeholder="请输入备注">
      </lable>
    </div>
    <div class="buttons">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>
        <Icon name="delete"/>
      </button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button class="ok">确定</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>清零</button>
      <button>0</button>
      <button>.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class numberPad extends Vue {
  name= 'numberPad';
  value = '';
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  .notes {
    background: #f5f5f5;
    display: block;
    font-size: 14px;
    padding-left: 16px;
    display: flex;
    align-items: center;

    >.name {
      padding-right: 16px;
    }

    >input {
      padding: 16px 0;
      flex-grow: 1;
      background: transparent;
      border: none;
    }
  }

  > .buttons {
    @extend %clearFix;
    $h2: 8vh;

    > button {
      width: 25%;
      height: $h2;
      float: left;
      background: #EBEEF3;
      border: none;

      &.ok {
        height: $h2*3;
        float: right;
      }

      .icon {
        width: 30px;
        height: 30px;
      }

      $c: #fff;

      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(5),
      &:nth-child(6),
      &:nth-child(7),
      &:nth-child(9),
      &:nth-child(10),
      &:nth-child(11),
      &:nth-child(12),
      &:nth-child(13),
      &:nth-child(14), {
        border-bottom: 1px solid $c;
        border-right: 1px solid $c;
      }

      &:nth-child(4) {
        border-bottom: 1px solid $c;
      }
    }
  }

}
</style>