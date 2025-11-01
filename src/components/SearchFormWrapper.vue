<template>
  <div class="bg-white p-5 rounded-lg shadow-md mb-5">
    <div class="flex flex-col flex-wrap items-center gap-6">
      <slot></slot>

      <div class="flex w-full justify-between items-center gap-2">
        <BaseButton type="button" @click="$emit('clear')">
          ОЧИСТИТЬ ФОРМУ
        </BaseButton>
        <BaseButton type="submit" variant="primary" @click="$emit('search')" :disabled="loading">
          ПОИСК
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from './base/BaseButton.vue';

export default {
  name: 'SearchFormWrapper',
  components: { BaseButton },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>