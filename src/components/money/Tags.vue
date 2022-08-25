<template>
  <div class="tags">
    <div class="new">
      <span class="other"><Icon name="other"/>其他</span>
    </div>
    <ul class="current">
      <li><Icon name="other" class="selected"/> 其他</li>
      <li><Icon name="shop"/>购物</li>
      <li><Icon name="canyin"/>餐饮</li>
      <li><Icon name="house"/>住房</li>
      <li><Icon name="bus"/> 交通</li>
      <li><Icon name="clothes"/>服饰</li>
      <li><Icon name="riyongpin"/>日用品</li>
      <li><Icon name="recreation"/> 娱乐</li>
      <li><Icon name="food_ingredient"/>食材</li>
      <li><Icon name="junk_food"/>零</li>
      <li><Icon name="yanjiucha"/>烟酒茶</li>
      <li><Icon name="study"/>学习</li>
      <li><Icon name="medical"/>医疗</li>
      <li><Icon name="house"/>水电煤</li>
      <li><Icon name="shuidianmei"/>交通</li>
      <li><Icon name="recreation"/>通讯</li>
      <li><Icon name="red_packet"/>人情往来</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Tags extends Vue {


  newTag = 'other';
  handle(tag:string){
    this.newTag = tag;
  }

}

</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tags {
  $c2: #F0625A;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  > .current {
    display: flex;
    flex-wrap: wrap;
    margin: 16px;
    flex-grow: 1;

    > li {
      $h: 50px;
      $c1: #BABABA;
      width: 20%;
      height: $h;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: 10px;
      color: $c1;

      .icon {
        width: 24px;
        height: 24px;
        margin-bottom: 4px;
      }

      .selected {
        color: $c2;
      }

    }
  }

  > .new {
    padding-left: 32px;
    display: flex;
    align-items: center;
    border-bottom: .2px solid rgb(8, 8, 8, 0.3);

    .other {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      .icon {
        width: 30px;
        height: 30px;
        color: $c2;
        margin-right:.5em;
      }
    }


    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 3px;
    }
  }

}
</style>