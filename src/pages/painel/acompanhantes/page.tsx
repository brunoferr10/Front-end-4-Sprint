import { useRef, useState } from "react"

type Acompanhante = {
  cdAcompanhante?: number
  dsNomeAcompanhante: string
  nrCpf: string
  nrTelefone: string
  dsParentesco: string
}

const CANDIDATE_ROUTES = [
  "https://five66293.onrender.com/acompanhante",   
  "https://five66293.onrender.com/acompanhantes",  
] as const

export default function AcompanhantesPage() {
  const [acompanhantes, setAcompanhantes] = useState<Acompanhante[]>([])
  const [form, setForm] = useState<Acompanhante>({
    dsNomeAcompanhante: "",
    nrCpf: "",
    nrTelefone: "",
    dsParentesco: "",
  })
  const [editando, setEditando] = useState<number | null>(null)
  const [mostrarLista, setMostrarLista] = useState(false)
  const [loading, setLoading] = useState(false)

  
  const workingBaseUrlRef = useRef<string | null>(null)

  async function detectWorkingBase(): Promise<string> {
    if (workingBaseUrlRef.current) return workingBaseUrlRef.current

    
    for (const base of CANDIDATE_ROUTES) {
      try {
        const r = await fetch(base, { method: "GET" })
        if (r.ok) {
          workingBaseUrlRef.current = base
          return base
        }
      } catch { /* ignora e tenta a próxima */ }
    }
    
    workingBaseUrlRef.current = CANDIDATE_ROUTES[0]
    return workingBaseUrlRef.current
  }

  const loadData = async () => {
    setLoading(true)
    try {
      const base = await detectWorkingBase()
      const res = await fetch(base)
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(`Falha no GET ${base}: ${res.status} ${msg}`)
      }
      const data = await res.json()
      // garante array
      setAcompanhantes(Array.isArray(data) ? data : [])
    } catch (err: any) {
      console.error(err)
      alert("Erro ao carregar acompanhantes. Verifique se o backend está rodando e o endpoint está acessível.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const base = await detectWorkingBase()

    const method = editando ? "PUT" : "POST"
    const url = editando ? `${base}/${editando}` : base

    
    const body: Acompanhante = editando ? form : {
      dsNomeAcompanhante: form.dsNomeAcompanhante,
      nrCpf: form.nrCpf,
      nrTelefone: form.nrTelefone,
      dsParentesco: form.dsParentesco,
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const txt = await res.text()
        throw new Error(`Falha no ${method} ${url}: ${res.status} ${txt}`)
      }

      alert(editando ? "Acompanhante atualizado!" : "Acompanhante cadastrado!")
      setForm({
        dsNomeAcompanhante: "",
        nrCpf: "",
        nrTelefone: "",
        dsParentesco: "",
      })
      setEditando(null)
      if (mostrarLista) await loadData()
    } catch (err: any) {
      console.error(err)
      alert("Erro ao salvar. Veja o console para detalhes.")
    }
  }

  const handleEdit = (a: Acompanhante) => {
    setForm(a)
    setEditando(a.cdAcompanhante ?? null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id?: number) => {
    if (!id) return
    if (!confirm("Deseja realmente excluir este acompanhante?")) return
    const base = await detectWorkingBase()

    try {
      const res = await fetch(`${base}/${id}`, { method: "DELETE" })
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(`Falha no DELETE ${base}/${id}: ${res.status} ${txt}`)
      }
      alert("Acompanhante excluído com sucesso.")
      await loadData()
    } catch (err: any) {
      console.error(err)
      alert("Erro ao excluir. Veja o console para detalhes.")
    }
  }

  return (
    <main className="p-8 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-700">Acompanhantes</h1>

        <button
          onClick={async () => {
            const next = !mostrarLista
            setMostrarLista(next)
            if (next) await loadData()
          }}
          className="bg-blue-700 text-white px-4 py-2 rounded font-medium hover:bg-blue-800 transition"
        >
          {mostrarLista ? "Ocultar Lista" : "Listar Acompanhantes"}
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow flex flex-col gap-6 max-w-5xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Nome do Acompanhante</label>
            <input
              name="dsNomeAcompanhante"
              placeholder="Digite o nome completo"
              value={form.dsNomeAcompanhante}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">CPF</label>
            <input
              name="nrCpf"
              placeholder="Somente números"
              value={form.nrCpf}
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
            <label className="font-semibold text-gray-700 mb-1">Parentesco</label>
            <input
              name="dsParentesco"
              placeholder="Ex: Pai, Mãe, Irmão..."
              value={form.dsParentesco}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className={`w-full text-white font-bold py-3 rounded-lg mt-4 transition ${
            editando ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {editando ? "Atualizar" : "Salvar"}
        </button>
      </form>

      {mostrarLista && (
        <section className="bg-white rounded-2xl shadow p-6 max-w-5xl">
          {loading ? (
            <p>Carregando...</p>
          ) : acompanhantes.length === 0 ? (
            <p>Nenhum acompanhante encontrado.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border">ID</th>
                  <th className="p-3 border">Nome</th>
                  <th className="p-3 border">CPF</th>
                  <th className="p-3 border">Telefone</th>
                  <th className="p-3 border">Parentesco</th>
                  <th className="p-3 border text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {acompanhantes.map((a) => (
                  <tr key={a.cdAcompanhante ?? `${a.nrCpf}-${a.nrTelefone}`}>
                    <td className="border p-3">{a.cdAcompanhante}</td>
                    <td className="border p-3">{a.dsNomeAcompanhante}</td>
                    <td className="border p-3">{a.nrCpf}</td>
                    <td className="border p-3">{a.nrTelefone}</td>
                    <td className="border p-3">{a.dsParentesco}</td>
                    <td className="border p-3 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(a)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(a.cdAcompanhante)}
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
