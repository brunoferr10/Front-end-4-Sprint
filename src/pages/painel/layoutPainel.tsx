import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import {
  Users,
  CalendarDays,
  Stethoscope,
  ClipboardList,
  UserPlus,
  Activity,
  Pill,
  MessageSquareText,
  LogOut,
} from "lucide-react";

export default function LayoutPainel() {
  const [sidebarAberta, setSidebarAberta] = useState(true);

  const links = [
    { to: "/painel/pacientes", label: "Pacientes", icon: <Users size={18} /> },
    { to: "/painel/medicos", label: "Médicos", icon: <Stethoscope size={18} /> },
    { to: "/painel/consultas", label: "Consultas", icon: <CalendarDays size={18} /> },
    {
      to: "/painel/atendimentos",
      label: "Atendimentos",
      icon: <ClipboardList size={18} />,
    },
    {
      to: "/painel/acompanhantes",
      label: "Acompanhantes",
      icon: <UserPlus size={18} />,
    },
    {
      to: "/painel/acompanhamentos",
      label: "Acompanhamentos",
      icon: <Activity size={18} />,
    },
    { to: "/painel/remedios", label: "Remédios", icon: <Pill size={18} /> },
    {
      to: "/painel/especialidades",
      label: "Especialidades",
      icon: <ClipboardList size={18} />,
    },
    {
      to: "/painel/feedback",
      label: "Feedback",
      icon: <MessageSquareText size={18} />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside
        className={`bg-brand-blue text-white flex flex-col transition-all duration-300 ${
          sidebarAberta ? "w-64" : "w-16"
        }`}
      >
        <button
          onClick={() => setSidebarAberta((v) => !v)}
          className="p-4 text-sm font-semibold hover:bg-brand-blue/80 text-left"
        >
          {sidebarAberta ? "Fechar" : "Menu"}
        </button>

        <nav className="flex-1 px-2 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/10 ${
                  isActive ? "bg-white/20" : ""
                }`
              }
            >
              {link.icon}
              {sidebarAberta && <span>{link.label}</span>}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="m-3 flex items-center gap-2 justify-center rounded-lg bg-red-600 py-2 text-sm font-semibold hover:bg-red-700"
        >
          <LogOut size={16} />
          {sidebarAberta && <span>Sair</span>}
        </button>
      </aside>

      {/* CONTEÚDO DO PAINEL */}
      <section className="flex-1 overflow-y-auto">
       <div className="h-full w-full">
         <Outlet />
       </div>
      </section>
    </div>
  );
}
