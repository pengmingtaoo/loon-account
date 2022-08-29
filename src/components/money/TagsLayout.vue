<template>
  <div>
    <slot/>
  </div>

</template>

<script lang="ts">
export default {
  name: 'TagsLayout'
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.other {
  display: flex;
  align-items: center;
  font-size: 1.1em;
  font-family: $font-hei;
  letter-spacing: 2px;

  .icon {
    width: 44px;
    height: 44px;
    color: #ffff;
    margin-right: .5em;
    padding: 4px;
    border-radius: 50%;
    background: #F0625A;
  }
}
</style>