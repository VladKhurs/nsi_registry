<template>
  <div class="flex w-full justify-between flex-row items-start gap-4 mb-5">
    <div class="">
      <select
        id="dictionary-actions"
        class="block w-1_2 py-2 px-3 cursor-pointer border border-gray-300 rounded-6 bg-white focus:outline-none"
        @change="handleActionSelect($event.target.value)"
      >
        <option value="">Выбор действия</option>
        <option value="create">Создать справочник</option>
        <option
          value="view"
          :disabled="selectedDictionaries.length !== 1"
          :class="{ 'opacity-60 cursor-not-allowed': selectedDictionaries.length !== 1 }"
        >
          Просмотреть справочник
        </option>
        <option
          value="edit"
          :disabled="selectedDictionaries.length !== 1"
          :class="{ 'opacity-60 cursor-not-allowed': selectedDictionaries.length !== 1 }"
        >
          Редактировать паспорт/структуру справочника
        </option>
        <option value="archive" disabled>Архивировать</option>
        <option value="delete" disabled>Удалить</option>
        <option value="upload">Загрузить JSON/CSV/XML</option>
        <option value="upload-api">Загрузить JSON/CSV/XML через API</option>
        <option value="export">Выгрузить Реестр НСИ</option>
      </select>
    </div>
    <div class="">
      <BaseButton @click="$emit('show-settings')">
        Настройки таблицы
      </BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from './base/BaseButton.vue';

export default {
  name: 'DictionaryActions',
  components: { BaseButton },
  props: {
    selectedDictionaries: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleActionSelect(value) {
      const selectEl = document.getElementById('dictionary-actions');
      if (!value) return;

      this.$emit('action-selected', value);

      if (selectEl) {
        selectEl.value = '';
      }
    },
  },
};
</script>