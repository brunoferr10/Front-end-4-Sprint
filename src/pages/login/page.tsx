import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [modoCadastro, setModoCadastro] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "https://five66293.onrender.com/login";

  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Erro ao buscar logins");

      const logins = await response.json();
      const usuarioEncontrado = logins.find(
        (user: any) => user.dsEmail === email && user.dsSenha === senha
      );

      if (usuarioEncontrado) {
        
        localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));

        setMensagem(" Login realizado com sucesso!");
        setTimeout(() => {
          navigate("/painel"); 
        }, 800);
      } else {
        setMensagem(" Usuário ou senha incorretos.");
      }
    } catch (error) {
      console.error(error);
      setMensagem("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  
  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dsEmail: email,
          dsSenha: senha,
        }),
      });

      if (response.ok) {
        setMensagem(" Cadastro realizado com sucesso!");
        setModoCadastro(false);
        setEmail("");
        setSenha("");
      } else {
        setMensagem(" Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error(error);
      setMensagem("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">
          {modoCadastro ? "Criar Conta" : "Acessar o Sistema"}
        </h1>

        <form
          onSubmit={modoCadastro ? handleCadastro : handleLogin}
          className="space-y-4"
        >
          <div>
            <label className="font-medium">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1"
              placeholder="Digite seu e-mail"
              required
            />
          </div>

          <div>
            <label className="font-medium">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg font-semibold transition"
          >
            {loading
              ? modoCadastro
                ? "Cadastrando..."
                : "Entrando..."
              : modoCadastro
              ? "Cadastrar"
              : "Entrar"}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => setModoCadastro(!modoCadastro)}
            className="text-sm text-blue-700 hover:underline"
          >
            {modoCadastro
              ? "Já tem conta? Fazer login"
              : "Não tem conta? Cadastre-se"}
          </button>
        </div>

        {mensagem && (
          <p
            className={`text-center mt-4 font-semibold ${
              mensagem.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {mensagem}
          </p>
        )}
      </div>
    </div>
  );
}
