const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const minutesToMs = (minutes: number): number => minutes * MINUTE;
export const hoursToMs = (hours: number): number => hours * HOUR;
export const daysToMs = (days: number): number => days * DAY;
