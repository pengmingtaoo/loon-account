<template>
  <div class="notes">
    <span class="name">备注</span>
    <input type="text" v-model="value" placeholder="备注一下咯">
  </div>
</template>


@Component
<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  value = '';
  name = 'Note';


  @Watch('value')
  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }


}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.notes {
  background: #f5f5f5;
  display: block;
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;

  .name {
    padding-right: 16px;
  }

  input {
    padding: 16px 0;
    flex-grow: 1;
    background: transparent;
    border: none;
  }
}
</style>