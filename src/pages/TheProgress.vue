<script setup>
import { trackedActivities } from '../modules/activities';
import ProgressItem from '../components/ProgressItem.vue';
</script>

<template>
  <ul class="divide-y">
    <ProgressItem
      v-for="(activity, index) in trackedActivities"
      :key="activity.id"
      :index="index"
      :activity="activity"
    />
  </ul>
</template>
