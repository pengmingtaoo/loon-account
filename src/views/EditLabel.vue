<template>
  <layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click.native="goBack"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name" field-name="标签名"
                @update:value="updateTag"
                placeholder="请在这里输入标签名"/>
    </div>
    <div class="button-Wrapper">
      <Button @click.native="remove">删除标签</Button>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/money/FormItem.vue';
import Button from '@/components/Button.vue';


@Component({
  components: {FormItem, Button}
})
export default class EditLabel extends Vue {
  get tag(){
    return this.$store.state.currentTag;
  }
  created() {
    //$route获取路由的信息
    const id = this.$route.params.id;
    this.$store.commit('fetchTags');
    this.$store.commit('setCurrentTag',id);
    if (!this.tag) {
      this.$router.replace('/404');
    }
  }

  updateTag(name: string) {
    if (this.tag) {
      this.$store.commit('updateTag',{id:this.tag.id, name});
    }
  }
  remove() {
    if (this.tag) {
      this.$store.commit('removeTag',this.tag.id)
    }
  }

  goBack() {
    this.$router.back();
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

  > .title {
  }

  > .leftIcon {
    width: 24px;
    height: 24px;
  }

  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}

.form-wrapper {
  background: #EBEEF3;
  margin-top: 8px;
}

.button-Wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>