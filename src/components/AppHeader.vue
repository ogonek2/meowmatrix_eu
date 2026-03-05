<script setup>
import { inject, ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const props = defineProps({
  activeSection: { type: String, default: 'hero' },
})

const openContactModal = inject('openContactModal', () => {})

const route = useRoute()
const menuOpen = ref(false)
const showBurger = ref(false)
const overviewOpen = ref(false)
const servicesOpen = ref(false)
const mobileOverviewOpen = ref(false)
const mobileServicesOpen = ref(false)
const NAV_BREAKPOINT = 1024

const overviewAnchors = [
  { id: 'hero', label: 'Overview' },
  { id: 'process', label: 'Process' },
  { id: 'about', label: 'Studio' },
  { id: 'testimonials', label: 'Testimonials' },
]

const serviceCategories = [
  { id: 'ecommerce', title: 'E-commerce & online stores' },
  { id: 'platforms', title: 'Web platforms & applications' },
  { id: 'frontend', title: 'Front-end & full-stack' },
  { id: 'design-ux', title: 'Design & user experience' },
  { id: 'support', title: 'Support, SEO & growth' },
]

function updateBurgerVisibility() {
  showBurger.value = window.innerWidth < NAV_BREAKPOINT
}

function closeDropdowns() {
  overviewOpen.value = false
  servicesOpen.value = false
}

function handleDocumentClick(e) {
  if (!e.target.closest('.nav-dropdown')) closeDropdowns()
}

onMounted(() => {
  updateBurgerVisibility()
  window.addEventListener('resize', updateBurgerVisibility)
  document.addEventListener('click', handleDocumentClick)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateBurgerVisibility)
  document.removeEventListener('click', handleDocumentClick)
})

function closeMenu() {
  menuOpen.value = false
}

function isOverviewActive() {
  return route.path === '/' && overviewAnchors.some((a) => a.id === props.activeSection)
}

function isServicesActive() {
  return route.path === '/services'
}

watch(route, () => {
  menuOpen.value = false
})
</script>

<template>
  <header class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 sm:gap-y-4">
    <RouterLink to="/" class="flex shrink-0 items-center gap-4" aria-label="Meowmatrix EU — Home">
      <div class="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
        <div class="absolute inset-0.5 rounded-full bg-white/95 shadow-sm"></div>
        <div
          class="pointer-events-none absolute inset-0.5 rounded-full border-[1.5px] border-violet-400/60 orb-ring-nav-a"
          style="border-bottom-color: transparent; border-left-color: transparent; border-right-color: transparent;"
        />
        <div
          class="pointer-events-none absolute inset-1 rounded-full border-[1.5px] border-sky-400/50 orb-ring-nav-b"
          style="border-top-color: transparent; border-left-color: transparent; border-right-color: transparent;"
        />
        <div class="relative flex h-7 w-7 items-center justify-center rounded-full bg-white">
          <img src="/logo-dark-nobg.svg" alt="" class="h-4 w-auto" />
        </div>
      </div>
      <div class="flex flex-col">
        <span class="font-display text-xs font-extrabold uppercase tracking-[0.2em] bg-brand-gradient bg-clip-text text-transparent">Meowmatrix EU</span>
        <span class="font-display text-sm font-semibold text-slate-700">European web & product studio</span>
      </div>
    </RouterLink>

    <div
      class="header-nav-row min-w-0 flex-1 items-center justify-end gap-2 md:min-w-[22rem] md:gap-4"
      :class="showBurger ? 'hidden' : 'flex'"
    >
      <!-- Overview dropdown -->
      <div class="nav-dropdown relative">
        <button
          type="button"
          class="relative rounded-lg px-4 py-2.5 text-[0.75rem] font-semibold uppercase tracking-wider transition-colors font-display"
          :class="isOverviewActive() ? 'text-slate-900 bg-slate-100/80' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'"
          aria-haspopup="true"
          :aria-expanded="overviewOpen"
          @click.stop="overviewOpen = !overviewOpen; servicesOpen = false"
        >
          Overview
          <svg class="ml-1 inline h-3.5 w-3.5 transition-transform" :class="{ 'rotate-180': overviewOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
        <Transition name="dropdown">
          <div
            v-show="overviewOpen"
            class="absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded-xl border border-slate-200 bg-white py-2 shadow-lg"
          >
            <RouterLink
              v-for="a in overviewAnchors"
              :key="a.id"
              :to="{ path: '/', hash: '#' + a.id }"
              class="block px-4 py-2.5 text-[0.75rem] font-semibold uppercase tracking-wider text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              :class="{ 'bg-violet-50 text-violet-700': route.path === '/' && activeSection === a.id }"
              @click="closeDropdowns()"
            >
              {{ a.label }}
            </RouterLink>
          </div>
        </Transition>
      </div>

      <!-- Services dropdown -->
      <div class="nav-dropdown relative">
        <button
          type="button"
          class="relative rounded-lg px-4 py-2.5 text-[0.75rem] font-semibold uppercase tracking-wider transition-colors font-display"
          :class="isServicesActive() ? 'text-slate-900 bg-slate-100/80' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'"
          aria-haspopup="true"
          :aria-expanded="servicesOpen"
          @click.stop="servicesOpen = !servicesOpen; overviewOpen = false"
        >
          Services
          <svg class="ml-1 inline h-3.5 w-3.5 transition-transform" :class="{ 'rotate-180': servicesOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
        <Transition name="dropdown">
          <div
            v-show="servicesOpen"
            class="absolute left-0 top-full z-50 mt-1 min-w-[260px] rounded-xl border border-slate-200 bg-white py-2 shadow-lg"
          >
            <p class="border-b border-slate-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">Services</p>
            <RouterLink
              v-for="cat in serviceCategories"
              :key="cat.id"
              :to="{ path: '/services', hash: '#' + cat.id }"
              class="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              @click="closeDropdowns()"
            >
              {{ cat.title }}
            </RouterLink>
          </div>
        </Transition>
      </div>

      <button
        type="button"
        class="rounded-lg px-4 py-2.5 text-[0.75rem] font-semibold uppercase tracking-wider transition-colors font-display text-left"
        :class="route.path === '/' && activeSection === 'contact' ? 'text-slate-900 bg-slate-100/80' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'"
        @click="openContactModal()"
      >
        Contact
      </button>
      <RouterLink
        to="/brief"
        class="rounded-lg px-4 py-2.5 text-[0.75rem] font-semibold uppercase tracking-wider transition-colors font-display text-slate-500 hover:bg-slate-50 hover:text-slate-800"
        :class="route.path === '/brief' ? 'text-slate-900 bg-slate-100/80' : ''"
      >
        Brief
      </RouterLink>

      <button
        type="button"
        class="font-display shrink-0 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-violet-500/20 transition hover:shadow-lg hover:shadow-violet-500/30"
        @click="openContactModal()"
      >
        Let's talk
      </button>
    </div>

    <!-- Burger: only when nav is hidden (viewport < 1024px) -->
    <button
      v-show="showBurger"
      type="button"
      class="burger-btn relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white/80 shadow-sm"
      :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
      :aria-expanded="menuOpen"
      @click="menuOpen = !menuOpen"
    >
      <span class="block h-0.5 w-5 rounded-full bg-slate-700 transition-all duration-200" :class="{ 'burger-line-top': menuOpen }" />
      <span class="block h-0.5 w-5 rounded-full bg-slate-700 transition-all duration-200" :class="{ 'burger-line-mid': menuOpen }" />
      <span class="block h-0.5 w-5 rounded-full bg-slate-700 transition-all duration-200" :class="{ 'burger-line-bot': menuOpen }" />
    </button>
  </header>

  <!-- Mobile menu -->
  <Teleport to="body">
    <Transition name="menu-overlay">
      <div
        v-if="menuOpen && showBurger"
        class="menu-overlay fixed inset-0 z-[200]"
        aria-hidden="true"
        @click="closeMenu"
      />
    </Transition>
    <Transition name="menu-panel">
      <aside
        v-if="menuOpen && showBurger"
        class="menu-panel fixed top-0 right-0 bottom-0 z-[201] w-[min(320px,85vw)] bg-white shadow-2xl"
        role="dialog"
        aria-label="Navigation menu"
      >
        <div class="flex h-full flex-col">
          <div class="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <span class="font-display text-xs font-extrabold uppercase tracking-[0.2em] bg-brand-gradient bg-clip-text text-transparent">Menu</span>
            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              aria-label="Close menu"
              @click="closeMenu"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <nav class="flex-1 overflow-y-auto px-4 py-6 font-display">
            <!-- Overview (expandable) -->
            <div class="mb-2">
              <button
                type="button"
                class="menu-panel-link flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[0.8rem] font-semibold uppercase tracking-wider"
                :class="mobileOverviewOpen ? 'bg-violet-50 text-violet-700' : 'text-slate-600'"
                @click="mobileOverviewOpen = !mobileOverviewOpen; mobileServicesOpen = false"
              >
                Overview
                <svg class="h-4 w-4 transition-transform" :class="{ 'rotate-180': mobileOverviewOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div v-show="mobileOverviewOpen" class="ml-4 mt-1 space-y-0.5 border-l-2 border-slate-200 pl-4">
                <RouterLink
                  v-for="a in overviewAnchors"
                  :key="a.id"
                  :to="{ path: '/', hash: '#' + a.id }"
                  class="block py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900"
                  @click="closeMenu"
                >
                  {{ a.label }}
                </RouterLink>
              </div>
            </div>
            <!-- Services (expandable) -->
            <div class="mb-2">
              <button
                type="button"
                class="menu-panel-link flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[0.8rem] font-semibold uppercase tracking-wider"
                :class="mobileServicesOpen ? 'bg-violet-50 text-violet-700' : 'text-slate-600'"
                @click="mobileServicesOpen = !mobileServicesOpen; mobileOverviewOpen = false"
              >
                Services
                <svg class="h-4 w-4 transition-transform" :class="{ 'rotate-180': mobileServicesOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div v-show="mobileServicesOpen" class="ml-4 mt-1 space-y-0.5 border-l-2 border-slate-200 pl-4">
                <p class="py-2 text-xs font-bold uppercase tracking-wider text-slate-400">Categories</p>
                <RouterLink
                  v-for="cat in serviceCategories"
                  :key="cat.id"
                  :to="{ path: '/services', hash: '#' + cat.id }"
                  class="block py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900"
                  @click="closeMenu"
                >
                  {{ cat.title }}
                </RouterLink>
              </div>
            </div>
            <button
              type="button"
              class="menu-panel-link flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[0.8rem] font-semibold uppercase tracking-wider text-slate-600 hover:bg-slate-50 text-left"
              @click="openContactModal(); closeMenu()"
            >
              Contact
            </button>
            <RouterLink
              to="/brief"
              class="menu-panel-link flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[0.8rem] font-semibold uppercase tracking-wider text-slate-600 hover:bg-slate-50 text-left"
              @click="closeMenu()"
            >
              Brief
            </RouterLink>
          </nav>
          <div class="border-t border-slate-100 p-4">
            <button type="button" class="btn-primary flex w-full items-center justify-center" @click="openContactModal(); closeMenu()">
              Let's talk
            </button>
          </div>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
.burger-btn {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.burger-line-top {
  transform: translateY(3px) rotate(45deg);
}
.burger-line-mid {
  opacity: 0;
  transform: scaleX(0);
}
.burger-line-bot {
  transform: translateY(-3px) rotate(-45deg);
}
.menu-overlay {
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
}
.menu-overlay-enter-active,
.menu-overlay-leave-active {
  transition: opacity 0.25s ease;
}
.menu-overlay-enter-from,
.menu-overlay-leave-to {
  opacity: 0;
}
.menu-panel-enter-active,
.menu-panel-leave-active {
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}
.menu-panel-enter-from,
.menu-panel-leave-to {
  transform: translateX(100%);
}
.menu-panel-link + .menu-panel-link {
  margin-top: 2px;
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
