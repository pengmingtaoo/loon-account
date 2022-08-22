<template>
  <div class="nav">
    <routerLink to="/money"><Icon name="money" /> 记账</routerLink>
    |
    <router-link to="/labels"><Icon name="label" /> 标签</router-link>
    |
    <router-link to="/statistics"><Icon name="statistics" /> 统计图</router-link>
  </div>
</template>

<script lang="ts">

export default {
  name: 'Nav'
};
</script>

<style lang="scss">
  .nav{
    border: 1px solid red;
  }
</style>