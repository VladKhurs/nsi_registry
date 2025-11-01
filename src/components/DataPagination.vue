<template>
  <div v-if="pagination.total > 1" class="flex justify-end px-5 py-4 bg-white border-t border-gray-200 rounded-6">
    <div class="flex items-center gap-2">
      <BaseButton
        class="border-0"
        :disabled="pagination.current <= 1"
        @click="changePage(pagination.current - 1)"
      >
        &lt;
      </BaseButton>
      <span class="p-2 text-sm">Стр {{ pagination.current }} из {{ pagination.total }}</span>
      <BaseButton
        class="border-0"
        :disabled="pagination.current >= pagination.total"
        @click="changePage(pagination.current + 1)"
      >
        &gt;
      </BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from './base/BaseButton.vue';

export default {
  name: 'DataPagination',
  components: { BaseButton },
  props: {
    pagination: { type: Object, required: true },
    itemsOnPage: { type: Number, required: true }
  },
  methods: {
    changePage(page) {
      this.$emit('page-change', page);
    },
  },
};
</script>