#  Invox - Teleconsulta Segura e Acessível

##  Sobre o Projeto
O projeto **Invox** foi desenvolvido nas disciplinas integradas da **Sprint 04 - Front-End Design Engineering** da FIAP.

O objetivo é **reduzir o absenteísmo em consultas online** no **Hospital das Clínicas**, oferecendo uma plataforma acessível, intuitiva e segura — especialmente voltada a **pessoas idosas ou com pouca familiaridade com tecnologia**.

Durante esta sprint, o sistema foi reestruturado para utilizar **React + Vite + TypeScript**, implementando uma **SPA (Single Page Application)** totalmente integrada à **API em Java (Domain Driven Design)** hospedada remotamente no Render.

---

##  Tecnologias Utilizadas
-  **React + Vite + TypeScript** → estrutura moderna e tipada  
-  **TailwindCSS** → estilização e responsividade  
-  **React Router DOM** → navegação SPA  
-  **Fetch API** → consumo da API Java (CRUD completo)  
-  **Git / GitHub / GitFlow** → versionamento e colaboração da equipe  

---

##  Integrantes
| Nome | RM | Turma |
|------|----|--------|
| **Bruno Ferreira** | 563489 | 1TDSR |
| **Gabriel Robertoni Padilha** | 566293 | 1TDSR |
| **Leonardo Aragaki Rodrigues** | 562944 | 1TDSR |

---

##  Acesso ao Sistema
Login padrão para testes:

-  **E-mail:** `admin@invox.com`  
-  **Senha:** `123456`

- Também é possível **cadastrar novos usuários** diretamente pela tela de login.

---

##  Imagens e Ícones

###  Página Inicial
![Home](./src/assets/tecnologia.jpeg)

###  Página de Integrantes
<img src="./src/assets/Bruno.jpeg" alt="Bruno Ferreira" width="180"/>  
<img src="./src/assets/Gabriel.jpeg" alt="Gabriel Robertoni" width="180"/>  
<img src="./src/assets/leo.jpeg" alt="Leonardo Aragaki" width="180"/>

---

##  Estrutura de Pastas

## 📁 Estrutura de Pastas

FRONT-END-4-SPRINT-MAIN/
│
├── src/                     # Código-fonte principal
│   ├── api/                 # Comunicação com a API (api.ts)
│   ├── assets/              # Imagens e ícones do projeto
│   │   ├── icons/           # Ícones utilizados no painel
│   │   ├── Bruno.jpeg       # Foto integrante 1
│   │   ├── Gabriel.jpeg     # Foto integrante 2
│   │   ├── leo.jpeg         # Foto integrante 3
│   │   ├── logo.png         # Logotipo do projeto
│   │   └── tecnologia.jpeg  # Imagem principal do site
│   ├── components/          # Componentes reutilizáveis (Header, Footer, Cards)
│   ├── pages/               # Páginas principais do projeto
│   │   ├── login/           # Página de login (acesso inicial)
│   │   ├── painel/          # Painel do sistema (área restrita)
│   │   │   ├── acompanhamentos/ # Página de acompanhamento de pacientes
│   │   │   ├── acompanhantes/   # Cadastro de acompanhantes
│   │   │   ├── atendimentos/    # Registro de atendimentos
│   │   │   ├── consultas/       # Controle de consultas
│   │   │   ├── especialidades/  # Cadastro de especialidades
│   │   │   ├── feedback/        # Registro de feedbacks
│   │   │   ├── medicos/         # Cadastro de médicos
│   │   │   ├── pacientes/       # Cadastro de pacientes
│   │   │   ├── remedios/        # Controle de medicamentos
│   │   │   ├── HomePainel.tsx   # Página inicial do painel
│   │   │   ├── layoutPainel.tsx # Layout base do painel
│   │   │   └── PainelPage.tsx   # Gerenciador das rotas internas do painel
│   │   ├── Contato.tsx          # Página de contato
│   │   ├── FAQ.tsx              # Página de perguntas frequentes
│   │   ├── Home.tsx             # Página inicial (landing page)
│   │   ├── IntegranteDetalhe.tsx# Detalhes dos integrantes
│   │   ├── Integrantes.tsx      # Lista de integrantes
│   │   └── Projeto.tsx          # Página sobre o projeto
│   ├── App.tsx                  # Estrutura principal da aplicação
│   ├── main.tsx                 # Ponto de entrada (renderização React)
│   ├── index.css                # Estilos globais
│   └── vite-env.d.ts            # Tipagem do ambiente Vite
│
├── package.json                # Dependências do projeto
├── tsconfig.json               # Configuração do TypeScript
├── tailwind.config.js          # Configuração do TailwindCSS
├── vite.config.ts              # Configuração do Vite
├── .gitignore                  # Ignora node_modules e arquivos desnecessários
└── README.md                   # Este arquivo
---

##  Links Importantes

###  Repositório GitHub  
 [https://github.com/brunoferr10/Front-end-4-Sprint](https://github.com/brunoferr10/Front-end-4-Sprint)

###  Deploy na Vercel  
 [https://front-end-4-sprint-7emq.vercel.app](https://front-end-4-sprint-7emq.vercel.app)

###  Vídeo de Apresentação (YouTube)  
 [https://www.youtube.com/watch?v=cRVPlG1ug7k](https://www.youtube.com/watch?v=cRVPlG1ug7k)

---

##  Integrações
O projeto consome endpoints da **API em Java hospedada no Render**, realizando operações **CRUD completas** com integração direta ao banco de dados Oracle.

### Entidades Integradas:
- Pacientes  
- Médicos  
- Consultas  
- Acompanhantes  
- Especialidades  
- Feedbacks  

---

##  Conclusão
O projeto **Invox** representa a integração entre múltiplas disciplinas da FIAP, unindo:

- Front-End com React + Tailwind  
- Back-End com Java + API REST  
- Banco de Dados Relacional (Oracle)  
- Boas práticas de design, responsividade e acessibilidade  

 **Sprint 04 — Front-End Design Engineering**  
 **Foco:** Integração, usabilidade e redução do absenteísmo em teleconsultas.
