<template>
  <div class="w-full bg-blue-200 rounded-6">
    <div class="rounded-6 bg-indigo-600 m-0 mb-5 py-2 px-4 flex justify-between">
      <h2 class="text-xl font-semibold text-white flex items-center">Наполнение справочника: {{ dictionaryName }}</h2>
      <img src="../assets/arrow-top.svg" alt="" width="45px" class="mt-2">
    </div>

    <div class="p-6">
      <SearchFormWrapper :loading="loading" @search="handleSearch" @clear="handleClearForm">
        <div class="w-full flex flex-col gap-3">
          <div class="w-full flex gap-3">
            <div class="w-full flex flex-col gap-2">
              <label for="search-code" class="text-sm ml-2">codifieldListItemCode</label>
              <BaseInput id="search-code" v-model="searchForm.code" />
            </div>
            <div class=" w-full flex flex-col gap-2">
              <label for="search-name" class="text-sm ml-2">codifieldListItemName</label>
              <BaseInput id="search-name" v-model="searchForm.ruName" />
            </div>
          </div>

          <div class="w-full flex gap-3">
            <div class="w-full flex flex-col gap-2">
              <label for="search-status" class="text-sm ml-2">codifieldListItemStatus</label>
              <BaseSelect id="search-status" v-model="searchForm.status">
                <option value=""></option>
                <option value="Активный">Активный</option>
                <option value="Черновик">Черновик</option>
              </BaseSelect>
            </div>
            <div class=" w-full flex flex-col gap-2">
              <label for="search-date-start" class="text-sm ml-2">date</label>
              <BaseInput id="search-date-start" />
            </div>
          </div>
          <div class=" w-1_2 flex flex-col gap-2">
            <label for="search-date-end" class="text-sm ml-2">date</label>
            <BaseInput id="search-date-end" />
          </div>
        </div>
      </SearchFormWrapper>

      <div class="flex flex-row w-full justify-between gap-4 mb-5">
        <div class="flex-shrink-0">
          <BaseSelect id="item-actions" class="cursor-pointer">
            <option value="">Выбор действия</option>
            <option value="create">Создать элемент</option>
            <option value="edit" :disabled="selectedItems.length !== 1">
              Редактировать элемент
            </option>
            <option value="archive" :disabled="selectedItems.length === 0">
              Архивировать выбранные
            </option>
            <option value="delete" disabled>Удалить</option>
          </BaseSelect>
        </div>
        <div class="flex-shrink-0">
          <BaseButton @click="showTableSettings = true">
            Настройки таблицы
          </BaseButton>
        </div>
      </div>

      <DataTable :columns="columns" :items="items" :loading="loading" :selected-items.sync="selectedItems" selectable>
        <template #cell(code)="{ item }">
          <span class="font-mono font-semibold text-blue-700">{{ item.code }}</span>
        </template>
        <template #cell(startDate)="{ item }">
          {{ item.startDate }}
        </template>
        <template #cell(endDate)="{ item }">
          {{ item.endDate }}
        </template>
      </DataTable>

      <DataPagination :pagination="pagination" :items-on-page="items.length" @page-change="handlePageChange" />

      <TableSettingsModal :show="showTableSettings" :settings="tableSettings" @close="showTableSettings = false"
        @apply="applyTableSettings" />
    </div>
  </div>

</template>

<script>
import { getDictionaryById, getDictionaryItems } from '../main.js';

import DataTable from '../components/DataTable.vue';
import DataPagination from '../components/DataPagination.vue';
import SearchFormWrapper from '../components/SearchFormWrapper.vue';
import BaseInput from '../components/base/BaseInput.vue';
import BaseSelect from '../components/base/BaseSelect.vue';
import BaseButton from '../components/base/BaseButton.vue';
import TableSettingsModal from '../components/TableSettingsModal.vue';

export default {
  name: 'DictionaryView',
  components: { DataTable, DataPagination, SearchFormWrapper, BaseInput, BaseSelect, BaseButton, TableSettingsModal },
  props: { id: { type: String, required: true } },
  data() {
    return {
      loading: false,
      items: [],
      dictionaryName: '',
      searchForm: { code: '', ruName: '', status: '' },
      pagination: { current: 1, total: 1, count: 0, limit: 10 },
      selectedItems: [],
      showTableSettings: false,
      tableSettings: { showStartDate: true, showEndDate: true },
    };
  },
  computed: {
    columns() {
      return [
        { key: 'code', label: 'codifieldListItemCode' },
        { key: 'ruName', label: 'codifieldListItemNameRU' },
        { key: 'rbName', label: 'codifieldListItemNameBY' },
        { key: 'status', label: 'codifieldListItemStatus' },
        { key: 'startDate', label: 'date', visible: this.tableSettings.showStartDate },
        { key: 'endDate', label: 'date', visible: this.tableSettings.showEndDate },
      ];
    },
  },
  methods: {
    async fetchItems() {
      this.loading = true;
      this.selectedItems = [];
      try {
        const params = {
          ...this.searchForm,
          page: this.pagination.current,
          limit: this.pagination.limit
        };
        const response = await getDictionaryItems(this.id, params);
        this.items = response.items;
        this.pagination = response.pagination;
      } catch (error) {
        console.error('Ошибка загрузки элементов справочника:', error);
      } finally {
        this.loading = false;
      }
    },
    async loadDictionaryName() {
      try {
        const dictionary = await getDictionaryById(this.id);
        this.dictionaryName = dictionary.name;
      } catch (error) {
        console.error('Ошибка загрузки имени справочника:', error);
      }
    },
    handleSearch() {
      this.pagination.current = 1;
      this.fetchItems();
    },
    handleClearForm() {
      this.searchForm = {
        code: '',
        ruName: '',
        status: ''
      };
      this.pagination.current = 1;
      this.fetchItems();
    },
    handlePageChange(page) {
      this.pagination.current = page;
      this.fetchItems();
    },
    applyTableSettings(newSettings) {
      this.tableSettings = newSettings;
      this.showTableSettings = false;
    },
  },
  created() {
    this.loadDictionaryName();
    this.fetchItems();
  }
}
</script>