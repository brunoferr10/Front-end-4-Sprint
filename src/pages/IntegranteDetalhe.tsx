import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Integrante } from "@/components/IntegranteCard";

export default function IntegranteDetalhe() {
  const { id } = useParams<{ id: string }>();
  const [integrante, setIntegrante] = useState<Integrante | null>(null);


  const integrantes: Integrante[] = [
    { id: "1", nome: "Gabriel", rm: "12345", turma: "1TDSR", img: "/src/assets/Gabriel.jpeg", linkedin: "https://linkedin.com" },
    { id: "2", nome: "Bruno", rm: "67890", turma: "1TDSR", img: "/src/assets/Bruno.jpeg", linkedin: "https://linkedin.com" },
    { id: "3", nome: "Lucas", rm: "11121", turma: "1TDSR", img: "/src/assets/Lucas.jpeg", linkedin: "https://linkedin.com" },
  ];

  useEffect(() => {
    if (id) {
      const found = integrantes.find((item) => item.id === id);
      setIntegrante(found || null);
    }
  }, [id]);

  if (!integrante) {
    return <p className="text-center mt-10 text-gray-600">Integrante não encontrado.</p>;
  }

  return (
    <section className="max-w-2xl mx-auto px-6 py-12 text-center">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <img
          src={integrante.img}
          alt={integrante.nome}
          className="w-40 h-40 object-cover rounded-full mx-auto border-4 border-brand-blue mb-6"
        />
        <h2 className="text-3xl font-bold text-gray-800">{integrante.nome}</h2>
        <p className="text-gray-600 mt-2">RM: {integrante.rm}</p>
        <p className="text-gray-600">Turma: {integrante.turma}</p>

        {integrante.linkedin && (
          <a
            href={integrante.linkedin}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block px-5 py-2 rounded-lg bg-brand-blue text-white hover:bg-blue-700 transition"
          >
            LinkedIn
          </a>
        )}
      </div>
    </section>
  );
}
