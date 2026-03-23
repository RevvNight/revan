import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginHub from "./pages/LoginHub";
import ChatHub from "./pages/ChatHub";

const isLoggedIn = () => !!localStorage.getItem("userToken");

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login-hub" element={<LoginHub />} />
        <Route
          path="/chat-hub"
          element={isLoggedIn() ? <ChatHub /> : <Navigate to="/login-hub" />}
        />
        <Route path="*" element={<Navigate to="/login-hub" />} />
      </Routes>
    </BrowserRouter>
  );
    }
