import moment from 'moment';
import clone from '@/lib/clone';

const recordListModel = {
  data:[] as RecordItem[],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    return  this.data;
  },
  save() {
    window.localStorage.setItem('recordList', JSON.stringify(this.data));
  },
  create(record:RecordItem) {
    const deepClone: RecordItem = clone(record);
    deepClone.createdDate = moment(new Date()).format('YYYY年MM月DD日 HH:mm:ss');
    this.data.push(deepClone);//更新数据
    this.save();
  }
};
export default recordListModel;