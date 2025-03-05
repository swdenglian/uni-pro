<script setup lang="ts">
import Page from '@/ui/components/Page/Page.vue'

defineOptions({ name: 'HomeIndex' })
</script>

<template>
  <Page :nav-config="{ transparent: false, text: '首页' }" :use-tab-bar="true">
    这是首页哦~~~
  </Page>
</template>

<style>

</style>
