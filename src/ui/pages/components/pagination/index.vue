<script setup lang="ts">
import Page from '@/ui/components/Page/Page.vue'
import Pagination from '@/ui/components/Pagination/Pagination.vue'

function handleFetch(page: number, pageSize: number) {
  const baseArray = Array.from({ length: pageSize })

  return Promise.resolve(baseArray.fill(1).map((_, i) => {
    return i + (page - 1) * pageSize
  }))
}
</script>

<template>
  <Page :nav-config="{ transparent: false, text: '分页组件' }">
    <view class="content">
      <Pagination :fetch="handleFetch" :page-size="20">
        <template #item="{ item }">
          <uni-list-item :title="item.toString()" />
        </template>
      </Pagination>
    </view>
  </Page>
</template>

<style scoped lang="scss">
.content {
  flex: 1;
  overflow: hidden;
}
</style>
