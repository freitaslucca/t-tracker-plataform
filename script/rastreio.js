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
  
  document.addEventListener('DOMContentLoaded', () => {
    map = L.map('map').setView([-23.5505, -46.6333], 6); 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
  
    let mapMarkers = [];
  
    function renderVeiculosFiltrados() {
      mapMarkers.forEach(marker => map.removeLayer(marker));
      mapMarkers = [];
  
      const filtros = Array.from(document.querySelectorAll('.status-filter'))
        .filter(input => input.checked)
        .map(input => input.value);
  
      veiculos.forEach(veiculo => {
        if (filtros.includes(veiculo.status)) {
          const marker = L.marker(veiculo.posicao, {
            icon: getVehicleIcon(veiculo.tipo, veiculo.status)
          }).addTo(map)
            .bindPopup(`📍 ${veiculo.nome}<br>${veiculo.funcionario}`);
          veiculo.marker = marker;
          mapMarkers.push(marker);
        }
      });
    }
  
    renderVeiculosFiltrados();
  
    document.querySelectorAll('.status-filter').forEach(input => {
      input.addEventListener('change', renderVeiculosFiltrados);
    });
  
    // 👉 função para centralizar no pin
    window.centralizarNoVeiculo = (funcionario) => {
      const alvo = veiculos.find(v => v.funcionario === funcionario);
      if (alvo) {
        map.setView(alvo.posicao, 12);
        alvo.marker.openPopup();
      }
    };
  
    // Simula movimento
    setInterval(() => {
      veiculos.forEach(veiculo => {
        const latOffset = (Math.random() - 0.5) * 0.01;
        const lngOffset = (Math.random() - 0.5) * 0.01;
        veiculo.posicao = [veiculo.posicao[0] + latOffset, veiculo.posicao[1] + lngOffset];
        if (veiculo.marker) {
          veiculo.marker.setLatLng(veiculo.posicao);
        }
      });
    }, 3000);
  });