<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

interface Props {
  defaultOpen?: boolean
}

defineProps<Props>()
const emit = defineEmits(['close'])

const { data } = useAuth()
const isLoggedIn = computed(() => data.value?.user)
const isSubbed = computed(() => data.value?.user.is_subscribed)
const isDesktop = useMediaQuery('(min-width: 768px)')

const handleUpdateOpen = (value: boolean) => {
  if (value === false && !isSubbed.value) {
    navigateTo('/')
  }
}
</script>

<template>
  <Dialog
    v-if="isDesktop"
    :default-open="defaultOpen"
    @update:open="handleUpdateOpen"
  >
    <DialogTrigger v-show="!defaultOpen">
      <Button>Buy now</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogClose
        as-child
        class="absolute right-4 top-4 p-0.5 transition-colors rounded-md hover:bg-secondary"
      >
        <Icon name="lucide:x" />
      </DialogClose>
      <Login v-if="!isLoggedIn" />
      <StripeCheckoutButton v-else />
    </DialogContent>
  </Dialog>

  <Drawer
    v-else-if="!isDesktop"
    :default-open="defaultOpen"
    @update:open="handleUpdateOpen"
  >
    <DrawerTrigger v-show="!defaultOpen">
      <Button>Buy now</Button>
    </DrawerTrigger>
    <DrawerContent class="p-4">
      <DrawerClose
        as-child
        class="absolute right-4 top-4 p-0.5 transition-colors rounded-md hover:bg-secondary"
      >
        <Icon name="lucide:x" />
      </DrawerClose>
      <Login v-if="!isLoggedIn" />
      <StripeCheckoutButton v-else />
    </DrawerContent>
  </Drawer>
</template>
