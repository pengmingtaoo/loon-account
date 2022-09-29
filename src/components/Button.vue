<template>
  <button class="button">
    <slot/>
  </button>
</template>

<script lang="ts">
export default {
  name: 'Botton'
}
</script>

<style lang="scss" scoped>
.button {
  background: #F0625A;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  margin-top: 44-16px;

}
</style>