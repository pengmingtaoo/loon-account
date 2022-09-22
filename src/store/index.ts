import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/idCreator';
import router from '@/router';
import {types} from 'sass';
import Error = types.Error;
import {defaultExpenseTags} from '@/constants/defaulsTags';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: JSON.parse(window.localStorage.getItem('recordList') || '[]'),
    createRecordError:null,
    createTagError:null,
    tagList:  JSON.parse(window.localStorage.getItem('tagList') || '0') || defaultExpenseTags,
    currentTag: undefined,

  } as RootState,

  mutations: {
    // fetchTags(state) {
    //   state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]')as Tag[]||defaultIncomeTags;
    //
    // },
    insertTag(state,tag: Tag){   //传入的参数为tag类型，
      const names=state.tagList.map(i=>i.name);
      if(names.indexOf(tag.name)>=0){
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        state.createTagError = new Error('tag name duplicated');
        return;    //插入的标签如果重名，则返回
      }else{
        state.tagList.push(tag);
        store.commit('saveTag');
      }
    },

    saveTags(state) {
      window.localStorage.setItem('tag-list', JSON.stringify(state.tagList));
    },
    // setCurrentTag(state, id: string) {
    //   //找到路由ID
    //   state.currentTag = state.tagList.filter(t => t.id === id)[0];
    // },

    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];

    },

    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },

    createRecord(state, record: RecordItem) {
      const deepClone = clone(record);
      deepClone.createdDate = new Date();
      state.recordList.push(deepClone);//更新数据
      store.commit('saveRecords');
    }
  },
});
export default store;