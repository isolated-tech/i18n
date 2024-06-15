<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/20/solid'
</script>

<template>
  <div
    class="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 scroll-smooth"
  >
    <section
      class="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:gap-x-8 lg:px-8 lg:py-40"
    >
      <div class="px-6 lg:px-0 lg:pt-4">
        <div class="mx-auto max-w-2xl">
          <div class="max-w-lg">
            <NuxtLink to="/">
              <ArrowLeftIcon class="h-11 cursor-pointer" />
            </NuxtLink>
            <h1
              class="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
            >
              Privacy Policy
            </h1>
            <p class="mt-5 text-lg leading-8 text-gray-600">
              Your privacy is important to us. It is i18n AI's policy to respect
              your privacy regarding any information we may collect from you
              across our website, and other sites we own and operate.
            </p>

            <p class="mt-5 text-lg leading-8 text-gray-600">
              We only ask for personal information when we truly need it to
              provide a service to you. We collect it by fair and lawful means,
              with your knowledge and consent. We also let you know why we're
              collecting it and how it will be used.
            </p>

            <p class="mt-5 text-lg leading-8 text-gray-600">
              You can sign up with your X or Github account so your i18n AI's
              account email will be prefilled with the value they provide.
            </p>

            <p class="mt-5 text-lg leading-8 text-gray-600">
              We only retain collected information for as long as necessary to
              provide you with your requested service. What data we store, we'll
              protect within commercially acceptable means to prevent loss and
              theft, as well as unauthorized access, disclosure, copying, use or
              modification.
            </p>

            <p class="mt-5 text-lg leading-8 text-gray-600">
              We don't share any personally identifying information publicly or
              with third-parties, except when required to by law.
            </p>

            <p class="mt-5 text-lg leading-8 text-gray-600">
              We act in the capacity of a data controller and a data processor
              with regard to the personal data processed through ShipFast and
              the services in terms of the applicable data protection laws,
              including the EU General Data Protection Regulation (GDPR).
            </p>

            <p class="mt-5 text-lg leading-8 text-gray-600">
              Our website may link to external sites that are not operated by
              us. Please be aware that we have no control over the content and
              practices of these sites, and cannot accept responsibility or
              liability for their respective privacy policies.
            </p>

            <p class="mt-5 text-lg leading-8 text-gray-600">
              You are free to refuse our request for your personal information,
              with the understanding that we may be unable to provide you with
              some of your desired services.
            </p>

            <p class="mt-5 text-lg leading-8 text-gray-600">
              Your continued use of our website will be regarded as acceptance
              of our practices around privacy and personal information. If you
              have any questions about how we handle user data and personal
              information, feel free to contact us.
            </p>

            <p class="mt-5 text-lg leading-8 text-gray-600">
              This policy is effective as of 15 June 2024.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
