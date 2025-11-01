<template>
  <select
    :value="value"
    class="block w-full py-3 px-3 border border-gray-300 rounded-6 bg-white transition focus:outline-none focus:border-blue-500 focus:ring"
    @change="$emit('input', $event.target.value)"
  >
    <slot></slot>
  </select>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: ['value'],
};
</script>