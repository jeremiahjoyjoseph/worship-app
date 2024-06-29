import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "../pages";
import SubmitAvailability from "../pages/submitAvailability";
import SelectDates from "../pages/submitAvailability/pages/selectDates";
import ThankYou from "../pages/submitAvailability/pages/thankYou";

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
      <Route path="/thank-you" element={<ThankYou />} index />
    </Routes>
  );
};

export default AppRouter;
