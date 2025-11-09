#  Invox - Teleconsulta Segura e Acessível

##  Sobre o Projeto
Este projeto foi desenvolvido na **Sprint 03 - Front-End Design Engineering**, com foco em transformar as páginas da Sprint 02 em uma aplicação **React + Vite + TypeScript** no formato **SPA (Single Page Application)**.

O objetivo é **reduzir o absenteísmo em consultas online** no Hospital das Clínicas, garantindo **acessibilidade** para pessoas idosas e/ou com dificuldades com tecnologia.

Durante a **Sprint 04 - Front-End Design Engineering**, o projeto foi reestruturado para utilizar o ecossistema **React + Vite + TypeScript**, transformando as páginas em uma **SPA (Single Page Application)**, com integração total à **API em Java (Domain Driven Design)** hospedada remotamente.
---

##  Tecnologias Utilizadas

-  **React + Vite + TypeScript** → estrutura SPA moderna e tipada  
-  **TailwindCSS** → estilização e responsividade  
-  **React Router DOM** → roteamento e navegação entre páginas  
-  **Fetch API** → consumo da API em Java (CRUD completo)  
-  **Git / GitHub / GitFlow** → versionamento e colaboração em equipe

---

##  Integrantes
- **Bruno Ferreira** - RM 563489 - Turma 1TDSR  
- **Gabriel Robertoni Padilha** - RM 566293 - Turma 1TDSR  
- **Leonardo Aragaki** - RM 562944 - Turma 1TDSR  

---

## 🔐 Acesso ao Sistema

**Login padrão de acesso:**
- 🧑‍💻 **E-mail:** `admin@invox.com`  
- 🔒 **Senha:** `123456`
> Também é possível cadastrar novos usuários diretamente pela tela de login.


##  Imagens e Ícones

### Página Inicial
![Home](./src/assets/tecnologia.jpeg)

###  Página de Integrantes  
<div style="display: flex; gap: 10px;">
  <img src="./src/assets/Bruno.jpeg" alt="Bruno Ferreira" width="200"/>
  <img src="./src/assets/Gabriel.jpeg" alt="Gabriel Robertoni" width="200"/>
  <img src="./src/assets/leo.jpeg" alt="Leonardo Aragaki" width="200"/>
</div>

---

##  Estrutura de Pastas

FRONT-END-4-SPRINT-MAIN/
│
├── src/
│   ├── api/
│   │   └── api.ts
│   │
│   ├── assets/
│   │   ├── icons/
│   │   │   ├── combo-chart--v1.png
│   │   │   ├── edit.png
│   │   │   └── pie-chart.png
│   │   │
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
│   │   │
│   │   ├── painel/
│   │   │   ├── acompanhamentos/
│   │   │   │   └── page.tsx
│   │   │   ├── acompanhantes/
│   │   │   │   └── page.tsx
│   │   │   ├── atendimentos/
│   │   │   │   └── page.tsx
│   │   │   ├── consultas/
│   │   │   │   └── page.tsx
│   │   │   ├── especialidades/
│   │   │   │   └── page.tsx
│   │   │   ├── feedback/
│   │   │   │   └── page.tsx
│   │   │   ├── medicos/
│   │   │   │   └── page.tsx
│   │   │   ├── pacientes/
│   │   │   │   └── page.tsx
│   │   │   ├── remedios/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── HomePainel.tsx
│   │   │   ├── layoutPainel.tsx
│   │   │   └── PainelPage.tsx
│   │   │
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

##  Link do Repositório


(https://github.com/brunoferr10/Front-end-3-Sprint)

###  Deploy na Vercel  


`https://invox-sprint4.vercel.app`

---

##  Link do Vídeo de Apresentação


 https://www.youtube.com/watch?v=aXN9WaglK0U


 ##  Integrações

O projeto consome endpoints da API Java hospedada em servidor remoto (Render), realizando operações **CRUD completas** para:
- Pacientes  
- Médicos  
- Consultas  
- Acompanhantes  
- Especialidades  
- Feedback  


##  Conclusão

O projeto **Invox** demonstra a aplicação integrada de:
- **React + Tailwind + API Java + Banco de Dados Oracle**
- **Arquitetura escalável e modular**
- **Design responsivo e acessível**
- **Integração real entre disciplinas da FIAP**

>  Entregue como parte da Sprint 04 — Front-End Design Engineering  
>  Foco: Integração, usabilidade e redução do absenteísmo em teleconsultas.