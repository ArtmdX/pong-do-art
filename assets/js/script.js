      const canvas = document.getElementById("pongCanvas");
      const ctx = canvas.getContext("2d");
      const mensagem = document.getElementById("mensagem");
      const botaoReiniciar = document.getElementById("reiniciar");

      // Variáveis da bola
      let bolaX = canvas.width / 2;
      let bolaY = canvas.height / 2;
      let bolaRaio = 10;
      let dx = 4;
      let dy = 4;
      let incrementoVelocidade = 0.1; // Aumenta a velocidade a cada colisão com as barras

      // Variáveis das barras
      const barraAltura = 100;
      const barraLargura = 13;
      const distanciaDasParedes = 10; // Espaço entre as barras e as paredes
      let barraEsquerdaY = (canvas.height - barraAltura) / 2;
      let barraDireitaY = (canvas.height - barraAltura) / 2;
      const velocidadeBarra = 6;

      // Variáveis de controle
      let cimaEsquerda = false;
      let baixoEsquerda = false;
      let cimaDireita = false;
      let baixoDireita = false;

      // Variáveis do placar
      let placarEsquerda = 0;
      let placarDireita = 0;

      // Variável do tempo(s)
      let tempoRestante = 60; 

      function inicializa() {
        bolaX = canvas.width / 2;
        bolaY = canvas.height / 2;
        dx = 4;
        dy = 4;
        barraEsquerdaY = (canvas.height - barraAltura) / 2;
        barraDireitaY = (canvas.height - barraAltura) / 2;
        tempoRestante = 60;
        placarDireita = 0
        placarEsquerda = 0
        mensagem.style.display = "none";
        botaoReiniciar.style.display = "none";

        jogo();
        setInterval(atualizaTempo, 1000);
      }

      // Desenha a bola
      function desenhaBola() {
        ctx.beginPath();
        ctx.arc(bolaX, bolaY, bolaRaio, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
      }

      // Desenha as barras
      function desenhaBarra(x, y) {
        ctx.beginPath();
        ctx.rect(x, y, barraLargura, barraAltura);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
      }

      // Desenha o placar
      function desenhaPlacar() {
        ctx.font = "32px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(placarEsquerda, canvas.width / 4, 50); // Placar do jogador da esquerda
        ctx.fillText(placarDireita, (canvas.width / 4) * 3, 50); // Placar do jogador da direita
      }

      // Desenha o tempo restante
      function desenhaTempo() {
        ctx.font = "24px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(`Tempo: ${Math.floor(tempoRestante / 60)}:${(tempoRestante % 60).toString().padStart(2, '0')}`, canvas.width / 2, 50);
      }

      // Atualiza as posições da bola e das barras
      function atualiza() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        desenhaBola();
        desenhaBarra(distanciaDasParedes, barraEsquerdaY); // Barra da esquerda
        desenhaBarra(canvas.width - barraLargura - distanciaDasParedes, barraDireitaY); // Barra da direita
        desenhaPlacar();
        desenhaTempo();

        if (tempoRestante <= 0) {
          // Exibe a mensagem de vitória
          if (placarEsquerda > placarDireita) {
            mensagem.textContent = "JOGADOR DA ESQUERDA GANHOU!";
          } else if (placarDireita > placarEsquerda) {
            mensagem.textContent = "JOGADOR DA DIREITA GANHOU!";
          } else {
            mensagem.textContent = "EMPATE!";
          }
          mensagem.style.display = "block";
          botaoReiniciar.style.display = "block";
          return; // Para a execução do jogo
        }

        bolaX += dx;
        bolaY += dy;

        if (bolaY + dy < bolaRaio || bolaY + dy > canvas.height - bolaRaio) {
          dy = -dy;
        }

        if (bolaX + dx < distanciaDasParedes + barraLargura && bolaY > barraEsquerdaY && bolaY < barraEsquerdaY + barraAltura) {
          dx = -dx;
          dx *= 1 + incrementoVelocidade;
          dy *= 1 + incrementoVelocidade;
        } else if (bolaX + dx > canvas.width - distanciaDasParedes - barraLargura && bolaY > barraDireitaY && bolaY < barraDireitaY + barraAltura) {
          dx = -dx;
          dx *= 1 + incrementoVelocidade;
          dy *= 1 + incrementoVelocidade;
        }

        if (bolaX + dx < 0) {
          placarDireita++;
          bolaX = canvas.width / 2;
          bolaY = canvas.height / 2;
          dx = 4;
          dy = 4;
        } else if (bolaX + dx > canvas.width) {
          placarEsquerda++;
          bolaX = canvas.width / 2;
          bolaY = canvas.height / 2;
          dx = 4;
          dy = 4;
        }

        if (cimaEsquerda && barraEsquerdaY > 0) {
          barraEsquerdaY -= velocidadeBarra;
        } else if (baixoEsquerda && barraEsquerdaY < canvas.height - barraAltura) {
          barraEsquerdaY += velocidadeBarra;
        }

        if (cimaDireita && barraDireitaY > 0) {
          barraDireitaY -= velocidadeBarra;
        } else if (baixoDireita && barraDireitaY < canvas.height - barraAltura) {
          barraDireitaY += velocidadeBarra;
        }
      }

      function atualizaTempo() {
        if (tempoRestante > 0) {
          tempoRestante--;
        }
      }

      document.addEventListener("keydown", function(event) {
        if (event.key == "w") {
          cimaEsquerda = true;
        } else if (event.key == "s") {
          baixoEsquerda = true;
        }

        if (event.key == "ArrowUp") {
          cimaDireita = true;
        } else if (event.key == "ArrowDown") {
          baixoDireita = true;
        }
      });

      document.addEventListener("keyup", function(event) {
        if (event.key == "w") {
          cimaEsquerda = false;
        } else if (event.key == "s") {
          baixoEsquerda = false;
        }

        if (event.key == "ArrowUp") {
          cimaDireita = false;
        } else if (event.key == "ArrowDown") {
          baixoDireita = false;
        }
      });

      botaoReiniciar.addEventListener("click", inicializa);

      function jogo() {
        atualiza();
        if (tempoRestante > 0) {
          requestAnimationFrame(jogo);
        }
      }

      jogo();
      setInterval(atualizaTempo, 1000);