<script setup>
import BaseSelect from './BaseSelect.vue';
import TimelineHour from './TimelineHour.vue';
import TimelineStopwatch from './TimelineStopwatch.vue';
import { isTimelineItemValid } from '../validators/validators';
import { updateTimelineItem } from '../modules/timelineItems';
import { activitySelectOptions } from '../modules/activities';

defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid,
  },
});
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect
      placeholder="Rest"
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      @select="updateTimelineItem(timelineItem, { activityId: $event })"
    />
    <TimelineStopwatch :timeline-item="timelineItem" />
  </li>
</template>
