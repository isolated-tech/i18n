<script setup lang="ts">
const loading = ref(false)
const { t } = useI18n()
const { data } = useAuth()
const isSubbed = computed(() => data.value?.user.is_subscribed)

const plan = computed(() => {
  return isSubbed.value ? t('pro') : t('free')
})
</script>

<template>
  <div className="flex flex-col justify-between gap-y-4">
    <div class="space-y-2 mt-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{{ t('currentStatus') }}</span>
        <span className="text-sm">{{ plan }}</span>
      </div>
    </div>
    <Icon
      v-if="loading"
      name="line-md:loading-twotone-loop"
      class="animate-spin"
    />

    <StripeCheckoutButton v-else-if="!isSubbed" />
  </div>
</template>
