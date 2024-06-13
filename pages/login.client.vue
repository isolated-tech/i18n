<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/app',
  },
})

const { t } = useI18n()
const { signIn } = useAuth()
</script>

<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2
        class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        {{ t('signInToYourAccount') }}
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              {{ t('emailAddress') }}
            </label>
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required=""
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Button class="w-full" type="submit" @click="() => signIn('email', {
              
            })">
              {{ t('sendMagicLink') }}
            </Button>
          </div>
        </form>

        <div>
          <div class="relative mt-10">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-200" />
            </div>
            <div
              class="relative flex justify-center text-sm font-medium leading-6"
            >
              <span class="bg-white px-6 text-gray-900">
                {{ t('orContinueWith') }}
              </span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              class="flex gap-3"
              @click="() => signIn('github')"
            >
              <Icon name="mdi:github" class="h-5 w-5" />
              <span class="text-sm font-semibold leading-6">GitHub</span>
            </Button>

            <Button variant="outline" @click="() => signIn('twitter')">
              <Icon name="fa6-brands:x-twitter" class="h-5 w-5"></Icon>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
