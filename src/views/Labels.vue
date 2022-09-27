<template>
  <layout class="labelsLayout">
    <header>懒人记账</header>
    <main>
      <ul class="parcel">
        <li class="monthIncome">
          <span>本月支出</span>
          <div class="calendar">
            <div class="slideYear">
              <select v-model="year" class="year">
                <option v-for="y in years" :key="y" :value="y">{{ y }}年</option>
              </select>
            </div>

            <div class="month">
              <select v-model="month" class="mh">
                <option v-for="m in 12" :key="m" :value="m">{{ beautifyMonth(m) }}</option>
              </select>
              <span>月</span>
            </div>
          </div>
        </li>
        <li>
          <span class="expend">{{ this.totalExpense.toString().split('.')[0] || 0 }}</span>
          <span class="expend">.{{ this.totalExpense.toString().split('.')[1] || '00' }}</span>
        </li>
        <li>
          <span class="inMonth">本月收入</span>
          <span class="income">{{ this.totalIncome.toString().split('.')[0] || 0 }}</span>
          <span class="income">.{{ this.totalIncome.toString().split('.')[1] || '00' }}</span>
        </li>
        <li class="chart">
          <router-link to="/statistics">
          <Icon name="statistics"/>
          查看图表分析
          </router-link>
        </li>
      </ul>
    </main>
    <footer>
      <ol class="tags"  v-if="groupList.length>0">
        <li class="list-top" v-for="(group,index) in groupList" :key="index">
          <h3 class="title">{{ beautify(group) }}</h3>

          <router-link
              :to="`/record/edit/${item.id}`" class="item"
              v-for="(item,index) in group.items" :key="index">
            <div class="items">
              <div class="tag">
                <Icon :name="item.tags.name"/>
              </div>
              <div class="content">
                <div class="middle">
                  <span class="tValue">{{ item.tags.value }}</span>
                  <span class="notes">{{ item.notes }}</span>
                </div>
                <span class="amount">{{ getAmount(item) }}</span>
              </div>
            </div>
          </router-link>
        </li>
      </ol>
      <div v-else class="reverse">
        <Blank/>
      </div>
    </footer>
  </layout>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import clone from '@/lib/clone';
import dayjs from 'dayjs';
import Blank from '@/components/Blank.vue';

type Group = {
  name: string;
  items: RecordItem[];
}
@Component({
  components: {Blank}
})
export default class Labels extends Vue {

  year = window.localStorage.getItem('year') || dayjs().year().toString();
  month = window.localStorage.getItem('month') || (dayjs().month() + 1).toString();

  get years() {   //自己封装一个日期选择器；
    const endYear = dayjs().year();
    let y = 1970;
    const result: number[] = [];
    while (y <= endYear) {
      result.unshift(y);
      y++;
    }
    return result;
  }

  get recordList() {
    // eslint-disable-next-line no-undef
    return (this.$store.state as RootState).recordList;
  }

  get groupList() {
    const {recordList} = this;
    //进行排序
    const newList = clone(recordList).filter(item => (dayjs(item.createdDate)
        .year() === parseInt(this.year)) && (dayjs(item.createdDate).month() + 1 === parseInt(this.month)))
        .sort((a, b) => dayjs(b.createdDate).valueOf() - dayjs(a.createdDate).valueOf());

    if (newList.length === 0) {return [];}

    const result: Group[] = [];//存数据
    const names: string[] = [];//存时间

    let record: RecordItem;

    for (record of newList) {
      let date: string; //存储
      if (this.year === dayjs().year().toString()) {
        date = dayjs(record.createdDate).toISOString().split('T')[0];
      } else {
        date = dayjs(record.createdDate).format('YYYY-MM-DD');
      }
      const index = names.indexOf(date);
      if (index < 0) {
        names.push(date);
        result.push({name: date, items: [record]});
      } else {
        result[index].items.push(record);
      }
    }
    return result;
  }

  get totalIncome() {
    let total = 0;
    let group: Group;
    for (group of this.groupList) {
      let record: RecordItem;
      for (record of group.items) {
        if (record.type === '+') {
          total += record.amount;
        } else {
          continue;
        }
      }
    }
    return total;
  }

  get totalExpense() {
    let total = 0;
    let group: Group;
    for (group of this.groupList) {
      let record: RecordItem;
      for (record of group.items) {
        if (record.type === '_') {
          total += record.amount;
        } else {
          continue;
        }
      }
    }

    return total;
  }


  beautifyMonth(m: number) {
    return m < 10 ? '0' + m.toString() : m.toString();
  }

  getAmount(record: RecordItem) {
    if (record.type === '+') {
      return record.amount;
    } else {
      return -record.amount;
    }
  }

  beautify(group: Group) {
    const day = dayjs(group.name);
    const now = dayjs();
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年MM月DD日');
    }
  }

  @Watch('year')
  saveYear(year: string) {
    window.localStorage.setItem('year', year);
  }

  @Watch('month')
  saveMonth(month: string) {
    window.localStorage.setItem('month', month);
  }

}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.noResult{
  padding: 16px;
  text-align: center;
}

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
    }

    .monthIncome {
      display: flex;
      justify-content: space-between;

      .calendar {
        display: flex;
        max-width: 200px;

        .year {
          font-size: 12px;
          color: #c7c6c3;
          border: 0;
          padding-right: 6px;
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
        }

        .month {
          display: inline-block;
          font-size: 12px;

          .mh {
            border: 0;
            padding: 3px;
            font-size: 15px;
            appearance: none;
            -moz-appearance: none;
            -webkit-appearance: none;

          }

          select {
            font-size: 16px;
          }
        }
      }

    }

    .expend {
      color: #333333;
      font-size: 24px;
      font-weight: 700;

    }

    .inMonth {
      margin-right: 7px;
    }

    .income {
      font-size: 14px;
      color: #000;
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
  margin: 0 12px;

  .tags {

    .list-top {
      .title {
        padding: 5px 12px;
        padding-top: 0;
        background: #F4F3F8;
        font-size: 14px;
      }
    }

    .items {
      padding: 5px;
      background: #fff;
      margin-bottom: 10px;
      display: flex;


      .tag {
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

      .content {
        display: flex;
        justify-content: space-between;
        min-height: 50px;
        width: 100vw;

        .middle {
          max-width: 220px;
          display: flex;
          flex-direction: column;


          .tValue, .notes {
            font-size: 14px;
            margin: 2px;
            font-family: $font-hei;
            color: #333;
            font-weight: 500;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .notes {
            color: #999999;
            font-size: 12px;
            margin-left: 5px;
          }


        }

        .amount {
          display: flex;
          align-items: center;

        }
      }

      span {
        font-weight: 700;

      }
    }
  }
}


</style>