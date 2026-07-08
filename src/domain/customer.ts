import { Customer } from '../types';
import { isBeforeToday, isToday } from '../utils/date';

const PRIORITY_RANK: Record<Customer['priority'], number> = { High: 0, Medium: 1, Low: 2 };

/**
 * Revision 04 — sắp xếp mặc định, KHÔNG cho phép người dùng đổi:
 * 1. Overdue
 * 2. Follow Up hôm nay
 * 3. Priority High
 * 4. Potential AUM giảm dần
 * 5. UpdatedAt mới nhất
 */
export function sortCustomersDefault(customers: Customer[]): Customer[] {
  const rank = (c: Customer): number => {
    if (c.nextFollowUpDate && isBeforeToday(c.nextFollowUpDate)) return 0; // Overdue
    if (c.nextFollowUpDate && isToday(c.nextFollowUpDate)) return 1; // Follow up hôm nay
    return 2;
  };

  return [...customers].sort((a, b) => {
    const rankDiff = rank(a) - rank(b);
    if (rankDiff !== 0) return rankDiff;

    const priorityDiff = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
    if (priorityDiff !== 0) return priorityDiff;

    if (b.potentialAUM !== a.potentialAUM) return b.potentialAUM - a.potentialAUM;

    return b.updatedAt.localeCompare(a.updatedAt);
  });
}

/** Revision 05: search chỉ theo Tên và Số điện thoại, không dấu-không phân biệt hoa thường ở mức cơ bản. */
export function searchCustomers(customers: Customer[], query: string): Customer[] {
  const q = query.trim().toLowerCase();
  if (!q) return customers;
  return customers.filter(
    (c) => c.name.toLowerCase().includes(q) || c.phone.toLowerCase().includes(q)
  );
}

export function generateCustomerId(): string {
  return `cust_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
