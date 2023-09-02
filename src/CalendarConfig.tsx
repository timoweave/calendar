/* eslint-disable react-refresh/only-export-components */
import { CSSProperties } from "react";
import {
  CalendarState,
  MonthColumnCountEnum,
  useCalendarFromContext,
} from "./Calendar";
import { MONT_NAME_LIST } from "./Month";

export const openCalendarConfig = (config: CalendarState) => {
  const { configDialogRef } = config;
  configDialogRef.current?.showModal();
};

export const closeCalendarConfig = (config: CalendarState) => {
  const { configDialogRef } = config;
  configDialogRef.current?.close();
};

export interface MonthColumnCountItem {
  count: number;
  label: string;
}

export const MONTH_COLUMN_COUNT_ITEMS: MonthColumnCountItem[] = [
  { count: 1, label: "One" },
  { count: 2, label: "Two" },
  { count: 3, label: "Quarter" },
  { count: 4, label: "Semester" },
  { count: 6, label: "Half Year" },
  { count: 12, label: "Full Year" },
];

export const CalendarConfigStyle = {
  root: {
    border: "none",
    borderRadius: "8px",
    padding: "36px",
  },
  form: {
    display: "grid",
    gap: "16px",
    justifyItems: "start",
    gridTemplateAreas: `
    "first_year_label            first_year_input"
    "last_year_label             last_year_input"
    "month_column_count_label    month_column_count_select"
    "first_month_label           first_month_input"
    "last_month_label            last_month_input"
    "day_size_label              day_size_input"
    "has_border_label            has_border_input"
    "is_circle_label             is_circle_input"
    "empty                       close_dialog_button"
  `,
  } as CSSProperties,
};

export const CalendarConfig = () => {
  const config = useCalendarFromContext();
  const {
    configDialogRef,
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
    hasBorder,
    setHasBorder,
    isCircled,
    setIsCircled,
    monthColumnCount,
    setMonthColumnCount,
  } = config;

  return (
    <dialog ref={configDialogRef} style={CalendarConfigStyle.root}>
      <h2>Calendar Configuration</h2>
      <div style={CalendarConfigStyle.form}>
        <label style={{ gridArea: "first_year_label" }}>first year</label>
        <input
          style={{ gridArea: "first_year_input", width: "100%" }}
          type="number"
          max={lastYear}
          value={firstYear}
          onChange={(e) => setFirstYear(parseInt(e.target.value, 10))}
        ></input>

        <label style={{ gridArea: "last_year_label" }}>last year</label>
        <input
          style={{ gridArea: "last_year_input", width: "100%" }}
          type="number"
          min={firstYear}
          value={lastYear}
          onChange={(e) => setLastYear(parseInt(e.target.value, 10))}
        ></input>

        <label style={{ gridArea: "month_column_count_label" }}>
          Month Column Count
        </label>
        <select
          value={monthColumnCount}
          onChange={(e) =>
            setMonthColumnCount(
              parseInt(e.target.value, 10) as MonthColumnCountEnum,
            )
          }
          style={{ gridArea: "month_column_count_select", width: "100%" }}
        >
          {MONTH_COLUMN_COUNT_ITEMS.map(({ count, label }) => (
            <option key={count} value={count}>
              {label}
            </option>
          ))}
        </select>

        <label style={{ gridArea: "first_month_label" }}>first month</label>
        <select
          value={firstMonth}
          onChange={(e) => setFirstMonth(parseInt(e.target.value, 10))}
          style={{ gridArea: "first_month_input", width: "100%" }}
        >
          {MONT_NAME_LIST.map(({ month, name }) => (
            <option key={month} value={month}>
              {name}
            </option>
          ))}
        </select>

        <label style={{ gridArea: "last_month_label" }}>last month</label>
        <select
          value={lastMonth}
          onChange={(e) => setLastMonth(parseInt(e.target.value, 10))}
          style={{ gridArea: "last_month_input", width: "100%" }}
        >
          {MONT_NAME_LIST.map(({ month, name }) => (
            <option key={month} value={month}>
              {name}
            </option>
          ))}
        </select>

        <label style={{ gridArea: "day_size_label" }}>Day Size (px)</label>
        <input
          style={{ gridArea: "day_size_input", width: "100%" }}
          type="number"
          min="16"
          max="200"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value, 10))}
        ></input>

        <label style={{ gridArea: "has_border_label" }}>Day Has Border</label>
        <input
          style={{ gridArea: "has_border_input" }}
          type="checkbox"
          min="0"
          max="60"
          checked={hasBorder}
          onChange={() => setHasBorder((p) => !p)}
        ></input>

        <label style={{ gridArea: "is_circle_label" }}>Day Is Circled</label>
        <input
          style={{ gridArea: "is_circle_input" }}
          type="checkbox"
          min="0"
          max="60"
          checked={isCircled}
          onChange={() => setIsCircled((p) => !p)}
        ></input>

        <button
          style={{ gridArea: "close_dialog_button", width: "100%" }}
          onClick={() => closeCalendarConfig(config)}
          title="Close Config"
        >
          Close
        </button>
      </div>
    </dialog>
  );
};

export const CalendarConfigOpenButton = (props?: { title?: string }) => {
  const title = props?.title ?? "Calendar Configuration";
  const config = useCalendarFromContext();

  return (
    <button onClick={() => openCalendarConfig(config)} title="Open Config">
      {title}
    </button>
  );
};
