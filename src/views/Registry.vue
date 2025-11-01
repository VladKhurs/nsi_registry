<template>
  <div class="w-full bg-blue-200 rounded-6" >
    <div class="rounded-6 bg-indigo-600 m-0 mb-5 py-2 px-4 flex justify-between">
      <h2 class="text-xl font-semibold text-white flex items-center">Реестр справочников</h2>
      <img src="../assets/arrow-top.svg" alt="" width="45px" class="mt-2">
    </div>

    <div class="p-6">
      <SearchFormWrapper :loading="loading" @search="handleSearch" @clear="handleClearForm">
        <div class="w-full flex flex-col gap-3">
          <div class="w-full flex flex-row gap-3">
            <BaseSelect id="search-type" v-model="searchForm.type">
              <option value="">Тип справочника</option>
              <option value="Пользовательский">Пользовательский</option>
              <option value="Технологический">Технологический</option>
              <option value="Защищенный (классификатор)">Защищенный (классификатор)</option>
            </BaseSelect>
            <BaseInput id="search-name" v-model="searchForm.name" placeholder="Наименование справочника" />
          </div>
          <div class="w-1_2 flex flex-row gap-3">
            <BaseInput id="search-code" v-model="searchForm.code" placeholder="Код справочника" />
          </div>
        </div>
      </SearchFormWrapper>

      <DictionaryActions :selected-dictionaries="selectedDictionaries" @action-selected="handleActionSelect"
        @show-settings="showTableSettings = true" />

      <DataTable :columns="columns" :items="dictionaries" :loading="loading" :selected-items.sync="selectedDictionaries"
        selectable>
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

      <DataPagination :pagination="pagination" :items-on-page="dictionaries.length" @page-change="handlePageChange" />

      <TableSettingsModal :show="showTableSettings" :settings="tableSettings" @close="showTableSettings = false"
        @apply="applyTableSettings" />
    </div>
  </div>
</template>

<script>
import { getDictionaries } from '../main.js';

import DataTable from '../components/DataTable.vue';
import DataPagination from '../components/DataPagination.vue';
import SearchFormWrapper from '../components/SearchFormWrapper.vue';
import BaseInput from '../components/base/BaseInput.vue';
import BaseSelect from '../components/base/BaseSelect.vue';
import DictionaryActions from '../components/DictionaryActions.vue';
import TableSettingsModal from '../components/TableSettingsModal.vue';

export default {
  name: 'Registry',
  components: {
    DataTable,
    DataPagination,
    SearchFormWrapper,
    BaseInput,
    BaseSelect,
    DictionaryActions,
    TableSettingsModal,
  },
  data() {
    return {
      loading: false,
      dictionaries: [],
      searchForm: { type: '', name: '', code: '' },
      pagination: { current: 1, total: 1, count: 0, limit: 4 },
      selectedDictionaries: [],
      showTableSettings: false,
      tableSettings: { showStartDate: true, showEndDate: true },
    };
  },
  computed: {
    columns() {
      return [
        { key: 'code', label: 'Код' },
        { key: 'type', label: 'Тип' },
        { key: 'name', label: 'Наименование' },
        { key: 'startDate', label: 'Дата начала', visible: this.tableSettings.showStartDate },
        { key: 'endDate', label: 'Дата окончания', visible: this.tableSettings.showEndDate },
      ];
    },
  },
  methods: {
    async fetchData() {
      this.loading = true;
      this.selectedDictionaries = [];
      try {
        const params = { ...this.searchForm, page: this.pagination.current, limit: this.pagination.limit };
        const response = await getDictionaries(params);
        this.dictionaries = response.items;
        this.pagination = response.pagination;
      } catch (error) {
        console.error('Ошибка загрузки справочников:', error);
      } finally {
        this.loading = false;
      }
    },
    handleSearch() {
      this.pagination.current = 1;
      this.fetchData();
    },
    handleClearForm() {
      this.searchForm = {
        type: '',
        name: '',
        code: ''
      };
      this.pagination.current = 1;
      this.fetchData();
    },
    handlePageChange(page) {
      this.pagination.current = page;
      this.fetchData();
    },

    handleActionSelect(value) {
      if (!value) return;
      switch (value) {
        case 'create':
          this.$router.push('/create');
          break;
        case 'view':
          if (this.selectedDictionaries.length === 1) {
            const id = this.selectedDictionaries[0];
            this.$router.push(`/dictionary/${id}`);
          }
          break;
      }
    },
    applyTableSettings(newSettings) {
      this.tableSettings = newSettings;
      this.showTableSettings = false;
    },
  },
  created() {
    this.fetchData();
  },
};
</script>