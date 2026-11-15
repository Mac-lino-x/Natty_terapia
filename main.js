// A conexão com o Supabase agora vem de config.js (window.db).

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. REGISTRO DE ACESSOS (SUPABASE)
  // ==========================================
  // Conta uma visita por sessão do navegador (evita contar recarregamentos repetidos).
  // Para não contar as suas próprias visitas, abra o site uma vez com ?admin=1
  // (isso marca o seu navegador e ele deixa de ser contado).
  try {
    if (new URLSearchParams(window.location.search).get('admin') === '1') {
      localStorage.setItem('natty_ignorar_acesso', '1');
    }
  } catch (e) {}

  function deveRegistrarAcesso() {
    try {
      if (localStorage.getItem('natty_ignorar_acesso') === '1') return false;
      if (sessionStorage.getItem('natty_acesso_registrado') === '1') return false;
    } catch (e) {}
    return true;
  }

  const caminho = window.location.pathname;
  const ehIndex = caminho.endsWith('index.html') || caminho.endsWith('/');

  if (window.db && ehIndex && deveRegistrarAcesso()) {
    window.db.from('acessos').insert([{}]).then(({ error }) => {
      if (error) {
        console.error('Erro ao registrar acesso:', error);
      } else {
        try { sessionStorage.setItem('natty_acesso_registrado', '1'); } catch (e) {}
      }
    });
  }

  // ==========================================
  // 2. LANDING PAGE E INTERAÇÕES
  // ==========================================

  const techniquesData = {
    ventosaterapia: {
      title: "Ventosaterapia",
      description: "<strong>Procedimento:</strong> Aplicação de ventosas para liberação miofascial, melhora da circulação e alívio de tensões profundas.<br><br><strong>Objetivo:</strong> Aliviar dores e tensões musculares profundas, soltar a fáscia (a camada que envolve os músculos) e estimular a circulação local. Ajuda a reduzir a sensação de peso, a rigidez e o desconforto em regiões como costas, ombros e lombar, e favorece a recuperação muscular.",
      img: "imagem/Ventosaterapia.jpg"
    },
    relaxante: {
      title: "Massagem Relaxante",
      description: "<strong>Procedimento:</strong> Movimentos suaves e firmes para redução do estresse, ansiedade e relaxamento muscular completo.<br><br><strong>Objetivo:</strong> Proporcionar um momento de pausa para o corpo e a mente: diminuir o estresse e a ansiedade, soltar a musculatura e promover bem-estar e uma sensação de leveza. É ideal para quem busca descansar e desacelerar da rotina.",
      img: "imagem/massagem-relaxante.jpg"
    },
    drenagem: {
      title: "Drenagem Linfática",
      description: "<strong>Procedimento:</strong> Técnica manual que estimula o sistema linfático, reduzindo a retenção de líquidos e o inchaço.<br><br><strong>Objetivo:</strong> Estimular a circulação da linfa para ajudar o corpo a eliminar o excesso de líquidos e toxinas retidos nos tecidos. Reduz o inchaço e a sensação de pernas e corpo pesados, melhora o conforto e é muito procurada para cuidado do corpo e no pós-operatório (com liberação médica).",
      img: "imagem/drenagem-linfatica.jpg"
    },
    modeladora: {
      title: "Massagem Modeladora",
      description: "<strong>Procedimento:</strong> Técnica manual que utiliza movimentos firmes, profundos e repetitivos para remodelar o contorno corporal.<br><br><strong>Objetivo:</strong> Trabalhar o contorno corporal com manobras firmes e profundas, melhorando a circulação e o aspecto da pele e dos tecidos nas áreas tratadas. Auxilia na definição das formas e na sensação de corpo mais firme, como complemento de bons hábitos de alimentação e atividade física (não substitui emagrecimento).",
      img: "imagem/massagem-modeladora.jpg"
    },
    liberacao: {
      title: "Liberação Miofascial",
      description: "<strong>Procedimento:</strong> É indicada principalmente para tensão muscular, rigidez, sobrecarga e restrição de movimento.<br><br><strong>Objetivo:</strong> Soltar as restrições da fáscia e dos músculos que limitam o movimento, aliviando pontos de tensão, rigidez e sobrecarga. O foco é devolver mobilidade, diminuir dores e melhorar a postura e o conforto nos movimentos do dia a dia.",
      img: "imagem/liberacao-miofascial.jpg"
    },
    indicacao: {
      title: "Avaliação Terapêutica",
      description: "<strong>Procedimento:</strong> Análise individual do seu estado físico e queixas de dor antes do início do tratamento.<br><br><strong>Objetivo:</strong> Entender a sua queixa, o local da dor e a sua rotina para indicar a técnica mais adequada ao seu caso. Assim, você não precisa escolher sozinha(o): a avaliação define o melhor caminho e deixa o atendimento mais seguro e eficaz.",
      img: "imagem/preciso-de-indicacao.jpg"
    }
  };

  const bookingState = { tecnica: "", horario: "" };

  function ehIndicacao(valor) {
    return valor === "Preciso de Indicação" || valor === "Avaliação Terapêutica";
  }

  const body = document.body;
  const screenHero = document.getElementById('screenHero');
  const quizContainer = document.getElementById('quizContainer');
  const natallyName = document.querySelector('.brand-title');

  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  const btnBackToStep1 = document.getElementById('btnBackToStep1');
  const btnBackToStep2 = document.getElementById('btnBackToStep2');
  const btnBackToHero = document.getElementById('btnBackToHero');
  const btnWhatsapp = document.getElementById('btnWhatsapp');

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

  // Se uma imagem não carregar, tenta a mesma imagem com outra extensão (jpg, jpeg, png, webp)
  const EXTENSOES = ['jpg', 'jpeg', 'png', 'webp'];
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      const m = img.src.match(/^(.*)\.(\w+)(\?.*)?$/);
      if (!m) return;
      const tentadas = (img.dataset.tried || '').split(',').filter(Boolean);
      tentadas.push(m[2].toLowerCase());
      img.dataset.tried = tentadas.join(',');
      const proxima = EXTENSOES.find(e => !tentadas.includes(e));
      if (proxima) img.src = m[1] + '.' + proxima;
    });
  });

  let currentBip = 1;
  let fadeOutInterval = null;

  // ===== CONTROLE DO ÁUDIO DE FUNDO =====
  const VOLUME_FUNDO = 0.15;        // volume ao tocar
  const DURACAO_MAX_MS = 60000;     // toca no máximo 1 minuto
  const FADE_WHATSAPP_MS = 3000;    // sumir aos poucos ao ir para o WhatsApp
  const FADE_LIMITE_MS = 4000;      // sumir aos poucos ao completar 1 minuto
  let timerLimite = null;

  function cancelarTemporizadores() {
    if (timerLimite) { clearTimeout(timerLimite); timerLimite = null; }
    if (fadeOutInterval) { clearInterval(fadeOutInterval); fadeOutInterval = null; }
  }

  // Abaixa o volume gradativamente até zero e então pausa
  function pararAudio(duracao) {
    if (!bgAudio) return;
    cancelarTemporizadores();
    if (bgAudio.paused) { bgAudio.volume = VOLUME_FUNDO; return; }

    if (!duracao) {                       // parar na hora
      bgAudio.pause();
      bgAudio.volume = VOLUME_FUNDO;
      return;
    }

    const passos = 30;
    const intervalo = duracao / passos;
    const volumeInicial = bgAudio.volume;
    let passo = 0;
    fadeOutInterval = setInterval(() => {
      passo++;
      bgAudio.volume = Math.max(0, volumeInicial * (1 - passo / passos));
      if (passo >= passos) {
        clearInterval(fadeOutInterval);
        fadeOutInterval = null;
        bgAudio.pause();
        bgAudio.volume = VOLUME_FUNDO;
      }
    }, intervalo);
  }

  function iniciarAudio() {
    if (!bgAudio) return;
    cancelarTemporizadores();
    bgAudio.volume = VOLUME_FUNDO;
    bgAudio.currentTime = 0;
    bgAudio.play().catch(() => {});
    // depois de 1 minuto, diminui aos poucos e para
    timerLimite = setTimeout(() => pararAudio(FADE_LIMITE_MS), DURACAO_MAX_MS);
  }

  // Página em segundo plano (troca de aba/app, tela bloqueada): para o som na hora
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pararAudio(0);
  });
  window.addEventListener('pagehide', () => pararAudio(0));

  function playBip() {
    try {
      const soundPath = currentBip === 1 ? 'audio/bip1.mp3' : 'audio/bip2.mp3';
      const bipAudio = new Audio(soundPath);
      bipAudio.volume = 0.9;
      bipAudio.play().catch(() => {});
      currentBip = currentBip === 1 ? 2 : 1;
    } catch (e) {}
  }

  // EFEITO BRILHANTE (FLASH DOURADO) AO INICIAR A TRANSIÇÃO
  function triggerShineFlash() {
    const flash = document.createElement('div');
    flash.className = 'shine-flash';
    document.body.appendChild(flash);
    requestAnimationFrame(() => {
      flash.classList.add('active');
    });
    flash.addEventListener('animationend', () => flash.remove());
    setTimeout(() => { if (flash.parentNode) flash.remove(); }, 900);
  }

  // ATUALIZA PAINEL DE FOTO E TEXTO DO QUIZ
  function updateInfoPanel(key) {
    const data = techniquesData[key];
    if (!data) return;

    if (infoTitle) infoTitle.textContent = data.title;
    if (infoText) infoText.innerHTML = data.description; // texto fixo definido acima (seguro)

    if (data.img && techImg && techImgWrapper) {
      techImg.dataset.tried = '';
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
    playBip();
    triggerShineFlash();

    document.querySelectorAll('.right-switch-block').forEach(sw => sw.classList.add('switch-off'));

    iniciarAudio();

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
    }, 300);
  }

  function closeQuiz() {
    playBip();

    document.querySelectorAll('.right-switch-block').forEach(sw => sw.classList.remove('switch-off'));

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
    }, 300);
  }

  // BOTÕES DE AGENDAR
  // CORREÇÃO: o botão do WhatsApp também tem a classe .btn-agendar e antes
  // reabria o quiz ao ser clicado. Agora ele é excluído deste seletor.
  const agendarButtons = document.querySelectorAll(
    '#btnAgendar, #switchBtn, .right-switch-block, .btn-agendar:not(.btn-whatsapp)'
  );
  agendarButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openQuiz();
    });
  });

  if (btnBackToHero) {
    btnBackToHero.addEventListener('click', closeQuiz);
  }

  // BOTÃO SOBRE MIM — rola até o fim da página
  let isAtBottom = false;
  if (btnSobreMim) {
    btnSobreMim.addEventListener('click', (e) => {
      e.preventDefault();
      playBip();
      if (isAtBottom) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    });

    window.addEventListener('scroll', () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const pageBottom = document.body.scrollHeight - 2;
      if (scrollBottom >= pageBottom) {
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

  // SELEÇÕES DO QUIZ
  const optionWrappers = document.querySelectorAll('.option-wrapper');
  optionWrappers.forEach(wrapper => {
    const optBtn = wrapper.querySelector('.opt-btn');
    const infoBtn = wrapper.querySelector('.info-btn');

    if (infoBtn) {
      infoBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playBip();
        document.querySelectorAll('.info-btn').forEach(btn => btn.classList.remove('active'));
        infoBtn.classList.add('active');
        updateInfoPanel(infoBtn.getAttribute('data-info'));
      });
    }

    if (optBtn) {
      optBtn.addEventListener('click', () => {
        playBip();
        document.querySelectorAll('#step1 .opt-btn').forEach(btn => btn.classList.remove('selected'));
        optBtn.classList.add('selected');

        const selectedValue = optBtn.dataset.value;
        bookingState.tecnica = selectedValue;

        if (infoBtn) {
          updateInfoPanel(infoBtn.getAttribute('data-info'));
        }

        setTimeout(() => {
          if (step1) step1.classList.remove('active');
          if (ehIndicacao(selectedValue)) {
            bookingState.horario = "";
            if (step3) step3.classList.add('active');
          } else {
            if (step2) step2.classList.add('active');
          }
        }, 300);
      });
    }
  });

  if (btnBackToStep1) {
    btnBackToStep1.addEventListener('click', () => {
      playBip();
      if (step2) step2.classList.remove('active');
      if (step1) step1.classList.add('active');
    });
  }

  if (btnBackToStep2) {
    btnBackToStep2.addEventListener('click', () => {
      playBip();
      if (step3) step3.classList.remove('active');
      if (ehIndicacao(bookingState.tecnica)) {
        if (step1) step1.classList.add('active');
      } else {
        if (step2) step2.classList.add('active');
      }
    });
  }

  const timeButtons = document.querySelectorAll('#step2 .opt-btn');
  timeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      playBip();
      timeButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      bookingState.horario = btn.dataset.value;

      setTimeout(() => {
        if (step2) step2.classList.remove('active');
        if (step3) step3.classList.add('active');
      }, 300);
    });
  });

  // WHATSAPP — mensagem agora codificada com encodeURIComponent
  if (btnWhatsapp) {
    btnWhatsapp.addEventListener('click', () => {
      playBip();
      const phone = "5584988502719";
      let message = "";

      if (ehIndicacao(bookingState.tecnica)) {
        message = "Olá Natallyane! Gostaria de uma indicação/avaliação para saber qual a melhor técnica para o meu caso.\n\n" +
                  "Qual dia da semana você tem disponível?";
      } else {
        message = `Olá Natallyane! Gostaria de agendar uma sessão de *${bookingState.tecnica}* no *${bookingState.horario}*.\n\n` +
                  "Qual dia da semana você tem disponível?";
      }

      pararAudio(FADE_WHATSAPP_MS);
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    });
  }

  // CANVAS DE FUMAÇA DE INCENSO
  const canvas = document.getElementById('smokeCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let wisps = [];
    const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

      // só anima quando o quiz está aberto, a aba está visível e o usuário não pediu menos movimento
      if (body.classList.contains('darkened') && !document.hidden && !reduzirMovimento) {
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
