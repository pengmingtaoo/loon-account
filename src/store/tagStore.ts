import createId from '@/lib/idCreator';

const localStorageKeyName = 'tagList';

const tagStore = {
  //tag store 的仓库
  tagList: [] as Tag[],

  fetchTags() {
    this.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    return this.tagList;
  },

  createTag (name: string){
    const names = this.tagList.map(item => item.name);//names是把data里面的每一项name收集起来的集合
    if (names.indexOf(name) >= 0) {
      window.alert('标签名重复');
      return 'duplicated';
    }
    //id生成器
    const id = createId().toString();
    this.tagList.push({id, name: name});
    this.saveTags();
    window.alert('添加成功！');
    return 'success';
  },

  removeTag (id: string) {
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i;
        break;
      }
    }
    this.tagList.splice(index, 1);
    this.saveTags();
    return true;
  },

  updateTag (id: string, name: string){
    const idList = this.tagList.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const nameList = this.tagList.map(item => item.name);
      if (nameList.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.tagList.filter(item => item.id === id)[0];
        tag.name = name;
        this.saveTags();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },

  findTag(id: string) {
    return this.tagList.filter(t => t.id === id)[0];
  },

  saveTags() {
    window.localStorage.setItem('localStorageKeyName', JSON.stringify(this.tagList));
  },
};
tagStore.fetchTags();

export  default  tagStore;