export default function Projeto() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-6">
      <section className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-brand-blue mb-12">
          📌 Nosso Projeto
        </h2>

        <div className="bg-white rounded-3xl shadow-xl p-10 space-y-6 leading-relaxed text-gray-700">
          <p>
            Nosso projeto visa melhorar o acesso de pacientes às consultas online
            do Hospital das Clínicas, especialmente aqueles com mais de 60 anos
            ou com deficiência.
          </p>

          <p>
            O grande diferencial da nossa solução é que o paciente nunca estará
            sozinho no processo. Logo ao acessar o site, ele será recebido com um{" "}
            <strong>vídeo introdutório</strong> que explica, de forma simples, o
            que vai acontecer e como o quiz funciona. Em seguida, o sistema
            pergunta se o usuário está pronto para começar, tornando a
            experiência acolhedora e interativa desde o primeiro contato.
          </p>

          <p>
            Durante o <strong>quiz interativo</strong>, cada pergunta será lida e
            acompanhada de um <strong>vídeo explicativo</strong>, mostrando
            claramente o que significa cada alternativa. Se o usuário{" "}
            <strong>acertar</strong>, ele segue automaticamente para a próxima
            etapa. Se <strong>errar</strong>, o sistema apresenta imediatamente
            um vídeo explicando o motivo do erro e exibe, de forma visual e
            intuitiva, a resposta correta. Só então o paciente pode refazer a
            mesma pergunta até acertar, garantindo o aprendizado antes de
            avançar.
          </p>

          <p>
            Isso garante que o usuário seja conduzido passo a passo, como se o
            sistema literalmente <strong>“pegasse na sua mão”</strong>, utilizando
            cores de destaque, botões claros, vídeos, imagens ilustrativas e
            feedback imediato. O objetivo é tornar a navegação o mais intuitiva
            possível, diminuindo inseguranças e facilitando a compreensão.
          </p>

          <p>
            O quiz testará habilidades e conhecimentos básicos necessários para a
            realização de uma teleconsulta, como:
          </p>

          <ul className="list-disc ml-8 space-y-2">
            <li>Verificação da conexão com a internet</li>
            <li>Teste de câmera</li>
            <li>Ambiente adequado (silêncio e iluminação)</li>
            <li>Passo a passo para entrar no aplicativo de consultas</li>
            <li>Outras dicas práticas e acessíveis</li>
          </ul>

          <p>
            Ao finalizar corretamente o quiz, o usuário terá acesso direto ao{" "}
            <strong>aplicativo de consulta</strong>, já preparado para prosseguir
            com o atendimento.
          </p>

          <p>
            Além disso, o sistema contará com um <strong>chatbot de ajuda</strong>{" "}
            para tirar dúvidas adicionais. Caso o usuário ainda tenha
            dificuldades, poderá ser redirecionado para o{" "}
            <strong>WhatsApp do suporte</strong>, onde receberá auxílio humano
            personalizado.
          </p>

          <p>
            Com essa solução, pretendemos reduzir o número de faltas em consultas
            online, promover a inclusão digital e aumentar a autonomia dos
            pacientes. Mais do que um simples quiz, entregamos uma{" "}
            <strong>experiência guiada, didática e inclusiva</strong>, que
            acompanha o paciente até se sentir realmente seguro para realizar sua
            teleconsulta.
          </p>
        </div>
      </section>
    </main>
  );
}
