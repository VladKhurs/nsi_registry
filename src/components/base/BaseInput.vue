<template>
  <input
    :type="type"
    :value="value"
    :placeholder="placeholder"
    class="w-full py-3 px-3 border border-gray-300 rounded-6 bg-white focus:outline-none"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: 'text',
    },
    placeholder: String,
  },
};
</script>