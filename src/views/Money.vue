<template>
  <layout classPrefix="layout" class="layout">
  <Number-pad/>
  <Tags/>
  <Types/>
  </layout>
</template>

<script lang="ts">

import NumberPad from '@/components/money/NumberPad.vue';
import Tags from '@/components/money/Tags.vue';
import Types from '@/components/money/Types.vue';
export default {
  name: 'Money',
  components: {Types, Tags, NumberPad},

};
</script>

<style lang="scss" scoped>

.layout{
  min-width: 400px;

}
</style>