<script setup>
import { computed, onMounted, onUnmounted, provide, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import ContactFormModal from './components/ContactFormModal.vue'

const route = useRoute()
const router = useRouter()

const navSectionIds = ['hero', 'services', 'process', 'about', 'testimonials', 'contact']

const activeSection = ref('hero')
const scrollProgress = ref(0)
const scrollY = ref(0)
const headerVisible = ref(true)
const lastScrollY = ref(0)
const contactModalOpen = ref(false)

function openContactModal() {
  contactModalOpen.value = true
}

let scrollHandler

const smoothScrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) {
    const rect = el.getBoundingClientRect()
    const offset = window.scrollY + rect.top - 96
    window.scrollTo({ top: offset, behavior: 'smooth' })
  } else {
    router.push({ path: '/', hash: '#' + id })
  }
}

watch(() => route.path, (path) => {
  if (path === '/services') activeSection.value = 'services'
  else if (path === '/how-we-work') activeSection.value = 'how-we-work'
}, { immediate: true })

function updateActiveSection() {
  if (route.path !== '/') return
  const y = window.scrollY
  const vh = window.innerHeight
  const middle = y + vh / 2
  let bestId = 'hero'
  let bestDist = Number.POSITIVE_INFINITY
  navSectionIds.forEach((id) => {
    const node = document.getElementById(id)
    if (!node) return
    const r = node.getBoundingClientRect()
    const center = y + r.top + r.height / 2
    const dist = Math.abs(center - middle)
    if (dist < bestDist) {
      bestDist = dist
      bestId = id
    }
  })
  activeSection.value = bestId
}

// Strip "DIGITAL" moves horizontally with scroll (parallax)
const digitalStripTranslateX = computed(() => -scrollY.value * 0.4)

onMounted(() => {
  updateActiveSection()
  scrollHandler = () => {
    const y = window.scrollY
    scrollY.value = y
    updateActiveSection()
    scrollProgress.value = Math.min(y / (window.innerHeight || 1), 1)
    // Hide header on scroll down, show on scroll up; always show near top
    if (y <= 80) headerVisible.value = true
    else if (y > lastScrollY.value) headerVisible.value = false
    else if (y < lastScrollY.value) headerVisible.value = true
    lastScrollY.value = y
  }
  window.addEventListener('scroll', scrollHandler, { passive: true })
})

provide('smoothScrollTo', smoothScrollTo)
provide('digitalStripTranslateX', digitalStripTranslateX)
provide('openContactModal', openContactModal)

onUnmounted(() => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
})
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-white text-slate-900">
    <!-- Fixed header: hide on scroll down, show on scroll up -->
    <div
      class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200/50 transition-transform duration-300 ease-out"
      :class="headerVisible ? 'translate-y-0' : '-translate-y-full'"
    >
      <div class="container-page py-4">
        <AppHeader :active-section="activeSection" />
      </div>
    </div>
    <!-- Main content: top padding so it starts below the fixed header -->
    <div class="container-page relative z-10 pb-16 pt-16">
      <router-view />
      <AppFooter />
    </div>
    <ContactFormModal :open="contactModalOpen" @close="contactModalOpen = false" />
  </div>
</template>
