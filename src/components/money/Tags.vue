<template>
  <div class="tags">
    <div class="fixed">
      <header class="header">
        <div class="title">
          <button class="back" @click="back">
            <Icon name="left"/>
          </button>
          <span>添加支出类别</span>
        </div>
        <Button class="ok" @click="ok">完成</Button>
      </header>
      <div class="current">
        <div class="label">
          <span>选中标签: </span>
          <div class="icon">
            <Icon :name="tag.name"/>
          </div>
        </div>
        <span>{{ tag.value }}</span>
      </div>
    </div>
    <div class="content">
      <div class="food">
        <div class="kind-name">
          餐饮
        </div>
        <TagsList class-prefix="main" :tag-list="foodTags" :selected-tag.sync="tag"/>
      </div>
      <div class="shopping">
        <div class="kind-name">
          购物
        </div>
        <TagsList class-prefix="main" :tag-list="shopTags" :selected-tag.sync="tag"/>
      </div>
      <div class="transport">
        <div class="kind-name">
          交通
        </div>
        <TagsList class-prefix="main" :tag-list="transportTags" :selected-tag.sync="tag"/>
      </div>
      <div class="house">
        <div class="kind-name">
          居住
        </div>
        <TagsList class-prefix="main" :tag-list="houseTags" :selected-tag.sync="tag"/>
      </div>
      <div class="entertainment">
        <div class="kind-name">
          娱乐
        </div>
        <TagsList class-prefix="main" :tag-list="amusementTags" :selected-tag.sync="tag"/>
      </div>
      <div class="medical">
        <div class="kind-name">
          医疗
        </div>
        <TagsList class-prefix="main" :tag-list="medicalTags" :selected-tag.sync="tag"/>
      </div>
      <div class="study">
        <div class="kind-name">
          学习
        </div>
        <TagsList class-prefix="main" :tag-list="studyTags" :selected-tag.sync="tag"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import TagsList from '@/components/money/TagsList.vue';
import {
  foodTags,
  shopTags,
  transportTags,
  houseTags,
  amusementTags,
  medicalTags,
  studyTags,
} from '@/constants/defaulsTags';
import clone from '@/lib/clone';

@Component({
  components: {TagsList}
})
export default class Label extends Vue {
  // eslint-disable-next-line no-undef
  tag: Tag = { name: 'other', value: '其他' };
  foodTags = foodTags;
  shopTags = shopTags;
  transportTags = transportTags;
  houseTags = houseTags;
  amusementTags = amusementTags;
  medicalTags = medicalTags;
  studyTags = studyTags;


  back() {
    this.$router.replace('/SettingTag');
  }

  ok() {
    this.$store.commit('insertTag', this.tag);
    if (this.$store.state.createTagError) {
      if (this.$store.state.createTagError.message === "duplicated") {
        this.$router.replace('/SettingTag');
        return; 
      }
    }
    else {
      this.$router.replace('/SettingTag');
    }
  }
}
</script>

<style lang="scss" scoped>

@mixin icon($color) {
  background: white;
  border: 1px solid transparent;
  color: $color;
  svg {
    width: 24px;
    height: 24px;
  }
  &.selected {
    background: #F0625A;
  }
}

.fixed {
  background: white;
  max-width: 500px;

}

.header {
  background: #F0625A;
  color: white;
  font-size: 20px;
  line-height: 24px;
  padding: 16px 10px;
  border-bottom: 1px solid #dddddd;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    display: flex;
    align-items: center;

    .back {
      svg {
        width: 24px;
        height: 24px;
        background: #F0625A;
        color: #fff;
      }

      border: none;
      margin-right: 8px;
      background: #F0625A;
    }
  }

  .ok {
    font-size: 16px;
    color: white;
    border: none;
    background: inherit;
  }
}

.current {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  box-shadow: inset 0 -1px 1px -1px rgba(0, 0, 0, 0.3);

  .label {
    display: flex;
    align-items: center;
     span{
       margin-right: 5px;
     }

    .icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #F0625A;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 4px;

    }
  }
}

.content {
  padding-top: 10px;
}

.kind-name {
  font-size: 14px;
  display: flex;
  justify-content: center;
  color: #999999;
}
</style>