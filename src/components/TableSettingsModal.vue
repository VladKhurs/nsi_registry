<template>
  <div v-if="show" class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
    <div class="absolute bg-gray-600 w-screen h-screen opacity-50" @click="$emit('close')"></div>
    <div class="bg-white p-6 rounded-md shadow-lg w-1_2 max-w-sm z-10">
      <h3 class="text-lg font-semibold mb-4">Настройки таблицы</h3>
      <div class="flex flex-col gap-4">
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" v-model="localSettings.showStartDate" class="w-4 h-4" />
          <span>Дата начала действия</span>
        </label>
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" v-model="localSettings.showEndDate" class="w-4 h-4" />
          <span>Дата окончания действия</span>
        </label>
      </div>
      <div class="mt-6 flex justify-end gap-2">
        <BaseButton @click="$emit('close')">Отмена</BaseButton>
        <BaseButton @click="apply" variant="primary">Применить</BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from './base/BaseButton.vue';

export default {
  name: 'TableSettingsModal',
  components: { BaseButton },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    settings: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localSettings: { ...this.settings },
    };
  },
  watch: {
    settings: {
      handler(newVal) {
        this.localSettings = { ...newVal };
      },
      deep: true,
    },
  },
  methods: {
    apply() {
      this.$emit('apply', { ...this.localSettings });
    },
  },
};
</script>
