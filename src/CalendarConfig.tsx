/* eslint-disable react-refresh/only-export-components */
import { CSSProperties, useEffect } from "react";
import { CalendarState, useCalendarFromContext } from "./Calendar";

export const openCalendarConfig = (config: CalendarState) => {
  const { configDialogRef } = config;
  configDialogRef.current?.showModal();
};

export const closeCalendarConfig = (config: CalendarState) => {
  const { configDialogRef } = config;
  configDialogRef.current?.close();
};

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
    "first_year_label      first_year_input"
    "last_year_label       last_year_input"
    "first_month_label     first_month_input"
    "last_month_label      last_month_input"
    "empty                 close_dialog_button"
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
  } = config;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => openCalendarConfig(config), []); // TDB: testing

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

        <label style={{ gridArea: "first_month_label" }}>first month</label>
        <input
          style={{ gridArea: "first_month_input", width: "100%" }}
          type="number"
          min="0"
          max="11"
          value={firstMonth}
          onChange={(e) => setFirstMonth(parseInt(e.target.value, 10))}
        ></input>

        <label style={{ gridArea: "last_month_label" }}>last month</label>
        <input
          style={{ gridArea: "last_month_input", width: "100%" }}
          type="number"
          min="0"
          max="11"
          value={lastMonth}
          onChange={(e) => setLastMonth(parseInt(e.target.value, 10))}
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
