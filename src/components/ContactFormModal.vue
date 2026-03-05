<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  open: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])

const formRef = ref(null)
const firstInputRef = ref(null)
const consent = ref(false)
const marketingConsent = ref(false)
const serviceInterest = ref('')
const serviceOptions = [
  { value: '', label: 'Select an option' },
  { value: 'consultation', label: 'Free consultation / Discovery call' },
  { value: 'ecommerce', label: 'E-commerce or online store' },
  { value: 'webapp', label: 'Web platform or application' },
  { value: 'design', label: 'Design & UX' },
  { value: 'support', label: 'Support, SEO or maintenance' },
  { value: 'other', label: 'Other' },
]

function close() {
  emit('close')
}

function handleSubmit(e) {
  e.preventDefault()
  if (!consent.value) return
  // TODO: send to backend; for now just close
  close()
}

function handleBackdropClick(e) {
  if (e.target === e.currentTarget) close()
}

function handleKeydown(e) {
  if (e.key === 'Escape') close()
}

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    consent.value = false
    marketingConsent.value = false
    serviceInterest.value = ''
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeydown)
    setTimeout(() => firstInputRef.value?.focus(), 100)
  } else {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', handleKeydown)
  }
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="contact-modal">
      <div
        v-if="open"
        class="fixed inset-0 z-[300] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <div
          class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          aria-hidden="true"
          @click="handleBackdropClick"
        />
        <div
          class="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
          @click.stop
        >
          <div class="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
            <h2 id="contact-modal-title" class="font-display text-lg font-bold text-slate-900">
              Request a consultation
            </h2>
            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              aria-label="Close"
              @click="close"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form ref="formRef" class="p-6 space-y-5" @submit="handleSubmit">
            <div class="grid gap-5 sm:grid-cols-2">
              <div class="space-y-1.5">
                <label for="cf-name" class="block text-sm font-semibold text-slate-700">Full name <span class="text-red-500">*</span></label>
                <input
                  id="cf-name"
                  ref="firstInputRef"
                  type="text"
                  name="name"
                  autocomplete="name"
                  required
                  class="input-field w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                  placeholder="John Smith"
                />
              </div>
              <div class="space-y-1.5">
                <label for="cf-email" class="block text-sm font-semibold text-slate-700">Email <span class="text-red-500">*</span></label>
                <input
                  id="cf-email"
                  type="email"
                  name="email"
                  autocomplete="email"
                  required
                  class="input-field w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div class="grid gap-5 sm:grid-cols-2">
              <div class="space-y-1.5">
                <label for="cf-phone" class="block text-sm font-semibold text-slate-700">Phone</label>
                <input
                  id="cf-phone"
                  type="tel"
                  name="phone"
                  autocomplete="tel"
                  class="input-field w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                  placeholder="+32 123 456 789"
                />
              </div>
              <div class="space-y-1.5">
                <label for="cf-company" class="block text-sm font-semibold text-slate-700">Company</label>
                <input
                  id="cf-company"
                  type="text"
                  name="company"
                  autocomplete="organization"
                  class="input-field w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                  placeholder="Company name (optional)"
                />
              </div>
            </div>

            <div class="space-y-1.5">
              <label for="cf-service" class="block text-sm font-semibold text-slate-700">I'm interested in</label>
              <select
                id="cf-service"
                v-model="serviceInterest"
                name="service"
                class="input-field w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
              >
                <option v-for="opt in serviceOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label for="cf-message" class="block text-sm font-semibold text-slate-700">Message / Project description</label>
              <textarea
                id="cf-message"
                name="message"
                rows="4"
                class="input-field w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                placeholder="Tell us about your project, timeline, or what you'd like to discuss..."
              />
            </div>

            <div class="space-y-4 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              <label class="flex cursor-pointer gap-3">
                <input
                  v-model="consent"
                  type="checkbox"
                  name="consent"
                  required
                  class="mt-1 h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                />
                <span class="text-sm text-slate-700">
                  I have read the
                  <RouterLink to="/#privacy" class="font-medium text-violet-600 underline hover:text-violet-700" @click="close">
                    Privacy Policy
                  </RouterLink>
                  and consent to the processing of my personal data so that you can respond to my request.
                </span>
              </label>
              <label class="flex cursor-pointer gap-3">
                <input
                  v-model="marketingConsent"
                  type="checkbox"
                  name="marketing"
                  class="mt-1 h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                />
                <span class="text-sm text-slate-600">
                  I agree to receive occasional news and offers from Meowmatrix EU (optional).
                </span>
              </label>
            </div>

            <div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-3">
              <button
                type="button"
                class="btn-ghost order-2 sm:order-1"
                @click="close"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn-primary order-1 sm:order-2 disabled:opacity-50 disabled:pointer-events-none"
                :disabled="!consent"
              >
                Request consultation
                <span aria-hidden="true" class="text-lg">↗</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.contact-modal-enter-active,
.contact-modal-leave-active {
  transition: opacity 0.2s ease;
}
.contact-modal-enter-active .relative,
.contact-modal-leave-active .relative {
  transition: transform 0.25s ease;
}
.contact-modal-enter-from,
.contact-modal-leave-to {
  opacity: 0;
}
.contact-modal-enter-from .relative,
.contact-modal-leave-to .relative {
  transform: scale(0.98);
}
</style>
