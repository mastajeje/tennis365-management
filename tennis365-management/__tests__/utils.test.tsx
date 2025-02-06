import { getDayOfWeek } from '@/lib/\butils';
import { expect, test} from '@jest/globals';

// describe('Day of Week', () => {
  test('should return current day', () => {
    expect(getDayOfWeek('2025-01-01')).toBe('수')
  });
// });

