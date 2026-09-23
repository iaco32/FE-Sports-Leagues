<script setup lang="ts">
import { useLeaguesStore } from '@/stores/leagues'

const store = useLeaguesStore()
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-4 mb-6">
    <!-- Search Input -->
    <div class="relative flex-1">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span class="material-symbols-outlined text-slate-400">search</span>
      </div>
      <input
        type="text"
        v-model="store.searchQuery"
        placeholder="Search leagues..."
        class="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-xl leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all shadow-sm"
      />
    </div>

    <!-- Sport Select -->
    <div class="relative sm:w-64">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span class="material-symbols-outlined text-slate-400">filter_list</span>
      </div>
      <select
        v-model="store.selectedSport"
        class="block w-full pl-10 pr-10 py-3 border border-slate-300 dark:border-slate-600 rounded-xl leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all shadow-sm appearance-none cursor-pointer"
      >
        <option value="">All Sports</option>
        <option v-for="sport in store.uniqueSports" :key="sport" :value="sport">
          {{ sport }}
        </option>
      </select>
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <span class="material-symbols-outlined text-slate-400">expand_more</span>
      </div>
    </div>
  </div>
</template>
