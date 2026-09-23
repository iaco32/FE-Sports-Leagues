<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { useLeaguesStore } from '@/stores/leagues'

const { isDark, toggleTheme } = useTheme()
const store = useLeaguesStore()
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
    <header
      class="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700"
    >
      <div
        class="max-w-7xl mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:px-8 flex justify-between items-center"
      >
        <h1
          class="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-emerald-500" style="font-size: inherit"
            >emoji_events</span
          >
          Sports Leagues
        </h1>

        <div class="flex items-center gap-3">
          <!-- Errors Simulation -->
          <div
            class="hidden sm:flex items-center gap-2 mr-4 border-r border-slate-200 dark:border-slate-700 pr-6"
          >
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-1"
              >Errors Simulation:</span
            >
            <button
              @click="store.simulateApiError()"
              :class="[
                'px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 active:scale-95 flex items-center gap-1',
                store.simulationMode === 'error'
                  ? 'bg-red-500 text-white shadow-inner ring-2 ring-red-500 ring-offset-1 dark:ring-offset-slate-800'
                  : 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800/50'
              ]"
              title="Simulate API Error"
            >
              <span class="material-symbols-outlined text-[14px]">wifi_off</span>
              500 Error
            </button>
            <button
              @click="store.simulateCorruptedData()"
              :class="[
                'px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 active:scale-95 flex items-center gap-1',
                store.simulationMode === 'corrupted'
                  ? 'bg-amber-500 text-white shadow-inner ring-2 ring-amber-500 ring-offset-1 dark:ring-offset-slate-800'
                  : 'bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/40 border border-amber-200 dark:border-amber-800/50'
              ]"
              title="Simulate Corrupted Data"
            >
              <span class="material-symbols-outlined text-[14px]">broken_image</span>
              Bad Data
            </button>
            <button
              @click="store.fetchLeagues()"
              :class="[
                'px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 active:scale-95 flex items-center gap-1',
                store.simulationMode === 'none'
                  ? 'bg-emerald-500 text-white shadow-inner ring-2 ring-emerald-500 ring-offset-1 dark:ring-offset-slate-800'
                  : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800/50'
              ]"
              title="Reset State to Normal"
            >
              <span class="material-symbols-outlined text-[14px]">check_circle</span>
              Normal
            </button>
          </div>

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="p-2 sm:p-3 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Toggle Dark Mode"
          >
            <span v-if="!isDark" class="material-symbols-outlined">dark_mode</span>
            <span v-else class="material-symbols-outlined">light_mode</span>
          </button>
        </div>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>
