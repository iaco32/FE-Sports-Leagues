<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
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
          <span class="material-symbols-outlined text-brand-primary" style="font-size: inherit"
            >emoji_events</span
          >
          Sports Leagues
        </h1>
        <button
          @click="toggleTheme"
          class="p-2 sm:p-3 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary"
          aria-label="Toggle Dark Mode"
        >
          <span v-if="!isDark" class="material-symbols-outlined">dark_mode</span>
          <span v-else class="material-symbols-outlined">light_mode</span>
        </button>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>
