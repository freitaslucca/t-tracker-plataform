# 🚚 T-Tracker Frontend

Interface web desenvolvida para a plataforma **T-Tracker**, voltada ao gerenciamento de frotas de caminhões, ônibus e carros.

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
