# 🚚 T-Tracker Frontend

Interface web desenvolvida para a plataforma **T-Tracker**, voltada ao gerenciamento de frotas de caminhões, ônibus e carros.

Acesso em:
https://ttracker-murex.vercel.app/src/login.html



---

## 🎯 Objetivo

Oferecer uma experiência simples, moderna e responsiva para:
- Cadastro de novos clientes
- Login seguro com validação
- Redirecionamento inteligente com splashscreen
- Layout adaptável a desktop e mobile

---

## 📁 Estrutura de Pastas

```
ttracker-frontend/
├── index.html
├── login.html
├── cadastro.html
├── dashboard.html
├── loading.html
├── style/
│   ├── login.css
│   └── cadastro.css
├── js/
│   ├── login.js
│   └── cadastro.js
└── assets/
    └── logositeteste.png
```

---

## 🧪 Funcionalidades

### ✅ Login
- Verifica campos obrigatórios
- Envia dados via `fetch()` para a API
- Exibe splashscreen com caminhão animado ao logar
- Redireciona para `dashboard.html` após sucesso

### 🆕 Cadastro
- Campos obrigatórios validados
- Comparação de senha e confirmação
- Redireciona para tela de login com splash

### 🎨 UI Responsiva
- Layout em grid no desktop
- Ajustes para mobile com o logo fixo e form scrollável
- Paleta de cores oficial do T-Tracker:
  - Azul escuro `#011c35`
  - Laranja queimado `#f5a623`
  - Branco `#ffffff`
  - Cinza claro `#c0c5cc`

### 🪟 Popups
- Estilizados com fundo escuro e cores da marca
- Mensagens de erro e sucesso
- Caminhão animado dentro do popup para reforçar identidade

---

## 🌐 Integração com Backend

- Backend hospedado em: [`https://ttracker-backend.onrender.com`](https://ttracker-backend.onrender.com)
- Arquivos `.js` utilizam `fetch()` com essa URL para login e cadastro

---

## 🔐 Segurança

- Nenhum dado sensível armazenado no frontend
- Token JWT armazenado no `localStorage` (com possibilidade futura de uso de HttpOnly Cookies)
- Backend protegido com CORS e rate limit

---

## ✅ Última atualização

31/03/2025 - 15:46

## 📌 Funcionalidades Planejadas para a Plataforma T-Tracker

A seguir, uma lista com as principais funcionalidades previstas para o sistema:

### 🧑‍💼 Gestão de Usuários
- Cadastro de cliente com validações
- Login com autenticação via JWT
- Tela de dashboard após login

### 🚚 Gestão de Frota
- Cadastro de veículos da frota
- Registro de tipo: caminhão, ônibus ou carro
- Visualização da lista de veículos
- Edição e remoção de veículos

### 🛣️ Controle de Rotas
- Cadastro de rotas definidas pelo supervisor
- Alerta quando o motorista sair da rota
- Histórico de rotas percorridas nos últimos 30 dias

### ⏱️ Controle de Quilometragem e Horas Rodadas
- Registro automático ou manual de km inicial e final
- Cálculo de distância e horas trabalhadas por veículo

### 💰 Cálculo de Custos
- Cálculo de custo de frete por rota
- Relatórios de consumo de combustível
- Controle de manutenções (agendadas e realizadas)

### 📊 Dashboard Inteligente
- Gráficos de desempenho da frota
- Indicadores de uso, custo e eficiência
- Alertas de manutenção e desvio de rota

### 🔒 Segurança
- Acesso autenticado com JWT
- Limite de requisições por tempo (rate limiting)
- Política de CORS configurada
- Senhas criptografadas no banco

### 📱 Responsividade
- Interface mobile-first com adaptação para desktop
- Splashscreen com logo e animações
- Popups customizados com identidade visual da marca

---
