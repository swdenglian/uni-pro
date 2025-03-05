<script setup lang="ts">
import { tabConfig } from '@/pages'
import TabBar from './TabBar.vue'

defineOptions({ name: 'AppTabBar' })
</script>

<template>
  <TabBar :items="tabConfig" />
</template>

<style scoped>

</style>
