<template>
  <div class="tags">
    <div class="new">
      <keep-alive include="">
        <component :is="newTag"></component>
      </keep-alive>

    </div>
    <ul class="current">
      <li>
        <div @click="select('other')">
          <span @click="changeBg">
            <Icon name="other" :style="isActive=='其他' ? selected : '' "/>
            <p>其他</p>
          </span>
        </div>
      </li>
      <li><div @click="select('shop')">
        <span @click="changeBg">
            <Icon name="shop" :style="isActive=='购物'?selected:''"/><p>购物</p></span>
      </div></li>
      <li><div @click="select('canyin')">
         <span @click="changeBg">
        <Icon name="canyin" :style="isActive=='餐饮'?selected:''"/><p>餐饮</p></span>
      </div></li>
      <li><div @click="select('house')">
        <span @click="changeBg">
        <Icon name="house" :style="isActive=='住房'?selected:''"/><p>住房</p></span>
      </div></li>
      <li><div @click="select('bus')">
        <span @click="changeBg">
        <Icon name="bus" :style="isActive=='交通'?selected:''"/><p>交通</p></span>
      </div></li>
      <li><div @click="select('clothes')">
        <span @click="changeBg">
        <Icon name="clothes" :style="isActive=='服饰'?selected:''"/><p>服饰</p></span>
      </div></li>
      <li><div @click="select('riyongpin')">
        <span @click="changeBg">
        <Icon name="riyongpin" :style="isActive=='日用品'?selected:''"/><p>日用品</p></span>
      </div></li>
      <li><div @click="select('recreation')">
        <span @click="changeBg">
        <Icon name="recreation" :style="isActive=='娱乐'?selected:''"/><p>娱乐</p></span>
      </div></li>
      <li><div @click="select('food_ingredient')">
        <span @click="changeBg">
        <Icon name="food_ingredient" :style="isActive=='食材'?selected:''"/><p>食材</p></span>
      </div></li>
      <li><div @click="select('junk_food')">
        <span @click="changeBg">
        <Icon name="junk_food" :style="isActive=='零食'?selected:''"/><p>零食</p></span>
      </div></li>
      <li><div @click="select('yanjiucha')">
        <span @click="changeBg">
        <Icon name="yanjiucha" :style="isActive=='烟酒茶'?selected:''"/><p>烟酒茶</p></span>
      </div></li>
      <li><div @click="select('study')">
        <span @click="changeBg">
        <Icon name="study" :style="isActive=='学习'?selected:''"/><p>学习</p></span>
      </div></li>
      <li><div @click="select('medical')">
        <span @click="changeBg">
        <Icon name="medical" :style="isActive=='医疗'?selected:''"/><p>医疗</p></span>
      </div></li>
      <li><div @click="select('shuidianmei')">
        <span @click="changeBg">
        <Icon name="shuidianmei" :style="isActive=='水电煤'?selected:''"/><p>水电煤</p></span>
      </div></li>
      <li><div @click="select('message')">
        <span @click="changeBg">
        <Icon name="message" :style="isActive=='通讯'?selected:''"/><p>通讯</p></span>
      </div></li>
      <li><div @click="select('red_packet')">
        <span @click="changeBg">
        <Icon name="red_packet" :style="isActive=='红包'?selected:''"/><p>红包</p></span>
      </div></li>
    </ul>
    <div class="add">
      <button>新增标签</button>
    </div>
  </div>
</template>

<script>
import other from '@/components/money/tagsIcon/other.vue';
import shop from "@/components/money/tagsIcon/shop";
import canyin from "@/components/money/tagsIcon/canyin";
import house from "@/components/money/tagsIcon/house";
import bus from "@/components/money/tagsIcon/bus";

import clothes from "@/components/money/tagsIcon/clothes";
import riyongpin from "@/components/money/tagsIcon/riyongpin";
import food_ingredient from "@/components/money/tagsIcon/food_ingredient";
import junk_food from "@/components/money/tagsIcon/junk_food";
import yanjiucha from "@/components/money/tagsIcon/yanjiucha";
import recreation from "@/components/money/tagsIcon/recreation";

import study from "@/components/money/tagsIcon/study";
import medical from "@/components/money/tagsIcon/medical";
import shuidianmei from "@/components/money/tagsIcon/shuidianmei";
import message from "@/components/money/tagsIcon/message";
import red_packet from "@/components/money/tagsIcon/red_packet";

export default {
  components: {
    other, shop, canyin, house, bus,
    clothes, riyongpin, food_ingredient, junk_food, yanjiucha,
    study, medical, shuidianmei, message, red_packet, recreation
  },
  data() {
    return {
      newTag: 'other',
      isActive: '其他',
      selected: {
        background: '#F0625A',
        color: '#fff',
        borderRadius: '50%',
      }
    }
  },
  methods: {
    select(name) {
      this.newTag = name;

    },
    changeBg(e) {
      this.isActive = e.currentTarget.innerText;
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
      align-items: center;
      flex-direction: column;
      font-size: 12px;
      color: $fc1;
      margin-bottom: 1em;
        span {
          //width: 40px;
          //height: 70px;
          display: block;
          text-align: center;
          letter-spacing: 1px;

          .icon {
            width: 40px;
            height: 40px;
            padding: 5px;
            background: #F6F6F6;
            border-radius: 50%;
          }
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

  > .new {
    height: 70px;
    padding: 5px 32px;
    display: flex;
    align-items: center;
    border-bottom: .1em solid rgb(8, 8, 8, 0.3);

    //  button {
    //    background: transparent;
    //    border: none;
    //    color: #999;
    //    border-bottom: 1px solid;
    //    padding: 0 3px;
    //  }
  }

}
</style>