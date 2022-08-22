<template>
  <div class="nav">
    <routerLink to="/money">记账</routerLink>
    |
    <router-link to="/labels">标签</router-link>
    |
    <router-link to="/statistics">统计图</router-link>
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