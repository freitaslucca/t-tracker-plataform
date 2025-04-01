let veiculos =  [
    { tipo: 'caminhao', status: 'rodando', nome: 'Truck 123', funcionario: 'João Silva', posicao: [-23.5505, -46.6333] },
    { tipo: 'onibus', status: 'em_manutencao', nome: 'Ônibus 45', funcionario: 'Maria Souza', posicao: [-22.9035, -43.2096] },
    { tipo: 'carro', status: 'alerta', nome: 'Carro 89', funcionario: 'Carlos Lima', posicao: [-21.765, -43.349] },
    { tipo: 'caminhao', status: 'descanso', nome: 'Truck 81', funcionario: 'Pedro Rocha', posicao: [-20.755, -42.349] },
    { tipo: 'caminhao', status: 'ok', nome: 'Truck 77', funcionario: 'Lucas Mendes', posicao: [-21.000, -47.000] }
  ];
let map;

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
  }
  
  // Função pro alerta
  function showAlert(message, tipo, dados = {}) {
    const container = document.getElementById('alert-container');
    const alert = document.createElement('div');
    alert.className = 'alert';
    alert.innerText = message;
  
    alert.addEventListener('click', () => {
      handleAlertClick(tipo, dados);
      container.removeChild(alert);
    });
  
    container.appendChild(alert);
  
    setTimeout(() => {
      if (container.contains(alert)) {
        container.removeChild(alert);
      }
    }, 8000);
  }
  
  function handleAlertClick(tipo, dados) {
    const veiculo = veiculos.find(v =>
      v.funcionario === dados.funcionario ||
      v.nome === dados.caminhao || // caso de rota
      v.nome === dados.placa // caso de manutenção
    );
  
    if (!veiculo || !veiculo.marker) {
      alert("🚫 Veículo não encontrado no mapa.");
      return;
    }
  
    // Centraliza e abre o popup
    map.setView(veiculo.posicao, 10); // pode aumentar o zoom se quiser
    veiculo.marker.openPopup();
  
    // Mensagem complementar por tipo
    switch (tipo) {
      case 'rota':
        alert(`🔍 Caminhão fora da rota: ${dados.caminhao}\nFuncionário: ${dados.funcionario}\nFrete: ${dados.frete}`);
        break;
  
      case 'manutencao':
        alert(`🔧 Manutenção necessária para o veículo: ${dados.placa}`);
        break;
  
      case 'descanso':
        alert(`😴 Funcionário ${dados.funcionario} excedeu o tempo de direção.\nCaminhão: ${dados.caminhao}`);
        break;
  
      default:
        console.warn('Tipo de alerta não reconhecido');
    }
  }
  
  function getVehicleIcon(tipo, status = 'ok') {
    let cor = '#000';
  
    switch (status) {
      case 'rodando': cor = '#1D4ED8'; break;       // azul
      case 'em_manutencao': cor = '#F97316'; break; // laranja
      case 'alerta': cor = '#E63946'; break;        // vermelho
      case 'descanso': cor = '#FACC15'; break;      // amarelo
      case 'ok':
      default: cor = '#22C55E'; break;              // verde
    }
  
    const html = `<i class="fa-solid fa-location-dot fa-2x" style="color: ${cor};"></i>`;
  
    return L.divIcon({
      html: html,
      className: '',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });
  }
  
  // Atualiza a tabela de status dos veículos
function atualizarTabelaStatus() {
    const tabelaBody = document.querySelector('.status-card tbody');
    tabelaBody.innerHTML = ''; // limpa
  
    const contagem = {};
    const total = veiculos.length;
  
    veiculos.forEach(v => {
      contagem[v.status] = contagem[v.status] || { qtd: 0, ultima: null };
      contagem[v.status].qtd++;
      contagem[v.status].ultima = new Date(); // Simula atualização agora
    });
  
    const statusOrdem = ['ok', 'em_manutencao', 'alerta', 'descanso', 'rodando'];
    const statusLabel = {
      ok: '✔️ OK',
      em_manutencao: '🔧 Manutenção',
      alerta: '⚠️ Alerta',
      descanso: '😴 Descanso',
      rodando: '🚚 Rodando'
    };
  
    statusOrdem.forEach(status => {
      const dado = contagem[status] || { qtd: 0, ultima: new Date() };
      const porcentagem = ((dado.qtd / total) * 100).toFixed(0);
      const tempo = 'há poucos instantes';
  
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${statusLabel[status]}</td>
        <td>${dado.qtd}</td>
        <td>${tempo}</td>
        <td>${porcentagem}%</td>
      `;
      tabelaBody.appendChild(tr);
    });
  }
  
  // Atualiza o resumo diário abaixo da tabela
  function atualizarResumoDiario() {
    const resumo = document.querySelector('.resumo-diario');
    resumo.innerHTML = ''; // limpa
  
    const totalKm = Math.floor(Math.random() * 800 + 300);
    const mediaConsumo = (Math.random() * 4 + 3).toFixed(1);
    const entregas = Math.floor(Math.random() * 20 + 10);
    const economia = (Math.random() * 500 + 100).toFixed(2);
  
    const dados = [
      { icone: 'fa-road', titulo: 'Total Rodado Hoje', valor: `${totalKm} km` },
      { icone: 'fa-gas-pump', titulo: 'Consumo Médio', valor: `${mediaConsumo} km/l` },
      { icone: 'fa-box', titulo: 'Entregas Concluídas', valor: `${entregas}` },
      { icone: 'fa-coins', titulo: 'Economia Estimada', valor: `R$ ${economia}` }
    ];
  
    dados.forEach(d => {
      const item = document.createElement('div');
      item.className = 'resumo-item';
      item.innerHTML = `
        <i class="fas ${d.icone} resumo-icon"></i>
        <div>
          <p class="resumo-titulo">${d.titulo}</p>
          <p class="resumo-valor">${d.valor}</p>
        </div>
      `;
      resumo.appendChild(item);
    });
  }
  
  // Chamada inicial
  atualizarTabelaStatus();
  atualizarResumoDiario();

  document.addEventListener('DOMContentLoaded', () => {
    map = L.map('map').setView([-23.5505, -46.6333], 6); 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
  
    veiculos.forEach(veiculo => {
      const marker = L.marker(veiculo.posicao, {
        icon: getVehicleIcon(veiculo.tipo, veiculo.status)
      }).addTo(map)
        .bindPopup(`📍 ${veiculo.nome}<br>${veiculo.funcionario}`);
      veiculo.marker = marker;
    });
  
    // 👉 nova função para centralizar no pin
    window.centralizarNoVeiculo = (funcionario) => {
      const alvo = veiculos.find(v => v.funcionario === funcionario);
      if (alvo) {
        map.setView(alvo.posicao, 12); // pode ajustar zoom
        alvo.marker.openPopup();
      }
    };
  
    // movimento fake opcional
    setInterval(() => {
      veiculos.forEach(veiculo => {
        const latOffset = (Math.random() - 0.5) * 0.01;
        const lngOffset = (Math.random() - 0.5) * 0.01;
        veiculo.posicao = [veiculo.posicao[0] + latOffset, veiculo.posicao[1] + lngOffset];
        veiculo.marker.setLatLng(veiculo.posicao);
      });
    }, 3000);
  });
  const ctx = document.getElementById('grafico-status').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['OK', 'Manutenção', 'Alerta', 'Descanso', 'Rodando'],
      datasets: [{
        label: 'Status (%)',
        data: [41, 17, 8, 8, 25],
        backgroundColor: [
          '#4caf50',
          '#ff9800',
          '#f44336',
          '#ffeb3b',
          '#2196f3'
        ],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.parsed.y}%`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: (value) => value + '%'
          }
        }
      }
    }
  });
