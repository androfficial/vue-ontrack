<script setup>
import { nextTick, ref, watchPostEffect } from 'vue';
import { timelineItems } from '../modules/timelineItems';
import TimelineItem from '../components/TimelineItem.vue';
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '../constants/constants';
import { currentPage } from '../router/router';
import { currentHour } from '../utils/utils';

const scrollToHour = (hour = null, isSmooth = true) => {
  hour ??= currentHour();

  const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el;

  el.scrollIntoView({ behavior: isSmooth ? 'smooth' : 'instant' });
};

defineExpose({
  scrollToHour,
});

const timelineItemRefs = ref([]);

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
