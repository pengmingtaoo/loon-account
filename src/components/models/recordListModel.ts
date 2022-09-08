
const recordListModel = {
  fetch() {
    return JSON.parse(window.localStorage.getItem('recordStorage') || '[]') as RecordItem[];
  },
  clone(data:RecordItem[]|RecordItem){
    return JSON.parse(JSON.stringify(data));
  },
  save(data:RecordItem[]) {
    window.localStorage.setItem('recordStorage', JSON.stringify(data));
  }
};
export default recordListModel;