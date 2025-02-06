export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export const getDayOfWeek = (date: string) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const day = new Date(date).getDay();
  return days[day];
  
};
