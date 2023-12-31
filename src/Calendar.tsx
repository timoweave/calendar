/* eslint-disable react-refresh/only-export-components */
import {
  CSSProperties,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Year } from "./Year";

export const getMonthLimit = (
  year: number,
  years: number[],
  firstMonth: number,
  lastMonth: number,
): [number, number] => {
  const first = year === years[0] ? firstMonth : 0;
  const last = year === years[years.length - 1] ? lastMonth : 11;
  return [first, last];
};

export const countMonths = (months: [number, number][]): number => {
  return months.reduce((total, [first, last]) => total + last - first + 1, 0);
};

export const getMonths = (year: number, calendar: CalendarState): number[] => {
  const { years, firstMonths, lastMonths } = calendar;
  const index = years.findIndex((y) => y === year);
  const firstMonth = firstMonths[index];
  const lastMonth = lastMonths[index];

  return Array.from({ length: lastMonth - firstMonth + 1 }).map(
    (_, i) => firstMonth + i,
  );
};

export type MonthColumnCountEnum = 1 | 2 | 3 | 4 | 6 | 12;

export interface CalendarState {
  configDialogRef: React.RefObject<HTMLDialogElement>;
  years: number[];
  firstYear: number;
  setFirstYear: React.Dispatch<React.SetStateAction<number>>;
  lastYear: number;
  setLastYear: React.Dispatch<React.SetStateAction<number>>;
  firstMonth: number;
  setFirstMonth: React.Dispatch<React.SetStateAction<number>>;
  lastMonth: number;
  setLastMonth: React.Dispatch<React.SetStateAction<number>>;
  size: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  months: [number, number][];
  monthCount: number;
  firstMonths: number[];
  lastMonths: number[];
  firstBlanks: number[];
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  hasBorder: boolean;
  setHasBorder: React.Dispatch<React.SetStateAction<boolean>>;
  isCircled: boolean;
  setIsCircled: React.Dispatch<React.SetStateAction<boolean>>;
  monthColumnCount: MonthColumnCountEnum;
  setMonthColumnCount: React.Dispatch<
    React.SetStateAction<MonthColumnCountEnum>
  >;
}

const CALENDAR_STATE_DEFAULT: CalendarState = {
  configDialogRef: { current: null },
  years: [],
  firstYear: 0,
  setFirstYear: () => {},
  lastYear: 0,
  setLastYear: () => {},
  firstMonth: 0,
  setFirstMonth: () => {},
  lastMonth: 0,
  setLastMonth: () => {},
  size: 0,
  setSize: () => {},
  months: [],
  monthCount: 0,
  firstMonths: [],
  lastMonths: [],
  firstBlanks: [],
  currentDate: new Date(),
  setCurrentDate: () => {},
  hasBorder: false,
  setHasBorder: () => {},
  isCircled: false,
  setIsCircled: () => {},
  monthColumnCount: 4,
  setMonthColumnCount: () => {},
};

export const useCalendar = (props?: Partial<CalendarState>): CalendarState => {
  const configDialogRef = useRef<HTMLDialogElement>(
    props?.configDialogRef?.current ?? null,
  );
  const [firstYear, setFirstYear] = useState<number>(
    props?.firstYear ?? new Date().getFullYear(),
  );
  const [lastYear, setLastYear] = useState<number>(
    props?.lastYear ?? new Date().getFullYear(),
  );
  const [firstMonth, setFirstMonth] = useState<number>(props?.firstMonth ?? 0);
  const [lastMonth, setLastMonth] = useState<number>(props?.lastMonth ?? 11);
  const [size, setSize] = useState<number>(30);
  const [hasBorder, setHasBorder] = useState<boolean>(true);
  const [isCircled, setIsCircled] = useState<boolean>(true);
  const [monthColumnCount, setMonthColumnCount] =
    useState<MonthColumnCountEnum>(4);

  const yearCount = useMemo(
    () => lastYear - firstYear + 1,
    [lastYear, firstYear],
  );
  const years = useMemo<number[]>(
    () => Array.from({ length: yearCount }).map((_, i) => firstYear + i),
    [firstYear, yearCount],
  );

  const firstMonths = useMemo<number[]>(
    () => years.map((_, i) => (i === 0 ? firstMonth : 0)),
    [firstMonth, years],
  );

  const lastMonths = useMemo<number[]>(
    () => years.map((_, i) => (i === years.length - 1 ? lastMonth : 11)),
    [lastMonth, years],
  );

  const months = useMemo<[number, number][]>(
    () =>
      years.map((year) => getMonthLimit(year, years, firstMonth, lastMonth)),
    [years, firstMonth, lastMonth],
  );

  const monthCount = useMemo<number>(
    () => months.reduce((total, [first, last]) => total + last - first + 1, 0),
    [months],
  );

  const firstBlanks = useMemo(
    () =>
      monthCount < monthColumnCount
        ? []
        : Array.from({ length: firstMonth % monthColumnCount }).map(
            (_, i) => i,
          ),
    [firstMonth, monthCount, monthColumnCount],
  );

  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  return {
    configDialogRef,
    years,
    firstYear,
    setFirstYear,
    lastYear,
    setLastYear,
    firstMonth,
    setFirstMonth,
    lastMonth,
    setLastMonth,
    size,
    setSize,
    months,
    monthCount,
    firstMonths,
    lastMonths,
    firstBlanks,
    currentDate,
    setCurrentDate,
    hasBorder,
    setHasBorder,
    isCircled,
    setIsCircled,
    monthColumnCount,
    setMonthColumnCount,
  };
};

export const CalendarStyle = {
  root: (monthCount: number, monthColumnCount: number): CSSProperties => {
    const repeat =
      monthCount >= monthColumnCount ? monthColumnCount : monthCount;

    return {
      display: "grid",
      gridTemplateColumns: `repeat(${repeat}, 1fr)`,
      gap: "16px",
    };
  },
};

export const Calendar = () => {
  const calendar = useCalendarFromContext();
  const { years, firstBlanks, monthCount, monthColumnCount } = calendar;

  return (
    <div style={CalendarStyle.root(monthCount, monthColumnCount)}>
      {firstBlanks.map((i) => (
        <div key={i} />
      ))}
      {years.map((year) => (
        <Year key={year} year={year} />
      ))}
    </div>
  );
};

export const CalendarContext = createContext<CalendarState>(
  CALENDAR_STATE_DEFAULT,
);

export const useCalendarFromContext = (): CalendarState =>
  useContext(CalendarContext);

export const CalendarProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const calendar = useCalendar();

  return (
    <CalendarContext.Provider value={calendar}>
      <>{children}</>
    </CalendarContext.Provider>
  );
};
