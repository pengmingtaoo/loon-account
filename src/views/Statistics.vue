<template>

    <layout>
      <p>Statistics</p>
      <input type="text"   @input="onUpdateNotes($event.target.value)">
    </layout>

</template>

<script lang="ts">

import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Money extends Vue {
  // @Prop({default: ''}) readonly value!: string;

  onUpdateNotes(value: string) {
    console.log(value);
  }
}
</script>

<style lang="scss" scoped>

</style>