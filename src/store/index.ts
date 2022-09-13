import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import moment from 'moment';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[]
  },
  mutations: {
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