import { Routes, Route } from "react-router-dom";
import "./App.css";
import { HomePage, Login, Register, Dashboard } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<>Not found</>} />
    </Routes>
  );
}

export default App;
