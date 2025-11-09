export default function FAQ() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-6">
      <section className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-brand-blue mb-12">
          Perguntas Frequentes (FAQ)
        </h2>

        <div className="space-y-6">
          {[
            {
              q: "Preciso de internet para usar o app?",
              a: "Sim. Para acessar as consultas online, é necessário estar conectado à internet, de preferência Wi-Fi ou com boa rede móvel (4G ou 5G).",
            },
            {
              q: "Como sei se minha câmera está funcionando?",
              a: "Você pode testar abrindo o aplicativo de câmera do seu celular ou computador. Também recomendamos testar durante o quiz de preparação em nosso site.",
            },
            {
              q: "Preciso de um lugar silencioso?",
              a: "Sim. Evite ambientes com barulho, pois isso pode dificultar a comunicação com o profissional de saúde.",
            },
            {
              q: "O que fazer se o vídeo travar ou cair?",
              a: "Verifique sua conexão com a internet e tente reconectar. Se o problema persistir, feche e abra o app novamente.",
            },
            {
              q: "E se eu tiver dificuldade com tecnologia?",
              a: "Nosso site oferece um minigame educativo. Também sugerimos pedir ajuda a um familiar ou padrinho digital.",
            },
            {
              q: "O aplicativo é compatível com meu celular?",
              a: "O app funciona na maioria dos smartphones Android e iPhones recentes. Tente manter o sistema atualizado.",
            },
          ].map((item) => (
            <details
              key={item.q}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-200"
            >
              <summary className="font-semibold text-lg text-brand-blue cursor-pointer">
                {item.q}
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
