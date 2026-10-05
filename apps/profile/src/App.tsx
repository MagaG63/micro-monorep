import { Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import "./styles.css";

// Profile — корневой компонент микрофронтенда.
// Экспортируется через Module Federation (./App) и загружается в shell.
// Маршруты относительные: в shell живут под /profile/*, standalone — от корня.
export function ProfileApp() {
  return (
    <Routes>
      <Route index element={<ProfilePage />} />
    </Routes>
  );
}

// Default export — для Module Federation
export default ProfileApp;
