<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['contact'])

const selectedService = ref(null)

const serviceGroups = [
  {
    id: 'ecommerce',
    title: 'E-commerce & online stores',
    paragraph: 'We build custom online stores and marketplaces that convert. From product catalogues and checkout flows to multi-vendor platforms and B2B portals — on Laravel, Vue, and modern front-ends.',
    services: [
      {
        id: 'custom-ecommerce',
        title: 'Custom e-commerce development',
        shortDesc: 'Tailored online stores: catalogues, cart, checkout, payments, and admin. No template limits.',
        longDesc: 'We design and build e-commerce from the ground up: product catalogues, filters, cart, checkout (including Stripe, PayPal, local gateways), order management, and a clear admin panel. Ideal when off-the-shelf solutions don’t fit your product mix, B2B rules, or brand.',
        stack: ['Laravel', 'Vue', 'Stripe', 'Tailwind'],
      },
      {
        id: 'internet-magazine',
        title: 'Internet shops & retail platforms',
        shortDesc: 'Full-cycle online retail: inventory, promotions, shipping, and reporting.',
        longDesc: 'Complete internet retail solutions: product management, categories, search, promotions, shipping and tax rules, invoices, and reporting. We integrate with ERPs and logistics where needed so your team can run day-to-day operations efficiently.',
        stack: ['Laravel', 'Vue', 'MySQL', 'Redis'],
      },
      {
        id: 'marketplace',
        title: 'Marketplaces & multi-vendor platforms',
        shortDesc: 'Multi-seller platforms: vendors, commissions, escrow, and dashboards.',
        longDesc: 'Marketplace and multi-vendor platforms: vendor onboarding, product listings, commissions, escrow or split payments, vendor dashboards, and moderation. We handle the complexity so you can focus on growth and operations.',
        stack: ['Laravel', 'Vue', 'Nuxt', 'Stripe Connect'],
      },
      {
        id: 'b2b-ecommerce',
        title: 'B2B e-commerce & wholesale',
        shortDesc: 'B2B portals: price lists, quotes, minimum orders, and approval flows.',
        longDesc: 'B2B and wholesale portals with tiered pricing, quote requests, minimum order quantities, approval workflows, and buyer-specific catalogues. We connect your sales logic to a fast, clear ordering experience.',
        stack: ['Laravel', 'Vue', 'Next.js'],
      },
      {
        id: 'headless-commerce',
        title: 'Headless e-commerce & API-first',
        shortDesc: 'Commerce API and custom front-ends for maximum flexibility and performance.',
        longDesc: 'Headless commerce: we build or integrate a robust commerce API (Laravel, custom) and connect it to a custom front-end (Vue, Next, Nuxt). You get full control over UX, SEO, and performance without sacrificing backend power.',
        stack: ['Laravel', 'Vue', 'Next.js', 'Nuxt', 'REST/GraphQL'],
      },
      {
        id: 'shop-migration',
        title: 'E-commerce migration & redesign',
        shortDesc: 'Move from legacy or SaaS to a modern stack without losing data or SEO.',
        longDesc: 'Migration from legacy systems or SaaS (e.g. old PHP, Magento, WooCommerce) to a modern Laravel + Vue/Next stack. We plan data and URL migration to preserve SEO and run parallel until go-live.',
        stack: ['Laravel', 'Vue', 'Data migration', 'SEO'],
      },
    ],
  },
  {
    id: 'platforms',
    title: 'Web platforms & applications',
    paragraph: 'Product-style web apps: dashboards, SaaS, internal tools, and public platforms. We combine clear UX with Laravel, Vue, React, and Next/Nuxt so your product is fast and maintainable.',
    services: [
      {
        id: 'saas-products',
        title: 'SaaS products & web applications',
        shortDesc: 'Subscription and usage-based web apps: auth, billing, and dashboards.',
        longDesc: 'SaaS and product-style web applications: authentication, roles, subscription or usage-based billing (Stripe), dashboards, and API design. We focus on clarity and scalability so you can iterate quickly.',
        stack: ['Laravel', 'Vue', 'React', 'Stripe', 'Tailwind'],
      },
      {
        id: 'dashboards',
        title: 'Dashboards & internal tools',
        shortDesc: 'Admin panels, reporting, and operational tools for your team.',
        longDesc: 'Dashboards and internal tools: KPIs, tables, filters, exports, and workflows. We build interfaces that your team will use daily — fast, understandable, and aligned with your processes.',
        stack: ['Laravel', 'Vue', 'React', 'Charts', 'Export/API'],
      },
      {
        id: 'mvp-launch',
        title: 'MVP & product launch',
        shortDesc: 'From idea to first version: scope, build, and launch in weeks.',
        longDesc: 'MVP and launch projects: we help define scope, build the first usable version (often Laravel + Vue or Next), and get you live. Then we iterate based on real usage and feedback.',
        stack: ['Laravel', 'Vue', 'Next.js', 'Nuxt', 'Tailwind'],
      },
      {
        id: 'api-backend',
        title: 'API & backend development',
        shortDesc: 'REST and GraphQL APIs, integrations, and business logic.',
        longDesc: 'Backend and API development: REST or GraphQL APIs, authentication, integrations with third-party services, background jobs, and business logic. We keep APIs consistent and documented for your front-end or mobile apps.',
        stack: ['Laravel', 'PHP', 'REST', 'GraphQL', 'Queue/Jobs'],
      },
    ],
  },
  {
    id: 'frontend',
    title: 'Front-end & full-stack stack',
    paragraph: 'We use Vue, React, Next.js, and Nuxt for fast, accessible interfaces. Combined with Laravel or Node backends, we deliver full-stack solutions that are easy to maintain and extend.',
    services: [
      {
        id: 'vue-apps',
        title: 'Vue.js development',
        shortDesc: 'Vue 3 applications: SPAs, components, and state management.',
        longDesc: 'Vue 3 applications: single-page apps, reusable components, Pinia or Vuex, and TypeScript when needed. We use Vue for dashboards, e-commerce front-ends, and interactive UIs that stay performant as they grow.',
        stack: ['Vue 3', 'Pinia', 'Vite', 'TypeScript', 'Tailwind'],
      },
      {
        id: 'nuxt-apps',
        title: 'Nuxt.js & SSR',
        shortDesc: 'Server-side rendering and static sites with Vue and Nuxt.',
        longDesc: 'Nuxt 3 projects: SSR and static generation for SEO and performance. We use Nuxt for content-heavy sites, e-commerce storefronts, and marketing pages that need fast first load and good indexing.',
        stack: ['Nuxt 3', 'Vue 3', 'SSR', 'SEO'],
      },
      {
        id: 'react-next',
        title: 'React & Next.js development',
        shortDesc: 'React and Next.js for modern, SEO-friendly web applications.',
        longDesc: 'React and Next.js applications: component architecture, server components, and App Router. We build marketing sites, dashboards, and full-stack apps with Next when React is the right fit for your team or product.',
        stack: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
      },
      {
        id: 'laravel-fullstack',
        title: 'Laravel full-stack',
        shortDesc: 'Laravel backend with Blade, Inertia, or API + SPA front-end.',
        longDesc: 'Laravel-centric projects: classic Blade views, Inertia.js (Vue or React), or API + separate SPA. We use Laravel for auth, data, jobs, and business logic so your front-end stays focused on UX.',
        stack: ['Laravel', 'Blade', 'Inertia', 'Vue', 'React'],
      },
      {
        id: 'design-systems',
        title: 'Design systems & UI libraries',
        shortDesc: 'Reusable component libraries and design tokens for consistency.',
        longDesc: 'Design systems and UI libraries: documented components, design tokens, and patterns so your product stays consistent and your team can ship faster. We align with your brand and stack (Vue, React).',
        stack: ['Vue', 'React', 'Storybook', 'Tailwind', 'Figma'],
      },
    ],
  },
  {
    id: 'design-ux',
    title: 'Design & user experience',
    paragraph: 'Clear structure and visual design for e-commerce, platforms, and marketing. We focus on conversion, accessibility, and a European, calm aesthetic that fits your brand.',
    services: [
      {
        id: 'ux-architecture',
        title: 'UX & information architecture',
        shortDesc: 'User flows, sitemaps, and wireframes for e-commerce and products.',
        longDesc: 'UX and information architecture: user research, flows, sitemaps, and wireframes. We clarify who uses your product and how, so the build phase has a solid foundation — especially important for e-commerce and complex platforms.',
        stack: ['Figma', 'User flows', 'Wireframes', 'Prototypes'],
      },
      {
        id: 'ui-design',
        title: 'UI design & visual identity',
        shortDesc: 'Interfaces and visual systems for web and product.',
        longDesc: 'UI design and visual identity: interfaces, typography, colour, and components. We deliver designs that work in code (often with Tailwind) and support your brand across marketing and product.',
        stack: ['Figma', 'Tailwind', 'Design tokens', 'Accessibility'],
      },
      {
        id: 'ecommerce-design',
        title: 'E-commerce UX & conversion',
        shortDesc: 'Product pages, checkout, and flows tuned for conversion.',
        longDesc: 'E-commerce UX and conversion: product pages, filters, cart, and checkout designed to reduce friction and increase trust. We use best practices and testing to improve conversion rates.',
        stack: ['Figma', 'A/B thinking', 'Analytics', 'UX audit'],
      },
    ],
  },
  {
    id: 'support',
    title: 'Support, SEO & growth',
    paragraph: 'Ongoing maintenance, performance, and SEO so your e-commerce and platforms stay fast, visible, and reliable.',
    services: [
      {
        id: 'maintenance',
        title: 'Maintenance & support',
        shortDesc: 'Ongoing updates, security, and feature iterations.',
        longDesc: 'Maintenance and support: updates, security patches, and small feature iterations. We work on retainer or project basis so your e-commerce or platform stays stable and can evolve without big rewrites.',
        stack: ['Laravel', 'Vue', 'Monitoring', 'Backups'],
      },
      {
        id: 'seo-performance',
        title: 'SEO & technical performance',
        shortDesc: 'Technical SEO, speed, and Core Web Vitals for e-commerce and content.',
        longDesc: 'Technical SEO and performance: meta, structure, sitemaps, and Core Web Vitals. We optimise Laravel, Vue, and Next/Nuxt projects so your e-commerce and content rank and load quickly.',
        stack: ['SEO', 'Lighthouse', 'Laravel', 'Nuxt', 'Next.js'],
      },
      {
        id: 'analytics-integration',
        title: 'Analytics & tracking',
        shortDesc: 'GA4, conversions, and event tracking for e-commerce and funnels.',
        longDesc: 'Analytics and tracking: GA4, conversion and funnel tracking, and custom events. We set up clean, privacy-aware tracking so you can measure what matters for your store or product.',
        stack: ['GA4', 'GTM', 'Stripe', 'Custom events'],
      },
    ],
  },
]

function openModal(service) {
  selectedService.value = service
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  selectedService.value = null
  document.body.style.overflow = ''
}

function onContactClick() {
  closeModal()
  emit('contact')
}

function onKeydown(e) {
  if (e.key === 'Escape') closeModal()
}

const isLightGroup = (i) => i % 2 === 0

function cardClassForGroup(groupIndex) {
  return isLightGroup(groupIndex)
    ? 'border-slate-200 bg-slate-900 text-slate-50 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/15 focus-visible:ring-offset-slate-50'
    : 'border-slate-700/60 bg-slate-900/50 hover:border-violet-500/50 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-violet-500/10 focus-visible:ring-offset-slate-900'
}

function sectionBandClass(groupIndex) {
  return isLightGroup(groupIndex) ? 'section-band-light' : 'section-band-dark'
}

function groupTextClass(groupIndex) {
  return isLightGroup(groupIndex) ? 'text-slate-900' : 'text-slate-50'
}

function groupHeadingClass(groupIndex) {
  return isLightGroup(groupIndex) ? 'text-slate-900' : 'text-white'
}

function groupParagraphClass(groupIndex) {
  return isLightGroup(groupIndex) ? 'text-slate-600' : 'text-slate-300'
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div id="services" aria-labelledby="services-heading">
    <!-- Intro: one dark box -->
    <section
      class="section-band section-band-dark relative z-30 py-20 md:py-28 text-slate-50"
      aria-labelledby="services-heading"
    >
      <div class="container-page">
        <header role="banner">
          <h2 id="services-heading" class="font-display text-4xl font-medium uppercase tracking-tight text-white sm:text-5xl md:text-6xl lg:text-9xl max-w-4xl">
            From first idea to a live, fast website.
          </h2>
          <p class="mt-6 max-w-2xl text-lg py-6 text-slate-300 leading-relaxed">
            We build custom e-commerce, online stores, marketplaces, and web platforms with Laravel, Vue, Next.js, Nuxt, and React. Strategy, design, and development in one flow — scalable and SEO-friendly.
          </p>
        </header>
      </div>
    </section>

    <!-- Each service group = separate box, alternating white / black -->
    <section
      v-for="(group, groupIndex) in serviceGroups"
      :key="group.id"
      :id="group.id"
      class="section-band relative z-30 py-16 md:py-20"
      :class="sectionBandClass(groupIndex)"
      :aria-labelledby="`group-heading-${group.id}`"
    >
      <div class="container-page" :class="groupTextClass(groupIndex)">
        <div class="mb-10">
          <h3 :id="`group-heading-${group.id}`" class="font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl" :class="groupHeadingClass(groupIndex)">
            {{ group.title }}
          </h3>
          <p class="mt-4 max-w-3xl leading-relaxed text-base md:text-lg" :class="groupParagraphClass(groupIndex)">
            {{ group.paragraph }}
          </p>
        </div>

        <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 list-none p-0 m-0 items-stretch" role="list">
          <li
            v-for="(svc, idx) in group.services"
            :key="svc.id"
            class="list-none h-full min-h-0 flex"
          >
            <article
              class="group/card relative flex flex-col flex-1 min-h-0 rounded-2xl border p-5 md:p-6 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
              :class="cardClassForGroup(groupIndex)"
              tabindex="0"
              role="button"
              :aria-label="`Learn more about ${svc.title}`"
              @click="openModal(svc)"
              @keydown.enter="openModal(svc)"
              @keydown.space.prevent="openModal(svc)"
            >
              <div class="flex items-start justify-between gap-2">
                <span class="font-display text-2xl font-bold tabular-nums text-white/25 group-hover/card:text-violet-400/40 transition-colors" aria-hidden="true">
                  {{ String(idx + 1).padStart(2, '0') }}
                </span>
                <span class="text-xs font-semibold uppercase tracking-widest text-slate-500 group-hover/card:text-slate-400 transition-colors" aria-hidden="true">Details →</span>
              </div>
              <h4 class="mt-2 font-display text-lg font-bold text-white sm:text-xl">{{ svc.title }}</h4>
              <p class="mt-2 flex-1 text-sm text-slate-300 leading-relaxed line-clamp-3">{{ svc.shortDesc }}</p>
              <div class="mt-4 flex flex-wrap gap-2" aria-hidden="true">
                <span
                  v-for="tech in svc.stack.slice(0, 4)"
                  :key="tech"
                  class="rounded-full bg-slate-700/60 px-2.5 py-1 text-[0.7rem] font-medium text-slate-400"
                >
                  {{ tech }}
                </span>
              </div>
            </article>
          </li>
        </ul>
      </div>
    </section>

    <!-- CTA strip: dark box -->
    <section class="section-band section-band-dark relative z-30 py-12 md:py-14">
      <div class="container-page flex flex-wrap items-center justify-between gap-6">
        <p class="text-slate-400 text-sm md:text-base">Need a custom scope or a combination of services? We adapt to your product and timeline.</p>
        <button
          type="button"
          class="rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
          @click="emit('contact')"
        >
          Discuss your project
        </button>
      </div>
    </section>
  </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="selectedService"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
        >
          <div
            class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            aria-hidden="true"
            @click="closeModal"
          />
          <div
            class="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6 md:p-8 shadow-2xl"
            @click.stop
          >
            <button
              type="button"
              class="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              aria-label="Close"
              @click="closeModal"
            >
              <span class="text-xl leading-none" aria-hidden="true">×</span>
            </button>
            <h3 id="modal-title" class="font-display text-xl font-bold text-white pr-10 md:text-2xl">
              {{ selectedService.title }}
            </h3>
            <div id="modal-desc" class="mt-4 text-slate-300 leading-relaxed">
              {{ selectedService.longDesc }}
            </div>
            <div class="mt-6 flex flex-wrap gap-2">
              <span
                v-for="tech in selectedService.stack"
                :key="tech"
                class="rounded-full bg-violet-500/20 px-3 py-1.5 text-sm font-medium text-violet-200"
              >
                {{ tech }}
              </span>
            </div>
            <button
              type="button"
              class="mt-8 w-full rounded-full bg-white py-3.5 text-base font-bold text-slate-900 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 sm:w-auto sm:px-8"
              @click="onContactClick"
            >
              Get in touch
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .relative.z-10,
.modal-leave-active .relative.z-10 {
  transition: transform 0.2s ease;
}
.modal-enter-from .relative.z-10,
.modal-leave-to .relative.z-10 {
  transform: scale(0.98);
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
