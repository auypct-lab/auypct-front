import { Navigate } from "react-router-dom";
import { isAuthed } from "../utils/adminAuth";

export default function AdminProtectedRoute({ children }) {
  if (!isAuthed()) return <Navigate to="/admin/login" replace />;
  return children;
}