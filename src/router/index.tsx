import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "../pages";

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} index />
    </Routes>
  );
};

export default AppRouter;
