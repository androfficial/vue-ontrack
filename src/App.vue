<script setup>
import { ref } from 'vue';
import TheHeader from './components/TheHeader.vue';
import TheNav from './components/TheNav.vue';
import TheTimeline from './pages/TheTimeline.vue';
import TheActivities from './pages/TheActivities.vue';
import TheProgress from './pages/TheProgress.vue';
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants/constants';
import {
  generateTimelineItems,
  normalizePageHash,
  generateActivitySelectOptions,
} from './utils/utils';

const goTo = (page) => {
  currentPage.value = page;
};

const currentPage = ref(normalizePageHash());
const timelineItems = generateTimelineItems();
const activities = ['Coding', 'Reading', 'Training'];
const activitySelectOptions = generateActivitySelectOptions(activities);
</script>

<template>
  <TheHeader @navigate="goTo($event)" />

  <main class="flex flex-grow flex-col">
    <TheTimeline
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :activity-select-options="activitySelectOptions"
    />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" :activities="activities" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>
