<template>
  <div class="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
    <table class="w-full border-collapse text-left">
      <thead>
        <tr>
          <th v-if="selectable" class="w-12 py-3 px-4 bg-gray-50 font-semibold text-gray-600 text-md border-b border-gray-200">
            <input type="checkbox" @change="handleSelectAll" :checked="areAllSelected" />
          </th>
          <th
            v-for="column in visibleColumns"
            :key="column.key"
            class="py-3 px-4 bg-gray-50 font-semibold text-gray-600 text-md border-b border-gray-200"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td :colspan="tableColspan" class="text-center p-5 py-3 px-4 border-b border-gray-200">Загрузка данных...</td>
        </tr>
        <tr v-else-if="items.length === 0">
          <td :colspan="tableColspan" class="text-center p-5 py-3 px-4 border-b border-gray-200">Нет доступных данных</td>
        </tr>
        <tr v-for="item in items" :key="item._id" class="hover-bg-gray-50">
          <td v-if="selectable" class="py-3 px-4 border-b border-gray-200 last:border-b-0">
            <input type="checkbox" :value="item._id" :checked="selectedItems.includes(item._id)" @change="toggleSelection(item._id)" />
          </td>
          <td v-for="column in visibleColumns" :key="column.key" class="py-3 px-4 border-b border-gray-200 last:border-b-0">
            <slot :name="`cell(${column.key})`" :item="item">
              {{ item[column.key] || '-' }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    columns: { type: Array, required: true },
    items: { type: Array, required: true },
    selectedItems: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
    selectable: { type: Boolean, default: false },
  },
  computed: {
    visibleColumns() {
      return this.columns.filter(c => c.visible !== false);
    },
    tableColspan() {
      return this.visibleColumns.length + (this.selectable ? 1 : 0);
    },
    areAllSelected() {
        if (!this.items.length) return false;
        return this.items.every(item => this.selectedItems.includes(item._id));
    }
  },
  methods: {
    handleSelectAll(event) {
        const allIds = event.target.checked ? this.items.map(item => item._id) : [];
        this.$emit('update:selectedItems', allIds);
    },
    toggleSelection(itemId) {
        const newSelection = [...this.selectedItems];
        const index = newSelection.indexOf(itemId);
        if (index > -1) {
            newSelection.splice(index, 1);
        } else {
            newSelection.push(itemId);
        }
        this.$emit('update:selectedItems', newSelection);
    }
  }
};
</script>