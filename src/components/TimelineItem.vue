<script setup>
import { isActivityValid, isNull } from '../validators/validators';
import { validateActivities } from '../validators/validators';
import { isTimelineItemValid, validateSelectOptions } from '../validators/validators';
import BaseSelect from './BaseSelect.vue';
import TimelineHour from './TimelineHour.vue';

const props = defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid,
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
  selectActivity(activity) {
    return isNull(activity) || isActivityValid(activity);
  },
});

const selectActivity = (id) => {
  emit('selectActivity', props.activities.find((activity) => activity.id === id) || null);
};
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect
      placeholder="Rest"
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      @select="selectActivity"
    />
  </li>
</template>
