<script setup>
import { RouterLink } from 'vue-router'

const serviceCategories = [
  { id: 'ecommerce', title: 'E-commerce & online stores', short: 'Custom shops, marketplaces, B2B portals.' },
  { id: 'platforms', title: 'Web platforms & applications', short: 'SaaS, dashboards, MVPs, APIs.' },
  { id: 'frontend', title: 'Front-end & full-stack stack', short: 'Vue, React, Next.js, Nuxt, Laravel.' },
  { id: 'design-ux', title: 'Design & user experience', short: 'UX, UI, e-commerce conversion.' },
  { id: 'support', title: 'Support, SEO & growth', short: 'Maintenance, SEO, analytics.' },
]
</script>

<template>
  <!-- Reverse style: light section with dark cards for balance -->
  <section id="services" class="section-band section-band-dark py-14 md:py-20 text-slate-900" aria-labelledby="services-preview-heading">
    <div class="container-page">
      <header class="mb-10 md:mb-12">
        <h2 id="services-preview-heading" class="font-display text-3xl font-medium uppercase text-white sm:text-4xl md:text-7xl max-w-3xl">
          From first idea to a live, fast website.
        </h2>
        <p class="mt-4 max-w-xl py-6 text-white leading-relaxed">
          E-commerce, platforms, and web apps on Laravel, Vue, Next.js, Nuxt, and React. See the full list of services below.
        </p>
      </header>

      <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0" role="list">
        <li v-for="(cat, idx) in serviceCategories" :key="cat.id" class="list-none">
          <RouterLink
            :to="{ path: '/services', hash: `#${cat.id}` }"
            class="group flex flex-col rounded-2xl bg-slate-900 p-5 md:p-6 block"
          >
            <span class="font-display text-2xl font-bold tabular-nums text-white/30 group-hover:text-violet-400/60 transition-colors" aria-hidden="true">
              {{ String(idx + 1).padStart(2, '0') }}
            </span>
            <h3 class="mt-2 font-display text-lg font-bold text-white sm:text-xl">{{ cat.title }}</h3>
            <p class="mt-1 text-sm text-slate-400">{{ cat.short }}</p>
            <span class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-300 group-hover:text-violet-200">
              View all services
              <span aria-hidden="true">→</span>
            </span>
          </RouterLink>
        </li>
      </ul>

      <div class="mt-10 flex justify-center">
        <RouterLink
          to="/services"
          class="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          Full list of services
          <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
