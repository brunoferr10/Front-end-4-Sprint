import { Link, useLocation, useNavigate } from "react-router-dom";

type HeaderProps = {
  onLogoClick?: () => void;
};

export default function Header({ onLogoClick }: HeaderProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const link = (to: string, label: string) => (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-semibold hover:underline ${
        pathname === to ? "underline" : ""
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="bg-brand-blue text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row gap-3 sm:gap-6 items-center justify-between">
        {/* LOGO */}
        <h1
          onClick={onLogoClick}
          className="text-3xl font-bold cursor-pointer select-none"
        >
          Invox
        </h1>

        {/* MENU DE NAVEGAÇÃO */}
        <div className="flex items-center gap-4 flex-wrap">
          <nav className="flex flex-wrap items-center gap-2">
            {link("/", "Home")}
            {link("/integrantes", "Quem Somos")}
            {link("/faq", "FAQ")}
            {link("/projeto", "Projeto")}
            {link("/contato", "Contato")}
          </nav>

          {/* BOTÃO DE LOGIN DESTACADO */}
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-brand-blue font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition border border-transparent hover:border-blue-800"
          >
            Login
          </button>
        </div>
      </div>
    </header>
  );
}
