<script setup lang="ts">
const { t } = useI18n()
const { signOut } = useAuth()
</script>

<template>
  <DialogHeader>
    <DialogTitle>{{ t('accountSettings') }}</DialogTitle>
  </DialogHeader>
  <div className="grid grid-cols-1 gap-6"></div>

  <DialogFooter class="pt-4">
    <Button @click="() => signOut({ redirect: false })">
      {{ t('signOut') }}
    </Button>
  </DialogFooter>
</template>
