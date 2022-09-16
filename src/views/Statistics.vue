<template>
  <layout class="statistics">
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    <ol>
      <li v-for="(group,index) in result" :key="index">
        <h3 class="title">{{ group.title }}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{ item.tags }}</span>
            <span class="notes">{{ item.notes }}</span>
            <div class="right">
              <span class="amount">￥{{ item.amount }} </span>
              <span class="date">{{ item.createdDate }}</span>
            </div>
          </li>
        </ol>
      </li>
    </ol>

  </layout>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  type = '_';
  interval = 'day';
  intervalList = intervalList;
  recordTypeList = recordTypeList;

  // eslint-disable-next-line no-undef
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',');
  }

  get recordList() {
    return this.$store.state.recordList;
  }

  get result() {
    type HashTableValue = { title: string, items: RecordItem[] };

    const {recordList} = this;
    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdDate.split(' ');
      hashTable[date] = hashTable[date] || {title: date, items: []};//初始化
      hashTable[date].items.push(recordList[i]);

    }
    return hashTable;
  }

  created() {
    this.$store.commit('fetchRecords');
  }
}
</script>

<style lang="scss" scoped>
.statistics {
  background: #F4F3F8;
}

.statistics ::v-deep .type-tabs-item {
  width: 50%;
  margin: 0;
  background: white;

  &.selected {
    background: #EBEEF3;

    &::after {
      display: none;
    }
  }

}

.statistics ::v-deep .interval-tabs-item {
  width: 33.33%;
  height: 36px;

}

%item {
  padding: 20px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
}

.title {
  //@extend %item;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
  background: #F4F3F8;
  padding: 10px 16px;
}

.record {
  @extend %item;
  background: white;
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999999;
}

.right {
  display: flex;
  flex-direction: column;

  .amount {
    display: flex;
    justify-content: center;
  }
  .date{
    font-size: 8px;
  }
}

</style>