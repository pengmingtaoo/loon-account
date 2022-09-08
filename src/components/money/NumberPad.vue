<template>
  <div class="numberPad">
    <div class="output">{{ money }}{{ output }}</div>
    <div class="buttons">
      <button @click="inputConent">1</button>
      <button @click="inputConent">2</button>
      <button @click="inputConent">3</button>
      <button @click="remove">
        <Icon name="delete"/>
      </button>
      <button @click="inputConent">4</button>
      <button @click="inputConent">5</button>
      <button @click="inputConent">6</button>
      <button @click="ok" class="ok">确定</button>
      <button @click="inputConent">7</button>
      <button @click="inputConent">8</button>
      <button @click="inputConent">9</button>
      <button @click="clear">清零</button>
      <button class="zero" @click="inputConent">0</button>
      <button @click="inputConent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component,Prop} from 'vue-property-decorator';

@Component
export default class numberPad extends Vue {
  @Prop() readonly value!:number;
  money = '￥';
  output = this.value.toString();

  inputConent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement);
    const input = button.textContent as string;
    if (this.output.length === 16) {
      return;
    }
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf('.') >= 0 && input === '.') {
      return;
    }
    this.output += input;
  }

  remove() {
    if(this.output.length ===1){
      this.output = '0';
    }else{
      this.output= this.output.slice(0, -1);
    }
  }

  ok() {
   this.$emit('update:value',this.output);
    this.$emit('submit',this.output);
    this.output = '0';
  }

  clear() {
    this.output = '0';
  }
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

    > .name {
      padding-right: 16px;
    }

    > input {
      padding: 16px 0;
      flex-grow: 1;
      background: transparent;
      border: none;
    }
  }

  .output {
    font-size: 20px;
    font-family: $font-hei;
    text-align: right;
    margin-right: 0;
    min-height: 46px;
    padding: 6px 10px;
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
        border-bottom: .5px solid $c;
        border-right: .5px solid $c;
      }

      &:nth-child(4) {
        border-bottom: .5px solid $c;
      }
    }
  }

}
</style>