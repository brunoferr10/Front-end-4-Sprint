import { useEffect, useState } from "react";

type Atendimento = {
  cdAtendimento?: number;
  dsPaciente: string;
  dsGrauDePrioridade: string;
  dtDataDeAtendimento: string;
  idPaciente: number | string;
  cdAgendamento: number | string;
  nrCrm: number | string;
  cdEspecialidade: number | string;
};

type Paciente = { idPaciente: number; dsNome: string };
type Medico = { nrCrm: number; nmCompleto: string };

const GRAUS = ["Alta", "Média", "Baixa"];

const ESPECIALIDADES = [
  { id: 1, nome: "Clínico Geral" },
  { id: 2, nome: "Cardiologia" },
  { id: 3, nome: "Ortopedia" },
  { id: 4, nome: "Dermatologia" },
  { id: 5, nome: "Ginecologia" },
];

const AGENDAMENTOS = [
  { id: 23, descricao: "Consulta de Rotina" },
  { id: 24, descricao: "Consulta de Retorno" },
];

export default function AtendimentosPage() {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [carregandoPacientes, setCarregandoPacientes] = useState(false);
  const [carregandoMedicos, setCarregandoMedicos] = useState(false);
  const [form, setForm] = useState<Atendimento>({
    dsPaciente: "",
    dsGrauDePrioridade: "",
    dtDataDeAtendimento: "",
    idPaciente: "",
    cdAgendamento: "",
    nrCrm: "",
    cdEspecialidade: "",
  });
  const [editando, setEditando] = useState<number | null>(null);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [loading, setLoading] = useState(false);

  const API = "https://five66293.onrender.com";

 
  const loadPacientes = async () => {
    setCarregandoPacientes(true);
    try {
      const res = await fetch(`${API}/paciente`);
      if (res.ok) setPacientes(await res.json());
    } catch {
      console.warn("Erro ao carregar pacientes");
    } finally {
      setCarregandoPacientes(false);
    }
  };

  const loadMedicos = async () => {
    setCarregandoMedicos(true);
    try {
      const res = await fetch(`${API}/medico`);
      if (res.ok) setMedicos(await res.json());
    } catch {
      console.warn("Erro ao carregar médicos");
    } finally {
      setCarregandoMedicos(false);
    }
  };

  const loadAtendimentos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/atendimento`);
      if (res.ok) setAtendimentos(await res.json());
    } catch {
      alert("Erro ao carregar atendimentos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPacientes();
    loadMedicos();
  }, []);

  
  const handleChange = (e: any) => {
    let { name, value } = e.target;
    if (
      ["cdAgendamento", "cdEspecialidade", "idPaciente", "nrCrm"].includes(name) &&
      value !== ""
    ) {
      value = Number(value);
    }
    setForm({ ...form, [name]: value });
  };

  const handleSelectPaciente = (e: any) => {
    const id = Number(e.target.value);
    const p = pacientes.find((x) => x.idPaciente === id);
    setForm({
      ...form,
      idPaciente: id,
      dsPaciente: p ? p.dsNome : "",
    });
  };

  
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const method = editando ? "PUT" : "POST";
    const url = editando ? `${API}/atendimento/${editando}` : `${API}/atendimento`;

    const payload = {
      dsPaciente: String(form.dsPaciente || ""),
      dsGrauDePrioridade: String(form.dsGrauDePrioridade || ""),
      dtDataDeAtendimento: form.dtDataDeAtendimento.includes("T")
        ? form.dtDataDeAtendimento
        : `${form.dtDataDeAtendimento}T00:00:00`,
      idPaciente: Number(form.idPaciente) || 0,
      cdAgendamento: Number(form.cdAgendamento) || 0,
      nrCrm: Number(form.nrCrm) || 0,
      cdEspecialidade: Number(form.cdEspecialidade) || 0,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert(editando ? "Atendimento atualizado!" : "Atendimento cadastrado!");
        setForm({
          dsPaciente: "",
          dsGrauDePrioridade: "",
          dtDataDeAtendimento: "",
          idPaciente: "",
          cdAgendamento: "",
          nrCrm: "",
          cdEspecialidade: "",
        });
        setEditando(null);
        if (mostrarLista) loadAtendimentos();
      } else {
        alert("Erro ao salvar atendimento.");
      }
    } catch {
      alert("Erro de conexão com o servidor.");
    }
  };

  const handleEdit = (a: Atendimento) => {
    setForm(a);
    setEditando(a.cdAtendimento ?? null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm("Deseja realmente excluir este atendimento?")) return;

    try {
      const res = await fetch(`${API}/atendimento/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Atendimento excluído com sucesso.");
        loadAtendimentos();
      } else {
        alert("Erro ao excluir atendimento.");
      }
    } catch {
      alert("Erro de conexão com o servidor.");
    }
  };

  
  return (
    <main className="p-8 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-700">Atendimentos</h1>
        <button
          onClick={() => {
            setMostrarLista(!mostrarLista);
            if (!mostrarLista) loadAtendimentos();
          }}
          className="bg-blue-700 text-white px-4 py-2 rounded font-medium hover:bg-blue-800 transition"
        >
          {mostrarLista ? "Ocultar Lista" : "Listar Atendimentos"}
        </button>
      </div>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow flex flex-col gap-6 max-w-5xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Paciente */}
          <div>
            <label className="font-semibold text-gray-700 mb-1">Paciente</label>
            <select
              name="idPaciente"
              value={form.idPaciente}
              onChange={handleSelectPaciente}
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

          {/* Grau de Prioridade */}
          <div>
            <label className="font-semibold text-gray-700 mb-1">
              Grau de Prioridade
            </label>
            <select
              name="dsGrauDePrioridade"
              value={form.dsGrauDePrioridade}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none w-full"
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

          {/* Data */}
          <div>
            <label className="font-semibold text-gray-700 mb-1">
              Data do Atendimento
            </label>
            <input
              type="date"
              name="dtDataDeAtendimento"
              value={form.dtDataDeAtendimento}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none w-full"
              required
            />
          </div>

          {/* Agendamento */}
          <div>
            <label className="font-semibold text-gray-700 mb-1">
              Código do Agendamento
            </label>
            <select
              name="cdAgendamento"
              value={form.cdAgendamento}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none w-full"
              required
            >
              <option value="">Selecione...</option>
              {AGENDAMENTOS.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.descricao}
                </option>
              ))}
            </select>
          </div>

          {/* Médico */}
          <div>
            <label className="font-semibold text-gray-700 mb-1">Médico</label>
            <select
              name="nrCrm"
              value={form.nrCrm}
              onChange={handleChange}
              onClick={() => {
                if (!medicos.length && !carregandoMedicos) loadMedicos();
              }}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none w-full"
              required
            >
              {carregandoMedicos ? (
                <option value="">Carregando médicos...</option>
              ) : (
                <>
                  <option value="">Selecione o médico...</option>
                  {medicos.map((m) => (
                    <option key={m.nrCrm} value={m.nrCrm}>
                      {m.nmCompleto} (CRM {m.nrCrm})
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          {/* Especialidade */}
          <div>
            <label className="font-semibold text-gray-700 mb-1">
              Especialidade
            </label>
            <select
              name="cdEspecialidade"
              value={form.cdEspecialidade}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none w-full"
              required
            >
              <option value="">Selecione...</option>
              {ESPECIALIDADES.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nome}
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
          {editando ? "Atualizar Atendimento" : "Salvar Atendimento"}
        </button>
      </form>

      {/* Lista */}
      {mostrarLista && (
        <section className="bg-white rounded-2xl shadow p-6 max-w-5xl">
          {loading ? (
            <p>Carregando...</p>
          ) : atendimentos.length === 0 ? (
            <p>Nenhum atendimento encontrado.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border">Código</th>
                  <th className="p-3 border">Paciente</th>
                  <th className="p-3 border">Prioridade</th>
                  <th className="p-3 border">Data</th>
                  <th className="p-3 border">Agendamento</th>
                  <th className="p-3 border">CRM</th>
                  <th className="p-3 border">Especialidade</th>
                  <th className="p-3 border text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {atendimentos.map((a) => (
                  <tr key={a.cdAtendimento} className="hover:bg-gray-50">
                    <td className="border p-3">{a.cdAtendimento}</td>
                    <td className="border p-3">{a.dsPaciente}</td>
                    <td className="border p-3">{a.dsGrauDePrioridade}</td>
                    <td className="border p-3">
                      {new Date(a.dtDataDeAtendimento).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="border p-3">{a.cdAgendamento}</td>
                    <td className="border p-3">{a.nrCrm}</td>
                    <td className="border p-3">{a.cdEspecialidade}</td>
                    <td className="border p-3 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(a)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(a.cdAtendimento)}
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
