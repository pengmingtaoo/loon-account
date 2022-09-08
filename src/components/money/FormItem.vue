<template>
  <div class="formItem">
    <span class="name">{{this.fieldName}}</span>
    <input type="text" v-model="value" :placeholder="this.placeholder">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
  @Prop({default:''}) value!:string
  name = 'Note';
  @Prop({required: true}) fieldName!: string;
  @Prop({required: true}) placeholder?: string;

  @Watch('value')
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
    flex-grow: 1;
    background: transparent;
    border: none;
  }
}
</style>