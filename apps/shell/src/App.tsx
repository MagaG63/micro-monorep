import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Spinner } from "@sms/ui";
import { Header } from "./components/Header";

// Ленивая загрузка удалённых модулей через Module Federation
const AdminApp = lazy(() => import("admin/App"));
const DashboardApp = lazy(() => import("dashboard/App"));
const ProfileApp = lazy(() => import("profile/App"));

// Главная страница shell
const Home = () => (
  <div className="home">
    <h1>SMS Platform</h1>
    <p>Микрофронтенд-платформа на Module Federation</p>
    <div className="home__links">
      <Link to="/admin" className="home__link">
        <span>🔧</span>
        <strong>Админ-панель</strong>
        <small>/admin</small>
      </Link>
      <Link to="/dashboard" className="home__link">
        <span>📊</span>
        <strong>Дашборд</strong>
        <small>/dashboard</small>
      </Link>
      <Link to="/profile" className="home__link">
        <span>👤</span>
        <strong>Профиль</strong>
        <small>/profile</small>
      </Link>
    </div>
  </div>
);

export const App = () => {
  return (
    // basename = BASE_URL: на GitHub Pages это '/<repo>/', локально '/'
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="app">
        <Header />
        <main className="app__content">
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin/*" element={<AdminApp />} />
              <Route path="/dashboard/*" element={<DashboardApp />} />
              <Route path="/profile/*" element={<ProfileApp />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
};
