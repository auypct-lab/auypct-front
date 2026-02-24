import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import ActivitiesPage from "./pages/Activities/ActivitiesPage.jsx";
import ActivityDetail from "./pages/Activities/ActivityDetail.jsx";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import AdminActivities from "./pages/Admin/AdminActivities.jsx";
import AdminProtectedRoute from "./routes/AdminProtectedRoute.jsx";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/activities/:slug" element={<ActivityDetail />} />
          {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/activities"
          element={
            <AdminProtectedRoute>
              <AdminActivities />
            </AdminProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}


