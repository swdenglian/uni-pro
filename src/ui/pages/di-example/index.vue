<script setup lang="ts">
import type { IUserService } from '@/services/UserService'
import { USER_SERVICE_TOKEN } from '@/services/UserService'
import { container } from '@/shared/di'
import { onMounted, ref } from 'vue'

const userService = container.resolve<IUserService>(USER_SERVICE_TOKEN)
const user = ref<{ id: string, name: string } | null>(null)
const loading = ref(false)

async function loadUser() {
  loading.value = true
  try {
    user.value = await userService.getCurrentUser()
  }
  catch (error) {
    console.error('加载用户失败:', error)
    uni.showToast({
      title: '加载用户失败',
      icon: 'error',
    })
  }
  finally {
    loading.value = false
  }
}

async function updateUser() {
  if (!user.value)
    return

  loading.value = true
  try {
    const newName = `${user.value.name}_更新`
    await userService.updateUser(user.value.id, { name: newName })
    user.value.name = newName
    uni.showToast({
      title: '更新成功',
      icon: 'success',
    })
  }
  catch (error) {
    console.error('更新用户失败:', error)
    uni.showToast({
      title: '更新失败',
      icon: 'error',
    })
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  loadUser()
})
</script>

<template>
  <view class="container">
    <view class="header">
      <text class="title">
        TSyringe 依赖注入示例
      </text>
    </view>

    <view class="content">
      <view class="user-info">
        <text class="label">
          当前用户:
        </text>
        <text class="value">
          {{ user?.name || '加载中...' }}
        </text>
      </view>

      <view class="actions">
        <button
          class="btn primary"
          :disabled="loading"
          @click="loadUser"
        >
          {{ loading ? '加载中...' : '重新加载用户' }}
        </button>

        <button
          class="btn secondary"
          :disabled="loading || !user"
          @click="updateUser"
        >
          更新用户名
        </button>
      </view>

      <view class="info">
        <text class="info-text">
          这个页面演示了如何使用 TSyringe 依赖注入容器来管理服务。
          UserService 通过依赖注入容器注册和解析。
        </text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.content {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.label {
  font-weight: bold;
  color: #666;
  margin-right: 10px;
}

.value {
  color: #333;
  font-size: 16px;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.btn {
  padding: 12px 20px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.primary {
    background-color: #007aff;
    color: white;

    &:not(:disabled):hover {
      background-color: #0056cc;
    }
  }

  &.secondary {
    background-color: #f0f0f0;
    color: #333;

    &:not(:disabled):hover {
      background-color: #e0e0e0;
    }
  }
}

.info {
  padding: 15px;
  background-color: #e3f2fd;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
}

.info-text {
  color: #1976d2;
  line-height: 1.5;
  font-size: 14px;
}
</style>
