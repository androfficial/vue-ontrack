<script setup>
import { trackedActivities } from '../modules/activities';
import ProgressItem from '../components/ProgressItem.vue';
</script>

<template>
  <ul class="divide-y">
    <ProgressItem v-for="activity in trackedActivities" :key="activity.id" :activity="activity" />
  </ul>
</template>
