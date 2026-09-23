import { ref, watch } from 'vue'

const isDark = ref(false)

let initialized = false

// Function to initialize the theme, can be called once in App.vue or automatically
export function initTheme() {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
  } else if (savedTheme === 'light') {
    isDark.value = false
  } else if (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    isDark.value = true
  } else {
    isDark.value = false
  }

  updateDOM(isDark.value)
}

function updateDOM(dark: boolean) {
  if (typeof document === 'undefined') return
  if (dark) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// Watcher to sync changes
watch(
  isDark,
  (newVal) => {
    updateDOM(newVal)
  },
  { flush: 'sync' },
)

export function useTheme() {
  // Always initialize on first use
  if (!initialized) {
    initTheme()
    initialized = true
  }

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  return {
    isDark,
    toggleTheme,
    initTheme, // Expose for testing
  }
}
