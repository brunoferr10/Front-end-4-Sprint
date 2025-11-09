import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";


import Header from "./components/Header";
import Footer from "./components/Footer";


import Home from "./pages/Home";
import Integrantes from "./pages/Integrantes";
import IntegranteDetalhe from "./pages/IntegranteDetalhe";
import FAQ from "./pages/FAQ";
import Projeto from "./pages/Projeto";
import Contato from "./pages/Contato";
import LoginPage from "./pages/login/page";


import LayoutPainel from "./pages/painel/layoutPainel";
import Pacientes from "./pages/painel/pacientes/page";
import Medicos from "./pages/painel/medicos/page";
import Consultas from "./pages/painel/consultas/page";
import Atendimentos from "./pages/painel/atendimentos/page";
import Acompanhantes from "./pages/painel/acompanhantes/page";
import Acompanhamentos from "./pages/painel/acompanhamentos/page";
import Especialidades from "./pages/painel/especialidades/page";
import Remedios from "./pages/painel/remedios/page";
import Feedback from "./pages/painel/feedback/page";
import HomePainel from "./pages/painel/HomePainel";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  
  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Home - Invox",
      "/integrantes": "Quem Somos - Invox",
      "/faq": "FAQ - Invox",
      "/projeto": "Projeto - Invox",
      "/contato": "Contato - Invox",
      "/login": "Login - Invox",
    };
    document.title = titles[location.pathname] || "Invox";
  }, [location.pathname]);

  
  const handleLogoClick = () => navigate("/");

  
  const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
    const usuario = localStorage.getItem("usuario");
    return usuario ? element : <LoginPage />;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header e Footer só nas páginas públicas */}
      {!location.pathname.startsWith("/painel") && (
        <Header onLogoClick={handleLogoClick} />
      )}

      <main className="flex-1">
        <Routes>
          {/* 🏠 Páginas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/integrantes" element={<Integrantes />} />
          <Route path="/integrantes/:id" element={<IntegranteDetalhe />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/projeto" element={<Projeto />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/login" element={<LoginPage />} />

          {/* 🔐 Painel protegido */}
          <Route
            path="/painel"
            element={<ProtectedRoute element={<LayoutPainel />} />}
          >
            {/* 👇 Tela inicial do painel com o logo */}
            <Route index element={<HomePainel />} />
            <Route path="pacientes" element={<Pacientes />} />
            <Route path="medicos" element={<Medicos />} />
            <Route path="consultas" element={<Consultas />} />
            <Route path="atendimentos" element={<Atendimentos />} />
            <Route path="acompanhantes" element={<Acompanhantes />} />
            <Route path="acompanhamentos" element={<Acompanhamentos />} />
            <Route path="especialidades" element={<Especialidades />} />
            <Route path="remedios" element={<Remedios />} />
            <Route path="feedback" element={<Feedback />} />
          </Route>

          {/* 🚫 Página 404 */}
          <Route
            path="*"
            element={
              <div className="p-8 text-center text-gray-600">
                Página não encontrada.
              </div>
            }
          />
        </Routes>
      </main>

      {!location.pathname.startsWith("/painel") && <Footer />}
    </div>
  );
}
