import createId from '@/lib/idCreator';

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
    //id生成器
    const id = createId().toString();

    this.data.push({id, name: name});
    this.save();
    return 'success';
  },
  update(id, name) {
    const idList = this.data.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const nameList = this.data.map(item => item.name);
      if (nameList.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.data.filter(item => item.id === id)[0];
        tag.name = name;
        this.save();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },
  remove(id: string) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }
    this.data.splice(index, 1);
    this.save();
    return true;
  },
};
export default tagsListModel;