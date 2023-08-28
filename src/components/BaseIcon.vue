<script setup>
import { ICONS } from '../constants/icons';
import { isIconValid } from '../validators/validators';

defineProps({
  name: {
    required: true,
    type: String,
    validator: isIconValid,
  },
});
</script>

<template>
  <component :is="ICONS[name]" :class="$attrs.class || 'h-8'" />
</template>
