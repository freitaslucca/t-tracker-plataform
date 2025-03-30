# 🛡️ T-Tracker Backend

API desenvolvida para a plataforma **T-Tracker**, focada em gestão de frotas com segurança, escalabilidade e performance.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Fastify**
- **MongoDB Atlas**
- **Mongoose**
- **JWT (JSON Web Token)**
- **bcryptjs**
- **dotenv**
- **Render (Hospedagem gratuita)**
- **Helmet** – proteção contra vulnerabilidades HTTP
- **Rate Limit** – limite de requisições por IP
- **CORS** – controle de acesso por origem

---

## 📁 Estrutura de Pastas

```
ttracker-backend/
├── server.js
├── .env
├── package.json
└── src/
    ├── controllers/
    │   └── user.controller.js
    ├── models/
    │   └── User.js
    └── routes/
        └── user.routes.js
```

---

## 🧾 Variáveis de Ambiente (.env)

```env
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=uma_chave_segura
```

---

## 🔐 Funcionalidades de Segurança

- Criptografia de senha com `bcryptjs`
- Geração de token JWT após login
- Proteção contra ataques com:
  - `@fastify/helmet`
  - `@fastify/rate-limit`
- CORS configurado para:
  - `http://localhost:5500`
  - `http://127.0.0.1:5500`
  - `https://ttracker-murex.vercel.app`

---

## 📮 Rotas da API

| Método | Rota        | Descrição                        |
|--------|-------------|----------------------------------|
| POST   | /cadastro   | Cria um novo usuário             |
| POST   | /login      | Autentica usuário e gera token   |
| GET    | /           | (opcional) Verifica status da API|

---

## 🔄 Integração com o Frontend

### 📌 Atualização importante:
Após hospedar a API na Render, o frontend passou a usar a URL:

```
https://ttracker-backend.onrender.com
```

### Exemplo no `login.js`:

```js
fetch("https://ttracker-backend.onrender.com/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ email, senha })
});
```

E no `cadastro.js`:

```js
fetch("https://ttracker-backend.onrender.com/cadastro", {
  method: "POST",
  ...
});
```

---

## 🛠️ Hospedagem (Render)

- Conectado ao GitHub
- Variáveis de ambiente configuradas via painel Render
- URL da API: [https://ttracker-backend.onrender.com](https://ttracker-backend.onrender.com)

---

## ✅ Última atualização

30/03/2025 - 02:27
