<script setup>
import {
  validateTimelineItems,
  validateSelectOptions,
  validateActivities,
  isTimelineItemValid,
  isActivityValid,
  isPageValid,
} from '../validators/validators';
import TimelineItem from '../components/TimelineItem.vue';
import { nextTick, ref, watchPostEffect } from 'vue';
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '../constants/constants';

const props = defineProps({
  timelineItems: {
    required: true,
    type: Array,
    validator: validateTimelineItems,
  },
  activities: {
    required: true,
    type: Array,
    validator: validateActivities,
  },
  activitySelectOptions: {
    required: true,
    type: Array,
    validator: validateSelectOptions,
  },
  currentPage: {
    required: true,
    type: String,
    validator: isPageValid,
  },
});

const emit = defineEmits({
  setTimelineItemActivity(timelineItem, activity) {
    return [isTimelineItemValid(timelineItem), isActivityValid(activity)].every(Boolean);
  },
});

const timelineItemRefs = ref([]);

const scrollToCurrentTimelineItem = () => {
  const currentHour = new Date().getHours();

  if (currentHour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView({
      behavior: 'smooth',
    });
  } else {
    timelineItemRefs.value[currentHour - 1].$el.scrollIntoView({
      behavior: 'smooth',
    });
  }
};

watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick();
    scrollToCurrentTimelineItem();
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
        :activities="activities"
        :activity-select-options="activitySelectOptions"
        ref="timelineItemRefs"
        @select-activity="emit('setTimelineItemActivity', timelineItem, $event)"
      />
    </ul>
  </div>
</template>
