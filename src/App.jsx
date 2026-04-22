import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import ActivitiesPage from "./pages/Activities/ActivitiesPage.jsx";
import ActivityDetail from "./pages/Activities/ActivityDetail.jsx";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import AdminActivities from "./pages/Admin/AdminActivities.jsx";
import AdminCourses from "./pages/Admin/AdminCourses.jsx";
import CoursesPage from "./pages/Courses/CoursesPage.jsx";
import CourseDetail from "./pages/Courses/CourseDetail.jsx";
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
        <Route
          path="/admin/courses"
          element={
            <AdminProtectedRoute>
              <AdminCourses />
            </AdminProtectedRoute>
          }
        />

        {/* Courses */}
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* ✅ NOTE Section (shows on ALL pages) */}
      <section className="siteNote">
        <div className="siteNote__inner">
          <p>
            *Note:Data recorded from the beginning of the current year. Manually compiled;
            minor human errors may occur.
          </p>
        </div>
      </section>

      {/* ✅ Footer on ALL pages */}

    </BrowserRouter>
  );
}

