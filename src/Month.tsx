/* eslint-disable react-refresh/only-export-components */
import { useEffect, useMemo, useState, CSSProperties } from "react";
import { useCalendarFromContext } from "./Calendar";

export interface MonthName {
  name: string;
  nnn: string;
  nn: string;
  n: string;
  month: number;
}

export const MONT_NAME_LIST: MonthName[] = [
  { n: "J", nn: "Ja", nnn: "Jan", month: 0, name: "January" },
  { n: "F", nn: "Fb", nnn: "Feb", month: 1, name: "Feburary" },
  { n: "M", nn: "Mr", nnn: "Mar", month: 2, name: "March" },
  { n: "A", nn: "Ap", nnn: "Apr", month: 3, name: "April" },
  { n: "M", nn: "My", nnn: "May", month: 4, name: "May" },
  { n: "J", nn: "Jn", nnn: "Jun", month: 5, name: "June" },
  { n: "J", nn: "Jl", nnn: "Jul", month: 6, name: "July" },
  { n: "A", nn: "Ag", nnn: "Aug", month: 7, name: "August" },
  { n: "S", nn: "Sp", nnn: "Sep", month: 8, name: "September" },
  { n: "O", nn: "Ot", nnn: "Oct", month: 9, name: "October" },
  { n: "N", nn: "Nv", nnn: "Nov", month: 10, name: "November" },
  { n: "D", nn: "Dc", nnn: "Dec", month: 11, name: "December" },
];

export interface WeekDayName {
  name: string;
  n: string;
  day: number;
}

export const WEEK_DAY_NAME_LIST: WeekDayName[] = [
  { name: "Sun", n: "S", day: 0 },
  { name: "Mon", n: "M", day: 1 },
  { name: "Tue", n: "T", day: 2 },
  { name: "Wed", n: "W", day: 3 },
  { name: "Thu", n: "T", day: 4 },
  { name: "Fri", n: "F", day: 5 },
  { name: "Sat", n: "S", day: 6 },
];

export const getWeekDayName = (day: number): WeekDayName => {
  return WEEK_DAY_NAME_LIST[day];
};

export const getMonthName = (month: number): string => {
  const weekDayNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return weekDayNames[month];
};

export const getDates = (year: number, month: number): Date[] => {
  const dates = Array.from({ length: 33 })
    .map((_, day) => new Date(year, month, day))
    .filter((date) => date.getMonth() === month);
  return dates;
};

export const getDatesPerWeek = (
  dates: Date[],
  lastWeekDay: number,
): Date[][] => {
  return dates.reduce(
    (answer, date) => {
      const last = answer.length - 1;
      answer[last].push(date);
      if (date.getDay() === lastWeekDay) {
        answer.push([]);
      }
      return answer;
    },
    [[]] as Date[][],
  );
};

export const getOrderedWeekNams = (firstWeekDay: number) => {
  const weekDayNameList = [...WEEK_DAY_NAME_LIST];
  while (weekDayNameList[0].day !== firstWeekDay) {
    weekDayNameList.push(...weekDayNameList.splice(0, 1));
  }
  return weekDayNameList;
};

export const isSameDate = (d1: Date, d2: Date): boolean => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const useMonth = (props: { month: number; year: number }) => {
  const [firstWeekDay, setFirstWeekDay] = useState<number>(0); // sun 0, [0,1,2,3,4,5,6]
  const lastWeekDay = useMemo<number>(
    () => (firstWeekDay + 7 - 1) % 7,
    [firstWeekDay],
  );
  const [year, setYear] = useState<number>(props.year);
  const [month, setMonth] = useState<number>(() => {
    const givenMonth = props?.month;
    if (givenMonth != null) {
      return givenMonth;
    }

    const current = new Date();
    return current.getMonth();
  });
  const [dates, setDates] = useState<Date[]>([]);
  const weeks = useMemo<Date[][]>(
    () => getDatesPerWeek(dates, lastWeekDay),
    [dates, lastWeekDay],
  );
  const weekDayNames = useMemo<WeekDayName[]>(() => {
    const weekDayNameList = [...WEEK_DAY_NAME_LIST];
    while (weekDayNameList[0].day !== firstWeekDay) {
      weekDayNameList.push(...weekDayNameList.splice(0, 1));
    }
    return weekDayNameList;
  }, [firstWeekDay]);

  useEffect(() => {
    setDates(getDates(year, month));
  }, [year, month]);

  return {
    firstWeekDay,
    setFirstWeekDay,
    month,
    setMonth,
    year,
    setYear,
    dates,
    setDates,
    weeks,
    lastWeekDay,
    weekDayNames,
  };
};

export const MonthStyle = {
  root: {
    width: "100%",
  } as CSSProperties,
  monthLayout: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "6px",
    gridTemplateAreas: `
      "wk_d_0 wk_d_1 wk_d_2 wk_d_3 wk_d_4 wk_d_5 wk_d_6"  
      "wk_0_0 wk_0_1 wk_0_2 wk_0_3 wk_0_4 wk_0_5 wk_0_6"
      "wk_1_0 wk_1_1 wk_1_2 wk_1_3 wk_1_4 wk_1_5 wk_1_6"
      "wk_2_0 wk_2_1 wk_2_2 wk_2_3 wk_2_4 wk_2_5 wk_2_6"
      "wk_3_0 wk_3_1 wk_3_2 wk_3_3 wk_3_4 wk_3_5 wk_3_6"
      "wk_4_0 wk_4_1 wk_4_2 wk_4_3 wk_4_4 wk_4_5 wk_4_6"
      "wk_5_0 wk_5_1 wk_5_2 wk_5_3 wk_5_4 wk_5_5 wk_5_6"
    `,
  } as CSSProperties,
  day: (
    weekID: number,
    weekDay: number,
    isCurrentDay: boolean,
    size: number,
    hasBorder: boolean,
    isCircledd: boolean,
  ): CSSProperties => ({
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: isCircledd ? "50%" : undefined,
    outline: hasBorder ? "1px solid #eeeeee" : undefined,
    display: "grid",
    placeContent: "center",
    gridArea: `wk_${weekID}_${weekDay}`,
    color: isCurrentDay ? "white" : undefined,
    backgroundColor: isCurrentDay ? "cadetblue" : undefined,
  }),
  weekdayName: (day: number): CSSProperties => ({
    gridArea: `wk_d_${day}`,
    color: "darkgrey",
  }),
  monthName: {
    color: "white",
    backgroundColor: "cornflowerblue",
  } as CSSProperties,
  year: {
    color: "cornflowerblue",
    fontWeight: 700,
  } as CSSProperties,
};

export function Month(props: { month: number; year: number }) {
  const calendar = useCalendarFromContext();
  const monthState = useMonth({ month: props.month, year: props.year });
  const { currentDate, size, hasBorder, isCircled } = calendar;

  return (
    <div style={MonthStyle.root}>
      <div style={MonthStyle.year}>{monthState.year}</div>
      <div style={MonthStyle.monthName}>{getMonthName(monthState.month)}</div>
      <div style={MonthStyle.monthLayout}>
        {monthState.weekDayNames.map(({ name, n, day }) => (
          <div key={day} style={MonthStyle.weekdayName(day)}>
            {size < 34 ? n : name}
          </div>
        ))}
        {monthState.weeks.map((week, weekID) =>
          week
            .map((date) => ({
              day: date.getDate(),
              weekDay: date.getDay(),
              isCurrentDay: isSameDate(date, currentDate),
            }))
            .map(({ day, weekDay, isCurrentDay }) => (
              <div
                key={day}
                style={MonthStyle.day(
                  weekID,
                  weekDay,
                  isCurrentDay,
                  size,
                  hasBorder,
                  isCircled,
                )}
              >
                {day}
              </div>
            )),
        )}
      </div>
    </div>
  );
}
