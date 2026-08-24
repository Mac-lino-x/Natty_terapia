document.addEventListener('DOMContentLoaded', () => {
  // BANCO DE DADOS DAS TÉCNICAS
  const techniquesData = {
    ventosaterapia: {
      title: "Ventosaterapia",
      description: "<strong>Procedimento:</strong> Aplicação de ventosas para liberação miofascial, melhora da circulação e alívio de tensões profundas.",
      img: "imagem/Ventosaterapia.jpg"
    },
    relaxante: {
      title: "Massagem Relaxante",
      description: "<strong>Procedimento:</strong> Movimentos suaves e firmes para redução do estresse, ansiedade e relaxamento muscular completo.",
      img: "imagem/Massagem Relaxante.jpg"
    },
    drenagem: {
      title: "Drenagem Linfática",
      description: "<strong>Procedimento:</strong> Técnica manual que estimula o sistema linfático, reduzindo a retenção de líquidos e o inchaço.",
      img: "imagem/Drenagem Linfática.webp"
    },
    indicacao: {
      title: "Avaliação Terapêutica",
      description: "<strong>Procedimento:</strong> Análise individual do seu estado físico e queixas de dor antes do início do tratamento.",
      img: "imagem/Preciso de Indicação.jpg"
    }
  };

  const bookingState = { tecnica: "", horario: "" };

  // ELEMENTOS DO DOM
  const body = document.body;
  const screenHero = document.getElementById('screenHero');
  const quizContainer = document.getElementById('quizContainer');
  const btnAgendar = document.getElementById('btnAgendar');
  const switchBtn = document.getElementById('switchBtn');
  const natallyName = document.querySelector('.hero-title') || document.getElementById('natallyName');

  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  const btnBackToStep1 = document.getElementById('btnBackToStep1');
  const btnBackToStep2 = document.getElementById('btnBackToStep2');
  const btnBackToHero = document.getElementById('btnBackToHero');
  const btnWhatsapp = document.querySelector('.btn-confirmar-whatsapp') || document.getElementById('btnWhatsapp');

  const infoInlinePanel = document.getElementById('infoInlinePanel');
  const infoTitle = document.getElementById('infoTitle');
  const infoText = document.getElementById('infoText');
  const techImg = document.getElementById('techImg');
  const techImgWrapper = document.getElementById('techImgWrapper');

  const sobreMimSection = document.getElementById('sobreMimSection');
  const btnSobreMim = document.getElementById('btnSobreMim');
  const btnSobreMimText = document.getElementById('btnSobreMimText');
  const btnSobreMimArrow = document.getElementById('btnSobreMimArrow');

  const bgAudio = document.getElementById('bgAudio');

  let currentBip = 1;
  let fadeOutInterval = null;

  // REPRODUÇÃO DO SOM DE BEEP
  function playBip() {
    const soundPath = currentBip === 1 ? 'audio/bip1.mp3' : 'audio/bip2.mp3';
    const bipAudio = new Audio(soundPath);
    bipAudio.volume = 0.9;
    bipAudio.play().catch(err => console.log("Erro ao tocar bip:", err));
    currentBip = currentBip === 1 ? 2 : 1;
  }

  // ESCUTA GLOBAL PARA CLIQUES EM BOTÕES
  document.addEventListener('click', (e) => {
    const target = e.target.closest('button, .opt-btn, .info-btn, .right-switch-block, .btn-agendar, .btn-sobre-mim');
    if (target) {
      playBip();
    }
  });

  // CONTROLE DE ROLAGEM E BOTÃO SOBRE MIM
  let isAtBottom = false;
  if (btnSobreMim && sobreMimSection) {
    btnSobreMim.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isAtBottom) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        sobreMimSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    window.addEventListener('scroll', () => {
      const sectionPos = sobreMimSection.getBoundingClientRect();
      if (sectionPos.top <= window.innerHeight / 2) {
        isAtBottom = true;
        if (btnSobreMimText) btnSobreMimText.textContent = "Voltar ao topo";
        if (btnSobreMimArrow) btnSobreMimArrow.textContent = "↑";
      } else {
        isAtBottom = false;
        if (btnSobreMimText) btnSobreMimText.textContent = "Sobre Mim";
        if (btnSobreMimArrow) btnSobreMimArrow.textContent = "↓";
      }
    });
  }

  // ATUALIZA PAINEL DE FOTO E TEXTO DO QUIZ
  function updateInfoPanel(key) {
    const data = techniquesData[key];
    if (!data) return;

    if (infoTitle) infoTitle.innerHTML = data.title;
    if (infoText) infoText.innerHTML = data.description;

    if (data.img && techImg && techImgWrapper) {
      techImg.src = data.img;
      techImg.alt = data.title;
      techImgWrapper.classList.add('has-img');
    } else if (techImgWrapper) {
      techImgWrapper.classList.remove('has-img');
    }

    if (infoInlinePanel) infoInlinePanel.classList.add('visible');
  }

  // AÇÕES DO QUIZ
  function openQuiz() {
    if (bgAudio) {
      if (fadeOutInterval) clearInterval(fadeOutInterval);
      bgAudio.volume = 0.15;
      bgAudio.currentTime = 0;
      bgAudio.play().catch(error => {
        console.log("Autoplay bloqueado pelo navegador até interagir:", error);
      });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    body.classList.add('darkened');
    if (natallyName) natallyName.classList.add('glow-natally');
    if (screenHero) screenHero.classList.add('fade-out');
    if (sobreMimSection) sobreMimSection.classList.add('fade-out');
    if (btnSobreMim) btnSobreMim.style.display = 'none';

    setTimeout(() => {
      if (screenHero) screenHero.classList.add('hidden');
      if (sobreMimSection) sobreMimSection.classList.add('hidden');

      if (quizContainer) {
        quizContainer.classList.remove('hidden');
        void quizContainer.offsetWidth;
        quizContainer.classList.add('show');
      }

      if (step1) step1.classList.add('active');
      if (step2) step2.classList.remove('active');
      if (step3) step3.classList.remove('active');

      updateInfoPanel('ventosaterapia');
    }, 1600);
  }

  function closeQuiz() {
    body.classList.remove('darkened');
    if (natallyName) natallyName.classList.remove('glow-natally');
    if (quizContainer) quizContainer.classList.remove('show');

    setTimeout(() => {
      if (quizContainer) quizContainer.classList.add('hidden');
      if (screenHero) {
        screenHero.classList.remove('hidden');
        void screenHero.offsetWidth;
        screenHero.classList.remove('fade-out');
      }
      if (sobreMimSection) {
        sobreMimSection.classList.remove('hidden');
        sobreMimSection.classList.remove('fade-out');
      }
      if (btnSobreMim) btnSobreMim.style.display = 'flex';
    }, 400);
  }

  if (btnAgendar) {
    btnAgendar.addEventListener('click', (e) => {
      e.preventDefault();
      openQuiz();
    });
  }

  if (switchBtn) {
    switchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openQuiz();
    });
  }

  if (btnBackToHero) {
    btnBackToHero.addEventListener('click', closeQuiz);
  }

  // OPÇÕES DO QUIZ
  const optionWrappers = document.querySelectorAll('.option-wrapper');
  optionWrappers.forEach(wrapper => {
    const optBtn = wrapper.querySelector('.opt-btn');
    const infoBtn = wrapper.querySelector('.info-btn');

    if (infoBtn) {
      infoBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.info-btn').forEach(btn => btn.classList.remove('active'));
        infoBtn.classList.add('active');
        const key = infoBtn.getAttribute('data-info');
        updateInfoPanel(key);
      });
    }

    if (optBtn) {
      optBtn.addEventListener('click', () => {
        document.querySelectorAll('#step1 .opt-btn').forEach(btn => btn.classList.remove('selected'));
        optBtn.classList.add('selected');

        const selectedValue = optBtn.dataset.value;
        bookingState.tecnica = selectedValue;

        if (infoBtn) {
          const key = infoBtn.getAttribute('data-info');
          updateInfoPanel(key);
        }

        setTimeout(() => {
          if (step1) step1.classList.remove('active');
          if (selectedValue === "Preciso de Indicação" || selectedValue === "Avaliação Terapêutica") {
            bookingState.horario = "";
            if (step3) step3.classList.add('active');
          } else {
            if (step2) step2.classList.add('active');
          }
        }, 350);
      });
    }
  });

  if (btnBackToStep1) {
    btnBackToStep1.addEventListener('click', () => {
      if (step2) step2.classList.remove('active');
      if (step1) step1.classList.add('active');
    });
  }

  if (btnBackToStep2) {
    btnBackToStep2.addEventListener('click', () => {
      if (step3) step3.classList.remove('active');
      if (bookingState.tecnica === "Preciso de Indicação" || bookingState.tecnica === "Avaliação Terapêutica") {
        if (step1) step1.classList.add('active');
      } else {
        if (step2) step2.classList.add('active');
      }
    });
  }

  const timeButtons = document.querySelectorAll('#step2 .opt-btn');
  timeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      timeButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      bookingState.horario = btn.dataset.value;

      setTimeout(() => {
        if (step2) step2.classList.remove('active');
        if (step3) step3.classList.add('active');
      }, 300);
    });
  });

// INTEGRAÇÃO WHATSAPP E FADE-OUT SUAVE DE 20 SEGUNDOS
  if (btnWhatsapp) {
    btnWhatsapp.addEventListener('click', () => {
      const phone = "5584988502719";
      let message = "";

      if (bookingState.tecnica === "Preciso de Indicação" || bookingState.tecnica === "Avaliação Terapêutica") {
        message = `Olá Natallyane! Gostaria de uma indicação/avaliação para saber qual a melhor técnica para o meu caso.%0A%0A` +
                  `Qual dia da semana você tem disponível?`;
      } else {
        message = `Olá Natallyane! Gostaria de agendar uma sessão de *${bookingState.tecnica}* no *${bookingState.horario}*.%0A%0A` +
                  `Qual dia da semana você tem disponível?`;
      }

      // Abre a conversa no WhatsApp
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank');

      // FADE-OUT ULTRA SUAVE (DURAÇÃO: 20 SEGUNDOS)
      if (bgAudio) {
        if (fadeOutInterval) clearInterval(fadeOutInterval);

        const duration = 20000; // 20000ms = 20 segundos
        const intervalTime = 100; // Atualiza a cada 0.1s (200 atualizações no total)
        const initialVolume = bgAudio.volume;
        const step = initialVolume / (duration / intervalTime); // Decremento preciso para durar 20s

        fadeOutInterval = setInterval(() => {
          if (bgAudio.volume > step) {
            bgAudio.volume -= step; // Redução imperceptível passo a passo
          } else {
            // Final dos 20 segundos: desativa completamente
            bgAudio.volume = 0;
            bgAudio.pause();          // Desativa o som / pausa o áudio
            bgAudio.currentTime = 0;   // Reseta a faixa para o início
            bgAudio.volume = 1;        // Restaura o volume padrão para o próximo uso
            clearInterval(fadeOutInterval);
          }
        }, intervalTime);
      }
    });
  }
  // CANVAS DE FUMAÇA DE INCENSO
  const canvas = document.getElementById('smokeCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let wisps = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class SmokeRibbon {
      constructor(side) {
        this.reset(side);
      }

      reset(side) {
        const margin = 120;
        this.startX = side === 'left'
          ? Math.random() * margin
          : canvas.width - (Math.random() * margin);

        this.startY = canvas.height + 60;
        this.side = side;
        this.segments = 12;
        this.points = [];

        for (let i = 0; i < this.segments; i++) {
          this.points.push({
            x: this.startX,
            y: this.startY - (i * 25),
            offset: Math.random() * Math.PI * 2
          });
        }

        this.speed = Math.random() * 0.08 + 0.04;
        this.life = 0;
        this.maxLife = Math.random() * 900 + 700;
        this.size = Math.random() * 180 + 120;
        this.maxSize = Math.random() * 600 + 450;
        this.opacity = 0;
        this.maxOpacity = Math.random() * 0.2 + 0.08;
        this.frequency = Math.random() * 0.02 + 0.004;
        this.amplitude = Math.random() * 40 + 25;
      }

      update() {
        this.life++;

        for (let i = this.points.length - 1; i >= 0; i--) {
          const p = this.points[i];
          p.y -= this.speed;
          const waveDirection = this.side === 'left' ? 1 : -1;
          p.x = this.startX + Math.sin(this.life * this.frequency + p.offset + (i * 0.4)) * (this.amplitude * (i / 3)) + (waveDirection * (this.life * 0.08));
        }

        if (this.size < this.maxSize) {
          this.size += 0.4;
        }

        if (this.life < 150) {
          this.opacity = (this.life / 150) * this.maxOpacity;
        } else if (this.life > this.maxLife - 200) {
          this.opacity = ((this.maxLife - this.life) / 200) * this.maxOpacity;
        }

        if (this.life >= this.maxLife || this.points[0].y < -200) {
          this.reset(this.side);
        }
      }

      draw() {
        if (this.opacity <= 0) return;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);

        for (let i = 1; i < this.points.length - 1; i++) {
          const xc = (this.points[i].x + this.points[i + 1].x) / 2;
          const yc = (this.points[i].y + this.points[i + 1].y) / 2;
          ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
        }

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 0.9})`);
        gradient.addColorStop(0.5, `rgba(225, 235, 245, ${this.opacity * 0.6})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = Math.max(1.2, 3 - (this.life * 0.003));
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        ctx.shadowBlur = 6;

        ctx.stroke();
        ctx.restore();
      }
    }

    function initSmoke() {
      wisps = [];
      for (let i = 0; i < 6; i++) {
        wisps.push(new SmokeRibbon('left'));
        wisps.push(new SmokeRibbon('right'));
      }
    }

    function animateSmoke() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (body.classList.contains('darkened')) {
        wisps.forEach(wisp => {
          wisp.update();
          wisp.draw();
        });
      }

      requestAnimationFrame(animateSmoke);
    }

    initSmoke();
    animateSmoke();
  }
});
