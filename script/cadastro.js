const btn = document.getElementById("btnCadastrar");

function mostrarPopup(mensagem, redirecionarPara = null, tempo = 2000) {
    const popup = document.getElementById("popup");
    const msg = document.getElementById("popup-message");
  
    msg.textContent = mensagem;
    popup.classList.remove("hidden");
  
    setTimeout(() => {
      popup.classList.add("hidden");
      if (redirecionarPara) {
        window.location.href = redirecionarPara;
      }
    }, tempo);
  }
btn.addEventListener("click", async () => {
  const nome = document.getElementById("nome").value.trim();
  const documento = document.getElementById("documento").value.trim();
  const cep = document.getElementById("cep").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const empresa = document.getElementById("empresa").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const tipoFrota = document.getElementById("frota").value;
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmar-senha").value;

  if (!nome || !documento || !cep || !endereco || !email || !tipoFrota || !senha || !confirmarSenha) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem.");
    return;
  }

  try {
    const response = await fetch("https://ttracker-backend.onrender.com/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome,
        documento,
        cep,
        endereco,
        empresa,
        email,
        telefone,
        tipoFrota,
        senha
      })
    });

    const data = await response.json();

    if (response.ok) {
        window.location.href = "loading.html?redirect=login.html";
    } else {
        mostrarPopup("❌ Erro: " + data.error);
      }
  } catch (err) {
    console.error("Erro na requisição:", err);
    alert("Erro de conexão com o servidor.");
  }
});