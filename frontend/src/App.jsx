import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ChatRoom from "./components/ChatRoom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  
 const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? "/chat" : "/login"} />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatRoom />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App