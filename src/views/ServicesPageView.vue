<script setup>
import { RouterLink } from 'vue-router'
import { inject } from 'vue'
import ServicesSection from '../components/ServicesSection.vue'

const openContactModal = inject('openContactModal', () => {})

function onContact() {
  openContactModal()
}
</script>

<template>
  <main class="py-10">
    <!-- Breadcrumb -->
    <div class="container-page mb-8">
      <nav class="text-sm text-slate-500" aria-label="Breadcrumb">
        <RouterLink to="/" class="hover:text-slate-900">Home</RouterLink>
        <span class="mx-2" aria-hidden="true">/</span>
        <span class="text-slate-900 font-medium" aria-current="page">Services</span>
      </nav>
    </div>

    <!-- Full services list (existing component) -->
    <ServicesSection @contact="onContact" />

    <!-- Tech stack block (light) -->
    <section class="section-band section-band-light py-16 md:py-20" aria-labelledby="tech-stack-heading">
      <div class="container-page">
        <h2 id="tech-stack-heading" class="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Tech stack & how we build
        </h2>
        <p class="mt-4 max-w-2xl text-slate-600 leading-relaxed">
          We choose the stack that fits your product: Laravel for robust backends and e-commerce, Vue and React for fast front-ends, Next.js and Nuxt for SEO and performance. All with Tailwind, TypeScript when needed, and clear APIs.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <span class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Laravel</span>
          <span class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Vue 3</span>
          <span class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">React</span>
          <span class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Next.js</span>
          <span class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Nuxt 3</span>
          <span class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Tailwind CSS</span>
          <span class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">TypeScript</span>
          <span class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Stripe</span>
          <span class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Figma</span>
          <span class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Vite</span>
        </div>
      </div>
    </section>

    <!-- Keywords & development focus (dark) -->
    <section class="section-band section-band-dark py-16 md:py-20 text-slate-50" aria-labelledby="keywords-heading">
      <div class="container-page">
        <h2 id="keywords-heading" class="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Keywords we work with
        </h2>
        <p class="mt-4 max-w-2xl text-slate-300 leading-relaxed">
          Custom e-commerce, online store, marketplace, B2B portal, headless commerce, SaaS, web app, dashboard, MVP, API, Laravel, Vue, React, Next.js, Nuxt, UI/UX, conversion, SEO, performance, design system, migration, maintenance.
        </p>
        <p class="mt-6 text-slate-400 text-sm">
          Whether you're looking for a new build, a redesign, or ongoing support — we speak your language and deliver with these technologies and goals in mind.
        </p>
      </div>
    </section>

    <!-- Quick answers / FAQ (light) -->
    <section class="section-band section-band-light py-16 md:py-20" aria-labelledby="quick-answers-heading">
      <div class="container-page">
        <h2 id="quick-answers-heading" class="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Quick answers
        </h2>
        <p class="mt-4 max-w-2xl text-slate-600 leading-relaxed mb-10">
          Common questions about working with us.
        </p>
        <dl class="space-y-8 max-w-3xl">
          <div>
            <dt class="font-display text-lg font-bold text-slate-900">Do you build from scratch or use templates?</dt>
            <dd class="mt-2 text-slate-600 leading-relaxed">We build custom. Templates limit your product and brand; we use Laravel, Vue, React, and Next/Nuxt to create exactly what you need, with room to scale.</dd>
          </div>
          <div>
            <dt class="font-display text-lg font-bold text-slate-900">How long does a typical project take?</dt>
            <dd class="mt-2 text-slate-600 leading-relaxed">MVP or first launch: often 6–12 weeks. E-commerce and marketplaces can run 10–16 weeks depending on scope. We agree on a clear timeline before we start.</dd>
          </div>
          <div>
            <dt class="font-display text-lg font-bold text-slate-900">Do you work remotely?</dt>
            <dd class="mt-2 text-slate-600 leading-relaxed">Yes. We're EU-based and work fully remote. We use async communication and CET-friendly calls so European and US clients can collaborate smoothly.</dd>
          </div>
          <div>
            <dt class="font-display text-lg font-bold text-slate-900">What if we need support after launch?</dt>
            <dd class="mt-2 text-slate-600 leading-relaxed">We offer retainers for maintenance, updates, and small feature work. Many clients start with a launch project and then move to ongoing support.</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- Why us / Recommendations (dark) -->
    <section class="section-band section-band-dark py-16 md:py-20 text-slate-50" aria-labelledby="why-us-heading">
      <div class="container-page">
        <h2 id="why-us-heading" class="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Why work with us
        </h2>
        <p class="mt-4 max-w-2xl text-slate-300 leading-relaxed mb-10">
          We focus on clarity, speed, and long-term quality — so your product and your team stay in control.
        </p>
        <ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl list-none p-0 m-0">
          <li class="flex gap-4 rounded-2xl border border-slate-700/60 bg-slate-900/50 p-6">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500/20 font-display text-lg font-bold text-violet-300" aria-hidden="true">1</span>
            <div>
              <h3 class="font-display font-bold text-white">Product-minded</h3>
              <p class="mt-1 text-sm text-slate-400">We think in funnels, users, and outcomes — not just pixels and code. Your goals drive the build.</p>
            </div>
          </li>
          <li class="flex gap-4 rounded-2xl border border-slate-700/60 bg-slate-900/50 p-6">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500/20 font-display text-lg font-bold text-violet-300" aria-hidden="true">2</span>
            <div>
              <h3 class="font-display font-bold text-white">Clear process</h3>
              <p class="mt-1 text-sm text-slate-400">Structured sprints, one brief, and no surprises. You always know what’s next and what you’re getting.</p>
            </div>
          </li>
          <li class="flex gap-4 rounded-2xl border border-slate-700/60 bg-slate-900/50 p-6">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500/20 font-display text-lg font-bold text-violet-300" aria-hidden="true">3</span>
            <div>
              <h3 class="font-display font-bold text-white">Built to last</h3>
              <p class="mt-1 text-sm text-slate-400">Modern stack, clean code, and documentation. Your site or app is maintainable and scalable.</p>
            </div>
          </li>
        </ul>
        <div class="mt-12 flex flex-wrap gap-4">
          <button type="button" class="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100" @click="openContactModal()">
            Get in touch
            <span aria-hidden="true">→</span>
          </button>
          <RouterLink to="/" class="inline-flex items-center gap-2 rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800">
            Back to home
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>
