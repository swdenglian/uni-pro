<script setup lang="ts">
import Page from '@/ui/components/Page/Page.vue'

defineOptions({ name: 'HomeComponents' })
</script>

<template>
  <Page :nav-config="{ transparent: false, text: '我的' }" :use-tab-bar="true">
    这是个人中心哦~~~
  </Page>
</template>

<style>

</style>
