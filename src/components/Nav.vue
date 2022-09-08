<template>
  <nav>
    <router-link :to="{name:'money'}" class="item" active-class="selected">
      <Icon name="money"/>
      记账
    </router-link>

    <router-link :to="{name:'detail'}" class="item" active-class="selected">
      <Icon name="bill"/>
      流水
    </router-link>

    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics"/>
      统计图
    </router-link>
  </nav>
</template>

<script lang="ts">

export default {
  name: 'Nav'
};
</script>

<style lang="scss">
nav {
  display: flex;
  box-shadow: 0 0 3px rgb(0, 0, 0, 0.3);
  flex-direction: row;
  font-size: 12px;
  > .item {
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2px 0;
    .icon {
      width: 30px;
      height: 30px;
    }
  }
  > .item.selected {
    color: forestgreen;
  }
}

</style>