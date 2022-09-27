<template>
  <layout class="statisticsLayout">
    <header>
      <div class="title">账单详情</div>
      <div class="record">
        <ul>
          <li v-if="interval ==='month'">本月账单</li>
          <li v-else>今年账单</li>
        </ul>
        <ul>
          <li v-if="type==='_'">总支出，￥{{ total }}</li>
          <li v-else-if="type==='+'">总收入，￥{{ total }}</li>
        </ul>
      </div>
    </header>
    <main>
      <div class-prefix="type">
        <Tabs :dataSource="recordTypeList"
              :value.sync="type" class-prefix="type"/>
      </div>
      <div class="dataChange">
        切换
        <select v-model="interval" class="bill">
          <option v-for="(t,index) in intervalList" :key="index" :value="t.value">{{ t.text }}</option>
        </select>
        账单
      </div>
      <div id="figure"></div>
    </main>
    <footer>
      <div class="caption">
        <span>支出排行榜</span>
      </div>
      <ul class="tag-list" v-if="targetRecords.length > 0">
        <li class="tag-item" v-for="(item, index) in this.groupByTag()" :key="index">
          <div class="tag-info">
            <div class="tag-icon">
              <Icon :name="item.tag.name"/>
            </div>
            <span class="tag">{{ item.tag.value }}</span>
            <span class="percentage">{{ item.percentage }}%</span>
          </div>
          <div class="amount">￥{{ item.amount }}</div>
        </li>
      </ul>
      <div v-else class="reverse">
        <Blank/>
      </div>
    </footer>
  </layout>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import intervalList from '@/constants/intervalList';
import Blank from '@/components/Blank.vue';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import {twoDecimalPlaces} from '@/lib/decimal';
import * as echarts from 'echarts';

type Group = {
  // eslint-disable-next-line no-undef
  tag: Tag;
  amount: number;
  percentage: number;
}

@Component({
  components: {Blank, Tabs}
})
export default class Statistics extends Vue {
  recordTypeList = recordTypeList;
  intervalList = intervalList;

  type = '_';
  interval: 'month' | 'year' = 'month';

  get targetRecords(): RecordItem[] {
    const now = dayjs();
    return clone<RecordItem[]>(this.$store.state.recordList).filter(item => item.type === this.type)
        .filter(item => dayjs(item.createdDate).isSame(now, this.interval));
  }

  get total() {
    const amounts = [...this.groupByInterval().values()];
    let sum = 0;
    for (let i = 0; i < amounts.length; i++) {
      sum += amounts[i];
    }
    return sum;
  }

  //时间间隔
  groupByInterval(): Map<string, number> {
    let result = new Map<string, number>();
    switch (this.interval) {
      case 'month':
        result = this.groupByMonth(this.targetRecords);
        break;
      case 'year':
        result = this.groupByYear(this.targetRecords);
        break;
    }
    return result;
  }


  groupByTag(): Group[] {
    const tags: string[] = [];
    let result: Group[] = [];
    let r: RecordItem;
    for (r of this.targetRecords) {
      const index = tags.indexOf(r.tags.name);
      if (index < 0) {
        tags.push(r.tags.name);
        result.push({tag: r.tags, amount: r.amount, percentage: 0});
      } else {
        result[index].amount += r.amount;
      }
    }

    for (let i = 0; i < result.length; i++) {
      result[i].percentage = twoDecimalPlaces(result[i].amount * 100 / this.total);
    }
    result = result.sort((b, a) => a.percentage - b.percentage);
    return result;
  }


  get days() {
    const [year, month] = [dayjs().year(), dayjs().month()];
    const d = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if ((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
      if (month === 1) {
        return 29;
      } else {
        return d[month];
      }
    } else {
      return d[month];
    }
  }

  groupByMonth(records: RecordItem[]): Map<string, number> {
    const keys: string[] = [];
    const result = new Map<string, number>();
    let i: number;
    // 初始化
    for (i = 1; i < this.days; i++) {
      keys.push(i.toString());
    }
    for (i = 0; i < keys.length; i++) {
      result.set(keys[i], 0);
    }
    let r: RecordItem;
    for (r of records) {
      const key = dayjs(r.createdDate).date().toString();
      const amount = result.get(key) as number;
      result.set(key, amount + r.amount);
    }
    return result;
  }

  groupByYear(records: RecordItem[]): Map<string, number> {
    const keys = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    const result = new Map<string, number>();
    let i: number;
    // 初始化
    for (i = 0; i < keys.length; i++) {
      result.set(keys[i], 0);
    }
    let r: RecordItem;
    for (r of records) {
      const key = keys[dayjs(r.createdDate).month()];
      const amount = result.get(key) as number;
      result.set(key, amount + r.amount);
    }
    return result;
  }


  toArray(value: number, length: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < length; i++) {
      result.push(value);
    }
    return result;
  }

  draw(data: Map<string, number>) {
    // 提取变量
    const x = [...data.keys()];
    const y = [...data.values()];
    const figure = echarts.init(document.getElementById('figure') as HTMLDivElement);
    figure.setOption({
      grid: {
        top: '5%',
        bottom: '15%'
      },
      xAxis: {
        data: x,
        axisTick: {
          interval: 0,
          lineStyle: {
            opacity: 0
          }
        },
        axisLabel: {
          interval: 0,
          fontSize: 8,
          color: '#999999'
        }
      },
      yAxis: {
        axisLine: {
          interval: 0,
          lineStyle: {
            opacity: 0
          }
        },
        splitLine: {
          lineStyle: {
            opacity: 0
          }
        },
        axisLabel: undefined,
        axisTick: undefined,
      },
      series: [{
        type: 'line',
        data: y,

      }, {
        name: '最大值',
        type: 'line',
        data: this.toArray(Math.max(...y), x.length),
        symbol: 'none',
        lineStyle: {
          color: '#999999',
          width: 1,
          opacity: 0.5
        }
      }]
    });
  }

  mounted() {
    this.draw(this.groupByInterval());
  }

  @Watch('type')
  onTypeChange() {
    this.draw(this.groupByInterval());
  }

  @Watch('interval')
  onIntervalChange() {
    this.draw(this.groupByInterval());
  }

}

</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.statisticsLayout {
  background: #F4F3F8;

  header {
    .title {
      background: #EBEEF3;
      font-size: 18px;
      padding: 10px 30px;
      font-weight: 500;
      font-family: $font-hei;
      letter-spacing: 1px;
    }

    .record {
      background: white;
      margin: 12px 4px;
      padding: 12px;
    }
  }

  main {
    position: relative;

    .type-content {
      background: #F4F3F8;

      ::v-deep .type-tabs-item {
        color: forestgreen;
        font-size: 14px;
        width: 60px;
        height: 30px;
        margin: 0 10px;
        background: #DEECEC;
        border-radius: 5px;

        &.selected {
          color: white;
          background: #0F9570;
          border-radius: 5px;

          &::after {
            display: none;
          }
        }
      }
    }

    .dataChange {
      display: inline-block;
      font-size: 14px;
      position: absolute;
      left: 10px;
      top: 5px;

      .bill {
        font-size: 14px;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        border: 0;
        color: #767676;
        background: #F4F3F8;
      }

    }

    #figure {
      max-width: 100vw;
      height: 150px;
      background: white;
      margin: 12px 4px;
      padding: 12px;
    }

  }

  footer {
    background: white;
    margin: 12px 4px;
    padding: 12px;

    .caption {
      margin-bottom: 10px;
    }

    .tag-list {

      .tag-item {
        position: relative;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        &::after {
          content: '';
          position: absolute;
          width: 100%;
          bottom: -10px;
          left: 0;
          height: 1px;
          background: #dddddd;
        }

        .tag-info {
          display: flex;
          align-items: center;

          .tag-icon {
            display: flex;
            align-items: center;
            letter-spacing: 1px;

            .icon {
              background: #F0625A;
              width: 36px;
              height: 36px;
              padding: 4px;
              border-radius: 50%;
              color: white;
              margin-right: 5px;
            }
          }

          .tag {
            margin-right: 2em;
          }

        }

        .amount {
          display: flex;
          align-items: center;
        }
      }
    }
  }

}

</style>