<template>
  <layout classPrefix="layout" class="layout">
    <Number-pad/>
    <Tags :data-source="tags"/>
    <Types/>
  </layout>
</template>

<script lang="js">

import NumberPad from '@/components/money/NumberPad.vue';
import Tags from '@/components/money/Tags.vue';
import Types from '@/components/money/Types.vue';

export default {
  name: 'Money',
  components: {Types, Tags, NumberPad},
  data(){
    return{
      tags:['其他','服饰','餐饮','住房','交通'],
    }
  }

};
</script>

<style lang="scss" scoped>

.layout {
  min-width: 400px;

}
</style>