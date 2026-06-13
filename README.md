# projeto-individual-renan-pariz

Projeto Individual da disciplina de Gerência de Configuração e Evolução de Software (GCES 2026-1) — UnB.

A aplicação base é o **mk.js**, um jogo de luta implementado com Backend em Node.js/Express e Frontend em HTML5 Canvas. O projeto foi modernizado com containerização, pipelines de CI/CD, testes automatizados, análise de segurança e orquestração com Kubernetes.

---

## Tecnologias

- **Backend:** Node.js 20 + Express + Socket.io
- **Banco de dados:** PostgreSQL 15
- **Frontend:** HTML5 Canvas + JavaScript
- **Containerização:** Docker + Docker Compose
- **Servidor web:** Nginx
- **CI/CD:** GitHub Actions
- **Qualidade:** SonarCloud + ESLint + HTMLHint
- **Segurança:** njsscan (SAST) + npm audit (SCA)
- **Testes:** Jest + fast-check (Fuzzing)
- **Orquestração:** Kubernetes + Cert Manager

---

## Pré-requisitos

- [Docker](https://www.docker.com/) instalado
- [Docker Compose](https://docs.docker.com/compose/) instalado
- [Node.js 20+](https://nodejs.org/) (apenas para desenvolvimento local sem Docker)

---

## Ambiente de Desenvolvimento

### 1. Clone o repositório

```bash
git clone https://github.com/renanpariiz/projeto-individual-renan-pariz.git
cd projeto-individual-renan-pariz
```

### 2. Suba o ambiente com Docker Compose

```bash
cd server
docker compose up --build
```

Isso irá:
- Subir o servidor Node.js com **hot-reload** (alterações no código refletem imediatamente)
- Subir o banco de dados PostgreSQL
- Criar automaticamente a tabela de histórico de partidas

### 3. Acesse a aplicação

- **Jogo:** http://localhost:3000
- **Histórico de partidas:** http://localhost:3000/api/matches

### 4. Derrubar o ambiente

```bash
docker compose down
```

---

## Ambiente de Produção

### 1. Suba o ambiente de produção

Na raiz do projeto:

```bash
docker compose -f docker-compose.prod.yml up --build
```

Isso irá:
- Build otimizado do servidor Node.js com multi-stage build
- Nginx servindo o frontend estático na porta 80
- PostgreSQL com volume persistente

### 2. Acesse a aplicação

- **Jogo:** http://localhost

---

## Testes

### Rodar testes unitários

```bash
cd server
npm install
npm test
```

### Rodar testes de fuzzing

```bash
cd server
npx jest fuzz.test.js
```

### Rodar lint

```bash
cd server
npm run lint
```

---

## Pipeline CI/CD

O projeto possui dois pipelines automatizados via **GitHub Actions**:

### CI — Build & Lint (`.github/workflows/ci.yml`)

Roda a cada push na branch `main`:

| Job | Descrição |
|---|---|
| Lint & Build - Backend | Verifica erros de lint no código Node.js |
| Lint - Frontend | Verifica erros de lint no HTML com HTMLHint |
| Testes Unitários - Backend | Roda os testes Jest |
| Testes de Fuzzing - Backend | Valida resiliência do servidor com fast-check |
| SCA - Verificação de Dependências | Verifica vulnerabilidades com npm audit |
| SAST - Análise Estática de Segurança | Analisa o código com njsscan |
| Qualidade de Código - SonarCloud | Envia métricas para o SonarCloud |

### CD — Build & Push Images (`.github/workflows/cd.yml`)

Roda a cada push na `main` e publica as imagens Docker no GitHub Container Registry (ghcr.io):

- `ghcr.io/renanpariiz/projeto-individual-renan-pariz-server:latest`
- `ghcr.io/renanpariiz/projeto-individual-renan-pariz-nginx:latest`

---

## Estrutura do Projeto

```
projeto-individual-renan-pariz/
├── game/                        # Frontend (HTML5 Canvas)
├── server/                      # Backend Node.js
│   ├── Dockerfile.dev           # Dockerfile de desenvolvimento
│   ├── Dockerfile.prod          # Dockerfile de produção (multi-stage)
│   ├── docker-compose.yml       # Compose de desenvolvimento
│   ├── server.js                # Servidor principal
│   ├── games.js                 # Lógica de partidas
│   ├── game.test.js             # Testes unitários
│   ├── fuzz.test.js             # Testes de fuzzing
│   └── package.json             # Dependências
├── nginx/                       # Configuração do Nginx
│   ├── Dockerfile               # Dockerfile do Nginx
│   └── nginx.conf               # Configuração com redirect 80→443
├── k8s/                         # Manifestos Kubernetes
│   ├── namespace.yml
│   ├── secret.yml
│   ├── postgres.yml
│   ├── server.yml
│   ├── nginx.yml
│   ├── cert-manager.yml         # ClusterIssuer Let's Encrypt
│   └── ingress.yml              # Ingress com HTTPS
├── .github/workflows/
│   ├── ci.yml                   # Pipeline de CI
│   └── cd.yml                   # Pipeline de CD
├── docker-compose.prod.yml      # Compose de produção
└── sonar-project.properties     # Configuração do SonarCloud
```

---

## Fases do Projeto

| Fase | Descrição | Status |
|---|---|---|
| 1 | Containerização DEV com hot-reload | ✅ |
| 2 | Docker Compose com PostgreSQL e persistência | ✅ |
| 3 | CI — Build & Lint (Frontend e Backend) | ✅ |
| 4 | CI — Testes Unitários com ciclo TDD | ✅ |
| 5 | CI — Testes de Fuzzing | ✅ |
| 6 | Segurança — SAST & SCA | ✅ |
| 7 | Qualidade — SonarCloud | ✅ |
| 8 | Containerização PROD — multi-stage + Nginx | ✅ |
| 9 | Infraestrutura — Kubernetes | ✅ |
| 10 | CD & Segurança de Rede — HTTPS + Cert Manager | ✅ |