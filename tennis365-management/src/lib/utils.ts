import { DateObj } from "@/app/types/match";

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export const getDayOfWeek = (date: string) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const day = new Date(date).getDay();
  return days[day];
  
};


// limit digits of year, month, day value from input, and set number of days in month
export const processDateInput = (value: string, name: string, matChDateObj: DateObj): string | void => {
    const limitedValue = value.slice(0, name === 'year' ? 4 : 2); // Limit year to 4 digits, month and day to 2 digits

    if (
      (name === 'month' && parseInt(limitedValue) > 12) ||
      parseInt(limitedValue) === 0
    )
      return;

    if (name === 'day') {
      const daysInMonth = getDaysInMonth(
        matChDateObj.year,
        matChDateObj.month
      );
      if (parseInt(limitedValue) > daysInMonth || parseInt(limitedValue) === 0)
        return;
    }
    return limitedValue;
  };