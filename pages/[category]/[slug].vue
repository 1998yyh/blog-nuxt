<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
    <ContentDoc v-slot="{ doc }">
      <!-- Sidebar - Desktop Only (Left/Right depending on preference, here we'll place TOC on right for better flow) -->
      <aside class="hidden lg:block lg:col-span-3 order-last lg:sticky lg:top-32 lg:h-[fit-content]">
        <nav class="space-y-8">
          <!-- Metadata -->
          <div class="space-y-4 pb-8 border-b border-zinc-100 dark:border-white/5">
             <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
               <UIcon name="i-heroicons-tag" class="w-4 h-4" />
               {{ $route.params.category }}
             </div>
             <div class="text-xs text-zinc-500 dark:text-zinc-500 font-mono">
               <ClientOnly>
                 <time v-if="doc.date">{{ new Date(doc.date).toLocaleDateString() }}</time>
               </ClientOnly>
             </div>
          </div>

          <!-- Table of Contents -->
          <div v-if="doc.body && doc.body.toc && doc.body.toc.links.length" class="space-y-4">
            <h4 class="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white">On this page</h4>
            <ul class="space-y-3">
              <li v-for="link in doc.body.toc.links" :key="link.id" :class="`pl-${(link.depth - 2) * 4}`">
                <a :href="`#${link.id}`" class="text-sm text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors block leading-tight">
                  {{ link.text }}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      <!-- Main Article -->
      <article class="lg:col-span-9 max-w-none bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
        <!-- Header -->
        <header class="mb-12">
           <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-white mb-6 leading-[1.1] tracking-tight">{{ doc.title }}</h1>
           <p class="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-3xl">{{ doc.description }}</p>
        </header>

        <!-- Content -->
        <div class="prose prose-lg prose-zinc dark:prose-invert max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight 
          prose-a:text-violet-600 dark:prose-a:text-violet-400 hover:prose-a:text-violet-500 dark:hover:prose-a:text-violet-300 
          prose-img:rounded-3xl prose-img:shadow-2xl prose-img:border prose-img:border-zinc-100 dark:prose-img:border-white/5
          prose-pre:bg-zinc-950 dark:prose-pre:bg-zinc-900/50 prose-pre:backdrop-blur-sm
          prose-blockquote:border-violet-500">
          <ContentRenderer :value="doc" />
        </div>
      </article>
    </ContentDoc>
  </div>
</template>

<script setup lang="ts">
// No manual query needed, ContentDoc handles it based on route
</script>
