<script setup>
import { validateTimelineItems } from '../validators/validators';
import TimelineItem from '../components/TimelineItem.vue';
import { nextTick, ref, watchPostEffect } from 'vue';
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '../constants/constants';
import { currentPage } from '../router/router';

defineProps({
  timelineItems: {
    required: true,
    type: Array,
    validator: validateTimelineItems,
  },
});

const scrollToHour = (hour = null, isSmooth = true) => {
  hour ??= new Date().getHours();
  const options = { behavior: isSmooth ? 'smooth' : 'instant' };

  if (hour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView(options);
  } else {
    timelineItemRefs.value[hour - 1].$el.scrollIntoView(options);
  }
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
        @scroll-to-hour="scrollToHour"
      />
    </ul>
  </div>
</template>
