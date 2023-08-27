<script setup>
import { inject } from 'vue';
import { NULLABLE_ACTIVITY } from '../constants/constants';
import { isActivityValid, isHourValid } from '../validators/validators';
import { isTimelineItemValid } from '../validators/validators';
import BaseSelect from './BaseSelect.vue';
import TimelineHour from './TimelineHour.vue';
import TimelineStopwatch from './TimelineStopwatch.vue';

defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid,
  },
});

const emit = defineEmits({
  selectActivity: isActivityValid,
  scrollToHour: isHourValid,
});

const activities = inject('activities');
const activitySelectOptions = inject('activitySelectOptions');

const selectActivity = (id) => {
  emit('selectActivity', findActivityById(id));
};

const findActivityById = (id) => {
  return activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY;
};
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
    <TimelineHour
      :hour="timelineItem.hour"
      @click.prevent="emit('scrollToHour', timelineItem.hour)"
    />
    <BaseSelect
      placeholder="Rest"
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      @select="selectActivity"
    />
    <TimelineStopwatch :timeline-item="timelineItem" />
  </li>
</template>
