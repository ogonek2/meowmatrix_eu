<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const sections = [
  { id: 'hero', label: 'Overview' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'process', label: 'Process' },
  { id: 'about', label: 'Studio' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
]

const activeSection = ref('hero')
const orbX = ref(0)
const orbY = ref(0)
const orbScale = ref(1)
const orbRotation = ref(0)
const orbPressed = ref(false)
const isIntro = ref(true)
const tiltX = ref(0)
const tiltY = ref(0)

const revealedSections = ref(['hero'])
const scrollProgress = ref(0)

let scrollHandler
let frame
let pointerHandler

const smoothScrollTo = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const rect = el.getBoundingClientRect()
  const offset = window.scrollY + rect.top - 96
  window.scrollTo({ top: offset, behavior: 'smooth' })
}

const updateActiveSection = () => {
  const scrollY = window.scrollY
  const vh = window.innerHeight
  const middle = scrollY + vh / 2

  let bestId = 'hero'
  let bestDist = Number.POSITIVE_INFINITY

  sections.forEach((section) => {
    const node = document.getElementById(section.id)
    if (!node) return
    const r = node.getBoundingClientRect()
    const center = scrollY + r.top + r.height / 2
    const dist = Math.abs(center - middle)
    if (dist < bestDist) {
      bestDist = dist
      bestId = section.id
    }
  })

  activeSection.value = bestId

  if (!revealedSections.value.includes(bestId)) {
    revealedSections.value = [...revealedSections.value, bestId]
  }
}

const animateOrb = () => {
  const scrollY = window.scrollY
  const vh = window.innerHeight
  const vw = window.innerWidth
  const docHeight = document.body.scrollHeight - vh || 1
  const t = Math.min(Math.max(scrollY / docHeight, 0), 1)

  let targetX
  let targetY
  let targetScale

  if (isIntro.value) {
    targetX = vw / 2 - 40
    targetY = vh * 0.4 - 40
    // intro logo: around 340px on 80px base (≈4.25x)
    targetScale = 2.25
  } else {
    const layouts = {
      // Positioned so the logo feels like part of each block
      hero: { xPct: 50, yPct: 100, scaleBase: vw / 125 }, // a bit higher and smaller under the card
      services: { xPct: 18, yPct: 35, scaleBase: 1.15 }, // overlaps left services card cluster
      work: { xPct: 82, yPct: 40, scaleBase: 1.2 }, // sits under main case card
      process: { xPct: 18, yPct: 78, scaleBase: 1.1 }, // near first step card
      about: { xPct: 82, yPct: 74, scaleBase: 1.1 }, // near snapshot card
      testimonials: { xPct: 50, yPct: 50, scaleBase: 1.15 }, // center above quotes
      contact: { xPct: 50, yPct: 90, scaleBase: 1.25 }, // anchors bottom center by form
    }

    // As soon as user scrolls even slightly, treat the orb as belonging
    // to the next section after the hero, so it doesn't cover hero content.
    const effectiveSection =
      activeSection.value === 'hero' && scrollY > 16 ? 'services' : activeSection.value

    const current = layouts[effectiveSection] || layouts.hero
    targetX = (current.xPct / 100) * vw - 40
    targetY = (current.yPct / 100) * vh - 40
    targetScale = current.scaleBase
  }

  orbY.value += (targetY - orbY.value) * 0.08
  orbX.value += (targetX - orbX.value) * 0.08
  orbScale.value += (targetScale - orbScale.value) * 0.08
  orbRotation.value = t * 8

  frame = requestAnimationFrame(animateOrb)
}

const sectionRevealClass = () => ''

const sectionCardStyle = (id) => {
  const activeIndex = sections.findIndex((s) => s.id === activeSection.value)
  const index = sections.findIndex((s) => s.id === id)

  if (index === -1 || activeIndex === -1) return {}

  // For sections we've already scrolled past (index < activeIndex),
  // shrink slightly and push them down, like cards sliding under the next one.
  if (index < activeIndex) {
    return {
      transform: 'translateY(40px) scale(0.9)',
      opacity: 0.75,
    }
  }

  // Active and upcoming sections keep default transform
  return {}
}

const heroParallaxStyle = computed(() => {
  const p = Math.min(scrollProgress.value, 1)
  const scale = 1 - p * 0.12
  const translateY = p * 60
  const opacity = 1 - p * 0.4
  return {
    // card заметно уменьшается и уходит чуть вниз,
    // создавая ощущение, что следующая “карта” наезжает сверху
    transform: `translateY(${translateY}px) scale(${scale})`,
    opacity,
  }
})

const servicesParallaxStyle = computed(() => {
  const p = Math.min(scrollProgress.value, 1)
  const offset = p * 180
  return {
    transform: `translateY(${-offset}px)`,
  }
})

onMounted(() => {
  orbY.value = window.innerHeight * 0.25
  orbX.value = 120

  updateActiveSection()

  scrollHandler = () => {
    updateActiveSection()
    const vh = window.innerHeight || 1
    scrollProgress.value = Math.min(window.scrollY / vh, 1)
  }

  window.addEventListener('scroll', scrollHandler, { passive: true })

  pointerHandler = (event) => {
    const vw = window.innerWidth || 1
    const vh = window.innerHeight || 1
    const normX = (event.clientX / vw - 0.5) * 2
    const normY = (event.clientY / vh - 0.5) * 2
    tiltX.value = normX * 10
    tiltY.value = -normY * 10
  }

  window.addEventListener('pointermove', pointerHandler, { passive: true })

  setTimeout(() => {
    isIntro.value = false
  }, 1600)
  frame = requestAnimationFrame(animateOrb)
})

onUnmounted(() => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
  if (frame) cancelAnimationFrame(frame)
  if (pointerHandler) window.removeEventListener('pointermove', pointerHandler)
})
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-white text-slate-900">
    <!-- Intro overlay -->
    <div
      v-if="isIntro"
      class="fixed inset-0 z-20 bg-white/70 backdrop-blur-xl transition-opacity duration-500"
    ></div>

    <!-- Floating logo orb -->
    <button
      type="button"
      class="fixed left-0 top-0 hidden cursor-pointer rounded-full outline-none ring-0 focus-visible:ring-2 focus-visible:ring-violet-400/70 lg:block"
      :style="{
        transform: `translate3d(${orbX}px, ${orbY}px, 0) scale(${orbScale * (orbPressed ? 0.95 : 1)})`,
        transition: 'transform 160ms ease-out',
        zIndex: isIntro ? 50 : activeSection === 'hero' ? 5 : 40,
      }"
      @click="smoothScrollTo('contact')"
      @pointerdown="orbPressed = true"
      @pointerup="orbPressed = false"
      @pointerleave="orbPressed = false"
    >
      <div
        class="relative flex h-20 w-20 items-center justify-center rounded-full bg-transparent"
      >
        <!-- outer subtle halo -->
        <div class="absolute inset-1 rounded-full bg-white/90 backdrop-blur-md"></div>

        <!-- two animated semi-circles -->
        <div class="orb-ring-top"></div>
        <div class="orb-ring-bottom"></div>

        <!-- logo core -->
        <div
          class="relative flex h-12 w-12 items-center justify-center rounded-full bg-white transition-transform duration-200 hover:scale-[1.03]"
        >
          <div
            class="flex h-10 w-10 items-center justify-center"
            :style="{
              transform: `rotateX(${tiltY}deg) rotateY(${tiltX}deg)`,
              transformStyle: 'preserve-3d',
            }"
          >
            <img
              src="/logo-dark-nobg.svg"
              alt="Meowmatrix logo"
              class="h-7 w-auto"
            />
          </div>
        </div>
      </div>
    </button>

    <div class="container-page relative z-10 pb-16 pt-6 sm:pt-8 lg:pt-10">
      <!-- Navigation -->
      <header class="flex items-center justify-between gap-6 border-slate-200 pb-4 sm:pb-6">
        <div class="flex items-center gap-3">
          <div class="flex h-10 items-center">
            <img
              src="/logo-dark-nobg.svg"
              alt="Meowmatrix logo"
              class="h-8 w-auto"
            />
          </div>
          <div class="flex flex-col">
            <span class="font-display text-[0.7rem] font-bold uppercase tracking-[0.28em] text-slate-500">
              Meowmatrix EU
            </span>
            <span class="font-display text-sm font-semibold text-slate-900">European web & product studio</span>
          </div>
        </div>

        <nav class="hidden items-center gap-8 text-[0.7rem] font-semibold text-slate-500 sm:flex font-display">
          <button
            v-for="item in sections"
            :key="item.id"
            type="button"
            class="relative pb-1 tracking-[0.18em] uppercase transition-colors"
            :class="activeSection === item.id ? 'text-slate-900' : 'hover:text-slate-800'"
            @click="smoothScrollTo(item.id)"
          >
            {{ item.label }}
            <span
              class="absolute inset-x-0 -bottom-0.5 h-px origin-center rounded-full bg-brand-gradient transition-transform"
              :class="activeSection === item.id ? 'scale-x-100' : 'scale-x-0'"
            />
          </button>
        </nav>

        <button
          type="button"
          class="font-display hidden rounded-full border-2 border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50 sm:inline-flex"
          @click="smoothScrollTo('contact')"
        >
          Let’s talk
        </button>
      </header>

      <main class="mt-10 space-y-0 sm:mt-14 md:mt-16 lg:mt-20">
        <!-- HERO -->
        <section
          id="hero"
          class="section-band relative z-20 flex min-h-[calc(100vh-220px)] items-start justify-center transform-gpu transition-transform duration-500 ease-out"
          :style="heroParallaxStyle"
        >
          <!-- sweeping arc hinting at the logo path -->
          <div
            class="pointer-events-none absolute -top-24 left-[-15%] right-[-15%] z-0 h-40 rounded-full  border-violet-300/40 border-b-transparent border-l-transparent border-r-transparent"
          ></div>

          <!-- hero card -->
          <div
            class="relative z-10 flex flex-col items-center gap-8 rounded-[3rem] border border-slate-200/80 bg-white/90 px-6 py-10 text-center shadow-soft-xl backdrop-blur sm:px-10 sm:py-14 md:px-16 md:py-16"
          >
            <div
              class="pointer-events-none absolute inset-x-6 bottom-10 top-16 rounded-[2.5rem]"
            ></div>

            <div class="relative space-y-6">
              <p class="section-eyebrow text-slate-500">
                European web & product studio
              </p>
              <h1 class="hero-title text-balance text-slate-900">
                We are your calm, confident
                <span class="bg-brand-gradient bg-clip-text text-transparent">digital center in Europe.</span>
              </h1>
              <p class="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg leading-relaxed">
                Strategy, design and development in one orbit. We help European product teams ship websites, web apps and launch materials that convert and age well.
              </p>
            </div>

            <div class="relative flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
              <button type="button" class="btn-primary w-full sm:w-auto" @click="smoothScrollTo('contact')">
                Book a 20‑minute intro call
                <span aria-hidden="true" class="text-lg">↗</span>
              </button>
              <button type="button" class="btn-ghost w-full sm:w-auto" @click="smoothScrollTo('work')">
                View selected work
              </button>
            </div>
          </div>
        </section>

        <!-- TRUSTED BY -->
        <section class="section-band section-band-light py-12 md:py-14" aria-label="Trusted by">
          <div class="container-page">
            <p class="section-eyebrow text-center text-slate-500 mb-8">
              Trusted by product teams and startups across Europe
            </p>
            <div class="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-slate-400">
              <span class="font-display text-lg font-semibold">SaaS</span>
              <span class="font-display text-lg font-semibold">Fintech</span>
              <span class="font-display text-lg font-semibold">Web3</span>
              <span class="font-display text-lg font-semibold">Culture & Arts</span>
              <span class="font-display text-lg font-semibold">E‑commerce</span>
              <span class="font-display text-lg font-semibold">Healthtech</span>
            </div>
          </div>
        </section>

        <!-- SERVICES -->
        <section
          id="services"
          class="section-band section-band-dark relative z-30 space-y-8 py-16 md:py-20 transform-gpu transition-all duration-700 text-slate-50"
          :class="sectionRevealClass('services')"
          :style="{ ...servicesParallaxStyle, ...sectionCardStyle('services') }"
        >
          <header class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div class="space-y-3">
              <p class="section-eyebrow text-slate-300">What we do</p>
              <h2 class="section-heading text-slate-50">From first idea to a live, fast website.</h2>
            </div>
            <p class="max-w-md text-base text-slate-200 leading-relaxed">
              Strategy, design and development move together in compact sprints, so every page has a clear story,
              structure and interaction.
            </p>
          </header>

          <div class="grid gap-6 md:grid-cols-3">
            <article class="group relative overflow-hidden rounded-3xl bg-slate-900/70 p-6 sm:p-8">
              <div
                class="pointer-events-none absolute -right-24 -top-24 h-40 w-40 rounded-full bg-brand-gradient opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
              ></div>
              <div class="relative space-y-4">
                <p class="section-eyebrow text-slate-400">Strategy & structure</p>
                <h3 class="font-display text-xl font-bold text-slate-50 sm:text-2xl">Positioning, narrative & UX architecture</h3>
                <p class="text-sm text-slate-200 leading-relaxed">
                  We clarify who you speak to, what matters to them and how your product fits into their day, then turn
                  this into a clear information architecture.
                </p>
                <ul class="space-y-1 text-sm text-slate-300">
                  <li>— Product & website discovery</li>
                  <li>— UX flows & site maps</li>
                  <li>— Messaging & value props</li>
                </ul>
                <button type="button" class="btn-ghost mt-2 border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700/50 hover:text-slate-50" @click="smoothScrollTo('contact')">
                  Get in touch
                </button>
              </div>
            </article>

            <article class="group relative overflow-hidden rounded-3xl bg-slate-900/70 p-6 sm:p-8">
              <div
                class="pointer-events-none absolute -right-24 -top-24 h-40 w-40 rounded-full bg-brand-gradient opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
              ></div>
              <div class="relative space-y-4">
                <p class="section-eyebrow text-slate-400">Interface & brand</p>
                <h3 class="font-display text-xl font-bold text-slate-50 sm:text-2xl">Web & product design in a European tone</h3>
                <p class="text-sm text-slate-200 leading-relaxed">
                  Calm, generous layouts with strong typography, precise grids and motion that nudges, not distracts.
                </p>
                <ul class="space-y-1 text-sm text-slate-300">
                  <li>— Marketing sites & landing pages</li>
                  <li>— Web apps & dashboards</li>
                  <li>— Design systems & libraries</li>
                </ul>
                <button type="button" class="btn-ghost mt-2 border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700/50 hover:text-slate-50" @click="smoothScrollTo('contact')">
                  Get in touch
                </button>
              </div>
            </article>

            <article class="group relative overflow-hidden rounded-3xl bg-slate-900/70 p-6 sm:p-8">
              <div
                class="pointer-events-none absolute -right-24 -top-24 h-40 w-40 rounded-full bg-brand-gradient opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
              ></div>
              <div class="relative space-y-4">
                <p class="section-eyebrow text-slate-400">Build & iteration</p>
                <h3 class="font-display text-xl font-bold text-slate-50 sm:text-2xl">Vue front‑end, motion & long‑term care</h3>
                <p class="text-sm text-slate-200 leading-relaxed">
                  We ship performant, accessible front‑ends with modern motion — and stay to iterate as behaviour and
                  data come in.
                </p>
                <ul class="space-y-1 text-sm text-slate-300">
                  <li>— Vue + Tailwind builds</li>
                  <li>— Framer‑like micro‑interactions</li>
                  <li>— Ongoing optimisation retainers</li>
                </ul>
                <button type="button" class="btn-ghost mt-2 border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700/50 hover:text-slate-50" @click="smoothScrollTo('contact')">
                  Get in touch
                </button>
              </div>
            </article>
          </div>
        </section>

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

        <!-- WORK -->
        <section
          id="work"
          class="section-band section-band-light space-y-10 py-16 md:py-20 transform-gpu transition-all duration-700"
          :class="sectionRevealClass('work')"
          :style="sectionCardStyle('work')"
        >
          <header class="space-y-4">
            <p class="section-eyebrow">Selected work</p>
            <h2 class="section-heading">Launches that actually moved the needle.</h2>
            <p class="max-w-xl text-base text-slate-600 leading-relaxed">
              Real projects, real impact — from SaaS and fintech to Web3 and culture. Every launch is built to perform and last.
            </p>
          </header>

          <div class="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <article class="card-glass relative overflow-hidden p-6 sm:p-8">
              <div
                class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.2),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.18),_transparent_55%)] opacity-90"
              ></div>
              <div class="relative flex flex-col gap-5">
                <div class="flex flex-wrap items-center gap-3">
                  <span
                    class="inline-flex items-center rounded-full bg-slate-900/5 px-3 py-1 text-[0.7rem] font-medium text-slate-900"
                  >
                    SaaS billing platform
                  </span>
                  <span class="text-xs text-slate-600">Berlin · remote‑friendly</span>
                </div>
                <div class="space-y-4">
                  <h3 class="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                    Redesigning a complex billing tool into a calm product story.
                  </h3>
                  <p class="max-w-xl text-base text-slate-700 leading-relaxed">
                    We reshaped the marketing site and onboarding around real customer journeys, not features — helping
                    the team speak clearly to finance leaders and operators.
                  </p>
                </div>
                <dl class="grid gap-4 text-sm text-slate-600 sm:grid-cols-3">
                  <div>
                    <dt class="font-medium text-slate-500">Impact</dt>
                    <dd class="mt-1 font-semibold text-slate-900">+48% trial‑to‑paid conversion</dd>
                  </div>
                  <div>
                    <dt class="font-medium text-slate-500">Scope</dt>
                    <dd class="mt-1 font-semibold text-slate-900">Website, product UI, motion language</dd>
                  </div>
                  <div>
                    <dt class="font-medium text-slate-500">Timeline</dt>
                    <dd class="mt-1 font-semibold text-slate-900">10 weeks, 1 integrated team</dd>
                  </div>
                </dl>
                <div class="mt-6 flex flex-wrap gap-3">
                  <button type="button" class="btn-primary" @click="smoothScrollTo('contact')">
                    Start your project
                    <span aria-hidden="true" class="text-lg">↗</span>
                  </button>
                  <button type="button" class="btn-ghost" @click="smoothScrollTo('work')">
                    See more work
                  </button>
                </div>
              </div>
            </article>

            <div class="space-y-5">
              <article class="card-glass p-5 sm:p-6">
                <div class="flex items-center justify-between gap-3">
                  <div>
                    <p class="section-eyebrow text-slate-500">Web3 wallet</p>
                    <h3 class="mt-2 font-display text-lg font-bold text-slate-900">
                      Turning a crypto tool into a friendly financial app.
                    </h3>
                  </div>
                  <span class="rounded-full bg-emerald-50 px-3 py-1 text-[0.65rem] font-medium text-emerald-600">
                    3x activation
                  </span>
                </div>
                <p class="mt-3 text-sm text-slate-700 leading-relaxed">
                  New onboarding, calmer visuals and motion system that felt familiar to banking users, while keeping
                  power features available for advanced wallets.
                </p>
                <button type="button" class="btn-ghost mt-4 text-sm" @click="smoothScrollTo('contact')">Discuss project</button>
              </article>

              <article class="card-glass p-5 sm:p-6">
                <div class="flex items-center justify-between gap-3">
                  <div>
                    <p class="section-eyebrow text-slate-500">Cultural institution</p>
                    <h3 class="mt-2 font-display text-lg font-bold text-slate-900">
                      A museum website that feels like walking through the space.
                    </h3>
                  </div>
                  <span class="rounded-full bg-sky-50 px-3 py-1 text-[0.65rem] font-medium text-sky-600">
                    +64% visits
                  </span>
                </div>
                <p class="mt-3 text-sm text-slate-700 leading-relaxed">
                  We shifted from static listings to curated journeys, using motion and photography to show what a visit
                  actually feels like, not just when it opens.
                </p>
                <button type="button" class="btn-ghost mt-4 text-sm" @click="smoothScrollTo('contact')">Discuss project</button>
              </article>
            </div>
          </div>
        </section>

        <!-- PROCESS -->
        <section
          id="process"
          class="section-band section-band-dark space-y-10 py-16 md:py-20 transform-gpu transition-all duration-700"
          :class="sectionRevealClass('process')"
          :style="sectionCardStyle('process')"
        >
          <header class="space-y-4">
            <p class="section-eyebrow text-slate-300">How we work</p>
            <h2 class="section-heading text-slate-50">A calm, structured process. No chaos, no drama.</h2>
            <p class="max-w-xl text-base text-slate-200 leading-relaxed">
              Three steps. Clear deliverables. No surprises.
            </p>
          </header>

          <div class="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <ol class="space-y-5">
              <li class="card-glass flex gap-5 p-6">
                <div
                  class="mt-1 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-slate-900 font-display text-sm font-bold text-white"
                >
                  01
                </div>
                <div class="space-y-2">
                  <h3 class="font-display text-lg font-bold text-slate-900">Clarity first</h3>
                  <p class="text-sm text-slate-700 leading-relaxed">
                    We map your audiences, funnels and existing materials, then agree on a sharp one‑page brief that
                    drives every design and build decision.
                  </p>
                </div>
              </li>
              <li class="card-glass flex gap-5 p-6">
                <div
                  class="mt-1 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-slate-900 font-display text-sm font-bold text-white"
                >
                  02
                </div>
                <div class="space-y-2">
                  <h3 class="font-display text-lg font-bold text-slate-900">Design in the browser</h3>
                  <p class="text-sm text-slate-700 leading-relaxed">
                    We move quickly into live prototypes, so you review real breakpoints, motion and content, not flat
                    slides.
                  </p>
                </div>
              </li>
              <li class="card-glass flex gap-5 p-6">
                <div
                  class="mt-1 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-slate-900 font-display text-sm font-bold text-white"
                >
                  03
                </div>
                <div class="space-y-2">
                  <h3 class="font-display text-lg font-bold text-slate-900">Launch & learn</h3>
                  <p class="text-sm text-slate-700 leading-relaxed">
                    We ship a focused first version, then stay for the first weeks post‑launch to refine what real users
                    actually touch.
                  </p>
                </div>
              </li>
            </ol>

            <aside class="card-glass flex flex-col justify-between p-6">
              <div class="space-y-3">
                <p class="section-eyebrow text-slate-500">Client note</p>
                <p class="font-display text-lg font-bold text-slate-900 leading-snug">
                  “Meowmatrix took our messy narrative and turned it into a clear, confident site. Sales calls now start
                  two steps ahead.”
                </p>
                <p class="text-sm text-slate-600">Head of Growth, B2B SaaS company</p>
              </div>
              <div class="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-700">
                <span class="rounded-full bg-slate-100 px-3 py-1">Remote‑first</span>
                <span class="rounded-full bg-slate-100 px-3 py-1">English‑first collaboration</span>
                <span class="rounded-full bg-slate-100 px-3 py-1">CET‑friendly hours</span>
              </div>
            </aside>
          </div>
        </section>

        <!-- ABOUT -->
        <section
          id="about"
          class="section-band section-band-light space-y-10 py-16 md:py-20 transform-gpu transition-all duration-700"
          :class="sectionRevealClass('about')"
          :style="sectionCardStyle('about')"
        >
          <header class="space-y-4">
            <p class="section-eyebrow">The studio</p>
            <h2 class="section-heading">A small, senior team with product taste.</h2>
            <p class="max-w-xl text-base text-slate-600 leading-relaxed">
              We work as your external squad that feels internal.
            </p>
          </header>

          <div class="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div class="space-y-5 text-base text-slate-700 leading-relaxed">
              <p>
                Meowmatrix grew out of product design and front‑end roles inside European SaaS and Web3 teams. Today we
                work as an external squad that feels internal, plugged into your roadmap instead of working in
                isolation.
              </p>
              <p>
                We care about typography, rhythm and micro‑interactions as much as we care about funnels and pricing
                pages. A good digital experience should age well and still feel sharp in three years.
              </p>
              <button type="button" class="btn-primary mt-4" @click="smoothScrollTo('contact')">
                Let's work together
                <span aria-hidden="true" class="text-lg">↗</span>
              </button>
            </div>

            <div class="space-y-6">
              <div class="card-glass p-6">
                <h3 class="font-display text-lg font-bold text-slate-900">Snapshot</h3>
                <dl class="mt-4 space-y-3 text-sm text-slate-600">
                  <div class="flex items-start justify-between gap-4">
                    <dt class="text-slate-500">Based in</dt>
                    <dd class="text-right font-semibold text-slate-900">EU, working fully remote</dd>
                  </div>
                  <div class="flex items-start justify-between gap-4">
                    <dt class="text-slate-500">Typical engagement</dt>
                    <dd class="text-right font-semibold text-slate-900">6–12 weeks, fixed scope</dd>
                  </div>
                  <div class="flex items-start justify-between gap-4">
                    <dt class="text-slate-500">Team</dt>
                    <dd class="text-right font-semibold text-slate-900">Strategy, design & front‑end</dd>
                  </div>
                </dl>
              </div>
              <div class="card-glass p-6">
                <h3 class="font-display text-lg font-bold text-slate-900">How we build</h3>
                <p class="mt-2 text-sm text-slate-600">Vue, Tailwind, Figma, Vite. Accessible, responsive, fast.</p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">Vue 3</span>
                  <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">Tailwind</span>
                  <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">Figma</span>
                  <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">Vite</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- TESTIMONIALS -->
        <section
          id="testimonials"
          class="section-band section-band-dark space-y-10 py-16 md:py-20 transform-gpu transition-all duration-700 text-slate-50"
          :class="sectionRevealClass('testimonials')"
          :style="sectionCardStyle('testimonials')"
        >
          <header class="space-y-4">
            <p class="section-eyebrow text-slate-300">What clients say</p>
            <h2 class="section-heading text-slate-50">Trusted by product and growth teams.</h2>
            <p class="max-w-xl text-base text-slate-200 leading-relaxed">
              From startups to scale-ups — we help teams ship clear, confident digital experiences.
            </p>
          </header>

          <div class="grid gap-6 md:grid-cols-3">
            <blockquote class="card-glass flex flex-col p-6">
              <p class="flex-1 font-display text-lg font-semibold leading-snug text-slate-900">
                “They turned our messy narrative into a clear, confident site. Sales calls now start two steps ahead.”
              </p>
              <footer class="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                <span class="font-semibold text-slate-900">Sarah K.</span>
                <span>Head of Growth, B2B SaaS</span>
              </footer>
            </blockquote>
            <blockquote class="card-glass flex flex-col p-6">
              <p class="flex-1 font-display text-lg font-semibold leading-snug text-slate-900">
                “Fast, no-nonsense collaboration. The new onboarding flow doubled our activation — and it still feels like our product.”
              </p>
              <footer class="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                <span class="font-semibold text-slate-900">Marcus T.</span>
                <span>Product Lead, Web3 wallet</span>
              </footer>
            </blockquote>
            <blockquote class="card-glass flex flex-col p-6">
              <p class="flex-1 font-display text-lg font-semibold leading-snug text-slate-900">
                “We needed a museum site that felt like the space itself. Meowmatrix delivered exactly that — calm, bold, and easy to update.”
              </p>
              <footer class="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                <span class="font-semibold text-slate-900">Elena V.</span>
                <span>Digital Director, cultural institution</span>
              </footer>
            </blockquote>
          </div>
          <div class="flex justify-center pt-4">
            <button type="button" class="btn-primary" @click="smoothScrollTo('contact')">
              Start a conversation
              <span aria-hidden="true" class="text-lg">↗</span>
            </button>
          </div>
        </section>

        <!-- CONTACT -->
        <section
          id="contact"
          class="section-band section-band-dark space-y-10 py-16 md:py-20 transform-gpu transition-all duration-700"
          :class="sectionRevealClass('contact')"
          :style="sectionCardStyle('contact')"
        >
          <header class="space-y-4">
            <p class="section-eyebrow text-slate-300">Let’s work together</p>
            <h2 class="section-heading text-slate-50">Tell us about the launch you’re planning.</h2>
            <p class="max-w-xl text-base text-slate-200 leading-relaxed">
              One short form. We reply within one business day.
            </p>
          </header>

          <div class="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <form class="card-glass space-y-4 p-5 sm:p-6" @submit.prevent>
              <div class="grid gap-4 sm:grid-cols-2">
                <div class="space-y-1.5 text-sm">
                  <label for="name" class="text-sm font-semibold text-slate-600">Your name</label>
                  <input
                    id="name"
                    type="text"
                    autocomplete="name"
                    class="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/40"
                    placeholder="Alex from Acme"
                  />
                </div>
                <div class="space-y-1.5 text-sm">
                  <label for="email" class="text-sm font-semibold text-slate-600">Work email</label>
                  <input
                    id="email"
                    type="email"
                    autocomplete="email"
                    class="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/40"
                    placeholder="you@company.com"
                  />
                </div>

              <div class="space-y-1.5 text-sm">
                <label for="company" class="text-sm font-semibold text-slate-600">Company / product</label>
                <input
                  id="company"
                  type="text"
                  class="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/40"
                  placeholder="What are you building?"
                />
              </div>
              </div>

              <div class="space-y-1.5 text-sm">
                <label for="project" class="text-sm font-semibold text-slate-600">What do you need help with?</label>
                <textarea
                  id="project"
                  rows="4"
                  class="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/40"
                  placeholder="Share a short outline: goals, timing, links to anything useful."
                ></textarea>
              </div>

              <div class="grid gap-4 sm:grid-cols-2">
                <div class="space-y-1.5 text-sm">
                  <label class="text-sm font-semibold text-slate-600">Timeline</label>
                  <select
                    class="w-full rounded-2xl border border-slate-400/60 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 outline-none ring-0 transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/60"
                  >
                    <option>Within 4–6 weeks</option>
                    <option>Within 2–3 months</option>
                    <option>Flexible</option>
                  </select>
                </div>
                <div class="space-y-1.5 text-sm">
                  <label class="text-sm font-semibold text-slate-600">Rough budget</label>
                  <select
                    class="w-full rounded-2xl border border-slate-400/60 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 outline-none ring-0 transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/60"
                  >
                    <option>€15k – €30k</option>
                    <option>€30k – €60k</option>
                    <option>€60k+</option>
                  </select>
                </div>
              </div>

              <div class="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button type="submit" class="btn-primary w-full sm:w-auto">
                  Send outline
                  <span aria-hidden="true" class="text-lg">↗</span>
                </button>
                <p class="text-sm text-slate-600">
                  Or email us directly:
                    <span class="font-medium text-slate-900">hello@meowmatrix.eu</span>
                </p>
              </div>
            </form>

            <aside class="card-glass flex flex-col justify-between gap-4 p-5 sm:p-6">
              <div class="space-y-2 text-sm text-slate-700">
                <p>
                  Share a short outline and a couple of links — we’ll respond with early thoughts, a rough scope and
                  timing fit, usually within one business day.
                </p>
                <p class="text-xs text-slate-600">
                  If we’re not the right team, we’re happy to recommend others in our network.
                </p>
              </div>
              <div class="space-y-2 text-xs text-slate-600">
                <p class="font-medium text-slate-900">Currently booking</p>
                <p>1 new web / product project for late Q2 2026.</p>
              </div>
            </aside>
          </div>
        </section>

        <!-- FOOTER -->
        <footer class="border-t border-slate-200 pt-10 text-sm text-slate-500">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <p>© {{ new Date().getFullYear() }} Meowmatrix Digital Studio. Crafted in Europe.</p>
            <div class="flex gap-4">
              <a href="#" class="hover:text-slate-700">Behance</a>
              <a href="#" class="hover:text-slate-700">Dribbble</a>
              <a href="#" class="hover:text-slate-700">LinkedIn</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>
