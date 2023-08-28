<script setup>
import { navigate } from '../router/router';
import { PAGE_TIMELINE } from '../constants/constants';
</script>

<template>
  <a :href="`#${PAGE_TIMELINE}`" @click="navigate(PAGE_TIMELINE)">
    <img class="h-9" src="../assets/img/logo.png" alt="Logo" />
  </a>
</template>
