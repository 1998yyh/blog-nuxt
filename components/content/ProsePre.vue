<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array as () => number[],
    default: () => []
  },
  meta: {
    type: String,
    default: null
  },
  class: {
    type: String,
    default: null
  }
})

const { copy, copied } = useClipboard()

const handleCopy = () => {
  copy(props.code)
}
</script>

<template>
  <div class="relative my-6 group rounded-xl overflow-hidden bg-[#0d1117] border border-gray-800 shadow-2xl">
    <!-- Mac-like Header -->
    <div class="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-gray-800">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors"></div>
        <div class="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors"></div>
        <div class="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors"></div>
      </div>
      
      <!-- Filename or Language -->
      <div v-if="filename" class="text-xs text-gray-400 font-mono tracking-wide">
        {{ filename }}
      </div>
      <div v-else-if="language" class="text-xs text-gray-500 font-mono uppercase tracking-wide">
        {{ language }}
      </div>
    </div>

    <!-- Code Content -->
    <div class="relative overflow-x-auto">
      <pre :class="$props.class"><slot /></pre>
    </div>

    <!-- Copy Button (Visible on Hover) -->
    <button 
      @click="handleCopy"
      class="absolute top-[44px] right-3 p-2 rounded-md bg-gray-800/50 hover:bg-gray-700/80 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm z-10"
      :title="copied ? 'Copied!' : 'Copy code'"
    >
      <UIcon v-if="copied" name="i-heroicons-check" class="w-5 h-5 text-green-400" />
      <UIcon v-else name="i-heroicons-clipboard-document" class="w-5 h-5" />
    </button>
  </div>
</template>

<style>
pre code .line {
  display: block;
}
</style>
