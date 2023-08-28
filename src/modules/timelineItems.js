import { ref } from 'vue';
import { activities } from '../modules/activities';
import { generateTimelineItems } from '../utils/utils';

export const timelineItems = ref(generateTimelineItems(activities.value));

export function setTimelineItemActivity(timelineItem, activityId) {
  timelineItem.activityId = activityId;
}

export function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds;
}
