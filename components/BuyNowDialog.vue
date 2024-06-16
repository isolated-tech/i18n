<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

const emit = defineEmits(['close'])

const isOpen = ref(false)
const { data } = useAuth()
const isLoggedIn = computed(() => data.value?.user)
const isDesktop = useMediaQuery('(min-width: 768px)')
</script>

<template>
  <Dialog v-if="isDesktop" v-model:open="isOpen">
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

  <Drawer v-else-if="!isDesktop" v-model:open="isOpen">
    <DrawerTrigger as-child>
      <Avatar class="fixed top-5 right-5 cursor-pointer">
        <Icon size="20" name="lucide:user-round" />
      </Avatar>
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
