import { processDateInput } from "@/lib/\butils";
import { describe, expect } from "@jest/globals";


describe('process date input', () => {

const matchDateObj = { year: 2023, month: 10, day: 15}

    it('should limit year to 4 digits', () => {
        expect(processDateInput('20234', 'year', matchDateObj)).toBe('2023')
    })

    it('should limit month to 2 digits and not exceed 12', () => {
        expect(processDateInput('13', 'month', matchDateObj)).toBe(undefined)
        expect(processDateInput('121', 'month', matchDateObj)).toBe('12')
    })

    it('should return undefined for invalid month or day', () => {
        expect(processDateInput('0', 'month', matchDateObj)).toBe(undefined);
        expect(processDateInput('0', 'day', matchDateObj)).toBe(undefined);
    })
})