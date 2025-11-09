import { useState } from "react";

export default function RemediosPage() {
  const [remedios, setRemedios] = useState<any[]>([]);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [formData, setFormData] = useState({
    codigo: "",
    nome: "",
    preco: "",
    dataDeFabricacao: "",
    dataDeValidade: "",
  });

  const [editando, setEditando] = useState(false);
  const [codigoEditando, setCodigoEditando] = useState<number | null>(null);
  
  const API_URL = "https://five66293.onrender.com/remedio";

  
  const listarRemedios = async () => {
    if (mostrarLista) {
      
      setMostrarLista(false);
      return;
    }

    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setRemedios(data);
      setMostrarLista(true);
    } catch {
      alert("Erro ao listar remédios.");
    }
  };

  
  const salvarRemedio = async () => {
    try {
      const method = editando ? "PUT" : "POST";
      const url = editando ? `${API_URL}/${codigoEditando}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          codigo: Number(formData.codigo),
          preco: Number(formData.preco),
        }),
      });

      if (!res.ok) throw new Error();
      alert(editando ? "Remédio atualizado!" : "Remédio cadastrado!");
      setFormData({
        codigo: "",
        nome: "",
        preco: "",
        dataDeFabricacao: "",
        dataDeValidade: "",
      });
      setEditando(false);
      setCodigoEditando(null);
      if (mostrarLista) listarRemedios(); 
    } catch {
      alert("Erro ao salvar remédio.");
    }
  };

 
  const editarRemedio = (r: any) => {
    setFormData(r);
    setEditando(true);
    setCodigoEditando(r.codigo);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

 
  const excluirRemedio = async (codigo: number) => {
    if (!confirm("Deseja realmente excluir este remédio?")) return;
    try {
      const res = await fetch(`${API_URL}/${codigo}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      alert("Remédio excluído!");
      listarRemedios();
    } catch {
      alert("Erro ao excluir remédio.");
    }
  };

  return (
    <div className="p-8 flex flex-col gap-8">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Remédios</h1>
        <button
          onClick={listarRemedios}
          className="bg-blue-700 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-800 transition"
        >
          {mostrarLista ? "Ocultar Lista" : "Listar Remédios"}
        </button>
      </div>

      {/* Formulário */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="font-medium">Código</label>
            <input
              type="number"
              placeholder="Ex: 1"
              value={formData.codigo}
              onChange={(e) =>
                setFormData({ ...formData, codigo: e.target.value })
              }
              className="w-full border rounded-md p-2 mt-1"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-medium">Nome do Remédio</label>
            <input
              type="text"
              placeholder="Ex: Paracetamol 750mg"
              value={formData.nome}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
              className="w-full border rounded-md p-2 mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Preço (R$)</label>
            <input
              type="number"
              step="0.01"
              placeholder="Ex: 12.50"
              value={formData.preco}
              onChange={(e) =>
                setFormData({ ...formData, preco: e.target.value })
              }
              className="w-full border rounded-md p-2 mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Data de Fabricação</label>
            <input
              type="date"
              value={formData.dataDeFabricacao}
              onChange={(e) =>
                setFormData({ ...formData, dataDeFabricacao: e.target.value })
              }
              className="w-full border rounded-md p-2 mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Data de Validade</label>
            <input
              type="date"
              value={formData.dataDeValidade}
              onChange={(e) =>
                setFormData({ ...formData, dataDeValidade: e.target.value })
              }
              className="w-full border rounded-md p-2 mt-1"
            />
          </div>
        </div>

        <button
          onClick={salvarRemedio}
          className="bg-green-600 text-white font-semibold w-full py-2 rounded-lg hover:bg-green-700 transition"
        >
          {editando ? "Atualizar" : "Salvar"}
        </button>
      </div>

      {/* Lista */}
      {mostrarLista && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Lista de Remédios</h2>
          {remedios.length === 0 ? (
            <p className="text-gray-600 text-center">
              Nenhum remédio cadastrado.
            </p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">Código</th>
                  <th className="p-2 border">Nome</th>
                  <th className="p-2 border">Preço (R$)</th>
                  <th className="p-2 border">Fabricação</th>
                  <th className="p-2 border">Validade</th>
                  <th className="p-2 border text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {remedios.map((r) => (
                  <tr key={r.codigo} className="hover:bg-gray-50">
                    <td className="p-2 border">{r.codigo}</td>
                    <td className="p-2 border">{r.nome}</td>
                    <td className="p-2 border">{r.preco?.toFixed(2)}</td>
                    <td className="p-2 border">{r.dataDeFabricacao}</td>
                    <td className="p-2 border">{r.dataDeValidade}</td>
                    <td className="p-2 border text-center space-x-2">
                      <button
                        onClick={() => editarRemedio(r)}
                        className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => excluirRemedio(r.codigo)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
