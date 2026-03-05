<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="py-10">
    <!-- Breadcrumb -->
    <div class="container-page mb-8">
      <nav class="text-sm text-slate-500" aria-label="Breadcrumb">
        <RouterLink to="/" class="hover:text-slate-900">Home</RouterLink>
        <span class="mx-2" aria-hidden="true">/</span>
        <span class="text-slate-900 font-medium" aria-current="page">How we work</span>
      </nav>
    </div>

    <!-- Intro -->
    <section class="section-band section-band-light py-16 md:py-20">
      <div class="container-page">
        <h1 class="font-display text-4xl font-medium uppercase tracking-tight text-slate-900 sm:text-5xl md:text-7xl max-w-4xl">
          How we work: stack, automation, and clarity
        </h1>
        <p class="mt-6 max-w-2xl font-light text-lg py-8 text-slate-600 leading-relaxed">
          Why we build with <strong>Laravel</strong> and <strong>Vue.js</strong>, how your site runs without constant developer involvement, how we adapt sites for all devices, and how we estimate work. Everything you need to decide if we're a fit.
        </p>
        <!-- In-page nav (перелинковка) -->
        <nav class="mt-10 flex flex-wrap gap-3" aria-label="On this page">
          <a href="#tech" class="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors">
            <span aria-hidden="true">⚙</span> Tech stack
          </a>
          <a href="#automation" class="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <span aria-hidden="true">⟳</span> Automation
          </a>
          <a href="#adaptation" class="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <span aria-hidden="true">▦</span> Adaptation
          </a>
          <a href="#estimation" class="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <span aria-hidden="true">📋</span> Estimation
          </a>
          <a href="#what-you-get" class="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <span aria-hidden="true">✓</span> Deliverables
          </a>
        </nav>
      </div>
    </section>

    <!-- ========== TECH: Why Laravel + Vue (3 subsections) ========== -->
    <section id="tech" class="section-band section-band-dark py-16 md:py-24 text-slate-50" aria-labelledby="why-laravel-vue-heading">
      <div class="container-page">
        <header class="mb-14">
          <h2 id="why-laravel-vue-heading" class="font-display text-3xl font-medium uppercase tracking-tight text-white sm:text-4xl md:text-7xl">
            Why we use Laravel + Vue.js
          </h2>
          <p class="mt-4 max-w-2xl py-10 font-light text-slate-300 leading-relaxed">
            We choose <strong class="text-white">Laravel</strong> for the backend and <strong class="text-white">Vue.js</strong> for the front so you get a stable, scalable product without vendor lock-in. Both are well documented and easy for other developers to take over. See our full <RouterLink to="/services" class="text-violet-300 hover:text-violet-200 underline">services and tech stack</RouterLink>.
          </p>
        </header>

        <div class="grid gap-10 md:grid-cols-3">
          <!-- Subsection 1: Laravel -->
          <article class="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6 md:p-8">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400" aria-hidden="true">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>
            </div>
            <h3 class="mt-4 font-display text-xl font-bold text-white">Laravel: robust backend</h3>
            <p class="mt-2 text-slate-300 text-sm leading-relaxed">
              Laravel handles business logic, APIs, authentication, and data. Its structure and conventions make your codebase maintainable and predictable. Ideal for <strong class="text-slate-200">e-commerce</strong>, <strong class="text-slate-200">web applications</strong>, and <strong class="text-slate-200">custom backends</strong>.
            </p>
            <p class="mt-3 text-xs text-slate-400">
              Keywords: PHP, API, database, auth, Eloquent, Blade, queues.
            </p>
          </article>
          <!-- Subsection 2: Vue -->
          <article class="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6 md:p-8">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400" aria-hidden="true">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h3 class="mt-4 font-display text-xl font-bold text-white">Vue.js: fast, reactive front-end</h3>
            <p class="mt-2 text-slate-300 text-sm leading-relaxed">
              Vue's component model and reactivity keep the UI snappy and easy to extend. We use <strong class="text-slate-200">Vue 3</strong> with Composition API, TypeScript when needed, and pair it with <strong class="text-slate-200">Nuxt</strong> or SSR where <strong class="text-slate-200">SEO</strong> and performance matter.
            </p>
            <p class="mt-3 text-xs text-slate-400">
              Keywords: Vue 3, components, reactivity, Nuxt, SSR, SPA.
            </p>
          </article>
          <!-- Subsection 3: Together -->
          <article class="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6 md:p-8">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400" aria-hidden="true">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 class="mt-4 font-display text-xl font-bold text-white">Together: one stack, one team</h3>
            <p class="mt-2 text-slate-300 text-sm leading-relaxed">
              Laravel + Vue give you a single, coherent stack. We also use <strong class="text-slate-200">React</strong>, <strong class="text-slate-200">Next.js</strong>, and <strong class="text-slate-200">Tailwind</strong> when the project fits. Long-term support and clear documentation so you're never locked in.
            </p>
            <p class="mt-3 text-xs text-slate-400">
              Keywords: full-stack, maintainability, scalability, handover.
            </p>
          </article>
        </div>

        <p class="mt-10 text-slate-400 text-sm">
          Need a custom <strong class="text-slate-300">online store</strong> or <strong class="text-slate-300">web platform</strong>? <RouterLink to="/services" class="text-violet-300 hover:text-violet-200 underline">Browse our services</RouterLink> or <RouterLink to="/#contact" class="text-violet-300 hover:text-violet-200 underline">request a quote</RouterLink>.
        </p>
      </div>
    </section>

    <!-- ========== AUTOMATION (3 subsections) ========== -->
    <section id="automation" class="section-band section-band-light py-16 md:py-24" aria-labelledby="automation-heading">
      <div class="container-page">
        <header class="mb-14">
          <h2 id="automation-heading" class="font-display text-3xl font-medium uppercase tracking-tight text-slate-900 sm:text-4xl md:text-7xl">
            Automation: your site works without constant developer involvement
          </h2>
          <p class="mt-4 max-w-2xl py-10 font-light text-slate-600 leading-relaxed">
            We build so that once the site is live, content updates, orders, and routine tasks don't require a programmer. You get an <strong>admin panel</strong> or <strong>headless CMS</strong>, clear documentation, and optional automated backups. More in <a href="#what-you-get" class="font-semibold text-violet-600 hover:text-violet-700 underline">what you get</a>.
          </p>
        </header>

        <div class="grid gap-8 md:grid-cols-3">
          <!-- Subsection 1: Content -->
          <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600" aria-hidden="true">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </div>
            <h3 class="mt-4 font-display text-lg font-bold text-slate-900">Content you control</h3>
            <p class="mt-2 text-slate-600 text-sm leading-relaxed">
              You (or your team) edit text, images, and structure via the <strong>admin panel</strong> or CMS. No code changes needed for news, pages, or product updates. We train you once and leave written docs.
            </p>
            <p class="mt-3 text-xs text-slate-500">Admin panel, CMS, content management, no-code edits.</p>
          </article>
          <!-- Subsection 2: Orders & forms -->
          <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-600" aria-hidden="true">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
            </div>
            <h3 class="mt-4 font-display text-lg font-bold text-slate-900">Orders and forms run on their own</h3>
            <p class="mt-2 text-slate-600 text-sm leading-relaxed">
              E-commerce orders, lead forms, and contact requests run automatically. We set up notifications, payment flows (e.g. Stripe), and email so you don't need a developer for day-to-day operations.
            </p>
            <p class="mt-3 text-xs text-slate-500">E-commerce, forms, Stripe, notifications, automation.</p>
          </article>
          <!-- Subsection 3: Maintenance -->
          <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600" aria-hidden="true">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 class="mt-4 font-display text-lg font-bold text-slate-900">Maintenance and hosting</h3>
            <p class="mt-2 text-slate-600 text-sm leading-relaxed">
              We recommend hosting and tooling that minimise hands-on work. Optional <strong>support plans</strong> for updates, backups, and small changes. Your site stays secure and up to date without you managing servers.
            </p>
            <p class="mt-3 text-xs text-slate-500">Hosting, backups, support plan, security updates.</p>
          </article>
        </div>

        <p class="mt-10 text-slate-600 text-sm">
          Want to see how we <a href="#estimation" class="font-semibold text-violet-600 hover:text-violet-700 underline">estimate</a> automation and admin work? <RouterLink to="/#contact" class="font-semibold text-violet-600 hover:text-violet-700 underline">Get in touch</RouterLink>.
        </p>
      </div>
    </section>

    <!-- ========== ADAPTATION (3 subsections) ========== -->
    <section id="adaptation" class="section-band section-band-dark py-16 md:py-24 text-slate-50" aria-labelledby="adaptation-heading">
      <div class="container-page">
        <header class="mb-14">
          <h2 id="adaptation-heading" class="font-display text-3xl font-medium uppercase tracking-tight text-white sm:text-4xl md:text-7xl">
            Site adaptation: every device, every screen
          </h2>
          <p class="mt-4 max-w-2xl py-10 font-light text-slate-300 leading-relaxed">
            Every site we deliver is <strong class="text-white">responsive</strong>: it adapts to phones, tablets, and desktops. We design and build mobile-first, test on real devices and browsers, and optimise for <strong class="text-white">performance</strong> and <strong class="text-white">accessibility</strong>.
          </p>
        </header>

        <div class="grid gap-8 md:grid-cols-3">
          <!-- Subsection 1: Responsive -->
          <article class="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400" aria-hidden="true">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </div>
            <h3 class="mt-4 font-display text-lg font-bold text-white">Responsive layout</h3>
            <p class="mt-2 text-slate-300 text-sm leading-relaxed">
              Layout, typography, and touch targets adapt to screen size. Mobile-first approach so the experience is consistent on <strong class="text-slate-200">smartphones</strong>, <strong class="text-slate-200">tablets</strong>, and <strong class="text-slate-200">desktops</strong>.
            </p>
            <p class="mt-3 text-xs text-slate-400">Responsive design, mobile-first, breakpoints, touch-friendly.</p>
          </article>
          <!-- Subsection 2: Cross-browser -->
          <article class="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400" aria-hidden="true">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
            </div>
            <h3 class="mt-4 font-display text-lg font-bold text-white">Cross-browser testing</h3>
            <p class="mt-2 text-slate-300 text-sm leading-relaxed">
              We test on <strong class="text-slate-200">Chrome</strong>, <strong class="text-slate-200">Safari</strong>, <strong class="text-slate-200">Firefox</strong>, and <strong class="text-slate-200">Edge</strong>. Your audience gets the same experience regardless of browser or device.
            </p>
            <p class="mt-3 text-xs text-slate-400">Chrome, Safari, Firefox, Edge, compatibility.</p>
          </article>
          <!-- Subsection 3: Performance -->
          <article class="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400" aria-hidden="true">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 class="mt-4 font-display text-lg font-bold text-white">Performance & accessibility</h3>
            <p class="mt-2 text-slate-300 text-sm leading-relaxed">
              Fast load times and <strong class="text-slate-200">Core Web Vitals</strong> in mind. Clear typography and contrast for readability. We follow accessibility best practices so more users can use your site.
            </p>
            <p class="mt-3 text-xs text-slate-400">Core Web Vitals, SEO, accessibility, speed.</p>
          </article>
        </div>

        <p class="mt-10 text-slate-400 text-sm">
          Our <RouterLink to="/services" class="text-violet-300 hover:text-violet-200 underline">front-end and full-stack services</RouterLink> include responsive design by default. <a href="#tech" class="text-violet-300 hover:text-violet-200 underline">Back to tech stack</a>.
        </p>
      </div>
    </section>

    <!-- ========== ESTIMATION (3 subsections) ========== -->
    <section id="estimation" class="section-band section-band-light py-16 md:py-24" aria-labelledby="estimation-heading">
      <div class="container-page">
        <header class="mb-14">
          <h2 id="estimation-heading" class="font-display text-3xl font-medium uppercase tracking-tight text-slate-900 sm:text-4xl md:text-7xl">
            How we estimate work
          </h2>
          <p class="mt-4 max-w-2xl py-10 font-light text-slate-600 leading-relaxed">
            We give you a clear picture before you commit. After a short brief or call, we provide a <strong>written scope</strong> and <strong>estimate</strong> (fixed price or time-and-materials). No hidden fees; we flag risks and assumptions upfront.
          </p>
        </header>

        <div class="grid gap-8 md:grid-cols-3">
          <!-- Step 1 -->
          <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white font-display text-xl font-bold" aria-hidden="true">1</div>
            <h3 class="mt-4 font-display text-lg font-bold text-slate-900">Brief and discovery</h3>
            <p class="mt-2 text-slate-600 text-sm leading-relaxed">
              You share goals, content, and constraints; we ask a few clarifying questions. We may request a call or a short written brief. No charge for this step — we need to understand the project to quote accurately.
            </p>
            <p class="mt-3 text-xs text-slate-500">Discovery, brief, requirements, scope.</p>
          </article>
          <!-- Step 2 -->
          <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white font-display text-xl font-bold" aria-hidden="true">2</div>
            <h3 class="mt-4 font-display text-lg font-bold text-slate-900">Scope and quote</h3>
            <p class="mt-2 text-slate-600 text-sm leading-relaxed">
              We send a written scope, timeline, and price. You approve or we adjust. We offer <strong>fixed price</strong> for well-defined projects and <strong>time-and-materials</strong> for ongoing or exploratory work. All assumptions are listed.
            </p>
            <p class="mt-3 text-xs text-slate-500">Quote, fixed price, T&M, timeline, assumptions.</p>
          </article>
          <!-- Step 3 -->
          <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white font-display text-xl font-bold" aria-hidden="true">3</div>
            <h3 class="mt-4 font-display text-lg font-bold text-slate-900">Contract and kickoff</h3>
            <p class="mt-2 text-slate-600 text-sm leading-relaxed">
              Once you approve, we sign a contract and start. We work in phases so you always see progress. You get regular updates and a clear handover at the end, including <a href="#what-you-get" class="font-semibold text-violet-600 hover:text-violet-700 underline">documentation and deliverables</a>.
            </p>
            <p class="mt-3 text-xs text-slate-500">Kickoff, phases, milestones, handover.</p>
          </article>
        </div>

        <div class="mt-10 rounded-2xl border border-violet-200 bg-violet-50/50 p-6">
          <p class="text-slate-700">
            <strong>Request a quote:</strong> we typically respond with a first estimate within one business day.
            <RouterLink to="/#contact" class="ml-1 font-semibold text-violet-600 hover:text-violet-700 underline">Get in touch →</RouterLink>
          </p>
        </div>
      </div>
    </section>

    <!-- ========== WHAT YOU GET (3 subsections) ========== -->
    <section id="what-you-get" class="section-band section-band-dark py-16 md:py-24 text-slate-50" aria-labelledby="what-you-get-heading">
      <div class="container-page">
        <header class="mb-14">
          <h2 id="what-you-get-heading" class="font-display text-3xl font-medium uppercase tracking-tight text-white sm:text-4xl md:text-7xl max-w-4xl">
            What you get when you work with us
          </h2>
          <p class="mt-4 max-w-2xl py-10 font-light text-slate-300 leading-relaxed">
            A single team for strategy, design, and development. Clear communication in English. A site that you can run and grow without depending on us daily — plus optional support and iterations when you need them.
          </p>
        </header>

        <div class="grid gap-8 md:grid-cols-3">
          <!-- Subsection 1 -->
          <article class="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400" aria-hidden="true">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h3 class="mt-4 font-display text-lg font-bold text-white">Transparent scope and pricing</h3>
            <p class="mt-2 text-slate-300 text-sm leading-relaxed">
              Written scope, timeline, and price before you commit. No surprise invoices. We flag risks and assumptions so you can decide with full information.
            </p>
          </article>
          <!-- Subsection 2 -->
          <article class="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400" aria-hidden="true">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>
            </div>
            <h3 class="mt-4 font-display text-lg font-bold text-white">Admin or CMS to edit content</h3>
            <p class="mt-2 text-slate-300 text-sm leading-relaxed">
              You get an admin panel or headless CMS so you can update text, images, and structure without a developer. We train you and provide documentation. See <a href="#automation" class="text-violet-300 hover:text-violet-200 underline">automation</a>.
            </p>
          </article>
          <!-- Subsection 3 -->
          <article class="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400" aria-hidden="true">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 class="mt-4 font-display text-lg font-bold text-white">Documentation and handover</h3>
            <p class="mt-2 text-slate-300 text-sm leading-relaxed">
              Responsive, fast, accessible site plus docs so you or another team can maintain it. No lock-in. Optional support plans for updates and small changes.
            </p>
          </article>
        </div>

        <ul class="mt-10 grid gap-3 sm:grid-cols-2 max-w-3xl text-slate-300">
          <li class="flex gap-3"><span class="text-violet-400 shrink-0">✓</span> Transparent scope and pricing</li>
          <li class="flex gap-3"><span class="text-violet-400 shrink-0">✓</span> Admin or CMS so you can edit content</li>
          <li class="flex gap-3"><span class="text-violet-400 shrink-0">✓</span> Documentation and handover</li>
          <li class="flex gap-3"><span class="text-violet-400 shrink-0">✓</span> Responsive, fast, accessible site</li>
        </ul>

        <p class="mt-10 text-slate-400 text-sm">
          Interested in our <strong class="text-slate-300">web development</strong> or <strong class="text-slate-300">e-commerce</strong> services? <RouterLink to="/services" class="text-violet-300 hover:text-violet-200 underline">View services</RouterLink> or <RouterLink to="/#contact" class="text-violet-300 hover:text-violet-200 underline">request a quote</RouterLink>.
        </p>
      </div>
    </section>

    <!-- CTA -->
    <section class="section-band section-band-light py-16 md:py-20">
      <div class="container-page text-center">
        <p class="font-display text-2xl font-medium uppercase text-slate-900 sm:text-3xl md:text-7xl mx-auto max-w-xl">
          Ready to start?
        </p>
        <p class="mt-2 py-4 font-light text-slate-600 max-w-xl mx-auto">
          Share your project outline and we'll come back with an estimate and next steps.
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-4">
          <RouterLink to="/#contact" class="btn-primary inline-flex items-center gap-2">
            Get in touch
            <span aria-hidden="true" class="text-lg">↗</span>
          </RouterLink>
          <RouterLink to="/services" class="inline-flex items-center gap-2 rounded-full border-2 border-slate-300 px-5 py-2.5 font-display text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            View services
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>
