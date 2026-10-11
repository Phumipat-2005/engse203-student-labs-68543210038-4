import { describe, test, expect } from 'vitest';
import { summarizeRequests } from './requestSummary.js';

describe('summarizeRequests', () => {
  test('รายการว่าง → ทุกค่าเป็น 0', () => {
    expect(summarizeRequests([])).toEqual({ total: 0, pending: 0, inProgress: 0, completed: 0 });
  });

  test('นับสถานะตามค่าจริงที่ API ส่งมา', () => {
    const requests = [
      { status: 'pending' },
      { status: 'in-progress' },
      { status: 'in-progress' },
      { status: 'completed' },
    ];
    expect(summarizeRequests(requests)).toEqual({
      total: 4,
      pending: 1,
      inProgress: 2,
      completed: 1,
    });
  });
});
