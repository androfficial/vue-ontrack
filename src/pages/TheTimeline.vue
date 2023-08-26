<script setup>
import {
  validateTimelineItems,
  validateSelectOptions,
  validateActivities,
  isTimelineItemValid,
  isActivityValid,
} from '../validators/validators';
import TimelineItem from '../components/TimelineItem.vue';
import { onMounted, ref } from 'vue';
import { MIDNIGHT_HOUR } from '../constants/constants';

defineProps({
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

onMounted(scrollToCurrentTimelineItem);
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
