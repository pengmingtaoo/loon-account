import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import moment from 'moment';
import createId from '@/lib/idCreator';

Vue.use(Vuex);
type RootState = {
  recordList: RecordItem[],
  tagList: Tag[],
  currentTag?: Tag,
}

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
    currentTag: undefined,
  } as RootState,
  mutations: {
    fetchTags(state) {
      const tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      state.tagList = tagList;
    },
    createTag(state, name: string) {
      const names = state.tagList.map(item => item.name);//names是把data里面的每一项name收集起来的集合
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复');
      }
      //id生成器
      const id = createId().toString();
      state.tagList.push({id, name: name});
      store.commit('saveTags');
      window.alert('添加成功！');
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },

    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },


    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];

    },

    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },

    createRecord(state, record: RecordItem) {
      const deepClone: RecordItem = clone(record);
      deepClone.createdDate = moment(new Date()).format('YYYY年MM月DD日 HH:mm:ss');
      state.recordList?.push(deepClone);//更新数据
      console.log(state.recordList);
      store.commit('saveRecords');
    }
  },
});
export default store;