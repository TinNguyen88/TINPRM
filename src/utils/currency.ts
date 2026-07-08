/** Format số nguyên VND kiểu 1.000.000.000 đ */
export function formatVND(amount: number): string {
  return `${new Intl.NumberFormat('vi-VN').format(Math.round(amount))} đ`;
}

/** Format rút gọn cho số lớn: 5 tỷ, 500 triệu — dùng ở nơi cần gọn (badge, danh sách). */
export function formatVNDShort(amount: number): string {
  if (amount >= 1_000_000_000) {
    const ty = amount / 1_000_000_000;
    const rounded = Math.round(ty * 10) / 10;
    return `${rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1)} tỷ`;
  }
  if (amount >= 1_000_000) {
    const trieu = Math.round(amount / 1_000_000);
    return `${trieu} triệu`;
  }
  return formatVND(amount);
}

/** Parse chuỗi nhập tay (có thể có dấu chấm/phẩy) thành số nguyên. */
export function parseVNDInput(raw: string): number {
  const digitsOnly = raw.replace(/[^\d]/g, '');
  return digitsOnly ? parseInt(digitsOnly, 10) : 0;
}
