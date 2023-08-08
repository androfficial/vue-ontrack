import { HOURS_IN_DAY, MIDNIGHT_HOUR, NAV_ITEMS } from '../constants/constants';

export function isPageValid(page) {
  return Object.keys(NAV_ITEMS).includes(page);
}

export function isTimelineItemValid({ hour }) {
  return typeof hour === 'number' && hour >= MIDNIGHT_HOUR && hour < HOURS_IN_DAY;
}
