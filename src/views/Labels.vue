<template>
  <layout class="labelsLayout">
    <header>懒人记账</header>
    <main>
      <ul class="parcel">
        <li>本月支出</li>
        <li><span class="expend">暂无支出</span></li>
        <li><span>本月收入</span><span class="income">暂无收入</span></li>
        <li class="chart">
          <Icon name="statistics"/>
          查看图表分析
        </li>
      </ul>
      <div class="todayExpend">
        <span>今日支出 ￥0</span>
        <span>今日收入 ￥0</span>
      </div>
    </main>
    <footer>
      <ol class="tags">
        <li v-for="tag in tags" :key="tag">
          <div class="item">
            <div class="tag">
              <Icon name="other"/>
              {{tag}}
            </div>
            <span>99</span>
          </div>
        </li>

      </ol>
    </footer>
  </layout>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagsListModel from '@/components/models/tagsListModel';

const tags = tagsListModel.fetch();

@Component
export default class Labels extends Vue {
  tags = tagsListModel.fetch();
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.labelsLayout {
  background: #F4F3F8;

  header {
    background: #EBEEF3;
    font-size: 18px;
    padding: 10px;
    font-weight: 500;
    font-family: $font-hei;
    letter-spacing: 1px;
  }

  .parcel {
    margin: 8px 12px;
    background: #fff;

    li {
      color: #c5c5c5;
      font-size: 14px;
      padding: 5px 8px;

      .expend {
        color: #333333;
        font-size: 24px;
        font-weight: 700;
        padding-left: 10px;
      }

      .income {
        font-size: 14px;
        padding-left: 5px;
        color: #000;
      }
    }

    .chart {
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      color: #228b22;
      padding: 15px 0;
      font-size: 13px;

      .icon {
        margin: 2px 5px;
      }
    }
  }

  .todayExpend {
    margin: 20px 12px;
    color: #000;
    font-weight: 700;

    span {
      padding-right: 15px;

    }
  }

  footer {
    margin: 16px;

    li {
      padding: 12px;
      margin-bottom: 5px;
      background: #fff;

      .item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .tag {
          display: flex;
          align-items: center;
          letter-spacing: 1px;

          .icon {
            background: #F0625A;
            width: 30px;
            height: 30px;
            padding: 4px;
            border-radius: 50%;
            color: white;
            margin-right: 5px;

          }
        }

        span {
          font-weight: 700;
        }
      }
    }
  }

}

</style>