import recordListModel from '@/components/models/recordListModel';
import tagsListModel from '@/components/models/tagsListModel';

const store = {
  //record store
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => recordListModel.create(record),


  //tag store 的仓库
  tagList: tagsListModel.fetch(),
  createTag: (name: string) => {
    if (name) {
      const message = tagsListModel.create(name);
      if (message === 'duplicated') {
        window.alert('标签名重复');
      } else if (message === 'success') {
        window.alert('添加成功！');
      }
    }
  },
  removeTag: (id: string) => {
    return tagsListModel.remove(id);
  },
  updateTag: (id: string, name: string) => {
    return tagsListModel.update(id, name);
  },
  findTag (id: string) {
    return this.tagList.filter(t => t.id === id)[0];
  }
};

export  default store