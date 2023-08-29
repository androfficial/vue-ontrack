<script setup>
import { BUTTON_TYPE_DANGER, PERIOD_SELECT_OPTIONS } from '../constants/constants';
import { ICON_TRASH } from '../constants/icons';
import { isActivityValid } from '../validators/validators';
import ActivitySecondsToComplete from './ActivitySecondsToComplete.vue';
import { deleteActivity, updateActivity } from '../modules/activities';
import { resetTimelineItemActivities, timelineItems } from '../modules/timelineItems';
import BaseIcon from './BaseIcon.vue';
import BaseButton from './BaseButton.vue';
import BaseSelect from './BaseSelect.vue';

defineProps({
  activity: {
    required: true,
    type: Object,
    validator: isActivityValid,
  },
});

function deleteAndResetActivity(activity) {
  resetTimelineItemActivities(timelineItems.value, activity);
  deleteActivity(activity);
}
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteAndResetActivity(activity)">
        <BaseIcon :name="ICON_TRASH" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="grow font-mono"
        placeholder="hh:mm"
        :options="PERIOD_SELECT_OPTIONS"
        :selected="activity.secondsToComplete || null"
        @select="updateActivity(activity, { secondsToComplete: $event || 0 })"
      />
      <ActivitySecondsToComplete v-if="activity.secondsToComplete" :activity="activity" />
    </div>
  </li>
</template>
