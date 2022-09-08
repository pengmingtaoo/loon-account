type Tag = {
  id: string,
  name: string
}
type TagListModel = {
  data: Tag[],
  fetch: () => Tag[],
  create: (name: string) => string, //'success'||'duplicated' //联合类型
  save: () => void,
  update: (id: string, name: string) => string,
}

const tagsListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    return this.data;
  },

  save() {
    window.localStorage.setItem('tagList', JSON.stringify(this.data));
  },
  create(name: string) {
    const names = this.data.map(item => item.name);//names是把data里面的每一项name收集起来的集合
    if (names.indexOf(name) >= 0) {
      return 'duplicated';
    }
    this.data.push({id: name, name: name});
    this.save();
    return 'success';
  },
  update(id, name) {
    const idList = this.data.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const nameList = this.data.map(item => item.name);
      if(nameList.indexOf(name)>=0){
        return 'duplicated';
      }else{
        const tag = this.data.filter(item =>item.id===id)[0];
        tag.name = name;
        this.save();
        return 'success'
      }
    } else {
      return 'not found';
    }
  },
};
export default tagsListModel;