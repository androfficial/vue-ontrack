<script setup>
import BaseIcon from './BaseIcon.vue';
import { computed } from 'vue';
import { currentPage, navigate } from '../router/router';
import { isNavItemValid } from '../validators/validators';

const props = defineProps({
  navItem: {
    required: true,
    type: Object,
    validator: isNavItemValid,
  },
});

const classes = computed(() => [
  'flex flex-col items-center p-2 text-xs capitalize',
  { 'pointer-events-none bg-gray-200': props.navItem.page === currentPage.value },
]);
</script>

<template>
  <li class="flex-1">
    <a :href="`#${navItem.page}`" :class="classes" @click="navigate(navItem.page)">
      <BaseIcon :name="navItem.icon" class="h-6 w-6" /> {{ navItem.page }}
    </a>
  </li>
</template>
