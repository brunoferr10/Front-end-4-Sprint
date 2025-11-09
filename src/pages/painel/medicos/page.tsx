import { useEffect, useState } from "react";

export default function MedicosPage() {
  const [medicos, setMedicos] = useState<any[]>([]);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const [formData, setFormData] = useState({
    nmCompleto: "",
    nrCrm: "",
    cdEspecialidade: "",
    dsSegmento: "",
    dsTurno: "",
    dsEmail: "",
  });

  const [editando, setEditando] = useState(false);
  const [crmEditando, setCrmEditando] = useState<number | null>(null);

  const API_URL = "https://five66293.onrender.com/medico";

  const especialidades = [
    { id: 1, nome: "Clínico Geral" },
    { id: 2, nome: "Cardiologia" },
    { id: 3, nome: "Ortopedia" },
    { id: 4, nome: "Dermatologia" },
    { id: 5, nome: "Fisioterapia" },
  ];

  const turnos = ["Manhã", "Tarde", "Noite"];

  
  useEffect(() => {
    fetch(API_URL, { method: "HEAD" }).catch(() => {});
  }, []);

  
  const listarMedicos = async (forcar = false) => {
    if (medicos.length > 0 && !forcar && mostrarLista) {
      setMostrarLista(false);
      return;
    }

    if (!mostrarLista) {
      setCarregando(true);
      try {
        const res = await fetch(API_URL, { cache: "no-store" });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setMedicos(data);
        setMostrarLista(true);
      } catch {
        alert("Erro ao listar médicos. Tente novamente.");
      } finally {
        setCarregando(false);
      }
    } else {
      setMostrarLista(false);
    }
  };

  
  const salvarMedico = async () => {
    try {
      const method = editando ? "PUT" : "POST";
      const url = editando ? `${API_URL}/${crmEditando}` : API_URL;

      const especialidadeSelecionada = especialidades.find(
        (e) => e.id === Number(formData.cdEspecialidade)
      );

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nrCrm: Number(formData.nrCrm),
          nmCompleto: formData.nmCompleto,
          cdEspecialidade: Number(formData.cdEspecialidade),
          dsSegmento: especialidadeSelecionada?.nome || "Segmento não informado",
          dsTurno: formData.dsTurno,
          dsEmail: formData.dsEmail,
        }),
      });

      if (!res.ok) throw new Error();
      alert(editando ? "Médico atualizado!" : "Médico cadastrado!");
      setFormData({
        nmCompleto: "",
        nrCrm: "",
        cdEspecialidade: "",
        dsSegmento: "",
        dsTurno: "",
        dsEmail: "",
      });
      setEditando(false);
      setCrmEditando(null);
      listarMedicos(true);
    } catch {
      alert("Erro ao salvar médico.");
    }
  };

 
  const editarMedico = (m: any) => {
    setFormData(m);
    setEditando(true);
    setCrmEditando(m.nrCrm);
  };

  
  const excluirMedico = async (crm: number) => {
    if (!confirm("Deseja realmente excluir este médico?")) return;
    try {
      const res = await fetch(`${API_URL}/${crm}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      alert("Médico excluído!");
      listarMedicos(true);
    } catch {
      alert("Erro ao excluir médico.");
    }
  };

  return (
    <main className="p-8 flex flex-col gap-8">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-700">Médicos</h1>
        <button
          onClick={() => listarMedicos()}
          className="bg-blue-700 text-white px-4 py-2 rounded font-medium hover:bg-blue-800 transition"
        >
          {mostrarLista ? "Ocultar Lista" : "Listar Médicos"}
        </button>
      </div>

      {/* Formulário */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          salvarMedico();
        }}
        className="bg-white p-8 rounded-2xl shadow flex flex-col gap-6 max-w-5xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Nome */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              placeholder="Digite o nome completo"
              value={formData.nmCompleto}
              onChange={(e) =>
                setFormData({ ...formData, nmCompleto: e.target.value })
              }
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* CRM */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">CRM</label>
            <input
              type="number"
              placeholder="Ex: 123456"
              value={formData.nrCrm}
              onChange={(e) =>
                setFormData({ ...formData, nrCrm: e.target.value })
              }
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Especialidade */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">
              Código da Especialidade
            </label>
            <select
              value={formData.cdEspecialidade}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cdEspecialidade: e.target.value,
                  dsSegmento:
                    especialidades.find((esp) => esp.id === Number(e.target.value))
                      ?.nome || "",
                })
              }
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Selecione...</option>
              {especialidades.map((esp) => (
                <option key={esp.id} value={esp.id}>
                  {esp.id} - {esp.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Segmento */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Segmento</label>
            <input
              type="text"
              value={formData.dsSegmento}
              placeholder="Selecionado automaticamente"
              readOnly
              className="border rounded-lg p-3 bg-gray-100 outline-none"
            />
          </div>

          {/* Turno */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Turno</label>
            <select
              value={formData.dsTurno}
              onChange={(e) =>
                setFormData({ ...formData, dsTurno: e.target.value })
              }
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Selecione...</option>
              {turnos.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* E-mail */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              placeholder="exemplo@email.com"
              value={formData.dsEmail}
              onChange={(e) =>
                setFormData({ ...formData, dsEmail: e.target.value })
              }
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
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
          {editando ? "Atualizar" : "Salvar"}
        </button>
      </form>

      {/* Lista */}
      {mostrarLista && (
        <section className="bg-white rounded-2xl shadow p-6 max-w-5xl">
          <h2 className="text-xl font-semibold mb-4">Lista de Médicos</h2>

          {carregando ? (
            <p className="text-gray-500 text-center">Carregando médicos...</p>
          ) : medicos.length === 0 ? (
            <p className="text-gray-600 text-center">Nenhum médico cadastrado.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border">CRM</th>
                  <th className="p-3 border">Nome</th>
                  <th className="p-3 border">E-mail</th>
                  <th className="p-3 border">Turno</th>
                  <th className="p-3 border">Segmento</th>
                  <th className="p-3 border">Especialidade</th>
                  <th className="p-3 border text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {medicos.map((m) => (
                  <tr key={m.nrCrm} className="hover:bg-gray-50">
                    <td className="border p-3">{m.nrCrm}</td>
                    <td className="border p-3">{m.nmCompleto}</td>
                    <td className="border p-3">{m.dsEmail}</td>
                    <td className="border p-3">{m.dsTurno}</td>
                    <td className="border p-3">{m.dsSegmento}</td>
                    <td className="border p-3">{m.cdEspecialidade}</td>
                    <td className="border p-3 text-center space-x-2">
                      <button
                        onClick={() => editarMedico(m)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => excluirMedico(m.nrCrm)}
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
