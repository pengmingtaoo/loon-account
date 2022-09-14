<template>
  <layout>
    <div class="tags">
      <router-link v-for="tag in tags" :key="tag.id" :to="`/detail/edit/${tag.id}`" class="tag">
        <span>{{tag.name}}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click.native="createTag">新建标签</Button>
<!--      natie 原生的natie事件，监听button的点击事件-->
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';


@Component({
  components:{Button},
  computed:{
    tags(){
     return  this.$store.state.tagList;
    }
  },
})
export default class Detail extends Vue {

  beforeCreate(){
    this.$store.commit('fetchTags');
  }

  createTag(){
    const name  = window.prompt('请输入标签名！');
    if (!name) {
      return window.alert('标签名不能为空！');
    }
    this.$store.commit('createTag',name);
  }

}
</script>

<style lang="scss" scoped>
.tags {
  background: #EBEEF3;
  font-size: 16px;
  padding-left: 16px;

  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;

    svg {
      width: 18px;
      height: 18px;
      color: #333;
      margin-right: 16px;
    }
  }
}

.createTag {
  //background: #767676;
  //color: white;
  //border-radius: 4px;
  //border: none;
  //height: 40px;
  //padding: 0 16px;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;

  }
}

</style>