const localStorageKeyName = 'tagList';
type Tag = {
  id:string;
  name:string;
}
type TagListModel = {
  data: Tag[],
  fetch: () => Tag[],
  create: (name: string) => string //'success'||'duplicated' //联合类型
  save: () => void
}

const tagsListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem('localStorageKeyName') || '[]');
    return this.data;
  },

  save() {
    window.localStorage.setItem('localStorageKeyName', JSON.stringify(this.data));
  },
  create(name: string) {
    const names = this.data.map(item=>item.name);//names是把data里面的每一项name收集起来的集合
    if(names.indexOf(name)>=0){return 'duplicated'}
    this.data.push({id:name,name:name});
    this.save();
    return 'success';
  },
};
export default tagsListModel;