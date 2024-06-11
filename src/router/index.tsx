import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "../pages";
import SubmitAvailability from "../pages/submitAvailability/submitAvailability";

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} index />
      <Route
        path="/submit-availability/:rosterId"
        element={<SubmitAvailability />}
        index
      />
    </Routes>
  );
};

export default AppRouter;
