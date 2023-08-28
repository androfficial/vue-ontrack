<script setup>
import { computed, provide, readonly, ref } from 'vue';
import TheHeader from './components/TheHeader.vue';
import TheNav from './components/TheNav.vue';
import TheTimeline from './pages/TheTimeline.vue';
import TheActivities from './pages/TheActivities.vue';
import TheProgress from './pages/TheProgress.vue';
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants/constants';
import {
  generateTimelineItems,
  generateActivities,
  generateActivitySelectOptions,
  generatePeriodSelectOptions,
} from './utils/utils';
import { currentPage, timelineRef } from './router/router';
import * as keys from './keys/keys';

const createActivity = (activity) => {
  activities.value.push(activity);
};

const deleteActivity = (activity) => {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null;
      timelineItem.activitySeconds = 0;
    }
  });

  activities.value.splice(activities.value.indexOf(activity), 1);
};

const activities = ref(generateActivities());
const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value));
const timelineItems = ref(generateTimelineItems(activities.value));

const setTimelineItemActivity = (timelineItem, activityId) => {
  timelineItem.activityId = activityId;
};

const updateTimelineItemActivitySeconds = (timelineItem, activitySeconds) => {
  timelineItem.activitySeconds += activitySeconds;
};

const setActivitySecondsToComplete = (activity, secondsToComplete) => {
  activity.secondsToComplete = secondsToComplete || 0;
};

provide(keys.updateTimelineItemActivitySecondsKey, updateTimelineItemActivitySeconds);
provide(keys.setActivitySecondsToCompleteKey, setActivitySecondsToComplete);
provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()));
provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions.value));
provide(keys.setTimelineItemActivityKey, setTimelineItemActivity);
provide(keys.timelineItemsKey, readonly(timelineItems.value));
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
