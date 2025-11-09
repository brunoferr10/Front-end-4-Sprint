import { useEffect, useState } from "react";

type Consulta = {
  cdAgendamento?: number;
  dsProntuario: string;
  dtHoraConsulta: string;
  dsStatusAgendamento: string;
  cdAtendimento: number | string;
  idPaciente: number | string;
  nrCrm: number | string;
  cdEspecialidade: number | string;
};

type Paciente = { idPaciente: number; dsNome: string };
type Medico = { nrCrm: number; nmCompleto: string };

const PRONTUARIOS_PADRAO = [
  "Retorno",
  "Primeira consulta",
  "Avaliação de rotina",
  "Pós-operatório",
  "Encaminhamento de especialista",
];

const ESPECIALIDADES_PADRAO = [
  { value: 1, label: "Clínico Geral" },
  { value: 2, label: "Cardiologia" },
  { value: 3, label: "Ortopedia" },
  { value: 4, label: "Dermatologia" },
  { value: 5, label: "Ginecologia" },
];

export default function ConsultasPage() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [form, setForm] = useState<Consulta>({
    dsProntuario: "",
    dtHoraConsulta: "",
    dsStatusAgendamento: "Agendado",
    cdAtendimento: 1,
    idPaciente: "",
    nrCrm: "",
    cdEspecialidade: "",
  });
  const [editando, setEditando] = useState<number | null>(null);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [loading, setLoading] = useState(false);
  const [carregandoPacientes, setCarregandoPacientes] = useState(false);
  const [carregandoMedicos, setCarregandoMedicos] = useState(false);

  const API = "https://five66293.onrender.com";

  
  const toInputDateTime = (iso: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso.slice(0, 16);
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
      d.getHours()
    )}:${pad(d.getMinutes())}`;
  };

  const ensureSeconds = (val: string) => {
    if (!val) return val;
    if (val.length === 16) return `${val}:00`;
    return val;
  };

  
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

  const loadConsultas = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/agendamento`);
      if (res.ok) setConsultas(await res.json());
    } catch {
      alert("Erro ao listar consultas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPacientes();
    loadMedicos();
  }, []);

  
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFutureOrNow = (isoNoSeconds: string) => {
    if (!isoNoSeconds) return false;
    const iso = ensureSeconds(isoNoSeconds);
    return new Date(iso).getTime() >= Date.now();
  };

  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isFutureOrNow(form.dtHoraConsulta)) {
      alert("A data/hora da consulta deve ser no presente ou futuro.");
      return;
    }

    const method = editando ? "PUT" : "POST";
    const url = editando ? `${API}/agendamento/${editando}` : `${API}/agendamento`;

    const payload: Consulta = {
      ...form,
      idPaciente: Number(form.idPaciente),
      cdAtendimento: Number(form.cdAtendimento),
      nrCrm: Number(form.nrCrm),
      cdEspecialidade: Number(form.cdEspecialidade),
      dtHoraConsulta: ensureSeconds(form.dtHoraConsulta),
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert(editando ? "Consulta atualizada!" : "Consulta cadastrada!");
        setForm({
          dsProntuario: "",
          dtHoraConsulta: "",
          dsStatusAgendamento: "Agendado",
          cdAtendimento: 1,
          idPaciente: "",
          nrCrm: "",
          cdEspecialidade: "",
        });
        setEditando(null);
        if (mostrarLista) loadConsultas();
      } else {
        alert("Erro ao salvar consulta. Verifique os campos.");
      }
    } catch {
      alert("Erro de conexão com o servidor.");
    }
  };

  
  const handleEdit = (c: Consulta) => {
    setForm({
      dsProntuario: c.dsProntuario,
      dtHoraConsulta: toInputDateTime(c.dtHoraConsulta),
      dsStatusAgendamento: c.dsStatusAgendamento,
      cdAtendimento: c.cdAtendimento,
      idPaciente: c.idPaciente,
      nrCrm: c.nrCrm,
      cdEspecialidade: c.cdEspecialidade,
      cdAgendamento: c.cdAgendamento,
    });
    setEditando(c.cdAgendamento ?? null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm("Deseja realmente excluir esta consulta?")) return;
    try {
      const res = await fetch(`${API}/agendamento/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Consulta excluída!");
        loadConsultas();
      } else {
        alert("Erro ao excluir consulta.");
      }
    } catch {
      alert("Erro de conexão com o servidor.");
    }
  };

  const nomePaciente = (id: number | string) => {
    const p = pacientes.find((x) => x.idPaciente === Number(id));
    return p ? p.dsNome : `Paciente ${id}`;
  };

  const nomeMedico = (crm: number | string) => {
    const m = medicos.find((x) => x.nrCrm === Number(crm));
    return m ? `${m.nmCompleto} (CRM ${m.nrCrm})` : `CRM ${crm}`;
  };

 
  return (
    <main className="p-8 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-700">
          Agendamento de Consultas
        </h1>
        <button
          onClick={() => {
            const novo = !mostrarLista;
            setMostrarLista(novo);
            if (novo) loadConsultas();
          }}
          className="bg-blue-700 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-800 transition"
        >
          {mostrarLista ? "Ocultar Lista" : "Listar Consultas"}
        </button>
      </div>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow flex flex-col gap-6 max-w-5xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Prontuário */}
          <div>
            <label className="font-semibold text-gray-700 mb-1">Prontuário</label>
            <select
              name="dsProntuario"
              value={form.dsProntuario}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none w-full"
              required
            >
              <option value="">Selecione...</option>
              {PRONTUARIOS_PADRAO.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Data e Hora */}
          <div>
            <label className="font-semibold text-gray-700 mb-1">Data e Hora</label>
            <input
              type="datetime-local"
              name="dtHoraConsulta"
              value={form.dtHoraConsulta}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none w-full"
              required
            />
          </div>

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

          {/* Status */}
          <div>
            <label className="font-semibold text-gray-700 mb-1">Status</label>
            <select
              name="dsStatusAgendamento"
              value={form.dsStatusAgendamento}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none w-full"
              required
            >
              <option value="Agendado">Agendado</option>
              <option value="Realizado">Realizado</option>
              <option value="Cancelado">Cancelado</option>
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
            <label className="font-semibold text-gray-700 mb-1">Especialidade</label>
            <select
              name="cdEspecialidade"
              value={form.cdEspecialidade}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none w-full"
              required
            >
              <option value="">Selecione...</option>
              {ESPECIALIDADES_PADRAO.map((e) => (
                <option key={e.value} value={e.value}>
                  {e.label}
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
          {editando ? "Atualizar Consulta" : "Salvar Consulta"}
        </button>
      </form>

      {/* Lista */}
      {mostrarLista && (
        <section className="bg-white rounded-2xl shadow p-6 max-w-5xl">
          {loading ? (
            <p>Carregando...</p>
          ) : consultas.length === 0 ? (
            <p>Nenhuma consulta encontrada.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border">ID</th>
                  <th className="p-3 border">Prontuário</th>
                  <th className="p-3 border">Data/Hora</th>
                  <th className="p-3 border">Paciente</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Médico</th>
                  <th className="p-3 border">Especialidade</th>
                  <th className="p-3 border text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {consultas.map((c) => (
                  <tr key={c.cdAgendamento} className="hover:bg-gray-50">
                    <td className="border p-3">{c.cdAgendamento}</td>
                    <td className="border p-3">{c.dsProntuario}</td>
                    <td className="border p-3">
                      {toInputDateTime(c.dtHoraConsulta).replace("T", " ")}
                    </td>
                    <td className="border p-3">{nomePaciente(c.idPaciente)}</td>
                    <td className="border p-3">{c.dsStatusAgendamento}</td>
                    <td className="border p-3">{nomeMedico(c.nrCrm)}</td>
                    <td className="border p-3">
                      {
                        ESPECIALIDADES_PADRAO.find(
                          (e) => e.value === Number(c.cdEspecialidade)
                        )?.label || c.cdEspecialidade
                      }
                    </td>
                    <td className="border p-3 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(c)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(c.cdAgendamento)}
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
