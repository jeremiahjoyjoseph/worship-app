import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "../pages";
import SubmitAvailability from "../pages/submitAvailability";
import SelectDates from "../pages/submitAvailability/pages/selectDates";
import ThankYou from "../pages/submitAvailability/pages/thankYou";
import CreateRoster from "../pages/createRoster";

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} index />

      <Route path="/create/roster" element={<CreateRoster />} index />

      <Route
        path="/submit/availability/:rosterId"
        element={<SubmitAvailability />}
        index
      />
      <Route
        path="/submit/dates/:rosterId/:userId"
        element={<SelectDates />}
        index
      />
      <Route path="/submit/thank-you" element={<ThankYou />} index />
    </Routes>
  );
};

export default AppRouter;
