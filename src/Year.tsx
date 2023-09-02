/* eslint-disable react-refresh/only-export-components */
import { Month } from "./Month";
import { getMonths, useCalendarFromContext } from "./Calendar";

export const Year = (props: { year: number }) => {
  const { year } = props;
  const calendar = useCalendarFromContext();
  const months = getMonths(year, calendar);

  return (
    <>
      {months.map((month) => (
        <Month key={month} month={month} year={year} />
      ))}
    </>
  );
};
