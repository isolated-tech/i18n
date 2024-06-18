<script setup lang="ts">
import { languages as baseLanguages } from '@/lib/constants'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import eng_Latn from '../i18n/eng_Latn.json'
import fra_Latn from '../i18n/fra_Latn.json'
import { useToast } from '@/components/ui/toast'

const showUS = ref(true)
const { t, setLocale } = useI18n()
const { data, signIn } = useAuth()
const isLoggedIn = computed(() => data.value?.user)
const isSubbed = computed(() => data.value?.user.is_subscribed)
const { toast } = useToast()
const emailSignUp = ref<string>()

const renderedJSON = computed(() => {
  return showUS.value ? eng_Latn : fra_Latn
})

const activeMenuItems = ref([
  { name: 'languages', active: true },
  { name: 'huggingface', active: false },
  { name: 'json', active: false },
])

const setActiveMenuItem = (itemName: string) => {
  activeMenuItems.value.forEach(item => {
    item.active = item.name === itemName
  })
}

const isActive = (itemName: string) => {
  return activeMenuItems.value.find(item => item.name === itemName)?.active
}

function smoothScroll(event: any) {
  event.preventDefault()
  const target = document.getElementById('key-features')
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

watch(showUS, (newVal, _oldVal) => {
  if (newVal) {
    setLocale('eng_Latn')
  } else {
    setLocale('fra_Latn')
  }
})

const handleEmailSignUp = () => {
  if (!emailSignUp.value?.length) {
    toast({
      title: t('emailRequired'),
      description: t('checkYourEmailForLoginLink'),
    })
  } else {
    signIn('email', {
      email: emailSignUp.value,
      redirect: false,
    })

    toast({
      title: t('linkSent'),
      description: t('checkYourEmailForLoginLink'),
    })

    emailSignUp.value = ''
  }
}
</script>

<template>
  <div
    class="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 scroll-smooth"
  >
    <section
      class="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40"
    >
      <div class="px-6 lg:px-0 lg:pt-4">
        <div class="mx-auto max-w-2xl">
          <div class="max-w-lg">
            <div class="mt-24 sm:mt-32 lg:mt-16">
              <a href="#" class="inline-flex space-x-6">
                <span
                  class="rounded-full bg-gray-600/10 px-3 py-1 text-sm font-semibold leading-6 text-gray-600 ring-1 ring-inset ring-gray-600/10"
                >
                  {{ $t('landing.whatsNew') }}
                </span>
                <span
                  class="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600"
                >
                  <span>{{ $t('landing.justShipped') }} v1.0.0</span>
                  <ChevronRightIcon
                    class="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </div>
            <h1
              class="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
            >
              {{ $t('landing.hero') }}
            </h1>
            <p class="mt-5 text-lg leading-8 text-gray-600">
              {{ $t('landing.description') }}
            </p>

            <div class="mt-5 flex items-center gap-x-2.5">
              <NuxtLink to="get-started">
                <Button>
                  {{ $t('landing.cta') }}
                </Button>
              </NuxtLink>
              <a href="#key-features" @click="event => smoothScroll(event)">
                <Button variant="outline">{{ $t('landing.learnMore') }}</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        class="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen"
      >
        <div
          class="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36"
          aria-hidden="true"
        />
        <div class="shadow-lg md:rounded-3xl">
          <div
            class="[clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]"
          >
            <div
              class="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
              aria-hidden="true"
            />
            <div class="relative md:pr-0">
              <div class="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                <div class="w-screen overflow-hidden rounded-tl-xl bg-gray-900">
                  <div class="flex bg-gray-800/40 ring-1 ring-white/5">
                    <div
                      class="-mb-px flex text-sm font-medium leading-6 text-gray-400"
                    >
                      <button
                        :class="{
                          'border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white':
                            showUS,
                          'border-r border-gray-600/10 px-4 py-2': !showUS,
                        }"
                        @click="showUS = true"
                      >
                        eng_Latn.json
                      </button>
                      <button
                        :class="{
                          'border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white':
                            !showUS,
                          'border-r border-gray-600/10 px-4 py-2': showUS,
                        }"
                        @click="showUS = false"
                      >
                        fra_Latn.json
                      </button>
                    </div>
                  </div>
                  <div
                    class="px-6 pb-14 pt-6 text-white max-h-[920px] overflow-y-scroll overflow-x-hidden"
                  >
                    <JsonViewer :json-data="renderedJSON" />
                  </div>
                </div>
              </div>
              <div
                class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <div
      class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32"
    />

    <section
      id="key-features"
      class="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
    >
      <div class="container px-4 md:px-6">
        <div
          class="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div class="space-y-2">
            <div
              class="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800"
            >
              {{ $t('landing.keyFeatures') }}
            </div>
            <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">
              {{ $t('landing.powerfulTranslation') }}
            </h2>
            <p
              class="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
            >
              {{ $t('landing.powerfulTranslationDescription') }}
            </p>
          </div>
        </div>
        <div
          class="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12"
        >
          <div
            class="overflow-scroll h-80 lg:order-last"
            v-if="isActive('languages')"
          >
            <LanguageSelector class="my-2" />
          </div>
          <HuggingFaceLogo
            v-if="isActive('huggingface')"
            class="w-full lg:order-last"
          />
          <div
            v-if="isActive('json')"
            class="flex flex-col items-center justify-center space-y-2 lg:order-last"
          >
            <Icon
              name="streamline:programming-script-file-code-1-code-files-angle-programming-file-bracket"
              class="h-10 w-10 text-gray-500 dark:text-gray-400"
            />
            <h4 class="text-lg font-bold">Code Files</h4>
            <p class="text-gray-500 dark:text-gray-400">.json</p>
          </div>
          <div class="flex flex-col justify-center space-y-4">
            <ul class="grid gap-6">
              <li>
                <div
                  class="grid gap-1 cursor-pointer hover:bg-gray-50 p-2.5 rounded"
                  :class="{
                    'bg-gray-50 shadow-sm': isActive('languages'),
                  }"
                  @click="setActiveMenuItem('languages')"
                >
                  <h3 class="text-xl font-bold">
                    {{ $t('landing.multipleLanguages') }}
                  </h3>
                  <p class="text-gray-500 dark:text-gray-400">
                    {{ $t('landing.multipleLanguagesDescription') }}
                  </p>
                </div>
              </li>
              <li>
                <div
                  class="grid gap-1 cursor-pointer hover:bg-gray-50 p-2.5 rounded"
                  :class="{
                    'bg-gray-50 shadow-sm': isActive('huggingface'),
                  }"
                  @click="setActiveMenuItem('huggingface')"
                >
                  <h3 class="text-xl font-bold">
                    {{ $t('landing.localFirstTranslation') }}
                  </h3>
                  <p class="text-gray-500 dark:text-gray-400">
                    {{ $t('landing.localFirstTranslationDescription') }}
                  </p>
                </div>
              </li>
              <li>
                <div
                  class="grid gap-1 cursor-pointer hover:bg-gray-50 p-2.5 rounded"
                  :class="{
                    'bg-gray-50 shadow-sm': isActive('json'),
                  }"
                  @click="setActiveMenuItem('json')"
                >
                  <h3 class="text-xl font-bold">
                    {{ $t('landing.fileFormatSupport') }}
                  </h3>
                  <p class="text-gray-500 dark:text-gray-400">
                    {{ $t('landing.fileFormatDescription') }}
                  </p>
                  <p class="text-gray-500 dark:text-gray-400 text-xs">
                    * {{ $t('landing.fileFormatNote') }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="w-full py-12 md:py-24 lg:py-32 dark:bg-gray-800">
      <div class="container px-4 md:px-6">
        <div
          class="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div class="space-y-2">
            <div
              class="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800"
            >
              {{ $t('landing.pricing') }}
            </div>
            <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">
              {{ $t('landing.affordablePricing') }}
            </h2>
            <p
              class="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
            >
              {{ $t('landing.affordablePricingDescription') }}
            </p>
          </div>
        </div>
        <div
          class="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-8"
        >
          <div
            class="flex flex-col items-center justify-center space-y-4 rounded-lg border p-6 shadow-sm"
          >
            <p class="text-4xl font-bold">$0</p>
            <p class="text-gray-500 dark:text-gray-400">
              {{ $t('landing.freePlan') }}
            </p>
            <ul class="grid gap-2 text-left">
              <li class="flex items-center gap-2">
                <Icon
                  name="material-symbols:check"
                  class="h-5 w-5 text-gray-500 dark:text-gray-400"
                />
                <span>{{ $t('landing.unlimitedTranslations') }}</span>
              </li>

              <li class="flex items-center gap-2">
                <Icon
                  name="material-symbols:check"
                  class="h-5 w-5 text-gray-500 dark:text-gray-400"
                />
                <span
                  >{{ baseLanguages.length }}
                  {{ $t('landing.supportedLanguages') }}</span
                >
              </li>
              <li class="flex items-center gap-2">
                <Icon
                  name="material-symbols:check"
                  class="h-5 w-5 text-gray-500 dark:text-gray-400"
                />
                <span>{{ $t('landing.limitedToTwoLanguages') }}</span>
              </li>
              <li class="flex items-center gap-2 invisible">
                <Icon
                  name="material-symbols:check"
                  class="h-5 w-5 text-gray-500 dark:text-gray-400"
                />
              </li>
            </ul>
            <NuxtLink to="get-started">
              <Button>
                {{ $t('landing.cta') }}
              </Button>
            </NuxtLink>
          </div>
          <div
            class="flex flex-col items-center justify-center space-y-4 rounded-lg border p-6 shadow-sm"
          >
            <p class="text-4xl font-bold">$20</p>
            <p class="text-gray-500 dark:text-gray-400">
              {{ $t('landing.oneTimePurchase') }}
            </p>
            <ul class="grid gap-2 text-left">
              <li class="flex items-center gap-2">
                <Icon
                  name="material-symbols:check"
                  class="h-5 w-5 text-gray-500 dark:text-gray-400"
                />
                <span>{{ $t('landing.unlimitedTranslations') }}</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon
                  name="material-symbols:check"
                  class="h-5 w-5 text-gray-500 dark:text-gray-400"
                />
                <span
                  >{{ baseLanguages.length }}
                  {{ $t('landing.supportedLanguages') }}</span
                >
              </li>
              <li class="flex items-center gap-2">
                <Icon
                  name="material-symbols:check"
                  class="h-5 w-5 text-gray-500 dark:text-gray-400"
                />
                <span>{{ $t('landing.unlimitedLanguages') }}</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon
                  name="material-symbols:check"
                  class="h-5 w-5 text-gray-500 dark:text-gray-400"
                />
                <span>{{ $t('landing.customerSupport') }}</span>
              </li>
            </ul>
            <BuyNowDialog v-if="!isLoggedIn" />
            <StripeCheckoutButton v-else-if="isLoggedIn && !isSubbed" />
          </div>
        </div>
      </div>
    </section>

    <section class="w-full py-12 bg-gray-100 md:py-24 lg:py-32">
      <div
        class="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10"
      >
        <div class="space-y-2">
          <h2 class="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            {{ $t('landing.getStartedWithOurTranslationTool') }}
          </h2>
          <p
            class="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
          >
            {{ $t('landing.signUpForFreeTrial') }}
          </p>
        </div>
        <div class="mx-auto w-full max-w-sm space-y-2">
          <form class="flex space-x-2" @submit.prevent="handleEmailSignUp">
            <Input
              v-model="emailSignUp"
              type="email"
              placeholder="Enter your email"
              class="max-w-lg flex-1"
            />
            <Button type="submit">{{ $t('landing.signUp') }}</Button>
          </form>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ $t('landing.signUpToGetStarted') }}
          </p>
        </div>
      </div>
    </section>
    <FooterCentered />
  </div>
</template>
