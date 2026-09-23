<script setup lang="ts">
import { onMounted } from 'vue'
import { useLeaguesStore } from '@/stores/leagues'
import LeagueFilters from '@/components/LeagueFilters.vue'
import LeagueList from '@/components/LeagueList.vue'

const store = useLeaguesStore()

onMounted(() => {
  store.fetchLeagues()
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="mb-2">
      <h2 class="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-2">
        Explore Sports Leagues
      </h2>
      <p class="text-slate-500 dark:text-slate-400">
        Discover and filter through hundreds of professional sports leagues worldwide.
      </p>
    </div>

    <LeagueFilters />
    <LeagueList />
  </div>
</template>
