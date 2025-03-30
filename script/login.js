const loginBtn = document.querySelector(".button-login");

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

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("password").value;

  if (!email || !senha) {
    alert("Por favor, preencha o e-mail e a senha.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (response.ok) {
        window.location.href = "loading.html?redirect=dashboard.html";
    } else {
        mostrarPopup("❌ Erro: " + data.error);
      }

  } catch (err) {
    console.error("Erro no login:", err);
    alert("Erro de conexão com o servidor.");
  }
});