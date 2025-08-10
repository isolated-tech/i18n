<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import eng_Latn from '../i18n/eng_Latn.json'
import fra_Latn from '../i18n/fra_Latn.json'
import hin_Deva from '../i18n/hin_Deva.json'
import jpn_Jpan from '../i18n/jpn_Jpan.json'
import spa_Latn from '../i18n/spa_Latn.json'
import zho_Hans from '../i18n/zho_Hans.json'
import zho_Hant from '../i18n/zho_Hant.json'
import deu_Latn from '../i18n/deu_Latn.json'

const i18nSelector = ref([
    { language: eng_Latn, code: 'eng_Latn', active: true },
    { language: fra_Latn, code: 'fra_Latn', active: false },
    { language: hin_Deva, code: 'hin_Deva', active: false },
    { language: jpn_Jpan, code: 'jpn_Jpan', active: false },
    { language: spa_Latn, code: 'spa_Latn', active: false },
    { language: zho_Hans, code: 'zho_Hans', active: false },
    { language: zho_Hant, code: 'zho_Hant', active: false },
    { language: deu_Latn, code: 'deu_Latn', active: false },
])

const { setLocale } = useI18n()

const renderedJSON = computed(() => {
    return i18nSelector.value.find(l => l.active)?.language
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

const setActiveLanguage = (code: string) => {
    i18nSelector.value.forEach(lang => {
        lang.active = lang.code === code
    })
}

const isActiveLanguage = (code: string) => {
    return i18nSelector.value.find(item => item.code === code)?.active
}

watch(renderedJSON, (_newVal, _oldVal) => {
    const activeLang = i18nSelector.value.find(l => l.active)

    if (activeLang) {
        setLocale(activeLang.code)
    }
})

useHead({
    title: 'Local + Effortless i18n Translation',
    meta: [
        {
            name: 'description',
            content:
                "Translate your application's content into multiple languages with our local AI-powered translation tool.",
        },
    ],
})
</script>

<template>
    <div
        class="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 scroll-smooth"
    >
        <!-- GitHub icon in top right -->
        <a
            href="https://github.com/isolated-tech/i18n"
            target="_blank"
            rel="noopener noreferrer"
            class="absolute top-4 right-4 z-50 p-2 transition-shadow"
            aria-label="View on GitHub"
        >
            <svg
                class="w-6 h-6 text-gray-800"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
            </svg>
        </a>
        <section
            class="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40"
        >
            <div class="px-6 lg:px-0 lg:pt-4">
                <div class="mx-auto max-w-2xl">
                    <div class="max-w-lg">
                        <div class="mt-24 sm:mt-32 lg:mt-16">
                            <NuxtLink
                                to="/blog/open-sourced"
                                class="inline-flex space-x-6"
                            >
                                <span
                                    class="rounded-full bg-gray-600/10 px-3 py-1 text-sm font-semibold leading-6 text-gray-600 ring-1 ring-inset ring-gray-600/10"
                                >
                                    {{ $t('landing.whatsNew') }}
                                </span>
                                <span
                                    class="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600"
                                >
                                    <span>
                                        {{ $t('landing.justShipped') }} v1.2
                                    </span>
                                    <ChevronRightIcon
                                        class="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </NuxtLink>
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
                            <a
                                href="#key-features"
                                @click="event => smoothScroll(event)"
                            >
                                <Button variant="outline">{{
                                    $t('landing.learnMore')
                                }}</Button>
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
                            <div
                                class="mx-auto max-w-2xl md:mx-0 md:max-w-none"
                            >
                                <div
                                    class="w-screen overflow-hidden rounded-tl-xl bg-gray-900"
                                >
                                    <div
                                        class="flex bg-gray-800/40 ring-1 ring-white/5"
                                    >
                                        <div
                                            class="-mb-px flex text-sm font-medium leading-6 text-gray-400"
                                        >
                                            <button
                                                v-for="language in i18nSelector"
                                                :class="{
                                                    'border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white':
                                                        isActiveLanguage(
                                                            language.code
                                                        ),
                                                    'border-r border-gray-600/10 px-4 py-2':
                                                        !isActiveLanguage(
                                                            language.code
                                                        ),
                                                }"
                                                @click="
                                                    setActiveLanguage(
                                                        language.code
                                                    )
                                                "
                                            >
                                                {{ language.code }}
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
                        <h2
                            class="text-3xl font-bold tracking-tighter sm:text-5xl"
                        >
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
                        <h4 class="text-lg font-bold">
                            {{ $t('landing.fileFormatsSupported') }}
                        </h4>
                        <p class="text-gray-500 dark:text-gray-400">
                            .json, .yaml, .yml, .js, .ts
                        </p>
                    </div>
                    <div class="flex flex-col justify-center space-y-4">
                        <ul class="grid gap-6">
                            <li>
                                <div
                                    class="grid gap-1 cursor-pointer hover:bg-gray-50 p-2.5 rounded"
                                    :class="{
                                        'bg-gray-50 shadow-sm':
                                            isActive('languages'),
                                    }"
                                    @click="setActiveMenuItem('languages')"
                                >
                                    <h3 class="text-xl font-bold">
                                        {{ $t('landing.multipleLanguages') }}
                                    </h3>
                                    <p class="text-gray-500 dark:text-gray-400">
                                        {{
                                            $t(
                                                'landing.multipleLanguagesDescription'
                                            )
                                        }}
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div
                                    class="grid gap-1 cursor-pointer hover:bg-gray-50 p-2.5 rounded"
                                    :class="{
                                        'bg-gray-50 shadow-sm':
                                            isActive('huggingface'),
                                    }"
                                    @click="setActiveMenuItem('huggingface')"
                                >
                                    <h3 class="text-xl font-bold">
                                        {{
                                            $t('landing.localFirstTranslation')
                                        }}
                                    </h3>
                                    <p class="text-gray-500 dark:text-gray-400">
                                        {{
                                            $t(
                                                'landing.localFirstTranslationDescription'
                                            )
                                        }}
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div
                                    class="grid gap-1 cursor-pointer hover:bg-gray-50 p-2.5 rounded"
                                    :class="{
                                        'bg-gray-50 shadow-sm':
                                            isActive('json'),
                                    }"
                                    @click="setActiveMenuItem('json')"
                                >
                                    <h3 class="text-xl font-bold">
                                        {{ $t('landing.fileFormatSupport') }}
                                    </h3>
                                    <p class="text-gray-500 dark:text-gray-400">
                                        {{
                                            $t('landing.fileFormatDescription')
                                        }}
                                    </p>
                                    <p
                                        class="text-gray-500 dark:text-gray-400 text-xs"
                                    >
                                        * {{ $t('landing.fileFormatNote') }}
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section class="w-full py-12 bg-gray-100 md:py-24 lg:py-32">
            <div
                class="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10"
            >
                <div class="space-y-2">
                    <h2
                        class="text-3xl font-bold tracking-tighter md:text-4xl/tight"
                    >
                        {{ $t('landing.getStartedWithOurTranslationTool') }}
                    </h2>
                    <p
                        class="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
                    >
                        {{ $t('landing.signUpForFreeTrial') }}
                    </p>
                </div>
                <div class="mx-auto w-full max-w-sm space-y-2">
                    <NuxtLink to="get-started">
                        <Button class="w-full">{{ $t('landing.cta') }}</Button>
                    </NuxtLink>
                </div>
            </div>
        </section>
        <FooterCentered />
    </div>
</template>
