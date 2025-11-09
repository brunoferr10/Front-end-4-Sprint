export type Integrante = {
  id: string;
  nome: string;
  rm: string;
  turma: string;
  img: string;
  linkedin?: string;
};

export default function IntegranteCard({ data }: { data: Integrante }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
      <img
        src={data.img}
        alt={data.nome}
        className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-brand-blue"
      />
      <h3 className="text-xl font-bold text-gray-800">{data.nome}</h3>
      <p className="text-sm text-gray-600">RM: {data.rm}</p>
      <p className="text-sm text-gray-600 mb-3">Turma: {data.turma}</p>
      {data.linkedin && (
        <a
          href={data.linkedin}
          target="_blank"
          className="inline-block px-4 py-2 rounded-lg bg-brand-blue text-white hover:bg-blue-700 transition"
        >
          LinkedIn
        </a>
      )}
    </div>
  );
}
