<script setup>
import { NULLABLE_ACTIVITY } from '../constants/constants';
import { isActivityValid } from '../validators/validators';
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
  selectActivity: isActivityValid,
});

const selectActivity = (id) => {
  emit('selectActivity', findActivityById(id));
};

const findActivityById = (id) => {
  return props.activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY;
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
