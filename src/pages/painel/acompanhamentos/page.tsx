import { useEffect, useState } from "react";

type Acompanhamento = {
  idPaciente: number | string;
  cdAcompanhante: number | string;
  dsStatusAcompanhamento: string;
};

type Paciente = {
  idPaciente: number;
  dsNome: string;
};

type AcompanhanteTO = {
  cdAcompanhante: number;
  dsNomeAcompanhante: string;
};

const STATUS_OPCOES = [
  "Aguardando documentos",
  "Em análise médica",
  "Alta liberada",
  "Retorno marcado",
];

export default function AcompanhamentosPage() {
  const [acompanhamentos, setAcompanhamentos] = useState<Acompanhamento[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [acompanhantes, setAcompanhantesList] = useState<AcompanhanteTO[]>([]);
  const [form, setForm] = useState<Acompanhamento>({
    idPaciente: "",
    cdAcompanhante: "",
    dsStatusAcompanhamento: "",
  });
  const [editando, setEditando] = useState<boolean>(false);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [loading, setLoading] = useState(false);

  const [carregandoPacientes, setCarregandoPacientes] = useState(false);
  const [carregandoAcompanhantes, setCarregandoAcompanhantes] = useState(false);

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
      console.error("Erro ao carregar pacientes:", err);
    } finally {
      setCarregandoPacientes(false);
    }
  };

 
  const loadAcompanhantes = async () => {
    setCarregandoAcompanhantes(true);
    try {
      const res = await fetch(`${API}/acompanhante`);
      if (res.ok) {
        const data = await res.json();
        setAcompanhantesList(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Erro ao carregar acompanhantes:", err);
    } finally {
      setCarregandoAcompanhantes(false);
    }
  };

  
  const loadAcompanhamentos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/acompanhamento`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAcompanhamentos(Array.isArray(data) ? data : []);
    } catch {
      alert("Erro ao carregar acompanhamentos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPacientes();
    loadAcompanhantes();
  }, []);

  
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.idPaciente || !form.cdAcompanhante || !form.dsStatusAcompanhamento) {
      alert("Preencha todos os campos antes de salvar.");
      return;
    }

    const payload = {
      idPaciente: Number(form.idPaciente),
      cdAcompanhante: Number(form.cdAcompanhante),
      dsStatusAcompanhamento: form.dsStatusAcompanhamento,
    };

    const method = editando ? "PUT" : "POST";
    const url = editando
      ? `${API}/acompanhamento/${payload.idPaciente}/${payload.cdAcompanhante}`
      : `${API}/acompanhamento`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert(editando ? "Acompanhamento atualizado!" : "Acompanhamento cadastrado!");
        setForm({
          idPaciente: "",
          cdAcompanhante: "",
          dsStatusAcompanhamento: "",
        });
        setEditando(false);
        if (mostrarLista) loadAcompanhamentos();
      } else {
        alert(
          "Erro ao salvar acompanhamento. Verifique os dados (paciente, acompanhante e se já existe esse relacionamento)."
        );
      }
    } catch {
      alert("Erro de conexão com o servidor.");
    }
  };

 
  const handleEdit = (a: Acompanhamento) => {
    setForm({
      idPaciente: String(a.idPaciente),
      cdAcompanhante: String(a.cdAcompanhante),
      dsStatusAcompanhamento: a.dsStatusAcompanhamento,
    });
    setEditando(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

 
  const handleDelete = async (idPaciente?: number, cdAcompanhante?: number) => {
    if (!idPaciente || !cdAcompanhante) return;
    if (!confirm("Deseja realmente excluir este acompanhamento?")) return;

    try {
      const res = await fetch(
        `${API}/acompanhamento/${idPaciente}/${cdAcompanhante}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        alert("Acompanhamento excluído com sucesso.");
        loadAcompanhamentos();
      } else {
        alert("Erro ao excluir acompanhamento.");
      }
    } catch {
      alert("Erro de conexão com o servidor.");
    }
  };

  const nomePaciente = (id: number | string) =>
    pacientes.find((p) => p.idPaciente === Number(id))?.dsNome || `Paciente ${id}`;

  const nomeAcompanhante = (id: number | string) =>
    acompanhantes.find((a) => a.cdAcompanhante === Number(id))?.dsNomeAcompanhante ||
    `Acompanhante ${id}`;

  
  return (
    <main className="p-8 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-700">Acompanhamentos</h1>

        <button
          onClick={() => {
            setMostrarLista(!mostrarLista);
            if (!mostrarLista) loadAcompanhamentos();
          }}
          className="bg-blue-700 text-white px-4 py-2 rounded font-medium hover:bg-blue-800 transition"
        >
          {mostrarLista ? "Ocultar Lista" : "Listar Acompanhamentos"}
        </button>
      </div>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow flex flex-col gap-6 max-w-5xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Paciente */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Paciente</label>
            <select
              name="idPaciente"
              value={form.idPaciente}
              onChange={handleChange}
              onClick={() => {
                if (!pacientes.length && !carregandoPacientes) loadPacientes();
              }}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              {carregandoPacientes ? (
                <option value="">Carregando pacientes...</option>
              ) : (
                <>
                  <option value="">Selecione o paciente...</option>
                  {pacientes.map((p) => (
                    <option key={p.idPaciente} value={p.idPaciente}>
                      {p.dsNome} (ID {p.idPaciente})
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          {/* Acompanhante */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Acompanhante</label>
            <select
              name="cdAcompanhante"
              value={form.cdAcompanhante}
              onChange={handleChange}
              onClick={() => {
                if (!acompanhantes.length && !carregandoAcompanhantes)
                  loadAcompanhantes();
              }}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              {carregandoAcompanhantes ? (
                <option value="">Carregando acompanhantes...</option>
              ) : (
                <>
                  <option value="">Selecione o acompanhante...</option>
                  {acompanhantes.map((a) => (
                    <option key={a.cdAcompanhante} value={a.cdAcompanhante}>
                      {a.dsNomeAcompanhante} (ID {a.cdAcompanhante})
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Status</label>
            <select
              name="dsStatusAcompanhamento"
              value={form.dsStatusAcompanhamento}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Selecione o status...</option>
              {STATUS_OPCOES.map((s) => (
                <option key={s} value={s}>
                  {s}
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
          {editando ? "Atualizar Acompanhamento" : "Salvar Acompanhamento"}
        </button>
      </form>

      {/* Lista */}
      {mostrarLista && (
        <section className="bg-white rounded-2xl shadow p-6 max-w-5xl">
          {loading ? (
            <p>Carregando...</p>
          ) : acompanhamentos.length === 0 ? (
            <p className="text-gray-600 text-center py-4">
              Nenhum acompanhamento encontrado.
            </p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border">Paciente</th>
                  <th className="p-3 border">Acompanhante</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {acompanhamentos.map((a, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border p-3">
                      {nomePaciente(a.idPaciente)} (ID {a.idPaciente})
                    </td>
                    <td className="border p-3">
                      {nomeAcompanhante(a.cdAcompanhante)} (ID {a.cdAcompanhante})
                    </td>
                    <td className="border p-3">{a.dsStatusAcompanhamento}</td>
                    <td className="border p-3 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(a)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(
                            Number(a.idPaciente),
                            Number(a.cdAcompanhante)
                          )
                        }
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
