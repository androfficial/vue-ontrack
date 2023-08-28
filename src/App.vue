<script setup>
import { provide, readonly } from 'vue';
import TheHeader from './components/TheHeader.vue';
import TheNav from './components/TheNav.vue';
import TheTimeline from './pages/TheTimeline.vue';
import TheActivities from './pages/TheActivities.vue';
import TheProgress from './pages/TheProgress.vue';
import {
  activities,
  activitySelectOptions,
  createActivity,
  deleteActivity,
  setActivitySecondsToComplete,
} from './modules/activities';
import {
  timelineItems,
  setTimelineItemActivity,
  updateTimelineItemActivitySeconds,
} from './modules/timelineItems';
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants/constants';
import { generatePeriodSelectOptions } from './utils/utils';
import { currentPage, timelineRef } from './router/router';
import * as keys from './keys/keys';

provide(keys.updateTimelineItemActivitySecondsKey, updateTimelineItemActivitySeconds);
provide(keys.setActivitySecondsToCompleteKey, setActivitySecondsToComplete);
provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()));
provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions));
provide(keys.setTimelineItemActivityKey, setTimelineItemActivity);
provide(keys.timelineItemsKey, readonly(timelineItems));
provide(keys.createActivityKey, createActivity);
provide(keys.deleteActivityKey, deleteActivity);
</script>

<template>
  <TheHeader />

  <main class="flex flex-grow flex-col">
    <TheTimeline
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      ref="timelineRef"
    />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" :activities="activities" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav />
</template>
