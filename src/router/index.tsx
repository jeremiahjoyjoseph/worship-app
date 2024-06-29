import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "../pages";
import SubmitAvailability from "../pages/submitAvailability";
import SelectDates from "../pages/submitAvailability/pages/selectDates";

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} index />
      <Route
        path="/submit-availability/:rosterId"
        element={<SubmitAvailability />}
        index
      />
      <Route
        path="/select-dates/:rosterId/:userId"
        element={<SelectDates />}
        index
      />
    </Routes>
  );
};

export default AppRouter;
