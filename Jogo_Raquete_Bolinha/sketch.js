let xBolinha = 100;
let yBolinha = 50;
let diametro = 19;
let raio = diametro /2;

let colidiu = false;

//sons do jogo abaixo;
let raquetada;
let ponto;
let trilha;

let velocidadeXBolinha = 6;
let velocidadeYBolinha = 3;

let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

let xRaqueteOponente = 386;
let yRaqueteOponente = 157;
let velocidadeYOponente;

let meusPontos = 0;
let pontosOponente = 0;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(400, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  bolinhaNaoFicaPresa()
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete,yRaquete);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  
  mostraRaqueteOponente(xRaqueteOponente,yRaqueteOponente);
  
  function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro);
  }
  
  function movimentaBolinha() {
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
  }
  
  function verificaColisaoBorda() {
    //if (bolinha_estiver_tocando_borda)
  
    if (xBolinha + raio > width ||
       xBolinha - raio < 0){
      velocidadeXBolinha *= -1;
    }
    if (yBolinha > height ||
       yBolinha < 0){
      velocidadeYBolinha *= -1
    }
  }
  
  function mostraRaquete(x,y) {
    rect(x,y,raqueteComprimento,raqueteAltura);
  }
  
  function mostraRaqueteOponente() {
    rect(xRaqueteOponente,yRaqueteOponente,raqueteComprimento,raqueteAltura);
  }
  
  function movimentaMinhaRaquete() {
    if(keyIsDown(UP_ARROW)){
      yRaquete -= 10;
    }
    if(keyIsDown(DOWN_ARROW)){
      yRaquete += 10;
    }
  }
  
  function verificaColisaoRaquete(x,y) {
    colidiu = collideRectCircle(
    x,y,raqueteComprimento, raqueteAltura,xBolinha,yBolinha, raio
    );
    if(colidiu) {
      velocidadeXBolinha *= -1;
      raquetada.play();
    }
   
  }
  
   function verificaColisaoRaqueteOponente(x,y) {
    velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
     yRaqueteOponente += velocidadeYOponente;
     raquetada.play();
    }
  
  
  function movimentaRaqueteOponente(){
    if(keyIsDown(87)){
      yRaqueteOponente -= 10;
    }
    if(keyIsDown(83)){
      yRaqueteOponente += 10;
    }
  }
  
  function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255,140,0));
    rect(80,10,40,25)
    fill(255);
    text(meusPontos, 100, 28);
    fill(color(255,140,0));
    rect(278,10,40,25);
    fill(255);
    
    
    text(pontosOponente, 300, 28);
  }
  
  function marcaPonto() {
    if (xBolinha > 386) {
      meusPontos += 1;
      ponto.play();
      
    }
    if(xBolinha < 10) {
      pontosOponente += 1;
      ponto.play();
    }
  }
  
function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 300;
    }
}

}