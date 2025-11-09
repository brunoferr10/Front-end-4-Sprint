import { useEffect, useState } from "react";

type Especialidade = {
  cdEspecialidade?: number;
  dsSegmento: string;
  dsTurno: string;
  dsGrauDePrioridade: string;
};

const TURNOS = ["Manhã", "Tarde", "Noite"];
const GRAUS = ["Alta", "Média", "Baixa"];

export default function EspecialidadesPage() {
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
  const [form, setForm] = useState<Especialidade>({
    dsSegmento: "",
    dsTurno: "",
    dsGrauDePrioridade: "",
  });
  const [editando, setEditando] = useState<number | null>(null);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [loading, setLoading] = useState(false);

  const API = "https://five66293.onrender.com";

  
  const loadEspecialidades = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/especialidade`);
      if (!res.ok) throw new Error("Erro ao carregar especialidades");
      const data = await res.json();
      setEspecialidades(data);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar especialidades.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEspecialidades();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const method = editando ? "PUT" : "POST";
    const url = editando
      ? `${API}/especialidade/${editando}`
      : `${API}/especialidade`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert(editando ? "Especialidade atualizada!" : "Especialidade cadastrada!");
        setForm({ dsSegmento: "", dsTurno: "", dsGrauDePrioridade: "" });
        setEditando(null);
        loadEspecialidades();
      } else {
        alert("Erro ao salvar especialidade.");
      }
    } catch {
      alert("Erro de conexão com o servidor.");
    }
  };

  const handleEdit = (e: Especialidade) => {
    setForm(e);
    setEditando(e.cdEspecialidade ?? null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm("Deseja excluir esta especialidade?")) return;

    try {
      const res = await fetch(`${API}/especialidade/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Especialidade excluída com sucesso.");
        loadEspecialidades();
      } else {
        alert("Erro ao excluir especialidade.");
      }
    } catch {
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <main className="p-8 flex flex-col gap-8">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-700">Especialidades</h1>

        <button
          onClick={() => {
            setMostrarLista(!mostrarLista);
            if (!mostrarLista) loadEspecialidades();
          }}
          className="bg-blue-700 text-white px-4 py-2 rounded font-medium hover:bg-blue-800 transition"
        >
          {mostrarLista ? "Ocultar Lista" : "Listar Especialidades"}
        </button>
      </div>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow flex flex-col gap-6 max-w-5xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Segmento */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Segmento</label>
            <input
              name="dsSegmento"
              placeholder="Digite o nome da especialidade"
              value={form.dsSegmento}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Turno */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Turno</label>
            <select
              name="dsTurno"
              value={form.dsTurno}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Selecione o turno...</option>
              {TURNOS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Grau de Prioridade */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">
              Grau de Prioridade
            </label>
            <select
              name="dsGrauDePrioridade"
              value={form.dsGrauDePrioridade}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Selecione...</option>
              {GRAUS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full text-white font-bold py-3 rounded-lg mt-4 transition ${
            editando
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {editando ? "Atualizar Especialidade" : "Salvar Especialidade"}
        </button>
      </form>

      {/* Lista */}
      {mostrarLista && (
        <section className="bg-white rounded-2xl shadow p-6 max-w-5xl">
          {loading ? (
            <p>Carregando...</p>
          ) : especialidades.length === 0 ? (
            <p>Nenhuma especialidade encontrada.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border">Código</th>
                  <th className="p-3 border">Segmento</th>
                  <th className="p-3 border">Turno</th>
                  <th className="p-3 border">Prioridade</th>
                  <th className="p-3 border text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {especialidades.map((e) => (
                  <tr key={e.cdEspecialidade} className="hover:bg-gray-50">
                    <td className="border p-3">{e.cdEspecialidade}</td>
                    <td className="border p-3">{e.dsSegmento}</td>
                    <td className="border p-3">{e.dsTurno}</td>
                    <td className="border p-3">{e.dsGrauDePrioridade}</td>
                    <td className="border p-3 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(e)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(e.cdEspecialidade)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}
    </main>
  );
}
