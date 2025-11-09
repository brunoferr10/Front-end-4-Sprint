import { useEffect, useState } from "react";

type Feedback = {
  cdFeedback?: number;
  dsProntuario?: string;
  dtEnvio?: string;
  dsReferencia: string;
  dsComentario: string;
  dsAvaliacao: string;
  cdAtendimento?: number;
  idPaciente?: number | string;
  nrCrm?: number;
  cdEspecialidade?: number;
};

type Paciente = { idPaciente: number; dsNome: string };

const REFERENCIAS_OPCOES = [
  "Consulta de rotina",
  "Retorno",
  "Emergencial",
  "Avaliação inicial",
];

const AVALIACOES_OPCOES = ["Ótimo", "Bom", "Regular", "Ruim"];

export default function FeedbacksPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [carregandoPacientes, setCarregandoPacientes] = useState(false);
  const [form, setForm] = useState<Feedback>({
    idPaciente: "",
    dsReferencia: "",
    dsComentario: "",
    dsAvaliacao: "",
  });
  const [editando, setEditando] = useState<number | null>(null);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [loading, setLoading] = useState(false);

  const API = "https://five66293.onrender.com";

  
  const loadPacientes = async () => {
    setCarregandoPacientes(true);
    try {
      const res = await fetch(`${API}/paciente`);
      if (res.ok) {
        const data = await res.json();
        setPacientes(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.warn("Erro ao carregar pacientes:", err);
    } finally {
      setCarregandoPacientes(false);
    }
  };

  
  const loadFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/feedback`);
      if (res.ok) {
        const data = await res.json();
        setFeedbacks(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.warn("Erro ao carregar feedbacks:", err);
      setFeedbacks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPacientes();
  }, []);

  useEffect(() => {
    if (mostrarLista) loadFeedbacks();
  }, [mostrarLista]);

  
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.idPaciente) {
      alert("Selecione um paciente antes de salvar.");
      return;
    }

    if (!form.dsReferencia || !form.dsComentario || !form.dsAvaliacao) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const method = editando ? "PUT" : "POST";
    const url = editando ? `${API}/feedback/${editando}` : `${API}/feedback`;

    const payload: Feedback = {
      ...form,
      idPaciente: Number(form.idPaciente),
      dsProntuario: "Consulta de rotina clínica geral",
      dtEnvio: new Date().toLocaleDateString("en-CA"),
      cdAtendimento: 79,
      nrCrm: 2,
      cdEspecialidade: 1,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert(
          editando
            ? "Feedback atualizado com sucesso!"
            : "Feedback cadastrado com sucesso!"
        );
        setForm({
          idPaciente: "",
          dsReferencia: "",
          dsComentario: "",
          dsAvaliacao: "",
        });
        setEditando(null);
        loadFeedbacks();
      } else {
        alert("Erro ao salvar feedback. Verifique os dados e tente novamente.");
      }
    } catch (error) {
      alert("Erro de conexão com o servidor.");
    }
  };


  const handleEdit = (f: Feedback) => {
    setForm({
      idPaciente: f.idPaciente,
      dsReferencia: f.dsReferencia,
      dsComentario: f.dsComentario,
      dsAvaliacao: f.dsAvaliacao,
    });
    setEditando(f.cdFeedback ?? null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  
  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm("Deseja realmente excluir este feedback?")) return;

    try {
      const res = await fetch(`${API}/feedback/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Feedback excluído com sucesso.");
        loadFeedbacks();
      } else {
        alert("Erro ao excluir feedback.");
      }
    } catch {
      alert("Erro de conexão com o servidor.");
    }
  };

 
  return (
    <main className="p-8 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-700">Feedbacks</h1>

        <button
          onClick={() => {
            setMostrarLista(!mostrarLista);
            if (!mostrarLista) loadFeedbacks();
          }}
          className="bg-blue-700 text-white px-4 py-2 rounded font-medium hover:bg-blue-800 transition"
        >
          {mostrarLista ? "Ocultar Lista" : "Listar Feedbacks"}
        </button>
      </div>

      {/* 🔹 Formulário */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow flex flex-col gap-6 max-w-4xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Paciente */}
          <div>
            <label className="font-semibold text-gray-700 mb-1">Paciente</label>
            <select
              name="idPaciente"
              value={form.idPaciente}
              onChange={handleChange}
              onClick={() => {
                if (!pacientes.length && !carregandoPacientes) loadPacientes();
              }}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none w-full"
              required
            >
              {carregandoPacientes ? (
                <option value="">Carregando pacientes...</option>
              ) : (
                <>
                  <option value="">Selecione o paciente...</option>
                  {pacientes.map((p) => (
                    <option key={p.idPaciente} value={p.idPaciente}>
                      {p.dsNome}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          {/* Avaliação */}
          <div>
            <label className="font-semibold text-gray-700 mb-1">Avaliação</label>
            <select
              name="dsAvaliacao"
              value={form.dsAvaliacao}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none w-full"
              required
            >
              <option value="">Selecione...</option>
              {AVALIACOES_OPCOES.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          {/* Referência */}
          <div>
            <label className="font-semibold text-gray-700 mb-1">Referência</label>
            <select
              name="dsReferencia"
              value={form.dsReferencia}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none w-full"
              required
            >
              <option value="">Selecione...</option>
              {REFERENCIAS_OPCOES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Comentário */}
          <div className="md:col-span-3">
            <label className="font-semibold text-gray-700 mb-1">Comentário</label>
            <textarea
              name="dsComentario"
              value={form.dsComentario}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none w-full"
              rows={3}
              required
            />
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
          {editando ? "Atualizar Feedback" : "Salvar Feedback"}
        </button>
      </form>

      {/* 🔹 Lista */}
      {mostrarLista && (
        <section className="bg-white rounded-2xl shadow p-6 max-w-4xl">
          {loading ? (
            <p>Carregando...</p>
          ) : feedbacks.length === 0 ? (
            <p className="text-gray-600 text-center py-4">
              Nenhum feedback encontrado.
            </p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border">Código</th>
                  <th className="p-3 border">Paciente</th>
                  <th className="p-3 border">Avaliação</th>
                  <th className="p-3 border">Referência</th>
                  <th className="p-3 border">Comentário</th>
                  <th className="p-3 border text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((f) => {
                  const nomePaciente =
                    pacientes.find((p) => p.idPaciente === f.idPaciente)?.dsNome ||
                    `Paciente ${f.idPaciente}`;
                  return (
                    <tr key={f.cdFeedback} className="hover:bg-gray-50">
                      <td className="border p-3">{f.cdFeedback}</td>
                      <td className="border p-3">{nomePaciente}</td>
                      <td className="border p-3">{f.dsAvaliacao}</td>
                      <td className="border p-3">{f.dsReferencia}</td>
                      <td className="border p-3">{f.dsComentario}</td>
                      <td className="border p-3 text-center space-x-2">
                        <button
                          onClick={() => handleEdit(f)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(f.cdFeedback)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>
      )}
    </main>
  );
}
