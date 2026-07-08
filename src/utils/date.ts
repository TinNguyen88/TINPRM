/** Trả về ngày hôm nay dạng 'YYYY-MM-DD' theo giờ địa phương (không dùng UTC để tránh lệch ngày). */
export function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function addDaysISO(baseISO: string, days: number): string {
  const d = new Date(baseISO + 'T00:00:00');
  d.setDate(d.getDate() + days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function isBeforeToday(dateISO: string): boolean {
  return dateISO < todayISO();
}

export function isToday(dateISO: string): boolean {
  return dateISO === todayISO();
}

export function daysBetween(fromISO: string, toISO: string): number {
  const from = new Date(fromISO + 'T00:00:00').getTime();
  const to = new Date(toISO + 'T00:00:00').getTime();
  return Math.round((to - from) / (1000 * 60 * 60 * 24));
}

/** Hiển thị ngày kiểu Việt Nam: 08/07/2026 */
export function formatDateVN(dateISO: string | null): string {
  if (!dateISO) return '—';
  const [y, m, d] = dateISO.split('-');
  return `${d}/${m}/${y}`;
}

/** Hiển thị dạng tương đối: Hôm nay / Quá hạn N ngày / Còn N ngày / ngày cụ thể */
export function formatRelativeDate(dateISO: string | null): string {
  if (!dateISO) return '—';
  const today = todayISO();
  if (dateISO === today) return 'Hôm nay';
  const diff = daysBetween(today, dateISO);
  if (diff < 0) return `Quá hạn ${Math.abs(diff)} ngày`;
  if (diff === 1) return 'Ngày mai';
  return formatDateVN(dateISO);
}

export function nowISODateTime(): string {
  return new Date().toISOString();
}
