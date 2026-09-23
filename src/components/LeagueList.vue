<script setup lang="ts">
import { useLeaguesStore } from '@/stores/leagues'
import LeagueCard from './LeagueCard.vue'

const store = useLeaguesStore()

function clearFilters() {
  store.searchQuery = ''
  store.selectedSport = ''
}
</script>

<template>
  <div class="relative min-h-100">
    <!-- Loading State -->
    <div
      v-if="store.isLoading"
      class="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm z-20 rounded-2xl"
    >
      <span class="material-symbols-outlined text-emerald-500 animate-spin text-5xl mb-4"
        >sports_soccer</span
      >
      <p class="text-slate-600 dark:text-slate-300 font-medium text-lg animate-pulse">
        Loading leagues...
      </p>
    </div>

    <!-- Error State -->
    <div
      v-else-if="store.error"
      class="flex flex-col items-center justify-center p-12 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-2xl"
    >
      <span class="material-symbols-outlined text-red-500 text-5xl mb-4">error</span>
      <h3 class="text-xl font-bold text-red-700 dark:text-red-400 mb-2">
        Oops! Something went wrong
      </h3>
      <p class="text-red-600 dark:text-red-300 text-center">{{ store.error }}</p>
      <button
        @click="store.fetchLeagues"
        class="mt-6 px-6 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-800/30 dark:hover:bg-red-800/50 text-red-700 dark:text-red-300 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Try Again
      </button>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="store.filteredLeagues.length === 0"
      class="flex flex-col items-center justify-center p-16 bg-white dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl"
    >
      <span class="material-symbols-outlined text-slate-300 dark:text-slate-600 text-6xl mb-4"
        >search_off</span
      >
      <h3 class="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No leagues found</h3>
      <p class="text-slate-500 dark:text-slate-400 text-center max-w-md">
        We couldn't find any leagues matching your current filters. Try adjusting your search or
        selecting a different sport.
      </p>
      <button
        v-if="store.searchQuery || store.selectedSport"
        @click="clearFilters"
        class="mt-6 px-6 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
      >
        Clear Filters
      </button>
    </div>

    <!-- Data Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <LeagueCard v-for="league in store.filteredLeagues" :key="league.idLeague" :league="league" />
    </div>
  </div>
</template>
