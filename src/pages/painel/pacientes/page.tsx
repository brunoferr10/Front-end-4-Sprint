import { useEffect, useState } from "react"

type Paciente = {
  idPaciente?: number
  dsNome: string
  nrTelefone: string
  dsEmail: string
  dsSexo: string
  nrIdade: number | string
}

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [form, setForm] = useState<Paciente>({
    dsNome: "",
    nrTelefone: "",
    dsEmail: "",
    dsSexo: "",
    nrIdade: "",
  })
  const [editando, setEditando] = useState<number | null>(null)
  const [mostrarLista, setMostrarLista] = useState(false)
  const [loading, setLoading] = useState(false)

  const API = "https://five66293.onrender.com"

  
  const loadData = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/paciente`)
      if (!res.ok) throw new Error("Erro ao carregar pacientes")
      const data = await res.json()
      setPacientes(data)
    } catch {
      alert("Erro ao carregar pacientes.")
    } finally {
      setLoading(false)
    }
  }

  
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

 
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const method = editando ? "PUT" : "POST"
    const url = editando
      ? `${API}/paciente/${editando}`
      : `${API}/paciente`

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        alert(editando ? "Paciente atualizado com sucesso!" : "Paciente cadastrado com sucesso!")
        setForm({
          dsNome: "",
          nrTelefone: "",
          dsEmail: "",
          dsSexo: "",
          nrIdade: "",
        })
        setEditando(null)
        if (mostrarLista) loadData()
      } else {
        alert("Erro ao salvar paciente.")
      }
    } catch {
      alert("Erro de conexão com o servidor.")
    }
  }

  
  const handleEdit = (p: Paciente) => {
    setForm(p)
    setEditando(p.idPaciente ?? null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

 
  const handleDelete = async (id?: number) => {
    if (!id) return
    if (!confirm("Deseja realmente excluir este paciente?")) return

    console.log("Tentando excluir paciente com ID:", id)

    try {
      const res = await fetch(`${API}/paciente/${id}`, { method: "DELETE" })

      if (res.ok) {
        alert(" Paciente excluído com sucesso.")
        loadData()
        return
      }

      
      let errText = ""
      try {
        errText = await res.text()
      } catch {
        errText = ""
      }

      
      if (res.status === 404) {
        alert("Exclua primeiro essas dependências e tente novamente.")
      } else if (
        res.status === 409 ||
        res.status === 400 ||
        res.status === 500 ||
        errText.toLowerCase().includes("constraint") ||
        errText.toLowerCase().includes("foreign key") ||
        errText.toLowerCase().includes("violates") ||
        errText.toLowerCase().includes("depend")
      ) {
        alert(
          "❗ Não é possível excluir o paciente.\n" +
          "Existem registros relacionados (consultas, atendimentos ou feedbacks).\n" +
          "Exclua primeiro essas dependências e tente novamente."
        )
      } else {
        alert(`Erro ao excluir paciente (código ${res.status}).`)
      }
    } catch (error) {
      console.error("Erro ao excluir paciente:", error)
      alert("Erro de conexão com o servidor.")
    }
  }

  return (
    <main className="p-8 flex flex-col gap-8">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-700">Pacientes</h1>

        <button
          onClick={() => {
            setMostrarLista(!mostrarLista)
            if (!mostrarLista) loadData()
          }}
          className="bg-blue-700 text-white px-4 py-2 rounded font-medium hover:bg-blue-800 transition"
        >
          {mostrarLista ? "Ocultar Lista" : "Listar Pacientes"}
        </button>
      </div>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow flex flex-col gap-6 max-w-5xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Nome</label>
            <input
              name="dsNome"
              placeholder="Digite o nome completo"
              value={form.dsNome}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Telefone</label>
            <input
              name="nrTelefone"
              placeholder="(11) 99999-9999"
              value={form.nrTelefone}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">E-mail</label>
            <input
              name="dsEmail"
              placeholder="exemplo@email.com"
              value={form.dsEmail}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              type="email"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Sexo</label>
            <select
              name="dsSexo"
              value={form.dsSexo}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Selecione...</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Idade</label>
            <input
              name="nrIdade"
              type="number"
              placeholder="Ex: 35"
              value={form.nrIdade}
              onChange={handleChange}
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
          {loading ? (
            <p>Carregando...</p>
          ) : pacientes.length === 0 ? (
            <p>Nenhum paciente encontrado.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border">ID</th>
                  <th className="p-3 border">Nome</th>
                  <th className="p-3 border">E-mail</th>
                  <th className="p-3 border">Telefone</th>
                  <th className="p-3 border">Idade</th>
                  <th className="p-3 border">Sexo</th>
                  <th className="p-3 border text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pacientes.map((p) => (
                  <tr key={p.idPaciente} className="hover:bg-gray-50">
                    <td className="border p-3">{p.idPaciente}</td>
                    <td className="border p-3">{p.dsNome}</td>
                    <td className="border p-3">{p.dsEmail}</td>
                    <td className="border p-3">{p.nrTelefone}</td>
                    <td className="border p-3">{p.nrIdade}</td>
                    <td className="border p-3">{p.dsSexo}</td>
                    <td className="border p-3 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(p.idPaciente)}
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
  )
}
