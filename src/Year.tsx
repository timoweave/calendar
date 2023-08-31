/* eslint-disable react-refresh/only-export-components */
import { useMemo, useState, CSSProperties } from "react";
import { Month } from "./Month";

export const makeArray = (start: number, stop: number): number[] =>
  Array.from(Array(stop - start + 1).keys()).map((i) => start + i);

export const useYear = (props?: {
  year?: number;
  firstMonth?: number;
  lastMonth?: number;
}) => {
  const [year, setYear] = useState<number>(() => {
    if (props?.year != null) {
      return props.year;
    }
    const today = new Date();
    return today.getFullYear();
  });
  const [firstMonth, setFirstMonth] = useState<number>(() => {
    if (props?.firstMonth != null) {
      return props.firstMonth;
    }
    const today = new Date();
    return today.getMonth();
  });
  const [lastMonth, setLastMonth] = useState<number>(() => {
    if (props?.lastMonth != null) {
      return props.lastMonth;
    }
    const today = new Date();
    return today.getMonth() + 1;
  });
  const months = useMemo<number[]>(
    () => makeArray(firstMonth, lastMonth),
    [firstMonth, lastMonth],
  );

  return {
    year,
    setYear,
    firstMonth,
    setFirstMonth,
    lastMonth,
    setLastMonth,
    months,
  };
};

export const YearStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "16px",
} as CSSProperties;

export const Year = (props?: {
  year?: number;
  firstMonth?: number;
  lastMonth?: number;
}) => {
  const {
    year = undefined,
    firstMonth = undefined,
    lastMonth = undefined,
  } = props ?? {};

  const yearState = useYear({ year, firstMonth, lastMonth });

  return (
    <div style={YearStyle}>
      {yearState.months.map((month) => (
        <Month key={month} month={month} year={yearState.year} />
      ))}
    </div>
  );
};
