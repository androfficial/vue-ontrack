<script setup>
import { ref } from 'vue';
import { isTimelineItemValid } from '../validators/validators';
import BaseSelect from './BaseSelect.vue';
import TimelineHour from './TimelineHour.vue';

defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid,
  },
});

const options = [
  { value: 1, label: 'Coding' },
  { value: 2, label: 'Reading' },
  { value: 3, label: 'Training' },
];

const selectedActivityId = ref(1);
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect
      :selected="selectedActivityId"
      :options="options"
      @select="selectedActivityId = $event"
      placeholder="Rest"
    />
  </li>
</template>
