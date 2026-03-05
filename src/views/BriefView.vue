<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

// Replace with your Google Docs "Copy" or view link for the brief form
const briefGoogleDocUrl = 'https://docs.google.com/document/d/YOUR_DOC_ID/copy'
const briefEmail = 'office@meowmatrix.eu'

const currentStep = ref(1)
const totalSteps = 7
const submitted = ref(false)

const form = ref({
  // Step 1: Project overview
  projectName: '',
  projectType: '',
  projectGoal: '',
  projectDescription: '',
  // Step 2: Company & product
  companyName: '',
  industry: '',
  hasExistingSite: '',
  existingSiteUrl: '',
  productDescription: '',
  // Step 3: Target audience
  targetAudience: '',
  geography: '',
  audienceChallenges: '',
  // Step 4: Features & scope
  mustHaveFeatures: '',
  niceToHaveFeatures: '',
  integrations: [],
  otherIntegrations: '',
  // Step 5: Design & content
  designReferences: '',
  brandMaterials: '',
  contentProvider: '',
  // Step 6: Technical & timeline
  preferredStack: '',
  launchDate: '',
  budgetRange: '',
  needSupport: '',
  // Step 7: Contact
  name: '',
  email: '',
  phone: '',
  role: '',
  howFoundUs: '',
  consent: false,
  marketingConsent: false,
})

const projectTypes = [
  { value: '', label: 'Select project type' },
  { value: 'ecommerce', label: 'E-commerce / Online store' },
  { value: 'webapp', label: 'Web application / Platform' },
  { value: 'landing', label: 'Landing page / Marketing site' },
  { value: 'redesign', label: 'Redesign / Rebuild of existing site' },
  { value: 'mvp', label: 'MVP / Proof of concept' },
  { value: 'other', label: 'Other' },
]

const integrationOptions = [
  { id: 'payment', label: 'Payment (Stripe, etc.)' },
  { id: 'crm', label: 'CRM / Email marketing' },
  { id: 'analytics', label: 'Analytics / Tracking' },
  { id: 'auth', label: 'Auth / SSO' },
  { id: 'api', label: 'Third-party APIs' },
  { id: 'cms', label: 'CMS / Content' },
]

const budgetOptions = [
  { value: '', label: 'Select range' },
  { value: '10-25', label: '€10k – €25k' },
  { value: '25-50', label: '€25k – €50k' },
  { value: '50-100', label: '€50k – €100k' },
  { value: '100+', label: '€100k+' },
  { value: 'undecided', label: 'Not sure yet' },
]

const howFoundOptions = [
  { value: '', label: 'How did you find us?' },
  { value: 'search', label: 'Search / Google' },
  { value: 'referral', label: 'Referral' },
  { value: 'social', label: 'Social media' },
  { value: 'other', label: 'Other' },
]

function toggleIntegration(id) {
  const i = form.value.integrations.indexOf(id)
  if (i === -1) form.value.integrations.push(id)
  else form.value.integrations.splice(i, 1)
}

const progress = computed(() => (currentStep.value / totalSteps) * 100)

function nextStep() {
  if (currentStep.value < totalSteps) currentStep.value++
}

function prevStep() {
  if (currentStep.value > 1) currentStep.value--
}

function goToStep(step) {
  if (step >= 1 && step <= totalSteps) currentStep.value = step
}

function handleSubmit(e) {
  e.preventDefault()
  if (!form.value.consent) return
  // TODO: send to backend
  submitted.value = true
  currentStep.value = 1
  form.value.consent = false
  form.value.marketingConsent = false
}

function submitAnother() {
  submitted.value = false
}
</script>

<template>
  <main class="min-h-screen bg-white py-10 sm:py-14">
    <div class="container-page">
      <!-- Success state -->
      <section
        v-if="submitted"
        class="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 text-center shadow-sm"
      >
        <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="mt-6 font-display text-2xl font-bold text-slate-900">Thank you</h2>
        <p class="mt-2 text-slate-600">
          We've received your brief. We'll prepare a technical specification and analysis and get back to you within one business day.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <RouterLink to="/" class="btn-primary">Back to home</RouterLink>
          <button type="button" class="btn-ghost" @click="submitAnother">Submit another brief</button>
        </div>
      </section>

      <template v-else>
      <div class="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-12 xl:gap-16">
        <!-- Left: header + info -->
        <header class="lg:sticky lg:top-24 lg:self-start">
          <RouterLink
            to="/"
            class="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </RouterLink>
          <h1 class="mt-6 font-display text-3xl font-medium uppercase tracking-tight text-slate-900 sm:text-4xl">
            Project brief
          </h1>
          <p class="mt-2 font-light py-4 text-slate-600">
            Answer a few questions so we can prepare a technical specification and analysis. You can skip steps and come back later.
          </p>
          <!-- Alternative: Google Docs -->
          <div class="mt-6 rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">
            <p class="font-display text-sm font-medium uppercase tracking-wider text-slate-500">Alternative</p>
            <p class="mt-1 font-light text-slate-700">
              Prefer a document? Open the brief form in Google Docs, fill it in, and send it to our email.
            </p>
            <div class="mt-4 flex flex-wrap items-center gap-3">
              <a
                :href="briefGoogleDocUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              >
                <svg class="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Open brief form (Google Docs)
              </a>
              <span class="text-slate-500">→</span>
              <a
                :href="`mailto:${briefEmail}?subject=Project brief`"
                class="inline-flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700"
              >
                Send to {{ briefEmail }}
              </a>
            </div>
          </div>
          <!-- Progress -->
          <div class="mt-8" role="progressbar" :aria-valuenow="Math.round(progress)" aria-valuemin="0" aria-valuemax="100">
            <div class="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                class="h-full rounded-full bg-gradient-to-r from-violet-500 to-sky-500 transition-all duration-300"
                :style="{ width: progress + '%' }"
              />
            </div>
            <p class="mt-2 text-sm font-medium text-slate-500">
              Step {{ currentStep }} of {{ totalSteps }}
            </p>
          </div>
          <!-- Step nav -->
          <nav class="mt-6 flex flex-wrap gap-2" aria-label="Brief sections">
            <button
              v-for="s in totalSteps"
              :key="s"
              type="button"
              class="rounded-lg px-3 py-1.5 text-sm font-medium transition"
              :class="currentStep === s ? 'bg-violet-100 text-violet-700' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-800'"
              @click="goToStep(s)"
            >
              {{ s }}
            </button>
          </nav>
        </header>

        <!-- Right: form -->
        <form class="min-w-0 space-y-0" @submit="handleSubmit">
        <!-- Step 1: Project overview -->
        <section
          v-show="currentStep === 1"
          class="brief-step rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          aria-labelledby="step1-title"
        >
          <h2 id="step1-title" class="font-display text-xl font-bold text-slate-900">Project overview</h2>
          <p class="mt-1 text-sm text-slate-500">What are you building?</p>
          <div class="mt-6 space-y-5">
            <div>
              <label for="projectName" class="block text-sm font-semibold text-slate-700">Project or product name</label>
              <input
                id="projectName"
                v-model="form.projectName"
                type="text"
                class="input-brief mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                placeholder="e.g. MyShop, Dashboard v2"
              />
            </div>
            <div>
              <label for="projectType" class="block text-sm font-semibold text-slate-700">Project type</label>
              <select
                id="projectType"
                v-model="form.projectType"
                class="input-brief mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
              >
                <option v-for="opt in projectTypes" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div>
              <label for="projectGoal" class="block text-sm font-semibold text-slate-700">Main goal in one sentence</label>
              <input
                id="projectGoal"
                v-model="form.projectGoal"
                type="text"
                class="input-brief mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                placeholder="e.g. Sell products online with a modern store"
              />
            </div>
            <div>
              <label for="projectDescription" class="block text-sm font-semibold text-slate-700">Project description</label>
              <textarea
                id="projectDescription"
                v-model="form.projectDescription"
                rows="4"
                class="input-brief mt-1.5 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                placeholder="Describe the project, context, and what success looks like..."
              />
            </div>
          </div>
        </section>

        <!-- Step 2: Company & product -->
        <section
          v-show="currentStep === 2"
          class="brief-step rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          aria-labelledby="step2-title"
        >
          <h2 id="step2-title" class="font-display text-xl font-bold text-slate-900">Company & product</h2>
          <p class="mt-1 text-sm text-slate-500">Tell us about your business</p>
          <div class="mt-6 space-y-5">
            <div>
              <label for="companyName" class="block text-sm font-semibold text-slate-700">Company name</label>
              <input
                id="companyName"
                v-model="form.companyName"
                type="text"
                class="input-brief mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                placeholder="Your company or brand"
              />
            </div>
            <div>
              <label for="industry" class="block text-sm font-semibold text-slate-700">Industry / sector</label>
              <input
                id="industry"
                v-model="form.industry"
                type="text"
                class="input-brief mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                placeholder="e.g. Retail, SaaS, Healthcare"
              />
            </div>
            <div>
              <span class="block text-sm font-semibold text-slate-700">Do you have an existing site or product?</span>
              <div class="mt-2 flex flex-wrap gap-4">
                <label class="flex cursor-pointer items-center gap-2">
                  <input v-model="form.hasExistingSite" type="radio" value="yes" class="h-4 w-4 text-violet-600 focus:ring-violet-500" />
                  <span class="text-sm text-slate-700">Yes</span>
                </label>
                <label class="flex cursor-pointer items-center gap-2">
                  <input v-model="form.hasExistingSite" type="radio" value="no" class="h-4 w-4 text-violet-600 focus:ring-violet-500" />
                  <span class="text-sm text-slate-700">No</span>
                </label>
              </div>
              <input
                v-if="form.hasExistingSite === 'yes'"
                v-model="form.existingSiteUrl"
                type="url"
                class="input-brief mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                placeholder="https://..."
              />
            </div>
            <div>
              <label for="productDescription" class="block text-sm font-semibold text-slate-700">Short product description</label>
              <textarea
                id="productDescription"
                v-model="form.productDescription"
                rows="3"
                class="input-brief mt-1.5 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                placeholder="What does your product or service do?"
              />
            </div>
          </div>
        </section>

        <!-- Step 3: Target audience -->
        <section
          v-show="currentStep === 3"
          class="brief-step rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          aria-labelledby="step3-title"
        >
          <h2 id="step3-title" class="font-display text-xl font-bold text-slate-900">Target audience</h2>
          <p class="mt-1 text-sm text-slate-500">Who will use the product?</p>
          <div class="mt-6 space-y-5">
            <div>
              <label for="targetAudience" class="block text-sm font-semibold text-slate-700">Who are your main users?</label>
              <textarea
                id="targetAudience"
                v-model="form.targetAudience"
                rows="3"
                class="input-brief mt-1.5 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                placeholder="e.g. B2B buyers, end consumers, internal teams..."
              />
            </div>
            <div>
              <label for="geography" class="block text-sm font-semibold text-slate-700">Geography / markets</label>
              <input
                id="geography"
                v-model="form.geography"
                type="text"
                class="input-brief mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                placeholder="e.g. EU, UK, global"
              />
            </div>
            <div>
              <label for="audienceChallenges" class="block text-sm font-semibold text-slate-700">What problems does the product solve for them?</label>
              <textarea
                id="audienceChallenges"
                v-model="form.audienceChallenges"
                rows="3"
                class="input-brief mt-1.5 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                placeholder="Key pain points or needs..."
              />
            </div>
          </div>
        </section>

        <!-- Step 4: Features & scope -->
        <section
          v-show="currentStep === 4"
          class="brief-step rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          aria-labelledby="step4-title"
        >
          <h2 id="step4-title" class="font-display text-xl font-bold text-slate-900">Features & scope</h2>
          <p class="mt-1 text-sm text-slate-500">Must-haves and integrations</p>
          <div class="mt-6 space-y-5">
            <div>
              <label for="mustHaveFeatures" class="block text-sm font-semibold text-slate-700">Must-have features</label>
              <textarea
                id="mustHaveFeatures"
                v-model="form.mustHaveFeatures"
                rows="4"
                class="input-brief mt-1.5 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                placeholder="List the features that are essential for launch..."
              />
            </div>
            <div>
              <label for="niceToHaveFeatures" class="block text-sm font-semibold text-slate-700">Nice-to-have (later)</label>
              <textarea
                id="niceToHaveFeatures"
                v-model="form.niceToHaveFeatures"
                rows="2"
                class="input-brief mt-1.5 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                placeholder="Optional features for future phases..."
              />
            </div>
            <div>
              <span class="block text-sm font-semibold text-slate-700">Integrations needed</span>
              <p class="mt-0.5 text-xs text-slate-500">Select all that apply</p>
              <div class="mt-3 flex flex-wrap gap-3">
                <button
                  v-for="opt in integrationOptions"
                  :key="opt.id"
                  type="button"
                  class="rounded-xl border px-4 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  :class="form.integrations.includes(opt.id) ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'"
                  @click="toggleIntegration(opt.id)"
                >
                  {{ opt.label }}
                </button>
              </div>
              <input
                v-model="form.otherIntegrations"
                type="text"
                class="input-brief mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                placeholder="Other integrations (e.g. ERP, warehouse)"
              />
            </div>
          </div>
        </section>

        <!-- Step 5: Design & content -->
        <section
          v-show="currentStep === 5"
          class="brief-step rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          aria-labelledby="step5-title"
        >
          <h2 id="step5-title" class="font-display text-xl font-bold text-slate-900">Design & content</h2>
          <p class="mt-1 text-sm text-slate-500">References and who provides what</p>
          <div class="mt-6 space-y-5">
            <div>
              <label for="designReferences" class="block text-sm font-semibold text-slate-700">Sites or apps you like (references)</label>
              <textarea
                id="designReferences"
                v-model="form.designReferences"
                rows="2"
                class="input-brief mt-1.5 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                placeholder="URLs or short description of style you want"
              />
            </div>
            <div>
              <label for="brandMaterials" class="block text-sm font-semibold text-slate-700">Brand materials (logo, guidelines)</label>
              <input
                id="brandMaterials"
                v-model="form.brandMaterials"
                type="text"
                class="input-brief mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                placeholder="Ready / in progress / need help"
              />
            </div>
            <div>
              <label for="contentProvider" class="block text-sm font-semibold text-slate-700">Who provides text and media?</label>
              <input
                id="contentProvider"
                v-model="form.contentProvider"
                type="text"
                class="input-brief mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                placeholder="Client, copywriter, we need support..."
              />
            </div>
          </div>
        </section>

        <!-- Step 6: Technical & timeline -->
        <section
          v-show="currentStep === 6"
          class="brief-step rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          aria-labelledby="step6-title"
        >
          <h2 id="step6-title" class="font-display text-xl font-bold text-slate-900">Technical & timeline</h2>
          <p class="mt-1 text-sm text-slate-500">Stack, launch date, budget</p>
          <div class="mt-6 space-y-5">
            <div>
              <label for="preferredStack" class="block text-sm font-semibold text-slate-700">Preferred stack (if any)</label>
              <input
                id="preferredStack"
                v-model="form.preferredStack"
                type="text"
                class="input-brief mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                placeholder="e.g. Laravel + Vue, or 'your recommendation'"
              />
            </div>
            <div>
              <label for="launchDate" class="block text-sm font-semibold text-slate-700">Desired launch or first milestone</label>
              <input
                id="launchDate"
                v-model="form.launchDate"
                type="text"
                class="input-brief mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                placeholder="e.g. Q2 2025, or flexible"
              />
            </div>
            <div>
              <label for="budgetRange" class="block text-sm font-semibold text-slate-700">Budget range</label>
              <select
                id="budgetRange"
                v-model="form.budgetRange"
                class="input-brief mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
              >
                <option v-for="opt in budgetOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div>
              <span class="block text-sm font-semibold text-slate-700">Need ongoing support or maintenance?</span>
              <div class="mt-2 flex flex-wrap gap-4">
                <label class="flex cursor-pointer items-center gap-2">
                  <input v-model="form.needSupport" type="radio" value="yes" class="h-4 w-4 text-violet-600 focus:ring-violet-500" />
                  <span class="text-sm text-slate-700">Yes</span>
                </label>
                <label class="flex cursor-pointer items-center gap-2">
                  <input v-model="form.needSupport" type="radio" value="no" class="h-4 w-4 text-violet-600 focus:ring-violet-500" />
                  <span class="text-sm text-slate-700">No</span>
                </label>
                <label class="flex cursor-pointer items-center gap-2">
                  <input v-model="form.needSupport" type="radio" value="maybe" class="h-4 w-4 text-violet-600 focus:ring-violet-500" />
                  <span class="text-sm text-slate-700">Maybe later</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        <!-- Step 7: Your details & submit -->
        <section
          v-show="currentStep === 7"
          class="brief-step rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          aria-labelledby="step7-title"
        >
          <h2 id="step7-title" class="font-display text-xl font-bold text-slate-900">Your details</h2>
          <p class="mt-1 text-sm text-slate-500">We'll use this to send the specification and get in touch</p>
          <div class="mt-6 space-y-5">
            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label for="name" class="block text-sm font-semibold text-slate-700">Full name <span class="text-red-500">*</span></label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="input-brief mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-semibold text-slate-700">Email <span class="text-red-500">*</span></label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="input-brief mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label for="phone" class="block text-sm font-semibold text-slate-700">Phone</label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="input-brief mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                  placeholder="+32 ..."
                />
              </div>
              <div>
                <label for="role" class="block text-sm font-semibold text-slate-700">Your role</label>
                <input
                  id="role"
                  v-model="form.role"
                  type="text"
                  class="input-brief mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                  placeholder="e.g. Product owner, CEO"
                />
              </div>
            </div>
            <div>
              <label for="howFoundUs" class="block text-sm font-semibold text-slate-700">How did you find us?</label>
              <select
                id="howFoundUs"
                v-model="form.howFoundUs"
                class="input-brief mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
              >
                <option v-for="opt in howFoundOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="rounded-xl border border-slate-200 bg-slate-50/80 p-4 space-y-4">
              <label class="flex cursor-pointer gap-3">
                <input
                  v-model="form.consent"
                  type="checkbox"
                  required
                  class="mt-1 h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                />
                <span class="text-sm text-slate-700">
                  I have read the
                  <RouterLink to="/#privacy" class="font-medium text-violet-600 underline hover:text-violet-700">Privacy Policy</RouterLink>
                  and consent to the processing of my data so you can prepare the specification and contact me.
                  <span class="text-red-500">*</span>
                </span>
              </label>
              <label class="flex cursor-pointer gap-3">
                <input
                  v-model="form.marketingConsent"
                  type="checkbox"
                  class="mt-1 h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                />
                <span class="text-sm text-slate-600">I agree to receive occasional news and offers (optional).</span>
              </label>
            </div>
          </div>
        </section>

        <!-- Navigation -->
        <div class="py-6 flex flex-wrap items-center justify-between gap-4">
          <button
            v-if="currentStep > 1"
            type="button"
            class="btn-ghost order-2 sm:order-1"
            @click="prevStep"
          >
            Back
          </button>
          <div v-else class="order-2 sm:order-1" />
          <template v-if="currentStep < totalSteps">
            <button
              type="button"
              class="btn-primary order-1 sm:order-2"
              @click="nextStep"
            >
              Next step
              <span aria-hidden="true">→</span>
            </button>
          </template>
          <template v-else>
            <button
              type="submit"
              class="btn-primary order-1 sm:order-2 disabled:opacity-50 disabled:pointer-events-none"
              :disabled="!form.consent"
            >
              Send brief
              <span aria-hidden="true">↗</span>
            </button>
          </template>
        </div>
      </form>
      </div>
      </template>
    </div>
  </main>
</template>

<style scoped>
.input-brief:focus {
  outline: none;
}
</style>
