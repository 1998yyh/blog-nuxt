<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-black text-zinc-900 dark:text-zinc-300 font-sans selection:bg-violet-500/30 transition-colors duration-300">
    <!-- Ambient Background Noise/Glow (Dark Mode Only) -->
    <div class="fixed inset-0 z-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500">
       <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-900/20 blur-[120px]"></div>
       <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]"></div>
       <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
    </div>

    <!-- Navigation -->
    <header class="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 dark:border-white/5 bg-white/50 dark:bg-black/50 backdrop-blur-md transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="font-bold text-xl tracking-tight text-zinc-900 dark:text-white">
          AG<span class="text-violet-500">.</span>
        </NuxtLink>
        
        <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
          <NuxtLink to="/tech" class="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Tech</NuxtLink>
          <NuxtLink to="/life" class="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Life</NuxtLink>
          <NuxtLink to="/stocks" class="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Stocks</NuxtLink>
        </nav>

        <div class="flex items-center gap-4">
           <UButton icon="i-heroicons-magnifying-glass" color="gray" variant="ghost" />
           <ClientOnly>
             <UButton 
               :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'" 
               color="gray" 
               variant="ghost" 
               @click="isDark = !isDark" 
            />
           </ClientOnly>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow min-h-0 relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="relative z-10 border-t border-zinc-200 dark:border-white/5 py-12 text-center text-sm text-zinc-500 dark:text-zinc-600">
      <p>&copy; 2026 Antigravity. Built with Nuxt 3 & Tailwind.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>
