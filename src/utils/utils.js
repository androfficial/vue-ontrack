import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants/constants';

export const normalizePageHash = () => {
  const hash = window.location.hash.slice(1);

  if (Object.keys([PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS]).includes(hash)) return hash;
  window.location.hash = PAGE_TIMELINE;
  return PAGE_TIMELINE;
};
