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
            <Icon name="other" :style="isActive=='其他' ? selected : '' "/><p>其他</p>
          </span>
        </div>
      </li>
      <li>
        <div @click="select('salary')">
        <span @click="changeBg">
            <Icon name="salary" :style="isActive=='工资'?selected:''"/><p>工资</p></span>
        </div>
      </li>
      <li>
        <div @click="select('bonus')">
         <span @click="changeBg">
        <Icon name="bonus" :style="isActive=='奖金'?selected:''"/><p>奖金</p></span>
        </div>
      </li>
      <li>
        <div @click="select('borrow_money')">
        <span @click="changeBg">
        <Icon name="borrow_money" :style="isActive=='借款'?selected:''"/><p>借款</p></span>
        </div>
      </li>
      <li>
        <div @click="select('collection')">
        <span @click="changeBg">
        <Icon name="collection" :style="isActive=='收款'?selected:''"/><p>收款</p></span>
        </div>
      </li>
      <li>
        <div @click="select('accrual')">
        <span @click="changeBg">
        <Icon name="accrual" :style="isActive=='存款利息'?selected:''"/><p>存款利息</p></span>
        </div>
      </li>
      <li>
        <div @click="select('cash_turnover')">
        <span @click="changeBg">
        <Icon name="cash_turnover" :style="isActive=='投资回收'?selected:''"/><p>投资回收</p></span>
        </div>
      </li>
      <li>
        <div @click="select('earnings')">
        <span @click="changeBg">
        <Icon name="earnings" :style="isActive=='投资收益'?selected:''"/><p>投资收益</p></span>
        </div>
      </li>
      <li>
        <div @click="select('lottery')">
        <span @click="changeBg">
        <Icon name="lottery" :style="isActive=='彩票'?selected:''"/><p>彩票</p></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

import other from '@/components/money/tagsIconIncome/other.vue';
import salary from '@/components/money/tagsIconIncome/salary.vue';
import bonus from '@/components/money/tagsIconIncome/bonus.vue';
import borrow_money from '@/components/money/tagsIconIncome/borrow_money.vue';
import collection from '@/components/money/tagsIconIncome/collection.vue';
import accrual from '@/components/money/tagsIconIncome/accrual.vue';
import cash_turnover from '@/components/money/tagsIconIncome/cash_turnover.vue';
import earnings from '@/components/money/tagsIconIncome/earnings.vue';
import lottery from '@/components/money/tagsIconIncome/lottery.vue';


@Component({
  components:
      {
        other, salary, bonus, borrow_money, collection,
        accrual, cash_turnover, earnings, lottery
      }
})
export default class Tags extends Vue {
  newTag = 'other';
  isActive = '其他';
  selected = {
    background: '#60B7FB',
    color: '#fff',
    borderRadius: '50%',
  };

  select(name: string) {
    this.newTag = name;
  }

  changeBg(e: { currentTarget: { innerText: string; }; }) {
    this.isActive = e.currentTarget.innerText;
    this.$emit('update:value', this.isActive);
  }
}

</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tags {
  $fc1: #BABABA;
  $fc2: #fff;
  $bc1: #f6f6f6;
  $bc2: #60B7FB;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  > .current {
    display: flex;
    flex-wrap: wrap;
    margin: 16px;

    > li {
      $h: 70px;
      width: 20%;
      height: $h;
      font-size: 12px;
      color: $fc1;


      span {
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

  //.add {
  //  font-size: 14px;
  //  margin-left: 1em;
  //
  //  button {
  //    border: none;
  //    background: inherit;
  //  }
  //}

  > .new {
    height: 70px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    border-bottom: .1px solid rgb(8, 8, 8, 0.3);
  }
}
</style>