import clone from '@/lib/clone';
import moment from 'moment';

const localStorageKeyName = 'recordList';

const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecords() {
    this.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    return this.recordList;
  },

  saveRecords() {
    window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
  },

  createRecord (record: RecordItem) {
    const deepClone: RecordItem = clone(record);
    deepClone.createdDate = moment(new Date()).format('YYYY年MM月DD日 HH:mm:ss');
    this.recordList?.push(deepClone);//更新数据
    recordStore.saveRecords();
  }

};

recordStore.fetchRecords();

export default recordStore;