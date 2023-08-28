<script setup>
import { currentPage, navigate } from '../router/router';
import { PAGE_TIMELINE } from '../constants/constants';
import { scrollToCurrentHour } from '../modules/timelineItems';

function handleClick() {
  currentPage.value === PAGE_TIMELINE ? scrollToCurrentHour(true) : navigate(PAGE_TIMELINE);
}
</script>

<template>
  <a :href="`#${PAGE_TIMELINE}`" @click="handleClick">
    <img class="h-9" src="../assets/img/logo.png" alt="Logo" />
  </a>
</template>
