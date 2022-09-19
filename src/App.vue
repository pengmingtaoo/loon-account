<template>
  <div class="account_book">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "~@/assets/style/helper.scss";
@import "~@/assets/style/reset.scss";

body{
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-family: $font-hei;
  font-size: 16px;
  line-height: 1.5;
  background: white;
}
@media (min-width: 500px) {
  #app{
    max-width: 500px;
    margin: 0 auto;
  }
}


</style>
