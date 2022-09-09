const recordListModel = {
  data:[] as RecordItem[],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem('recordStorage') || '[]') as RecordItem[];
    return  this.data;
  },
  clone(data:RecordItem[]|RecordItem){
    return JSON.parse(JSON.stringify(data));
  },
  save() {
    window.localStorage.setItem('recordStorage', JSON.stringify(this.data));
  }
};
export default recordListModel;