/* eslint-disable react-refresh/only-export-components */
import { Calendar, CalendarProvider } from "./Calendar";
import { CalendarConfig, CalendarConfigOpenButton } from "./CalendarConfig";

import "./App.css";

export function App() {
  return (
    <CalendarProvider>
      <CalendarConfigOpenButton title="Calendar" />
      <Calendar />
      <CalendarConfig />
    </CalendarProvider>
  );
}
