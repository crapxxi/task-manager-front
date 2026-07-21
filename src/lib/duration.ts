/**
 * Durations travel as whole minutes everywhere — the API, the critical-path
 * schedule and the roadmap axis all speak the same unit. Hours and workdays
 * exist only here, at the moment a number is shown to a human.
 */

/** A workday, for the roadmap axis and the "~N workdays" summary. */
export const DAY_MINUTES = 480;

/** Backend bounds (TaskRequest: @Min(5) / @Max(2400)). */
export const MIN_DURATION = 5;
export const MAX_DURATION = 2400;

/** The largest whole workday that still fits under MAX_DURATION. */
export const MAX_DAYS = Math.floor(MAX_DURATION / DAY_MINUTES);

/** A duration as a human enters it: workdays, hours, minutes. */
export interface DurationParts {
  days: number;
  hours: number;
  minutes: number;
}

/** 570 → { days: 1, hours: 1, minutes: 30 }. The inverse of {@link partsToMinutes}. */
export function minutesToParts(total: number): DurationParts {
  const m = Number.isFinite(total) ? Math.max(0, Math.round(total)) : 0;
  return {
    days: Math.floor(m / DAY_MINUTES),
    hours: Math.floor((m % DAY_MINUTES) / 60),
    minutes: m % 60,
  };
}

/** The single minute count the API wants. Blank fields count as zero. */
export function partsToMinutes(p: DurationParts): number {
  return p.days * DAY_MINUTES + p.hours * 60 + p.minutes;
}

/** 570 → "1d 1h 30m". Spelled out in full for the form, where precision is the point. */
export function formatDurationParts(total: number): string {
  if (!Number.isFinite(total)) return '—';
  const { days, hours, minutes } = minutesToParts(total);
  const out: string[] = [];
  if (days) out.push(`${days}d`);
  if (hours) out.push(`${hours}h`);
  if (minutes || !out.length) out.push(`${minutes}m`);
  return out.join(' ');
}

/** 45 → "45m", 60 → "1h", 90 → "1h 30m". Compact enough for chips and SVG labels. */
export function formatDuration(minutes: number): string {
  if (!Number.isFinite(minutes)) return '—';
  const m = Math.max(0, Math.round(minutes));
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  const rest = m % 60;
  return rest === 0 ? `${h}h` : `${h}h ${rest}m`;
}
