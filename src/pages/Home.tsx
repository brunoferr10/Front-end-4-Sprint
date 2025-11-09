import { useState, useEffect } from "react";
import Tecnologia from "@/assets/tecnologia.jpeg";

import PieChartIcon from "@/assets/icons/pie-chart.png";
import EditIcon from "@/assets/icons/edit.png";
import ComboChartIcon from "@/assets/icons/combo-chart--v1.png";

export default function Home() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("Página Home carregada!");
    window.scrollTo(0, 0); 
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <section className="max-w-7xl mx-auto px-6 py-20">
        {}
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-brand-blue drop-shadow-sm">
            Bem-vindo à Invox!
          </h2>
          <p className="text-gray-700 mt-4 text-xl">
            Desenvolvimento de Software
          </p>

          <button
            onClick={() => setOpen(!open)}
            className="mt-8 px-8 py-3 rounded-full bg-brand-blue text-white font-semibold hover:bg-blue-700 transition shadow-md"
          >
            {open ? "Fechar" : "Sobre a Invox"}
          </button>

          {open && (
            <div className="bg-white border border-violet-200 p-10 rounded-3xl mt-10 shadow-xl max-w-3xl mx-auto text-left">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Sobre a Invox
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  A Invox é uma empresa dedicada ao desenvolvimento de software,
                  com o objetivo de transformar desafios em soluções digitais
                  eficientes, intuitivas e inovadoras.
                </p>
                <p>
                  Criamos softwares sob medida, aplicativos e plataformas web
                  utilizando metodologias ágeis.
                </p>
                <p>
                  Contamos com uma equipe multidisciplinar, criativa e
                  comprometida.
                </p>
                <p>
                  Estamos prontos para desenvolver a solução ideal para você.
                </p>
              </div>
            </div>
          )}
        </div>

        {}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-20">
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="bg-brand-blue/10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
              <img
                src={PieChartIcon}
                alt="Ícone suporte"
                className="h-10 w-10"
              />
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-2">
              SUPORTE HUMANIZADO
            </h3>
            <p className="text-gray-600">
              Suporte técnico rápido e exclusivo via WhatsApp, e-mail, telefone
              e mais.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-10 text-center hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="bg-brand-blue/10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
              <img
                src={EditIcon}
                alt="Ícone engenharia"
                className="h-10 w-10"
              />
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-2">ENGENHARIA</h3>
            <p className="text-gray-600">
              Desenvolvimento completo de software com equipe própria.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-10 text-center hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="bg-brand-blue/10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
              <img
                src={ComboChartIcon}
                alt="Ícone custo"
                className="h-10 w-10"
              />
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-2">
              CUSTO BENEFÍCIO
            </h3>
            <p className="text-gray-600">
              Preços justos e qualidade que fazem da Invox a escolha certa para
              seu negócio.
            </p>
          </div>
        </div>

        {}
        <div className="mt-24">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <img
              src={Tecnologia}
              alt="Tecnologia"
              className="w-full h-80 object-cover"
            />
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Nossa Base é Tecnologia
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Inovação, qualidade e performance são os pilares que guiam a
                Invox. Estamos sempre atualizados com as mais modernas
                tecnologias do mercado.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
