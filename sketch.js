function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
// --- CONFIGURAÇÃO DO PROJETO AGRINHO 2026 ---
let tela = 0; // 0: Menu, 1: História/Proposta, 2: Jogo, 3: Vitória, 4: Derrota

// Variáveis de Grande Escala Agrícola
let jogadorX;
let jogadorY;
let jogadorLargura = 80; // Largura total do conjunto (Trator + Carrinho)
let jogadorAltura = 40;
let velocidadeJogador = 8;

let sacasColhidas = 0;
let toneladasProduzidas = 0;
let sustentabilidade = 100;
let fase = 1;

// Objetos com Termos Técnicos do Agronegócio Sustentável
let objetos = [];
let tiposObjetos = [
  { nome: "Manejo Integrado 🌱", tipo: "bom", cor: [50, 205, 50] },
  { nome: "Plantio Direto 🌾", tipo: "bom", cor: [34, 139, 34] },
  { nome: "Energia Limpa ☀️", tipo: "bom", cor: [255, 215, 0] },
  { nome: "Erosão do Solo 🪓", tipo: "ruim", cor: [139, 69, 19] },
  { nome: "Contaminação 💨", tipo: "ruim", cor: [128, 128, 128] },
  { nome: "Pegada Carbono 🛢️", tipo: "ruim", cor: [178, 34, 34] }
];

function setup() {
  createCanvas(750, 500);
  jogadorX = width / 2 - jogadorLargura / 2;
  jogadorY = height - 75;
}

function draw() {
  background(220, 240, 255); // Céu
  
  if (tela === 0) {
    mostrarMenu();
  } else if (tela === 1) {
    mostrarHistoria();
  } else if (tela === 2) {
    executarJogo();
  } else if (tela === 3) {
    mostrarVitoria();
  } else if (tela === 4) {
    mostrarDerrota();
  }
}

// --- TELA 0: MENU ---
function mostrarMenu() {
  background(27, 94, 32);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(34);
  text("AGRO FORTE, FUTURO SUSTENTÁVEL", width / 2, 160);
  textSize(18);
  fill(200);
  text("O Equilíbrio entre Alta Produtividade e Meio Ambiente", width / 2, 200);
  
  // Botão Interativo
  fill(255, 193, 7);
  rect(250, 280, 250, 50, 8);
  fill(0);
  textSize(16);
  text("CONHECER PROPOSTA", width / 2, 305);
}

// --- TELA 1: DIRETRIZES DO PROJETO ---
function mostrarHistoria() {
  background(250, 250, 235);
  textAlign(CENTER, TOP);
  fill(27, 94, 32);
  textSize(24);
  text("PROPOSTA TÉCNICA E CIENTÍFICA", width / 2, 40);
  
  textAlign(LEFT, TOP);
  fill(60);
  textSize(15);
  
  let textoHistoria = 
    "O QUE ESTAMOS BUSCANDO COM ESTE PROJETO?\n" +
    "Provar que o avanço tecnológico (Agrotech) viabiliza safras recordes em toneladas\n" +
    "sem abrir mão da integridade do ecossistema e dos recursos naturais.\n\n" +
    "DIRETRIZES DA SIMULAÇÃO:\n" +
    "• Você opera um Maquinário Colhedor de alta eficiência com carretinho acoplado.\n" +
    "• Adote práticas como Manejo Integrado, Plantio Direto e Uso de Energia Limpa.\n" +
    "• Desvie de impactos severos como a Erosão do Solo e a alta Pegada de Carbono.\n" +
    "• Meta: Atingir a produção em escala industrial mantendo a estabilidade ecológica.";
    
  text(textoHistoria, 60, 110);
  
  textAlign(CENTER, CENTER);
  fill(0, 100, 0);
  textSize(16);
  text("Pressione ESPAÇO para acionar os motores da colheitadeira", width / 2, 420);
}

// --- TELA 2: O JOGO ---
function executarJogo() {
  // Solo Estruturado
  fill(109, 59, 9); rect(0, height - 35, width, 35); // Camada de Terra
  fill(46, 125, 50); rect(0, height - 40, width, 5); // Cobertura Vegetal

  // Movimentação do Maquinário
  if (keyIsDown(LEFT_ARROW) && jogadorX > 0) jogadorX -= velocidadJogador = 8;
  if (keyIsDown(RIGHT_ARROW) && jogadorX < width - jogadorLargura) jogadorX += velocidadJogador = 8;

  // === DESENHO DO JOGADOR (TRATOR + CARRINHO DE CARGA) ===
  
  // 1. Carrinho de Carga Traseiro (Lado Esquerdo do conjunto)
  fill(120); 
  rect(jogadorX, jogadorY + 10, 30, 25, 3);
  
  // Carga de grãos amarela subindo visualmente dentro do carrinho conforme você colhe
  fill(218, 165, 32); 
  let alturaGraos = map(constrain(sacasColhidas, 0, 300), 0, 300, 0, 20);
  rect(jogadorX + 2, (jogadorY + 33) - alturaGraos, 26, alturaGraos, 2);
  
  // Linha de Engate/Conexão entre o carrinho e o trator
  stroke(50); strokeWeight(4);
  line(jogadorX + 30, jogadorY + 25, jogadorX + 40, jogadorY + 25);
  noStroke(); strokeWeight(1);

  // 2. Trator Principal (Lado Direito do conjunto)
  fill(0, 100, 250); 
  rect(jogadorX + 40, jogadorY, 40, 35, 5); // Corpo do trator
  fill(200, 230, 255); 
  rect(jogadorX + 55, jogadorY + 5, 20, 12, 3); // Vidro/Cabine
  
  // Rodas do Sistema completo
  fill(30);
  ellipse(jogadorX + 15, jogadorY + 35, 20, 20); // Roda do carrinho
  ellipse(jogadorX + 50, jogadorY + 35, 22, 22); // Roda traseira do trator
  ellipse(jogadorX + 72, jogadorY + 37, 16, 16); // Roda dianteira do trator

  // Motor de Queda dos Elementos
  let taxaSurgimento = max(12, 35 - fase * 4); 
  if (frameCount % taxaSurgimento === 0) {
    let objAleatorio = random(tiposObjetos);
    objetos.push({
      x: random(30, width - 180),
      y: 0,
      vel: random(4, 6) + (fase * 0.7),
      info: objAleatorio
    });
  }

  // Monitoramento de Objetos em Queda
  for (let i = objetos.length - 1; i >= 0; i--) {
    let o = objetos[i];
    o.y += o.vel;

    // Caixa de Informação do Elemento
    fill(o.info.cor);
    rect(o.x, o.y, 145, 28, 6);
    fill(255); textSize(11); textAlign(CENTER, CENTER);
    text(o.info.nome, o.x + 72, o.y + 14);

    // Sistema de Colisão Abrangente (Trator + Carretinho)
    if (o.y + 28 >= jogadorY && o.y <= jogadorY + jogadorAltura &&
        o.x + 145 >= jogadorX && o.x <= jogadorX + jogadorLargura) {
      
      if (o.info.tipo === "bom") {
        sacasColhidas += 15;
        // Conversão matemática: 1 Saca = 60kg. Toneladas = (Sacas * 60) / 1000
        toneladasProduzidas = (sacasColhidas * 60) / 1000; 
        sustentabilidade = min(100, sustentabilidade + 4);
      } else {
        sustentabilidade -= 20;
      }
      objetos.splice(i, 1);
      continue;
    }

    if (o.y > height) objetos.splice(i, 1);
  }

  // Passagem de Nível de Produtividade
  if (toneladasProduzidas >= 6.0 && fase === 1) fase = 2;
  if (toneladasProduzidas >= 15.0 && fase === 2) tela = 3; // Vitória com volumetria real

  if (sustentabilidade <= 0) tela = 4; // Falência ecológica

  // PAINEL DE DADOS TÉCNICOS (HUD)
  fill(0); textAlign(LEFT, TOP); textSize(15);
  text(`📦 SAFRA ATUAL: ${toneladasProduzidas.toFixed(2)} t (${sacasColhidas} SC)`, 25, 20);
  text(`⚙️ STATUS TECNOLÓGICO: Fase ${fase}`, 25, 45);
  
  text("ÍNDICE DE SUSTENTABILIDADE:", 400, 20);
  fill(200); rect(400, 42, 310, 18, 4);
  fill(sustentabilidade > 40 ? [46, 125, 50] : [198, 40, 40]);
  rect(400, 42, map(sustentabilidade, 0, 100, 0, 310), 18, 4);
}

// --- TELA 3: SUCESSO COOPERATIVO ---
function mostrarVitoria() {
  background(46, 125, 50);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(28);
  text("SUPERÁVIT SUSTENTÁVEL ALCANÇADO! 🌾", width / 2, 160);
  textSize(16);
  text(`Sua propriedade atingiu a marca de ${toneladasProduzidas.toFixed(2)} toneladas de grãos colhidos.`, width / 2, 220);
  text("Provamos que alta performance agrícola convive em harmonia com a preservação!", width / 2, 255);
  
  fill(255, 215, 0);
  text("Pressione ENTER para reiniciar as análises de campo", width / 2, 360);
}

// --- TELA 4: COLAPSO ---
function mostrarDerrota() {
  background(198, 40, 40);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(28);
  text("EXAUSTÃO DO ECOSSISTEMA ❌", width / 2, 160);
  textSize(16);
  text("A priorização do lucro imediato gerou alta Pegada de Carbono e Erosão.", width / 2, 220);
  text("A propriedade tornou-se inviável para as próximas safras.", width / 2, 250);
  
  fill(255, 255, 0);
  text("Pressione ENTER para reavaliar sua estratégia", width / 2, 360);
}

// --- INTERAÇÃO DO TECLADO E MOUSE ---
function keyPressed() {
  if (tela === 1 && keyCode === 32) { // Espaço avança da história para o jogo
    resetarJogo();
    tela = 2;
  }
  if ((tela === 3 || tela === 4) && keyCode === ENTER) {
    tela = 0;
  }
}

function mousePressed() {
  if (tela === 0) {
    if (mouseX > 250 && mouseX < 500 && mouseY > 280 && mouseY < 330) {
      tela = 1;
    }
  }
}

function resetarJogo() {
  sacasColhidas = 0;
  toneladasProduzidas = 0;
  sustentabilidade = 100;
  fase = 1;
  objetos = [];
  jogadorX = width / 2 - jogadorLargura / 2;
}
