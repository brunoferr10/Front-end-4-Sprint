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

> Também é possível **cadastrar novos usuários** diretamente pela tela de login.

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

FRONT-END-4-SPRINT-MAIN/
├── src/
│   ├── api/
│   │   └── api.ts
│   │
│   ├── assets/
│   │   ├── icons/
│   │   │   ├── combo-chart--v1.png
│   │   │   ├── edit.png
│   │   │   └── pie-chart.png
│   │   ├── Bruno.jpeg
│   │   ├── Gabriel.jpeg
│   │   ├── leo.jpeg
│   │   ├── logo.png
│   │   └── tecnologia.jpeg
│   │
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── IntegranteCard.tsx
│   │
│   ├── pages/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── painel/
│   │   │   ├── acompanhamentos/page.tsx
│   │   │   ├── acompanhantes/page.tsx
│   │   │   ├── atendimentos/page.tsx
│   │   │   ├── consultas/page.tsx
│   │   │   ├── especialidades/page.tsx
│   │   │   ├── feedback/page.tsx
│   │   │   ├── medicos/page.tsx
│   │   │   ├── pacientes/page.tsx
│   │   │   ├── remedios/page.tsx
│   │   │   ├── HomePainel.tsx
│   │   │   ├── layoutPainel.tsx
│   │   │   └── PainelPage.tsx
│   │   ├── Contato.tsx
│   │   ├── FAQ.tsx
│   │   ├── Home.tsx
│   │   ├── IntegranteDetalhe.tsx
│   │   ├── Integrantes.tsx
│   │   └── Projeto.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
│
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
├── .gitignore
└── README.md
---

##  Links Importantes

###  Repositório GitHub  
 [https://github.com/brunoferr10/Front-end-4-Sprint](https://github.com/brunoferr10/Front-end-4-Sprint)

###  Deploy na Vercel  
 [https://invox-sprint4.vercel.app](https://invox-sprint4.vercel.app)

###  Vídeo de Apresentação (YouTube)  
 [https://www.youtube.com/watch?v=aXN9WaglK0U](https://www.youtube.com/watch?v=aXN9WaglK0U)

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
