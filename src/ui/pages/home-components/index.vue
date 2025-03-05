<script setup lang="ts">
import { Screens } from '@/route.const'
import Page from '@/ui/components/Page/Page.vue'

defineOptions({ name: 'HomeComponents' })
</script>

<template>
  <Page :nav-config="{ transparent: false, text: '组件' }" :use-tab-bar="true">
    <scroll-view :scroll-y="true" class="content">
      <uni-section title="容器组件" type="line">
        <uni-list>
          <uni-list-item show-arrow title="分页组" right-text="Pagination" link :to="Screens.ComponentsPagination" />
        </uni-list>
      </uni-section>
    </scroll-view>
  </Page>
</template>

<style scoped lang="scss">
.content {
  margin-top: 20rpx;
}
</style>
