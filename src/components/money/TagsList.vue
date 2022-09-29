<template>
  <ul class="tags" :class="`${classPrefix}-tags`" >
    <li v-for="(tag,index) in tagList" :key="index" @click="select(tag)" class="tags-item" >
      <div class="tags-item-icon" :class="{selected: tag.name === selectedTag.name && `${classPrefix}-tags-item-icon`}">
        <Icon :name='tag.name' />
      </div>
      <span>{{tag.value}}</span>
    </li>
    <li v-if="dynamic" class="tags-item">
      <div class="tags-item-icon" @click="add">
        <Icon name="setting" />
      </div>
      <span>设置</span>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';


@Component
export default class TagsList extends Vue {
  @Prop(String) classPrefix?: string;

  // eslint-disable-next-line no-undef
  @Prop({required: true,type: Object}) selectedTag!: Tag;
  @Prop({required: true,default: false}) dynamic!: boolean;
  // eslint-disable-next-line no-undef
  @Prop({required: true,type: Array}) tagList!: Tag[];

  // eslint-disable-next-line no-undef
  select(tag: Tag){
    this.$emit('update:selectedTag',tag);
  }

  add(){
    this.$router.replace('/tag/SettingTag/',);  //TODO
  }
  created() {
    this.$store.commit('fetchTags');
  }
}
</script>

<style lang="scss" scoped>
.tags {
  padding: 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;
  &-item {
    width: 20%;
    padding: 12px 0;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &-icon {
      width: 48px;
      height: 48px;
      padding: 4px;
      border-radius: 50%;
      background: #f5f5f5;
      margin-bottom: 4px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &.selected {
        background: #F0625A;

        svg {
          width: 30px;
          height: 30px;
          color:white
        }
      }
      svg {
        width: 30px;
        height: 30px;
        color:rgb(128, 130, 131)
      }
    }
  }
}
</style>