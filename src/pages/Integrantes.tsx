import IntegranteCard, { Integrante } from "@/components/IntegranteCard";
import Bruno from "@/assets/Bruno.jpeg";
import Gabriel from "@/assets/Gabriel.jpeg";
import Leonardo from "@/assets/Leonardo.jpeg";

const integrantes: Integrante[] = [
  {
    id: "bruno-ferreira",
    nome: "Bruno Ferreira",
    rm: "563489",
    turma: "1TDSR",
    img: Bruno,
    linkedin: "https://www.linkedin.com/in/bruno-ferreira-4837a0207",
  },
  {
    id: "gabriel-robertoni-padilha",
    nome: "Gabriel Robertoni Padilha",
    rm: "566293",
    turma: "1TDSR",
    img: Gabriel,
    linkedin: "https://www.linkedin.com/in/gabriel-robertoni-a15885322",
  },
  {
    id: "leonardo-aragaki-rodrigues",
    nome: "Leonardo Aragaki Rodrigues",
    rm: "562944",
    turma: "1TDSR",
    img: Leonardo,
    linkedin: "https://br.linkedin.com/in/leonardo-aragaki-rodrigues-066a5aa1",
  },
];

export default function Integrantes() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-brand-blue mb-6 text-center">Nosso Time</h2>
      <p className="max-w-2xl mx-auto text-center text-gray-700">
        Somos alunos da FIAP dedicados a melhorar a inclusão digital na saúde. Conheça nossa equipe:
      </p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {integrantes.map((i) => (
          <IntegranteCard key={i.id} data={i} />
        ))}
      </div>
    </section>
  );
}

export { integrantes };
