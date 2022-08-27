<template>
  <div class="tags">
    <!--    <div class="new">-->
    <!--      <span class="other"><Icon name="other"/>其他</span>-->
    <!--    </div>-->
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag"
          :class="{selected:selectedTags.includes(tag)==true}"
          @click="select(tag)"><span>{{ tag }}</span></li>
      <!--      <li><Icon name="other" class="selected"/> 其他</li>-->
      <!--      <li><Icon name="shop"/>购物</li>-->
      <!--      <li><Icon name="canyin"/>餐饮</li>-->
      <!--      <li><Icon name="house"/>住房</li>-->
      <!--      <li><Icon name="bus"/> 交通</li>-->
      <!--      <li><Icon name="clothes"/>服饰</li>-->
      <!--      <li><Icon name="riyongpin"/>日用品</li>-->
      <!--      <li><Icon name="recreation"/> 娱乐</li>-->
      <!--      <li><Icon name="food_ingredient"/>食材</li>-->
      <!--      <li><Icon name="junk_food"/>零</li>-->
      <!--      <li><Icon name="yanjiucha"/>烟酒茶</li>-->
      <!--      <li><Icon name="study"/>学习</li>-->
      <!--      <li><Icon name="medical"/>医疗</li>-->
      <!--      <li><Icon name="house"/>水电煤</li>-->
      <!--      <li><Icon name="shuidianmei"/>交通</li>-->
      <!--      <li><Icon name="recreation"/>通讯</li>-->
      <!--      <li><Icon name="red_packet"/>红包</li>-->
    </ul>
    <div class="add">
      <button>新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tags extends Vue {
  @Prop(Array) dataSource: string[] | undefined;
  selectedTags: string[] = [];

  select(tag: string) {
   const index = this.selectedTags.push(tag);
   if(this.selectedTags.includes(tag)==true){
     this.selectedTags.splice(index,1);
   }else {
     this.selectedTags.push(tag);
     console.log(this);
   }
  }
}

</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tags {
  $fc1: #BABABA;
  $fc2: #fff;
  $bc1: #f6f6f6;
  $bc2: #F0625A;
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
      $h: 70px;
      width: 20%;
      height: $h;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: 12px;
      color: $fc1;
      background: $bc1;
      padding: 10px;
      border-radius: 50%;

      //.icon {
      //  width: 44px;
      //  height: 44px;
      //  margin-bottom: 4px;
      //  padding: 4px;
      //  border-radius: 50%;
      //  background: #F6F6F6;
      //}
      span {

      }

      &.selected {
        background: $bc2;
        color: $fc2;
      }
    }

  }

  .add {
    font-size: 14px;
    margin-left: 1em;

    button {
      border: none;
      background: inherit;
    }
  }

  //> .new {
  //  padding-left: 32px;
  //  display: flex;
  //  align-items: center;
  //  border-bottom: .2px solid rgb(8, 8, 8, 0.3);
  //
  //  .other {
  //    display: flex;
  //    justify-content: center;
  //    align-items: center;
  //    font-size: 14px;
  //    .icon {
  //      width: 30px;
  //      height: 30px;
  //      color: $c2;
  //      margin-right:.5em;
  //    }
  //  }


  //  button {
  //    background: transparent;
  //    border: none;
  //    color: #999;
  //    border-bottom: 1px solid;
  //    padding: 0 3px;
  //  }
  //}

}
</style>