<template>

  <div class="formItem">
    <span class="name">{{ fieldName }}</span>
    <input type="text"
           :value="value"
           @input="onValueChanged($event.target.value)"
           @blur="$emit('blur')"
           :placeholder="placeholder"/>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {

  @Prop({default: ''}) readonly value!: string;
  @Prop({required: true}) fieldName!: string;
  @Prop() placeholder?: string;

  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.formItem {

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
    border: none;
  }
}
</style>