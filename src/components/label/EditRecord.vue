<template>
  <div class="edit">
    <header class="header">
      <button class="back" @click="back">
        <Icon name="left"/>
      </button>
      <div class="tag">
        <div class="icon">
          <Icon :name="record.tags.name"/>
        </div>
        <span>{{ record.tags.value }}</span>
      </div>
      <div class="ok" @click="ok">完成</div>
    </header>

    <main>
      <ul class="main">
        <li>
          <label class="type">
            <span class="name">类型</span>
            <div>{{ record.type === '_' ? '支出' : '收入' }}</div>
          </label>
        </li>
        <li>
          <label class="form-wrapper">
            <FormItem :value="record.amount" field-name="金额"
                      @update:value="updateAmount"/>
          </label>
        </li>
        <li>
          <label class="date">
            <span class="name">日期</span>
            <DatePicker :initial-date="dayjs(record.createdDate).toISOString()" @update:year="updateYear"
                        @update:month="updateMonth" @update:date="updateDate"/>
          </label>
        </li>
        <li>
          <label class="form-wrapper">
            <FormItem :value="record.notes" field-name="备注"
                      @update:value="updateNote"/>
          </label>
        </li>
      </ul>
      <div class="button-Wrapper">
        <Button @click="remove">删除标签</Button>
      </div>
    </main>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import FormItem from '@/components/money/FormItem.vue';
import DatePicker from '@/components/DatePicker.vue';

@Component({
  components: {FormItem, DatePicker}
})
export default class EditRecord extends Vue {
  record?: RecordItem;    //函数定义的方式，不是对象的定义；
  dayjs = dayjs;

  created() {
    this.$store.commit('setCurrentRecord', parseInt(this.$route.params.id));
    this.record = clone<RecordItem>(this.$store.state.currentRecord);
    if (!this.record) {   //这一步防止拿不到当前页面数据
      this.record = {
        id: 0,
        tags: {name: 'other', value: '其他'},
        type: '_',
        notes: '',
        amount: 0,
        createdDate: new Date()
      };
      this.$router.replace('/error');    //TODO
    }
  }

  updateAmount(amount: number) {
    if (this.record) {
      this.record.amount = amount;
    }
  }
  updateNote(note:string){
    if (this.record) {
      this.record.notes = note;
    }
  }

  updateYear(year: number) {
    if (this.record) {
      this.record.createdDate = dayjs(this.record.createdDate).year(year).toDate();
    }
  }

  updateMonth(month: number) {
    if (this.record) {
      this.record.createdDate = dayjs(this.record.createdDate).month(month - 1).toDate();
    }
  }

  updateDate(date: number) {
    if (this.record) {
      this.record.createdDate = dayjs(this.record.createdDate).date(date).toDate();
    }
  }

  back() {
    this.$router.replace('/labels');
  }

  ok() {
    if (this.record) {
      this.record.amount = parseFloat(this.record.amount.toString());
      this.$store.commit('updateRecord', {id: this.record.id, record: this.record});
    }
    this.$router.replace('/labels');
  }

  remove() {
    if (this.record) {
      this.$store.commit('removeRecord', this.record.id);
      if (this.$store.state.recordListErroe === 'notfound') {
        window.alert('该记录不存在');
      } else {
        this.$router.replace('/labels');
      }
    }
  }

}


</script>

<style lang="scss" scoped>
.edit {
  position: relative;
  height: 100vh;
}

.header {
  background: #F0625A;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 16px;
  color: white;

  .back {
    width: 32px;
    height: 32px;
    background: #F0625A;
    color: white;
    border: 0;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  .tag {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding: 5px 0;

    .icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f5f5f5;
      color: #F0625A;

      svg {
        width: 32px;
        height: 32px;
      }
    }
  }
}

.button-Wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;

  Button{
    background: #F0625A;
    border: 0;
    padding: 5px;
    border-radius: 9%;
  }
}

.main {
  font-size: 16px;

  > li {
    border-bottom: 1px solid #dddddd;

    .form-wrapper {
      color: #999999;
    }

    > label {
      display: flex;
      align-items: center;

      .name {
        color: #999999;
        margin-right: 16px;
        margin-left: 16px;
      }

      input {
        flex-grow: 1;
        height: 40px;
        border: none;
        font-size: inherit;
      }
    }

    .date, .type {
      margin: 16px 0;
    }
  }
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #dddddd;
  padding: 0 16px;

  button {
    width: 50%;
    font-size: 14px;
    padding: 4px 0;
    margin: 12px 0;

    &:first-child {
      border-right: 1px solid #dddddd;
    }

    &:last-child {
      color: #b84e52;
    }
  }
}
</style>