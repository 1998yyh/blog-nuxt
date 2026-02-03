<template>
  <div class="relative">
    <!-- Background Decor (Gradient Blobs) -->
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div class="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen"></div>
        <div class="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[100px] mix-blend-multiply dark:mix-blend-screen"></div>
    </div>

    <ContentDoc v-slot="{ doc }">
      <!-- Article Layout -->
      <article class="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <!-- Header & Content wrapper -->
        <div class="lg:col-span-9 lg:col-start-1">
          <!-- Header (Hero) Section -->
          <header class="text-left mb-12">
             <!-- Category & Date -->
             <div class="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">
               <span class="text-violet-600 dark:text-violet-400 flex items-center gap-1.5">
                 <UIcon name="i-heroicons-tag" class="w-4 h-4" />
                 {{ $route.params.category }}
               </span>
               <span>•</span>
               <ClientOnly>
                 <time v-if="doc.date">{{ new Date(doc.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }}</time>
               </ClientOnly>
             </div>

             <!-- Title -->
             <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
               {{ doc.title }}
             </h1>

             <!-- Description -->
             <p class="text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
               {{ doc.description }}
             </p>
          </header>

          <!-- Main Content Area -->
          <div class="relative group">
            <div class="relative z-10 prose prose-lg prose-zinc dark:prose-invert max-w-none 
              py-0
              prose-headings:scroll-mt-24 text-pretty selection:bg-violet-500/20">
              <ContentRenderer :value="doc" />
            </div>
          </div>
        </div>

        <!-- Sidebar / TOC (Right Rail) -->
        <div class="hidden xl:block xl:col-span-3">
           <div class="sticky top-32 space-y-8">
             <!-- TOC -->
             <nav v-if="doc.body && doc.body.toc && doc.body.toc.links.length" class="relative">
               <div class="relative z-10 pl-6 border-l border-zinc-200 dark:border-white/10">
                 <h4 class="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-4">
                   On this page
                 </h4>
                 <ul class="space-y-3">
                   <li v-for="link in doc.body.toc.links" :key="link.id">
                     <a :href="`#${link.id}`" class="text-sm text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors block leading-tight">
                       {{ link.text }}
                     </a>
                   </li>
                 </ul>
               </div>
             </nav>
             
             <!-- Share / Actions (Placeholder) -->
             <div class="flex gap-2 pl-6">
               <UButton icon="i-heroicons-share" color="gray" variant="ghost" size="sm" />
               <UButton icon="i-heroicons-bookmark" color="gray" variant="ghost" size="sm" />
             </div>
           </div>
        </div>

      </article>
    </ContentDoc>
  </div>
</template>

<script setup lang="ts">
// No manual query needed, ContentDoc handles it based on route
</script>

<style scoped>
/* Custom prose tweaks */
:deep(.prose h2) {
  @apply text-2xl md:text-3xl font-bold tracking-tight mb-6 mt-12 relative;
}
:deep(.prose h2::before) {
  content: '#';
  @apply absolute -left-6 md:-left-8 text-violet-500/30 opacity-0 transition-opacity;
}
:deep(.prose h2:hover::before) {
  @apply opacity-100;
}
:deep(.prose p) {
  @apply leading-8 mb-6;
}
:deep(.prose img) {
  @apply rounded-3xl shadow-xl border border-zinc-200 dark:border-white/10 w-full;
}
</style>
