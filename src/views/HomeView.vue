<script setup>
import { inject } from 'vue'
import { RouterLink } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCards, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-cards'
import 'swiper/css/navigation'
import ServicesPreview from '../components/ServicesPreview.vue'

const smoothScrollTo = inject('smoothScrollTo')
const openContactModal = inject('openContactModal', () => {})
const digitalStripTranslateX = inject('digitalStripTranslateX')

const testimonialsSwiperModules = [EffectCards, Navigation]

const testimonialItems = [
  {
    id: 1,
    quote: "They turned our messy narrative into a clear, confident site. Sales calls now start two steps ahead.",
    name: "Sarah K.",
    role: "Head of Growth, B2B SaaS",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 2,
    quote: "Fast, no-nonsense collaboration. The new onboarding flow doubled our activation.",
    name: "Marcus T.",
    role: "Product Lead, Web3",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 3,
    quote: "We needed a museum site that felt like the space itself. Meowmatrix delivered exactly that.",
    name: "Elena V.",
    role: "Digital Director",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 4,
    quote: "Professional from day one. Our e-commerce platform launched on time and conversion went up within weeks.",
    name: "James L.",
    role: "Founder, E-commerce",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
]
</script>

<template>
  <main class="py-10">
    <!-- HERO -->
    <section id="hero"
      class="section-band relative z-20 flex items-start justify-center transform-gpu transition-transform duration-500 ease-out">
      <div class="relative z-10 flex flex-col gap-8 py-8 md:py-16">
        <div class="relative space-y-6">
          <p class="section-eyebrow text-slate-500">European web & product studio</p>
          <h1 class="hero-title text-balance font-medium text-slate-900 text-7xl md:text-9xl">WE AGREE DIGITAL IDEAS IN EUROPE</h1>
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="max-w-2xl text-base text-slate-600 sm:text-lg py-6 leading-relaxed">
                Strategy, design and development in one orbit. We help European product teams ship websites, web apps
                and launch materials that convert and age well.
              </p>
              <div class="relative mt-12 flex flex-col sm:flex-row flex-wrap gap-4">
                <button type="button" class="btn-primary w-full sm:w-auto" @click="openContactModal()">
                  Book a 20‑minute intro call <span aria-hidden="true" class="text-lg">↗</span>
                </button>
                <button type="button" class="btn-ghost w-full sm:w-auto" @click="smoothScrollTo('process')">See our process</button>
              </div>
            </div>
            <div class="hidden md:block">
              <img src="/logo-dark-nobg.svg" alt="Meowmatrix" class="h-[600px] w-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DIGITAL strip -->
    <section class="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-slate-950 py-4 md:py-5"
      aria-hidden="true">
      <div class="flex gap-20 whitespace-nowrap will-change-transform"
        :style="{ transform: `translate3d(${digitalStripTranslateX}px, 0, 0)` }">
        <span v-for="n in 24" :key="n" class="font-sans text-2xl font-light uppercase text-white md:text-9xl">WEB
          DEVELOPMENT</span>
      </div>
    </section>

    <!-- TRUSTED BY -->
    <section class="section-band section-band-light mt-0 py-16 md:py-24" aria-label="Trusted by">
      <div class="container-page">
        <div class="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-16">
          <h2 class="font-display text-display-lg font-medium uppercase tracking-tight text-slate-900 max-w-2xl">Trusted
            by teams building in Europe.</h2>
          <p class="text-slate-600 text-lg md:text-xl md:max-w-sm leading-relaxed">From SaaS and fintech to culture and
            health — we ship with product teams who care about clarity and speed.</p>
        </div>
        <div class="mt-12 flex flex-wrap items-baseline gap-x-1 gap-y-4 text-slate-400">
          <template v-for="(label, i) in ['SaaS', 'Fintech', 'Web3', 'Culture & Arts', 'E‑commerce', 'Healthtech']"
            :key="label">
            <span v-if="i > 0" class="hidden sm:inline font-light text-slate-300 select-none"
              aria-hidden="true">·</span>
            <span class="font-display text-xl font-semibold text-slate-600 md:text-2xl">{{ label }}</span>
          </template>
        </div>
      </div>
    </section>

    <!-- SERVICES (compact preview) -->
    <ServicesPreview />

    <!-- BY THE NUMBERS -->
    <section class="section-band section-band-light py-14 md:py-16" aria-label="By the numbers">
      <div class="container-page">
        <p class="section-eyebrow text-center text-slate-500 mb-10">By the numbers</p>
        <div class="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
          <div class="text-center">
            <p class="font-display text-4xl font-extrabold text-slate-900 md:text-5xl">50+</p>
            <p class="mt-1 text-sm font-medium text-slate-600">Projects delivered</p>
          </div>
          <div class="text-center">
            <p class="font-display text-4xl font-extrabold text-slate-900 md:text-5xl">8+</p>
            <p class="mt-1 text-sm font-medium text-slate-600">Years in product & web</p>
          </div>
          <div class="text-center">
            <p class="font-display text-4xl font-extrabold text-slate-900 md:text-5xl">98%</p>
            <p class="mt-1 text-sm font-medium text-slate-600">Client retention</p>
          </div>
          <div class="text-center">
            <p class="font-display text-4xl font-extrabold text-slate-900 md:text-5xl">12+</p>
            <p class="mt-1 text-sm font-medium text-slate-600">Countries served</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Laravel + Vue (short) -->
    <section class="section-band section-band-dark py-14 md:py-20 text-slate-50">
      <div class="container-page">
        <div class="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2
              class="font-display text-3xl font-medium uppercase tracking-tight text-white sm:text-4xl md:text-7xl max-w-4xl">
              Why we use Laravel + Vue.js
            </h2>
            <p class="mt-4 py-10 font-light text-slate-300 leading-relaxed max-w-xl">
              We build with Laravel and Vue so your site is stable, scalable, and runs without constant developer
              involvement. Content updates, orders, and routine tasks are automated; you get an admin panel and clear
              documentation.
            </p>
            <RouterLink to="/how-we-work#tech"
              class="inline-flex items-center border-2 border-slate-300 rounded-full px-8 py-4 gap-2 mt-6 font-semibold text-violet-300 hover:text-violet-200 transition-colors">
              How we work — full details
              <span aria-hidden="true">→</span>
            </RouterLink>
          </div>
          <div class="flex flex-wrap gap-3">
            <span
              class="rounded-full border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300">Laravel</span>
            <span class="rounded-full border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300">Vue 3</span>
            <span
              class="rounded-full border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300">Automation</span>
            <span class="rounded-full border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300">Admin /
              CMS</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Site adaptation (short) -->
    <section class="section-band section-band-light py-14 md:py-20">
      <div class="container-page">
        <div class="flex flex-col xl:flex-row-reverse items-start gap-x-10">
          <h2
            class="font-display text-2xl font-medium uppercase tracking-tight text-slate-900 sm:text-3xl md:text-7xl max-w-2xl">
            Every site we build is fully adapted: mobile, tablet, desktop
          </h2>
          <div>
            <p class="mt-4 max-w-2xl py-10 text-slate-600 leading-relaxed">
              Responsive layout, cross-browser testing, and performance in mind — so your audience gets a consistent
              experience
              on any device.
            </p>
            <RouterLink to="/how-we-work#adaptation"
              class="inline-flex border-2 border-slate-900 rounded-full px-8 py-4 gap-2 mt-6 font-semibold text-black hover:text-white hover:bg-slate-900 transition-colors">
              More about adaptation
              <span aria-hidden="true">→</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- How we estimate (short) -->
    <section class="section-band section-band-dark py-14 md:py-20 text-slate-50">
      <div class="container-page">
        <h2
          class="font-display text-2xl font-medium uppercase tracking-tight text-white sm:text-3xl md:text-7xl">
          Transparent estimation: scope and quote before you commit
        </h2>
        <p class="mt-4 max-w-2xl py-10 text-slate-300 leading-relaxed">
          After a short brief or call we send a written scope, timeline, and price. No hidden fees; we flag risks and
          assumptions upfront. Fixed price or time-and-materials depending on the project.
        </p>
        <button type="button"
          class="inline-flex items-center border-2 border-slate-300 rounded-full px-8 py-4 gap-2 mt-6 font-semibold text-violet-300 hover:text-violet-200 transition-colors"
          @click="openContactModal()">
          Request a quote
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>

    <!-- What you get (short, SEO) -->
    <section class="section-band section-band-light py-14 md:py-20">
      <div class="container-page">
        <div class="flex flex-col xl:flex-row items-start gap-10">
          <h2 class="font-display text-2xl font-medium uppercase tracking-tight text-slate-900 sm:text-3xl md:text-4xl max-w-xl">
            What you get: one team, clear scope, a site you can run yourself
          </h2>
          <p class="max-w-xl text-slate-600 leading-relaxed">
            Strategy, design, and development from a single team. Admin or CMS to edit content without a developer.
            Documentation and handover so you're never locked in.
          </p>
        </div>
        <RouterLink to="/how-we-work#what-you-get"
          class="inline-flex border-2 border-slate-900 rounded-full px-8 py-4 gap-2 mt-6 font-semibold text-black hover:text-white hover:bg-slate-900 transition-colors">
          Full list of deliverables
          <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </section>

    <!-- PROCESS -->
    <section id="process" class="section-band section-band-dark py-20 md:py-28 text-slate-50">
      <div class="container-page">
        <header class="mb-16 md:mb-20">
          <p class="section-eyebrow text-slate-400 mb-4">How we work</p>
          <h2
            class="font-display text-4xl font-medium uppercase tracking-tight text-white sm:text-5xl md:text-6xl lg:text-9xl">
            A calm, structured process. No chaos, no drama
          </h2>
          <p class="mt-6 max-w-2xl text-lg md:text-xl text-slate-300 leading-relaxed">
            Three steps. Clear deliverables. No surprises.
          </p>
        </header>

        <ol class="space-y-0 divide-y divide-slate-700/60" role="list">
          <li class="py-10 md:py-14 first:pt-0">
            <div class="flex flex-col gap-4 md:flex-row md:items-start md:gap-12">
              <span class="font-display text-5xl md:text-6xl font-bold tabular-nums text-white/20 shrink-0"
                aria-hidden="true">01</span>
              <div class="min-w-0">
                <h3 class="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                  Clarity first
                </h3>
                <p class="mt-3 text-slate-300 leading-relaxed text-base sm:text-lg max-w-2xl">
                  We map your audiences, funnels and existing materials, then agree on a sharp one‑page brief that
                  drives
                  every design and build decision.
                </p>
              </div>
            </div>
          </li>
          <li class="py-10 md:py-14">
            <div class="flex flex-col gap-4 md:flex-row md:items-start md:gap-12">
              <span class="font-display text-5xl md:text-6xl font-bold tabular-nums text-white/20 shrink-0"
                aria-hidden="true">02</span>
              <div class="min-w-0">
                <h3 class="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                  Design in the browser
                </h3>
                <p class="mt-3 text-slate-300 leading-relaxed text-base sm:text-lg max-w-2xl">
                  We move quickly into live prototypes, so you review real breakpoints, motion and content — not flat
                  slides.
                </p>
              </div>
            </div>
          </li>
          <li class="py-10 md:py-14 last:pb-0">
            <div class="flex flex-col gap-4 md:flex-row md:items-start md:gap-12">
              <span class="font-display text-5xl md:text-6xl font-bold tabular-nums text-white/20 shrink-0"
                aria-hidden="true">03</span>
              <div class="min-w-0">
                <h3 class="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                  Launch & learn
                </h3>
                <p class="mt-3 text-slate-300 leading-relaxed text-base sm:text-lg max-w-2xl">
                  We ship a focused first version, then stay for the first weeks post‑launch to refine what real users
                  actually touch.
                </p>
              </div>
            </div>
          </li>
        </ol>

        <blockquote class="mt-16 md:mt-20 pt-12 md:pt-16 border-t border-slate-700/60">
          <p class="font-display text-lg sm:text-xl md:text-2xl font-light uppercase leading-snug text-white max-w-4xl">
            "Meowmatrix took our messy narrative and turned it into a clear, confident site. Sales calls now start two
            steps
            ahead."
          </p>
          <footer class="mt-6 flex flex-wrap items-center gap-4 text-slate-400">
            <cite class="font-semibold text-slate-200 not-italic">Head of Growth, B2B SaaS</cite>
            <span
              class="rounded-full bg-slate-700/60 px-3 py-1.5 text-xs font-medium text-slate-300">Remote‑first</span>
            <span
              class="rounded-full bg-slate-700/60 px-3 py-1.5 text-xs font-medium text-slate-300">English‑first</span>
          </footer>
        </blockquote>

        <div class="mt-12">
          <button type="button" class="btn-primary" @click="openContactModal()">
            Start your project
            <span aria-hidden="true" class="text-lg">↗</span>
          </button>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section id="about" class="section-band section-band-light py-20 md:py-28">
      <div class="container-page">
        <header class="mb-14 md:mb-16">
          <h2
            class="font-display text-4xl font-medium uppercase tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-9xl max-w-6xl">
            A small, senior team with product taste
          </h2>
          <p class="mt-6 max-w-2xl text-lg md:text-xl text-slate-600 leading-relaxed">
            We work as your external squad that feels internal.
          </p>
        </header>

        <div class="max-w-3xl space-y-8">
          <p class="text-lg md:text-xl text-slate-700 leading-relaxed">
            Meowmatrix grew out of product design and front‑end roles inside European SaaS and Web3 teams. We care about
            typography, rhythm and micro‑interactions as much as funnels and pricing pages.
          </p>
          <dl class="grid gap-4 sm:grid-cols-2 text-slate-700">
            <div class="flex justify-between gap-4 py-3 border-b border-slate-200 sm:flex-col sm:gap-1 sm:border-0">
              <dt class="text-slate-500 font-medium">Based in</dt>
              <dd class="font-semibold text-slate-900">EU, fully remote</dd>
            </div>
            <div class="flex justify-between gap-4 py-3 border-b border-slate-200 sm:flex-col sm:gap-1 sm:border-0">
              <dt class="text-slate-500 font-medium">Typical engagement</dt>
              <dd class="font-semibold text-slate-900">6–12 weeks</dd>
            </div>
          </dl>
          <div>
            <p class="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">How we build</p>
            <div class="flex flex-wrap gap-2">
              <span class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Vue 3</span>
              <span class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Laravel</span>
              <span class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Tailwind</span>
              <span class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">React</span>
              <span class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Next.js</span>
              <span class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Nuxt</span>
              <span class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Figma</span>
            </div>
          </div>
          <button type="button" class="btn-primary" @click="openContactModal()">
            Let's work together
            <span aria-hidden="true" class="text-lg">↗</span>
          </button>
        </div>
      </div>
    </section>

    <!-- CTA (dark) -->
    <section class="section-band section-band-dark py-20 md:py-28 text-slate-50">
      <div class="container-page">
        <div class="flex flex-col md:flex-row-reverse items-start gap-10">
          <h2
            class="font-display text-4xl font-medium uppercase tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto">
            Ready to build something clear and confident?
          </h2>
          <div>
            <p class="max-w-2xl text-lg font-light text-slate-300 leading-relaxed">
              Share your project outline and we'll come back with early thoughts and a rough scope — usually within one
              business day.
            </p>
            <button type="button" class="btn-primary mt-10" @click="openContactModal()">
              Get in touch
              <span aria-hidden="true" class="text-lg">↗</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS (light theme, flex: title+desc+btn left, slider right) -->
    <section id="testimonials" class="section-band section-band-light py-20 md:py-28">
      <div class="container-page">
        <div class="flex flex-col items-center gap-10 lg:flex-row lg:items-stretch lg:gap-12 xl:gap-16">
          <!-- Left column: heading, description, button -->
          <div class="flex flex-col lg:min-w-0 lg:max-w-md xl:max-w-lg shrink-0">
            <p class="section-eyebrow text-slate-500 mb-4">What clients say</p>
            <h2
              class="font-display text-4xl font-medium uppercase tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Trusted by product and growth teams
            </h2>
            <p class="text-lg py-4 font-light text-slate-600 leading-relaxed">
              From startups to scale-ups — we help teams ship clear, confident digital experiences.
            </p>
            <button type="button" class="btn-primary mt-8 lg:mt-10 w-fit" @click="openContactModal()">
              Start a conversation
              <span aria-hidden="true" class="text-lg">↗</span>
            </button>
          </div>

          <!-- Right column: cards-effect slider -->
          <div
            class="testimonials-swiper testimonials-swiper-cards relative flex-1 min-w-0 w-full max-w-full flex flex-col items-center">
            <Swiper :effect="'cards'" :grab-cursor="true" :modules="testimonialsSwiperModules"
              :navigation="{ nextEl: '.testimonials-next', prevEl: '.testimonials-prev' }"
              class="testimonials-swiper-cards-inner">
              <SwiperSlide v-for="item in testimonialItems" :key="item.id">
                <blockquote
                  class="testimonial-card flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-lg md:p-8">
                  <div class="flex gap-0.5 mb-4" aria-label="Rating: 5 out of 5 stars">
                    <span v-for="n in item.rating" :key="n" class="text-amber-400" aria-hidden="true">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                  </div>
                  <p class="flex-1 font-display text-lg md:text-xl font-medium leading-snug text-slate-900 min-h-0">
                    "{{ item.quote }}"
                  </p>
                  <footer class="mt-6 flex items-center gap-4 flex-shrink-0">
                    <img :src="item.avatar" :alt="item.name"
                      class="h-12 w-12 rounded-full object-cover ring-2 ring-slate-200" width="48" height="48"
                      loading="lazy" />
                    <div>
                      <p class="font-semibold text-slate-900">{{ item.name }}</p>
                      <p class="text-sm text-slate-500">{{ item.role }}</p>
                    </div>
                  </footer>
                </blockquote>
              </SwiperSlide>
            </Swiper>
            <div class="flex justify-center gap-3 mt-10 w-full">
              <button type="button"
                class="testimonials-prev flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-300 bg-white text-slate-700 shadow-sm transition hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 disabled:opacity-40"
                aria-label="Previous testimonial">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button type="button"
                class="testimonials-next flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-300 bg-white text-slate-700 shadow-sm transition hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 disabled:opacity-40"
                aria-label="Next testimonial">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTACT -->
    <section id="contact" class="section-band section-band-dark py-16 md:py-20">
      <div class="container-page">
        <div class="grid gap-10 md:grid-cols-[1fr_1.2fr] lg:gap-16 items-start">
          <!-- Left: CTA to open consultation form modal -->
          <div id="brief" class="card-glass p-6 sm:p-8 max-w-md flex flex-col justify-center">
            <p class="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2">Get in touch</p>
            <h3 class="font-display text-2xl font-bold text-slate-900 sm:text-3xl">Request a free consultation</h3>
            <p class="mt-3 text-slate-600 leading-relaxed">
              Tell us about your project. We reply within one business day with early thoughts and a rough scope.
            </p>
            <button
              type="button"
              class="btn-primary w-full sm:w-auto mt-6"
              @click="openContactModal()"
            >
              Request consultation
              <span aria-hidden="true" class="text-lg">↗</span>
            </button>
            <RouterLink
              to="/brief"
              class="mt-4 text-sm font-medium text-violet-600 hover:text-violet-700"
            >
              Or fill the detailed brief for a technical specification →
            </RouterLink>
          </div>
          <!-- Right: heading + description -->
          <div class="order-first md:order-none">
            <p class="section-eyebrow text-slate-400 mb-4">Let's work together</p>
            <h2
              class="font-display text-3xl font-medium uppercase tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl max-w-xl">
              Tell us about the launch you're planning.
            </h2>
            <p class="mt-6 text-lg py-4 font-light text-slate-300 leading-relaxed max-w-lg">
              One short form. We reply within one business day with early thoughts and a rough scope.
            </p>
            <p class="mt-4 text-sm py-4 font-light text-slate-400">
              Or email <span class="font-medium text-slate-200">office@meowmatrix.eu</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
