<script setup lang="ts">
import { ref } from 'vue'
import { useLeaguesStore } from '@/stores/leagues'
import type { League } from '@/types'

const props = defineProps<{
  league: League
}>()

const store = useLeaguesStore()
const badgeUrl = ref<string | null>(null)
const isBadgeLoading = ref(false)
const hasAttemptedLoad = ref(false)

async function loadBadge() {
  if (hasAttemptedLoad.value || isBadgeLoading.value) return
  isBadgeLoading.value = true
  hasAttemptedLoad.value = true
  try {
    badgeUrl.value = await store.getBadge(props.league.idLeague)
  } finally {
    isBadgeLoading.value = false
  }
}
</script>

<template>
  <div
    @click="loadBadge"
    class="group flex flex-col bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-700 p-5 transition-all duration-300 cursor-pointer overflow-hidden relative"
  >
    <!-- Background subtle gradient on hover -->
    <div
      class="absolute inset-0 bg-linear-to-br from-emerald-50 to-transparent dark:from-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
    ></div>

    <div class="relative z-10 flex flex-col items-center flex-1">
      <!-- Image or Placeholder -->
      <div
        class="w-24 h-24 sm:w-32 sm:h-32 mb-4 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-500 shadow-inner overflow-hidden transition-all duration-300 group-hover:scale-105"
      >
        <Transition
          enter-active-class="transition-opacity duration-500 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-500 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          mode="out-in"
        >
          <img
            v-if="badgeUrl"
            :src="badgeUrl"
            :alt="`${league.strLeague} Badge`"
            class="w-full h-full object-contain p-2"
          />

          <div v-else-if="isBadgeLoading" class="animate-pulse flex flex-col items-center gap-2">
            <span class="material-symbols-outlined text-slate-300 dark:text-slate-600 animate-spin"
              >refresh</span
            >
          </div>

          <div
            v-else-if="hasAttemptedLoad && !badgeUrl"
            class="flex flex-col items-center text-center p-2"
          >
            <span class="material-symbols-outlined text-slate-300 dark:text-slate-600 text-3xl mb-1"
              >image_not_supported</span
            >
            <span
              class="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider leading-tight"
              >No badge</span
            >
          </div>

          <div v-else class="flex flex-col items-center text-center p-2">
            <span class="material-symbols-outlined text-slate-300 dark:text-slate-600 text-3xl mb-1"
              >touch_app</span
            >
            <span
              class="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider"
              >Tap to load</span
            >
          </div>
        </Transition>
      </div>

      <!-- League Info -->
      <h3
        class="text-lg font-bold text-slate-900 dark:text-white text-center mb-1 line-clamp-2 leading-tight"
      >
        {{ league.strLeague }}
      </h3>

      <p
        v-if="league.strLeagueAlternate"
        class="text-sm text-slate-500 dark:text-slate-400 text-center mb-4 line-clamp-1 italic"
      >
        {{ league.strLeagueAlternate }}
      </p>

      <!-- Push sport badge to bottom -->
      <div class="mt-auto pt-4">
        <span
          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50"
        >
          {{ league.strSport }}
        </span>
      </div>
    </div>
  </div>
</template>
