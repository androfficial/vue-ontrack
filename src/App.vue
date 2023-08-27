<script setup>
import { computed, provide, ref } from 'vue';
import TheHeader from './components/TheHeader.vue';
import TheNav from './components/TheNav.vue';
import TheTimeline from './pages/TheTimeline.vue';
import TheActivities from './pages/TheActivities.vue';
import TheProgress from './pages/TheProgress.vue';
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants/constants';
import {
  generateTimelineItems,
  normalizePageHash,
  generateActivities,
  generateActivitySelectOptions,
  generatePeriodSelectOptions,
} from './utils/utils';

const goTo = (page) => {
  if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
    timeline.value.scrollToHour();
  }

  if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView();
  }

  currentPage.value = page;
};

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

const timeline = ref();
const currentPage = ref(normalizePageHash());
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
  activity.secondsToComplete = secondsToComplete;
};

provide('updateTimelineItemActivitySeconds', updateTimelineItemActivitySeconds);
provide('setActivitySecondsToComplete', setActivitySecondsToComplete);
provide('periodSelectOptions', generatePeriodSelectOptions());
provide('activitySelectOptions', activitySelectOptions.value);
provide('setTimelineItemActivity', setTimelineItemActivity);
provide('timelineItems', timelineItems.value);
provide('createActivity', createActivity);
provide('deleteActivity', deleteActivity);
</script>

<template>
  <TheHeader @navigate="goTo($event)" />

  <main class="flex flex-grow flex-col">
    <TheTimeline
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :current-page="currentPage"
      ref="timeline"
    />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" :activities="activities" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>
