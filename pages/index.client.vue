<script setup lang="ts">
import { languages as baseLanguages } from '@/lib/constants'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import eng_Latn from '../i18n/eng_Latn.json'
import fra_Latn from '../i18n/fra_Latn.json'
// import { json } from '@codemirror/lang-json'
// import { oneDark } from '@codemirror/theme-one-dark'
// import { Codemirror } from 'vue-codemirror'

const showUS = ref(true)
const { t, setLocale } = useI18n()
// const { data: authData } = useAuth()
// const isLoggedIn = computed(() => authData.value?.user)
// const isLoggedIn = true
// const extensions = [json(), oneDark]

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

function smoothScroll(event) {
  event.preventDefault()
  const target = document.getElementById('key-features')
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

watch(showUS, (newVal, _oldVal) => {
  if (newVal) {
    setLocale('en')
  } else {
    setLocale('fr')
  }
})
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
                  {{ t('whatsNew') }}
                </span>
                <span
                  class="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600"
                >
                  <span>{{ t('justShipped') }} v1.0.0</span>
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
              {{ t('hero') }}
            </h1>
            <p class="mt-5 text-lg leading-8 text-gray-600">
              {{ t('description') }}
            </p>

            <div class="mt-5 flex items-center gap-x-2.5">
              <NuxtLink to="get-started">
                <Button>
                  {{ t('cta') }}
                </Button>
              </NuxtLink>
              <a href="#key-features" @click="event => smoothScroll(event)">
                <Button variant="outline">{{ t('learnMore') }}</Button>
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
                  <div class="px-6 pb-14 pt-6 text-white">
                    <JsonViewer :json-data="renderedJSON" />
                    <!-- <Codemirror
                      placeholder="Output"
                      :style="{
                        height: '100vh',
                        width: '100vw',
                        borderBottomLeftRadius: '20px',
                        borderBottomRightRadius: '20px',
                        overflow: 'scroll',
                      }"
                      :disabled="true"
                      :autofocus="true"
                      :indent-with-tab="true"
                      :tab-size="2"
                      :extensions="extensions"
                    /> -->
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
              Key Features
            </div>
            <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">
              Powerful Translation Capabilities
            </h2>
            <p
              class="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
            >
              Our AI-powered translation tool supports multiple languages,
              provides local-first translations, never touching a server, and
              integrates seamlessly with JSON.
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
                  <h3 class="text-xl font-bold">Multiple Languages</h3>
                  <p class="text-gray-500 dark:text-gray-400">
                    Translate your content into 200+ languages with our
                    comprehensive language support.
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
                  <h3 class="text-xl font-bold">Local-first Translation</h3>
                  <p class="text-gray-500 dark:text-gray-400">
                    Keep your translation files safe and fully in your control.
                    Our service only uses local-first models and will never
                    communicate with a server.
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
                  <h3 class="text-xl font-bold">File Format Support</h3>
                  <p class="text-gray-500 dark:text-gray-400">
                    Translate content into the popular file format JSON.
                  </p>
                  <p class="text-gray-500 dark:text-gray-400 text-xs">
                    * If there is a file format you prefer, let us know and we
                    can discuss building it.
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
              Pricing
            </div>
            <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">
              Affordable Pricing
            </h2>
            <p
              class="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
            >
              Our AI-powered translation platform is available for a one-time
              purchase of $99.
            </p>
          </div>
        </div>
        <div
          class="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-1 lg:gap-8"
        >
          <div
            class="flex flex-col items-center justify-center space-y-4 rounded-lg border p-6 shadow-sm"
          >
            <h3 class="text-2xl font-bold">Translate AI</h3>
            <p class="text-4xl font-bold">$99</p>
            <p class="text-gray-500 dark:text-gray-400">One-time purchase</p>
            <ul class="grid gap-2 text-left">
              <li class="flex items-center gap-2">
                <Icon
                  name="material-symbols:check"
                  class="h-5 w-5 text-gray-500 dark:text-gray-400"
                />
                <span>Unlimited translations</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon
                  name="material-symbols:check"
                  class="h-5 w-5 text-gray-500 dark:text-gray-400"
                />
                <span>{{ baseLanguages.length }} supported languages</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon
                  name="material-symbols:check"
                  class="h-5 w-5 text-gray-500 dark:text-gray-400"
                />
                <span>Customer support</span>
              </li>
            </ul>
            <Button> Buy Now </Button>
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
            Get Started with Our Translation Tool
          </h2>
          <p
            class="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
          >
            Sign up for a free trial or request a demo to see how our
            translation tool can help your business.
          </p>
        </div>
        <div class="mx-auto w-full max-w-sm space-y-2">
          <form class="flex space-x-2">
            <Input
              type="email"
              placeholder="Enter your email"
              class="max-w-lg flex-1"
            />
            <Button type="submit">Sign Up</Button>
          </form>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Sign up to get started or request a demo.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
