<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast'
import { ArrowLeftIcon } from '@heroicons/vue/20/solid'

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})

const { t } = useI18n()
const { signIn } = useAuth()
const { toast } = useToast()
const emailInput = ref<string>()

const handleMagicLink = () => {
  if (!emailInput.value?.length) {
    toast({
      title: t('login.emailRequired'),
      description: t('login.checkYourEmailForLoginLink'),
    })
  } else {
    signIn('email', {
      email: emailInput.value,
      redirect: false,
    })

    toast({
      title: t('login.linkSent'),
      description: t('login.checkYourEmailForLoginLink'),
    })
  }
}
</script>

<template>
  <NuxtLink class="absolute top-4 left-4 sm:top-10 sm:left-10" to="/">
    <ArrowLeftIcon
      class="h-5 sm:h-11 cursor-pointer text-black hover:text-gray-300"
    />
  </NuxtLink>

  <div class="flex h-screen flex-1 flex-col justify-center items-center">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2
        class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-black"
      >
        {{ t('login.signInToYourAccount') }}
      </h2>
    </div>

    <div class="mt-10 w-screen sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              {{ t('login.emailAddress') }}
            </label>
            <div class="mt-2">
              <input
                v-model="emailInput"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Button class="w-full" type="submit" @click="handleMagicLink">
              {{ t('login.sendMagicLink') }}
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
                {{ t('login.orContinueWith') }}
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
