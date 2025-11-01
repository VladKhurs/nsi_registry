<template>
  <div class="w-1_2 mx-auto flex flex-col gap-3 bg-blue-200 rounded-6">
    <div class="rounded-6 bg-indigo-600 m-0 py-1 px-4 flex justify-between">
      <h2 class="text-lg font-semibold text-white flex items-center">Создание/Редактирование справочника</h2>
      <img src="../assets/arrow-top.svg" alt="" width="40px" class="mt-2">
    </div>

    <div class="p-4">
      <div class="shadow shadow-lg mb-5">
        <div class="rounded-6 bg-indigo-500 m-0 mb-5 py-1 px-4 flex justify-between">
          <h2 class="text-lg font-semibold text-white flex items-center">Паспорт справочника</h2>
          <img src="../assets/arrow-top.svg" alt="" width="40px" class="mt-2">
        </div>
        <div class="flex flex-col gap-3 p-3">
          <div class="flex flex-col w-auto overflow-hidden">
            <span class="text-xs ml-2">Наименование*</span>
            <BaseInput id="search-name" placeholder="Введите наименование" />
          </div>
          <div class="flex gap-3">
            <div class="w-full">
              <span class="text-xs ml-2">Тип*</span>
              <BaseSelect id="search-type">
                <option value="">Тип справочника</option>
                <option value="Пользовательский">Пользовательский</option>
                <option value="Технологический">Технологический</option>
                <option value="Защищенный">Защищенный</option>
              </BaseSelect>
            </div>
            <div class="w-full">
              <span class="text-xs ml-2">Код*</span>
              <BaseInput id="search-name" placeholder="Код справочника" />
            </div>
          </div>

          <div class="flex flex-row gap-3 w-full">
            <BaseInput id="search-name" placeholder="Дата начала действия" />
            <BaseInput id="search-name" placeholder="Дата окончания действия" />
          </div>
        </div>
      </div>

      <div class="flex justify-end w-full">
        <BaseButton variant="primary" @click="closeDictionaryForm">
          Закрыть
        </BaseButton>
      </div>
    </div>
  </div>
</template>


<script>
import BaseSelect from '../components/base/BaseSelect.vue';
import BaseInput from '../components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';

export default {
  components: {
    BaseInput,
    BaseSelect,
    BaseButton
  },
  methods: {
    closeDictionaryForm() {
      this.$router.push('/');
    }
  }
}
</script>
