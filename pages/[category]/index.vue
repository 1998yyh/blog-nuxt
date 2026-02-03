<template>
  <!-- Last updated: 2026-02-02 23:23 - Fix syntax error -->
  <div>
    <h1 class="text-4xl font-bold text-zinc-900 dark:text-white mb-8 capitalize">{{ category }}</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ContentList :path="`/${category}`" :query="{ sort: [{ date: -1 }] }">
        <template #default="{ list }">
          <template v-if="list && list.length > 0">
            <NuxtLink v-for="article in list" :key="article._path" :to="(article._path || '').replace('/content', '')" class="group relative block p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/10 overflow-hidden hover:border-violet-500/30 transition-colors">
               <div class="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

               <div class="relative z-10">
                 <div v-if="article.date" class="text-xs text-zinc-500 mb-3">{{ new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }}</div>
                 <h2 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-black dark:group-hover:text-white transition-colors">{{ article.title }}</h2>
                 <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed">{{ article.description }}</p>

                 <div class="mt-6 flex items-center gap-2 text-violet-600 dark:text-violet-400 text-sm font-medium">
                   Read Article <UIcon name="i-heroicons-arrow-right" />
                 </div>
               </div>
            </NuxtLink>
          </template>

          <div v-else class="col-span-2">
            <div class="relative min-h-[500px] flex items-center justify-center py-20 px-6">
              <!-- 背景装饰 -->
              <div class="absolute inset-0 overflow-hidden">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
                     :class="{
                       'bg-violet-500/10': category === 'tech',
                       'bg-amber-500/10': category === 'life',
                       'bg-emerald-500/10': category === 'stocks',
                       'bg-zinc-500/10': !['tech', 'life', 'stocks'].includes(category)
                     }">
                </div>
                <div class="absolute top-20 right-20 w-2 h-2 rounded-full opacity-40"
                     :class="{
                       'bg-violet-400': category === 'tech',
                       'bg-amber-400': category === 'life',
                       'bg-emerald-400': category === 'stocks',
                       'bg-zinc-400': !['tech', 'life', 'stocks'].includes(category)
                     }">
                </div>
                <div class="absolute bottom-20 left-20 w-3 h-3 rounded-full opacity-30"
                     :class="{
                       'bg-violet-400': category === 'tech',
                       'bg-amber-400': category === 'life',
                       'bg-emerald-400': category === 'stocks',
                       'bg-zinc-400': !['tech', 'life', 'stocks'].includes(category)
                     }">
                </div>
              </div>

              <!-- 内容卡片 -->
              <div class="relative z-10 max-w-lg mx-auto text-center">
                <!-- 图标容器 -->
                <div class="mb-8 flex justify-center">
                  <div class="relative">
                    <!-- 外圈动画 -->
                    <div class="absolute inset-0 rounded-3xl opacity-20 animate-pulse"
                         :class="{
                           'bg-violet-500': category === 'tech',
                           'bg-amber-500': category === 'life',
                           'bg-emerald-500': category === 'stocks',
                           'bg-zinc-500': !['tech', 'life', 'stocks'].includes(category)
                         }">
                    </div>

                    <!-- 图标背景 -->
                    <div class="relative w-32 h-32 mx-auto rounded-3xl flex items-center justify-center backdrop-blur-xl border-2 transition-all duration-500 hover:scale-110"
                         :class="{
                           'bg-violet-500/10 border-violet-500/30': category === 'tech',
                           'bg-amber-500/10 border-amber-500/30': category === 'life',
                           'bg-emerald-500/10 border-emerald-500/30': category === 'stocks',
                           'bg-zinc-500/10 border-zinc-500/30': !['tech', 'life', 'stocks'].includes(category)
                         }">
                      <!-- 图标 -->
                      <UIcon :name="getCategoryIcon(category)"
                             class="w-16 h-16 transition-transform duration-500 hover:scale-110 hover:rotate-12"
                             :class="{
                               'text-violet-500': category === 'tech',
                               'text-amber-500': category === 'life',
                               'text-emerald-500': category === 'stocks',
                               'text-zinc-500': !['tech', 'life', 'stocks'].includes(category)
                             }" />
                    </div>
                  </div>
                </div>

                <!-- 文字内容 -->
                <h2 class="text-3xl font-bold mb-3 transition-colors"
                    :class="{
                      'text-violet-900 dark:text-violet-100': category === 'tech',
                      'text-amber-900 dark:text-amber-100': category === 'life',
                      'text-emerald-900 dark:text-emerald-100': category === 'stocks',
                      'text-zinc-900 dark:text-zinc-100': !['tech', 'life', 'stocks'].includes(category)
                    }">
                  {{ getCategoryTitle(category) }}
                </h2>

                <p class="text-lg mb-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {{ getCategoryDescription(category) }}
                </p>

                <!-- 装饰性标签 -->
                <div class="flex items-center justify-center gap-3 mb-8">
                  <span class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                        :class="{
                          'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300': category === 'tech',
                          'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300': category === 'life',
                          'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300': category === 'stocks',
                          'bg-zinc-100 dark:bg-zinc-900/30 text-zinc-700 dark:text-zinc-300': !['tech', 'life', 'stocks'].includes(category)
                        }">
                    <UIcon :name="getCategoryIcon(category)" class="w-4 h-4" />
                    {{ category.toUpperCase() }}
                  </span>
                </div>

                <!-- 返回首页按钮 -->
                <NuxtLink to="/"
                          class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white shadow-lg shadow-zinc-900/10 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-900/20 hover:-translate-y-0.5 active:translate-y-0"
                          :class="{
                            'bg-violet-500 hover:bg-violet-600': category === 'tech',
                            'bg-amber-500 hover:bg-amber-600': category === 'life',
                            'bg-emerald-500 hover:bg-emerald-600': category === 'stocks',
                            'bg-zinc-500 hover:bg-zinc-600': !['tech', 'life', 'stocks'].includes(category)
                          }">
                  <UIcon name="i-heroicons-arrow-left" class="w-5 h-5" />
                  返回首页
                </NuxtLink>
              </div>
            </div>
          </div>
        </template>

        <template #not-found>
          <div class="col-span-2">
            <div class="relative min-h-[500px] flex items-center justify-center py-20 px-6">
              <!-- 背景装饰 -->
              <div class="absolute inset-0 overflow-hidden">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
                     :class="{
                       'bg-violet-500/10': category === 'tech',
                       'bg-amber-500/10': category === 'life',
                       'bg-emerald-500/10': category === 'stocks',
                       'bg-zinc-500/10': !['tech', 'life', 'stocks'].includes(category)
                     }">
                </div>
                <div class="absolute top-20 right-20 w-2 h-2 rounded-full opacity-40"
                     :class="{
                       'bg-violet-400': category === 'tech',
                       'bg-amber-400': category === 'life',
                       'bg-emerald-400': category === 'stocks',
                       'bg-zinc-400': !['tech', 'life', 'stocks'].includes(category)
                     }">
                </div>
                <div class="absolute bottom-20 left-20 w-3 h-3 rounded-full opacity-30"
                     :class="{
                       'bg-violet-400': category === 'tech',
                       'bg-amber-400': category === 'life',
                       'bg-emerald-400': category === 'stocks',
                       'bg-zinc-400': !['tech', 'life', 'stocks'].includes(category)
                     }">
                </div>
              </div>

              <!-- 内容卡片 -->
              <div class="relative z-10 max-w-lg mx-auto text-center">
                <!-- 图标容器 -->
                <div class="mb-8 flex justify-center">
                  <div class="relative">
                    <!-- 外圈动画 -->
                    <div class="absolute inset-0 rounded-3xl opacity-20 animate-pulse"
                         :class="{
                           'bg-violet-500': category === 'tech',
                           'bg-amber-500': category === 'life',
                           'bg-emerald-500': category === 'stocks',
                           'bg-zinc-500': !['tech', 'life', 'stocks'].includes(category)
                         }">
                    </div>

                    <!-- 图标背景 -->
                    <div class="relative w-32 h-32 mx-auto rounded-3xl flex items-center justify-center backdrop-blur-xl border-2 transition-all duration-500 hover:scale-110"
                         :class="{
                           'bg-violet-500/10 border-violet-500/30': category === 'tech',
                           'bg-amber-500/10 border-amber-500/30': category === 'life',
                           'bg-emerald-500/10 border-emerald-500/30': category === 'stocks',
                           'bg-zinc-500/10 border-zinc-500/30': !['tech', 'life', 'stocks'].includes(category)
                         }">
                      <!-- 图标 -->
                      <UIcon :name="getCategoryIcon(category)"
                             class="w-16 h-16 transition-transform duration-500 hover:scale-110 hover:rotate-12"
                             :class="{
                               'text-violet-500': category === 'tech',
                               'text-amber-500': category === 'life',
                               'text-emerald-500': category === 'stocks',
                               'text-zinc-500': !['tech', 'life', 'stocks'].includes(category)
                             }" />
                    </div>
                  </div>
                </div>

                <!-- 文字内容 -->
                <h2 class="text-3xl font-bold mb-3 transition-colors"
                    :class="{
                      'text-violet-900 dark:text-violet-100': category === 'tech',
                      'text-amber-900 dark:text-amber-100': category === 'life',
                      'text-emerald-900 dark:text-emerald-100': category === 'stocks',
                      'text-zinc-900 dark:text-zinc-100': !['tech', 'life', 'stocks'].includes(category)
                    }">
                  {{ getCategoryTitle(category) }}
                </h2>

                <p class="text-lg mb-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {{ getCategoryDescription(category) }}
                </p>

                <!-- 装饰性标签 -->
                <div class="flex items-center justify-center gap-3 mb-8">
                  <span class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                        :class="{
                          'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300': category === 'tech',
                          'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300': category === 'life',
                          'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300': category === 'stocks',
                          'bg-zinc-100 dark:bg-zinc-900/30 text-zinc-700 dark:text-zinc-300': !['tech', 'life', 'stocks'].includes(category)
                        }">
                    <UIcon :name="getCategoryIcon(category)" class="w-4 h-4" />
                    {{ category.toUpperCase() }}
                  </span>
                </div>

                <!-- 返回首页按钮 -->
                <NuxtLink to="/"
                          class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white shadow-lg shadow-zinc-900/10 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-900/20 hover:-translate-y-0.5 active:translate-y-0"
                          :class="{
                            'bg-violet-500 hover:bg-violet-600': category === 'tech',
                            'bg-amber-500 hover:bg-amber-600': category === 'life',
                            'bg-emerald-500 hover:bg-emerald-600': category === 'stocks',
                            'bg-zinc-500 hover:bg-zinc-600': !['tech', 'life', 'stocks'].includes(category)
                          }">
                  <UIcon name="i-heroicons-arrow-left" class="w-5 h-5" />
                  返回首页
                </NuxtLink>
              </div>
            </div>
          </div>
        </template>
      </ContentList>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const category = route.params.category as string

/**
 * Get category icon name
 */
function getCategoryIcon(cat: string): string {
  const iconMap: Record<string, string> = {
    tech: 'i-heroicons-code-bracket',
    life: 'i-heroicons-sparkles',
    stocks: 'i-heroicons-chart-bar'
  }
  return iconMap[cat] || 'i-heroicons-document-text'
}

/**
 * Get category title
 */
function getCategoryTitle(cat: string): string {
  const titleMap: Record<string, string> = {
    tech: '技术文章即将到来',
    life: '生活故事待续',
    stocks: '投资分析准备中'
  }
  return titleMap[cat] || '内容准备中'
}

/**
 * Get category description
 */
function getCategoryDescription(cat: string): string {
  const descMap: Record<string, string> = {
    tech: '正在准备精彩的技术文章，涵盖 Nuxt、Vue、前端架构等主题。敬请期待我的深度技术分享！',
    life: '生活中的点滴值得记录。这里将分享我的日常、思考和感悟，一起感受生活的美好。',
    stocks: '市场动态、投资分析、价值发现。正在整理投资笔记，一起探讨财富增长之道。'
  }
  return descMap[cat] || `${cat} 分类下的内容正在准备中，很快就会与大家见面。`
}
</script>
