import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutPainel from "./layoutPainel";

export default function PainelPage() {
  const navigate = useNavigate();
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
      navigate("/login");
    } else {
      setVerificando(false);
    }
  }, [navigate]);

  if (verificando) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Verificando sessão...
      </div>
    );
  }

  return <LayoutPainel />;
}
