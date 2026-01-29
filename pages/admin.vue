<template>
  <UContainer class="py-10">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold">文章管理与上传</h1>
          <UButton color="gray" variant="ghost" icon="i-heroicons-home" to="/" />
        </div>
      </template>

      <form @submit.prevent="handleUpload" class="space-y-6">
        <!-- API Key -->
        <UFormGroup label="API 密钥" name="apiKey" required help="请输入在 .env 中配置的 API_KEY">
          <UInput v-model="form.apiKey" type="password" placeholder="输入密钥以进行身份验证" />
        </UFormGroup>

        <UDivider />

        <!-- File Upload -->
        <UFormGroup label="Markdown 文件" name="file" required help="选择要上传的 .md 文件">
          <input 
            type="file" 
            accept=".md" 
            @change="onFileChange"
            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
          />
        </UFormGroup>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Category -->
          <UFormGroup label="分类" name="category">
            <USelect v-model="form.category" :options="['tech', 'life', 'stocks', 'other']" />
          </UFormGroup>

          <!-- Slug -->
          <UFormGroup label="路径名称 (Slug)" name="slug" help="留空则使用文件名">
            <UInput v-model="form.slug" placeholder="例如: my-new-post" />
          </UFormGroup>
        </div>

        <UDivider label="覆盖元数据 (可选)" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormGroup label="标题" name="title">
            <UInput v-model="form.title" placeholder="覆盖文件内的标题" />
          </UFormGroup>
          <UFormGroup label="日期" name="date">
            <UInput v-model="form.date" type="date" />
          </UFormGroup>
        </div>

        <UFormGroup label="描述" name="description">
          <UTextarea v-model="form.description" placeholder="覆盖描述信息" />
        </UFormGroup>

        <UFormGroup label="标签 (逗号分隔)" name="tags">
          <UInput v-model="form.tags" placeholder="tag1, tag2, tag3" />
        </UFormGroup>

        <div class="flex justify-end">
          <UButton 
            type="submit" 
            :loading="uploading" 
            color="primary" 
            size="lg"
            icon="i-heroicons-cloud-arrow-up"
          >
            立即发布
          </UButton>
        </div>
      </form>

      <template #footer v-if="result">
        <UAlert
          :title="result.success ? '上传成功' : '上传失败'"
          :description="result.message"
          :color="result.success ? 'green' : 'red'"
          variant="soft"
          :icon="result.success ? 'i-heroicons-check-circle' : 'i-heroicons-exclamation-triangle'"
        />
        <div v-if="result.success" class="mt-4">
          <UButton :to="result.path" target="_blank" variant="link" color="primary">
            预览文章: {{ result.path }}
          </UButton>
        </div>
      </template>
    </UCard>

    <!-- 最近上传列表 (待实现) -->
  </UContainer>
</template>

<script setup>
const form = ref({
  apiKey: '',
  category: 'tech',
  slug: '',
  title: '',
  description: '',
  date: '',
  tags: '',
  file: null
});

const uploading = ref(false);
const result = ref(null);

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    form.value.file = file;
    // 自动填充日期
    if (!form.value.date) {
      form.value.date = new Date().toISOString().split('T')[0];
    }
  }
};

const handleUpload = async () => {
  if (!form.value.file || !form.value.apiKey) {
    alert('请选择文件并输入 API 密钥');
    return;
  }

  uploading.value = true;
  result.value = null;

  try {
    const formData = new FormData();
    formData.append('file', form.value.file);
    formData.append('category', form.value.category);
    if (form.value.slug) formData.append('slug', form.value.slug);
    if (form.value.title) formData.append('title', form.value.title);
    if (form.value.description) formData.append('description', form.value.description);
    if (form.value.date) formData.append('date', form.value.date);
    if (form.value.tags) formData.append('tags', form.value.tags);

    const response = await $fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${form.value.apiKey}`
      },
      body: formData
    });

    result.value = {
      success: true,
      message: `文章 "${response.data.title}" 已成功保存至 ${response.path}`,
      path: response.path.replace(/\.md$/, '').replace('/content', '')
    };
  } catch (err) {
    console.error('Upload error:', err);
    result.value = {
      success: false,
      message: err.data?.statusMessage || err.message || '上传过程中发生未知错误'
    };
  } finally {
    uploading.value = false;
  }
};
</script>
