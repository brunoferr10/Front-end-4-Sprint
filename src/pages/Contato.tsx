
import { useState } from "react";

type Form = { nome: string; email: string; telefone: string; mensagem: string };

export default function Contato() {
  const [form, setForm] = useState<Form>({ nome: "", email: "", telefone: "", mensagem: "" });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    setEnviado(true);
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Entre em Contato</h2>
      <p className="mb-6">Preencha o formulário abaixo e entraremos em contato com você o mais breve possível.</p>

      {!enviado ? (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow space-y-4">
          <div>
            <label className="font-semibold block mb-1" htmlFor="nome">Nome</label>
            <input id="nome" name="nome" required value={form.nome} onChange={handleChange}
                   className="w-full border rounded-md p-3"/>
          </div>
          <div>
            <label className="font-semibold block mb-1" htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" required value={form.email} onChange={handleChange}
                   className="w-full border rounded-md p-3"/>
          </div>
          <div>
            <label className="font-semibold block mb-1" htmlFor="telefone">Telefone</label>
            <input id="telefone" name="telefone" placeholder="(XX) XXXXX-XXXX" required
                   value={form.telefone} onChange={handleChange}
                   className="w-full border rounded-md p-3"/>
          </div>
          <div>
            <label className="font-semibold block mb-1" htmlFor="mensagem">Mensagem</label>
            <textarea id="mensagem" name="mensagem" rows={5} required value={form.mensagem} onChange={handleChange}
                      className="w-full border rounded-md p-3"/>
          </div>
          <button type="submit" className="bg-brand-blue text-white px-5 py-3 rounded-md">Enviar</button>
        </form>
      ) : (
        <div className="bg-green-50 border border-green-200 text-green-900 p-6 rounded-xl">
          Obrigado! Sua mensagem foi enviada com sucesso.
        </div>
      )}
    </section>
  );
}
