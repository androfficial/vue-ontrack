import { HOURS_IN_DAY, MIDNIGHT_HOUR, NAV_ITEMS } from '../constants/constants';

export function isPageValid(page) {
  return Object.keys(NAV_ITEMS).includes(page);
}

export function isHourValid(hour) {
  return isNumber(hour) && isBetween(hour, MIDNIGHT_HOUR, HOURS_IN_DAY - 1);
}

export function isTimelineItemValid({ hour }) {
  return isHourValid(hour);
}

export function validateSelectOptions(options) {
  return options.every(isSelectOptionValid);
}

export function validateTimelineItems(timelineItems) {
  return timelineItems.every(isTimelineItemValid);
}

export function isUndefinedOrNull(value) {
  return isUndefined(value) || isNull(value);
}

export function isNumberOrNull(value) {
  return isNumber(value) || isNull(value);
}

function isUndefined(value) {
  return value === undefined;
}

function isNull(value) {
  return value === null;
}

function isString(value) {
  return typeof value === 'string';
}

function isNumber(value) {
  return typeof value === 'number';
}

function isBetween(value, start, end) {
  return value >= start && value <= end;
}

function isSelectOptionValid({ value, label }) {
  return isNumber(value) && isString(label);
}
