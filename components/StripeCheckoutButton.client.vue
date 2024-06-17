<script setup lang="ts">
import { PRICE_LOOKUP_KEY } from '@/lib/constants'

const loading = ref(false)
const { t } = useI18n()

const createStripeCheckoutSession = async () => {
  loading.value = true
  const res = await $fetch('/api/stripe/create-checkout-session', {
    method: 'POST',
    body: {
      lookup_key: PRICE_LOOKUP_KEY,
    },
  })

  if (res) {
    loading.value = false
    await navigateTo(res.url, {
      external: true,
    })
  }
}
</script>

<template>
  <Icon
    v-if="loading"
    name="line-md:loading-twotone-loop"
    class="animate-spin"
  />
  <Button v-else size="sm" @click="createStripeCheckoutSession">
    {{ t('stripeCheckingButton.buyNow') }}
  </Button>
</template>
