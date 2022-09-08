<template>
  <layout>
    <div>
      <Icon name="left"/>
      <span>编辑标签</span>
    </div>

  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagsListModel from '@/components/models/tagsListModel';

@Component
export default class EditLabel extends Vue{
  name= 'EditLabel';
  created(){
    const id = this.$route.params.id;//$route获取路由的信息
    tagsListModel.fetch();
    const tags = tagsListModel.data;
    const tag = tags.filter(t => t.id===id)[0];
    if(tag){
      console.log(tag);
    }else{
      // this.$router.push('/404');
      this.$router.replace('/404');
      //replace可以回退
    }
  }
}
</script>

<style lang="scss" scoped>

</style>