<template>
  <button
    :type="type"
    :class="[baseClasses, variantClasses, { 'opacity-60 cursor-not-allowed': disabled }]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: 'button',
    },
    variant: {
      type: String,
      default: 'secondary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    baseClasses() {
      return 'inline-flex items-center justify-center py-2 px-3 border rounded-6 font-medium cursor-pointer transition';
    },
    variantClasses() {
      if (this.variant === 'primary') {
        return 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700 hover:border-blue-700';
      }
      return 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50';
    },
  },
};
</script>