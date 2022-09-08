<template>
  <layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem field-name="标签名" placeholder="请在这里输入标签名"/>
    </div>
    <div class="button-Wrapper">
      <Button>删除标签</Button>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagsListModel from '@/components/models/tagsListModel';
import FormItem from '@/components/money/FormItem.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {FormItem, Button}
})
export default class EditLabel extends Vue {
  name = 'EditLabel';

  created() {
    const id = this.$route.params.id;//$route获取路由的信息
    tagsListModel.fetch();
    const tags = tagsListModel.data;
    const tag = tags.filter(t => t.id === id)[0];
    if (tag) {
      console.log(tag);
    } else {
      // this.$router.push('/404');
      this.$router.replace('/404');
      //replace可以回退
    }
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: #EBEEF3;
  display: flex;
  align-content: center;
  justify-content: space-between;

  > .title {}

  > .leftIcon {
    width: 24px;
    height: 24px;
  }

  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.form-wrapper{
  background: #EBEEF3;
  margin-top: 8px;
}
.button-Wrapper{
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>