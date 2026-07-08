import { AppData, CURRENT_SCHEMA_VERSION } from '../types';
import { todayISO, addDaysISO } from '../utils/date';

const STORAGE_KEY = 'tinprm_data_v1';

export function createDefaultAppData(): AppData {
  const start = todayISO();
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    customers: [],
    settings: {
      goalAmount: 10_000_000_000,
      goalPeriodDays: 90,
      goalStartDate: start,
      goalEndDate: addDaysISO(start, 90),
      theme: 'dark',
    },
  };
}

export function loadAppData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultAppData();
    const parsed = JSON.parse(raw) as AppData;
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.customers) || !parsed.settings) {
      return createDefaultAppData();
    }
    return parsed;
  } catch {
    return createDefaultAppData();
  }
}

export function saveAppData(data: AppData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function exportAppDataAsJSON(data: AppData): string {
  return JSON.stringify(data, null, 2);
}

/** Trả về AppData hợp lệ từ chuỗi JSON import, hoặc ném lỗi nếu không hợp lệ. */
export function parseImportedJSON(json: string): AppData {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error('File không phải định dạng JSON hợp lệ.');
  }

  if (
    !parsed ||
    typeof parsed !== 'object' ||
    !Array.isArray((parsed as AppData).customers) ||
    !(parsed as AppData).settings
  ) {
    throw new Error('Cấu trúc dữ liệu không đúng định dạng TinPRM.');
  }

  return parsed as AppData;
}

export function downloadJSONFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
