export const API_BASE = "https://five66293.onrender.com"; 

export async function get(endpoint: string) {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) throw new Error(`Erro ao buscar ${endpoint}`);
  return res.json();
}

export async function post(endpoint: string, body: any) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Erro ao salvar em ${endpoint}`);
  return res.json();
}

export async function put(endpoint: string, body: any) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Erro ao atualizar ${endpoint}`);
  return res.json();
}

export async function del(endpoint: string) {
  const res = await fetch(`${API_BASE}${endpoint}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Erro ao excluir em ${endpoint}`);
  return res.text();
}
