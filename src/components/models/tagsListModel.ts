const localStorageKeyName = 'tagList';
const tagsListModel = {
  fetch() {
    return JSON.parse(window.localStorage.getItem('localStorageKeyName') || '[]') as RecordItem[];
  },
  save(data:RecordItem[]) {
    window.localStorage.setItem('localStorageKeyName', JSON.stringify(data));
  }
};
export default tagsListModel;