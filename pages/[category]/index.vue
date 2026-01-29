<template>
  <div>
    <h1 class="text-4xl font-bold text-zinc-900 dark:text-white mb-8 capitalize">{{ category }}</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ContentList :path="`/content/${category}`" :query="{ sort: [{ date: -1 }] }" v-slot="{ list }">
        <NuxtLink v-for="article in list" :key="article._path || Math.random()" :to="(article._path || '').replace('/content', '')" class="group relative block p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/10 overflow-hidden hover:border-violet-500/30 transition-colors">
           <div class="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
           
           <div class="relative z-10">
             <div v-if="article.date" class="text-xs text-zinc-500 mb-3">{{ new Date(article.date).toLocaleDateString() }}</div>
             <h2 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-black dark:group-hover:text-white transition-colors">{{ article.title }}</h2>
             <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed">{{ article.description }}</p>
             
             <div class="mt-6 flex items-center gap-2 text-violet-600 dark:text-violet-400 text-sm font-medium">
               Read Article <UIcon name="i-heroicons-arrow-right" />
             </div>
           </div>
        </NuxtLink>
        
        <div v-if="list.length === 0" class="col-span-2 text-center py-20 text-zinc-500">
           No articles found in this category yet.
        </div>
      </ContentList>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const category = route.params.category
</script>
