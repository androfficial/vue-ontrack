import { computed } from 'vue';
import { getProgressColorClass } from '../utils/utils';
import { calculateActivityCompletionPercentage } from '../modules/activities';
import { calculateTrackedActivitySeconds, timelineItems } from '../modules/timelineItems';

export function useProgress(activity) {
  const colorClass = computed(() => getProgressColorClass(percentage.value));

  const percentage = computed(() =>
    calculateActivityCompletionPercentage(activity, trackedSeconds.value)
  );

  const trackedSeconds = computed(() =>
    calculateTrackedActivitySeconds(timelineItems.value, activity)
  );

  return {
    colorClass,
    percentage,
    trackedSeconds,
  };
}
