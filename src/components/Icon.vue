<template>
  <svg class="ico">
    <use :xlink:href="'#'+name"/>
  </svg>
</template>

<script lang="ts">

//接收一个requireContext对象，循环调用它的key,进行requireContext
//typescript必须要我们声明requireContext的类型
let importAll = (requireContext:__WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);

try{
  //指定要去哪个目录搜索
  importAll(require.context('../assets/icons', true, /\.svg$/));
} catch (error) {
  //如果有错，不会中断代码，会把错误打印出来
  console.log(error);
}

export default {
  name: 'Icon',
  props: ['name'],
};
</script>

<style lang="scss" scoped>
.ico {
  width: 1em;
  height: 1em;
}

.ico {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

</style>