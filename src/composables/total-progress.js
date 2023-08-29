import { computed } from 'vue';
import { getProgressColorClass } from '../utils/utils';
import { calculateTrackedActivitySeconds, timelineItems } from '../modules/timelineItems';
import { calculateCompletionPercentage, trackedActivities } from '../modules/activities';

export function useTotalProgress() {
  const colorClass = computed(() => getProgressColorClass(percentage.value));

  const percentage = computed(() => calculateCompletionPercentage(totalTrackedSeconds.value));

  const totalTrackedSeconds = computed(() => {
    return trackedActivities.value
      .map((activity) =>
        Math.min(
          calculateTrackedActivitySeconds(timelineItems.value, activity),
          activity.secondsToComplete
        )
      )
      .reduce((total, seconds) => total + seconds, 0);
  });

  return {
    colorClass,
    percentage,
  };
}
