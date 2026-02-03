<template>
  <div class="space-y-8">
    <!-- Hero / Intro -->
    <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-[200px]">
      
      <!-- 1. Bio / Hero (Large Square: 2x2) -->
      <div class="col-span-1 md:col-span-2 md:row-span-2 lg:col-span-3 relative group overflow-hidden rounded-3xl bg-white/50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/10 backdrop-blur-xl p-10 flex flex-col justify-between transition-colors duration-300">
        <div class="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div>
          <h1 class="text-4xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-white/60 bg-clip-text text-transparent mb-2">
            Hi, I'm <span class="text-violet-600 dark:text-violet-400">Antigravity</span>.
          </h1>
          <p class="text-zinc-600 dark:text-zinc-400 text-lg">
            Frontend Developer & Vue Enthusiast.
            <br>Building interfaces that feel alive.
          </p>
        </div>
        
        <div class="flex gap-4">
          <UButton icon="i-heroicons-paper-airplane" color="white" variant="solid" label="Contact Me" />
          <UButton icon="i-simple-icons-github" color="gray" variant="ghost" label="GitHub" />
        </div>
      </div>

      <!-- 2. Tech Highlight (Tall: 1x2) -->
      <NuxtLink to="/tech" class="col-span-1 md:row-span-2 relative group overflow-hidden rounded-3xl bg-white/50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/10 backdrop-blur-xl flex flex-col hover:border-violet-500/30 transition-colors">
        <div class="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
        <div class="p-6 flex-1 flex flex-col">
          <div class="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
            <UIcon name="i-heroicons-code-bracket" class="w-6 h-6" />
          </div>
          <h3 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Tech Insights</h3>
          <p class="text-zinc-600 dark:text-zinc-500 text-sm mb-auto">Deep dive into Nuxt 3, Vue, and modern frontend architecture.</p>
          <div class="mt-4 text-xs font-mono text-blue-600 dark:text-blue-400 opacity-60 group-hover:opacity-100 transition-opacity">
            LATEST POST &rarr;
          </div>
        </div>
      </NuxtLink>

      <!-- 3. Life / Quick Thought (Wide: 1x1) -->
      <div class="col-span-1 relative group overflow-hidden rounded-3xl bg-white/50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/10 backdrop-blur-xl p-6 hover:border-amber-500/30 transition-colors">
        <div class="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-transparent"></div>
        <div class="flex items-center justify-between mb-2">
           <span class="text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">Lifestyle</span>
           <UIcon name="i-heroicons-sparkles" class="w-4 h-4 text-amber-500" />
        </div>
        <p class="text-zinc-600 dark:text-zinc-300 text-sm italic">"Just bought a new mechanical keyboard. The sound is addictive."</p>
      </div>

       <!-- 4. Stocks / Market (Wide: 1x1) -->
      <div class="col-span-1 relative group overflow-hidden rounded-3xl bg-white/50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/10 backdrop-blur-xl p-6 hover:border-emerald-500/30 transition-colors flex flex-col justify-center">
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent"></div>
        <div class="flex items-center justify-between">
           <div>
             <div class="text-xs text-zinc-500 uppercase">Market Mood</div>
             <div class="text-xl font-bold text-emerald-600 dark:text-emerald-400">Bullish 🚀</div>
           </div>
           
           <!-- Simple Sparkline Placeholder -->
           <div class="flex gap-0.5 items-end h-8">
             <div class="w-1 bg-emerald-500/20 h-3"></div>
             <div class="w-1 bg-emerald-500/40 h-5"></div>
             <div class="w-1 bg-emerald-500/60 h-4"></div>
             <div class="w-1 bg-emerald-500/80 h-7"></div>
             <div class="w-1 bg-emerald-500 h-6"></div>
           </div>
        </div>
      </div>
      
    </div>

    <!-- Recent Posts Feed (List below grid) -->
    <div class="mt-12">
      <h2 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">Latest Articles</h2>
      <div class="space-y-4">
        <ContentList path="/" :query="{ only: ['title', 'description', '_path', 'tags', 'date'], sort: [{ date: -1 }], limit: 3 }" v-slot="{ list }">
          <NuxtLink v-for="article in list" :key="article._path || Math.random()" :to="article._path || '#'" class="block p-6 rounded-2xl bg-white/50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors group">
            <div class="flex items-center gap-3 text-sm text-zinc-500 mb-2">
              <span v-if="article._path" class="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-white/5 text-xs uppercase tracking-wider" :class="{
                'text-blue-600 dark:text-blue-400': article._path.includes('/tech'),
                'text-emerald-600 dark:text-emerald-400': article._path.includes('/stocks'),
                'text-amber-600 dark:text-amber-400': article._path.includes('/life')
              }">
                {{ article._path.split('/')[2] || 'Uncategorized' }}
              </span>
              <span>•</span>
              <span v-if="article.date">{{ new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }}</span>
            </div>
            <h3 class="text-xl font-semibold text-zinc-900 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white transition-colors">{{ article.title }}</h3>
            <p class="text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-2">{{ article.description }}</p>
          </NuxtLink>
        </ContentList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Home | Antigravity Blog',
  meta: [
    { name: 'description', content: 'Personal tech, life, and investment blog.' }
  ]
})
</script>
