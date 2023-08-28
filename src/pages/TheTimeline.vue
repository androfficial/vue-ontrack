<script setup>
import { nextTick, watchPostEffect } from 'vue';
import { scrollToHour, timelineItems } from '../modules/timelineItems';
import TimelineItem from '../components/TimelineItem.vue';
import { PAGE_TIMELINE } from '../constants/constants';
import { currentPage } from '../router/router';

watchPostEffect(async () => {
  if (currentPage.value === PAGE_TIMELINE) {
    await nextTick();
    scrollToHour(null, false);
  }
});
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        ref="timelineItemRefs"
        @scroll-to-hour="scrollToHour(timelineItem.hour)"
      />
    </ul>
  </div>
</template>
