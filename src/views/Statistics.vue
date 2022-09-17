<template>
  <layout class="statistics">
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <ol>
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">{{ beautify(group.title) }} <span>￥{{group.total}}</span></h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{ item.tags }}</span>
            <span class="notes">{{ item.notes }}</span>
            <div class="right">
              <span class="amount">￥{{ item.amount }} </span>
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
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  type = '_';
  recordTypeList = recordTypeList;

  // eslint-disable-next-line no-undef
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',');
  }

  get recordList() {
    // eslint-disable-next-line no-undef
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const {recordList} = this;
    if(recordList.length===0){return [];}

    const newList = clone(recordList).filter(r=>r.type===this.type).sort((a,b) => dayjs(b.createdDate).valueOf() - dayjs(a.createdDate).valueOf());

    type Result = {title:string,total?:number,items:RecordItem[]}[];

    const result:Result = [{title:dayjs(newList[0].createdDate).format('YYYY-MM-DD'),items:[newList[0]]}];
    for(let i=1;i<newList.length;i++){
      const current = newList[i];
      const last = result[result.length-1];
      if(dayjs(last.title).isSame(dayjs(current.createdDate),'day')){
        last.items.push(current);
      }else{
        result.push({title: dayjs(current.createdDate).format('YYYY-MM-DD'),items: [current]});
      }
    }
    result.map(group =>{
      group.total = group.items.reduce((sum,item)=> {return  sum+item.amount},0);
    });

    return result;
  }
  created() {
    this.$store.commit('fetchRecords');
  }

  beautify(string:string){
    const day = dayjs(string);
    const now = dayjs();
    if(day.isSame(now,'day')){
      return '今天';
    }else if(day.isSame(now.subtract(1,'day'),'day')){
      return '昨天';
    }else if(day.isSame(now.subtract(2,'day'),'day')){
      return '前天';
    }else if(day.isSame(now,'year')){
      return day.format('M月D日');
    }else{
      return day.format('YYYY年MM月DD日');
    }
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
  margin-right: 16px;
  margin-left: 16px;
  color: #999999;
  overflow-y: hidden;
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