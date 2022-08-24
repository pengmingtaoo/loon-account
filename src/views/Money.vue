<template>
  <layout classPrefix="layout">
  <number-pad/>
  <tags/>
  <types/>

  </layout>
</template>

<script lang="ts">

import NumberPad from '@/components/money/numberPad.vue';
import Tags from '@/components/money/tags.vue';
import Types from '@/components/money/types.vue';
export default {
  name: 'Money',
  components: {Types, Tags, NumberPad},
};
</script>

<style lang="scss" scoped>


</style>