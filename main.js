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

    const body = document.body;
    const screenHero = document.getElementById('screenHero');
    const quizContainer = document.getElementById('quizContainer');
    const btnAgendar = document.getElementById('btnAgendar');
    const switchBtn = document.getElementById('switchBtn');

    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const btnBackToStep1 = document.getElementById('btnBackToStep1');
    const btnBackToStep2 = document.getElementById('btnBackToStep2');
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

    let currentBip = 1;

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

    // CONTROLE DE ROLAGEM E DINÂMICA DO BOTÃO SOBRE MIM / VOLTAR AO TOPO
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
            // Troca o estado quando a seção "Sobre Mim" entra na tela
            if (sectionPos.top <= window.innerHeight / 2) {
                isAtBottom = true;
                btnSobreMimText.textContent = "Voltar ao topo";
                btnSobreMimArrow.textContent = "↑";
            } else {
                isAtBottom = false;
                btnSobreMimText.textContent = "Sobre Mim";
                btnSobreMimArrow.textContent = "↓";
            }
        });
    }

    // ATUALIZA PAINEL DE FOTO E TEXTO DO QUIZ
    function updateInfoPanel(key) {
        const data = techniquesData[key];
        if (!data) return;

        infoTitle.innerHTML = data.title;
        infoText.innerHTML = data.description;

        if (data.img) {
            techImg.src = data.img;
            techImg.alt = data.title;
            techImgWrapper.classList.add('has-img');
        } else {
            techImgWrapper.classList.remove('has-img');
        }

        infoInlinePanel.classList.add('visible');
    }

    // AÇÃO DE ABRIR O QUIZ (ESCONDE HERO E SOBRE MIM)
    function openQuiz() {
        if (bgAudio) {
            bgAudio.volume = 0.15;
            bgAudio.play().catch(error => {
                console.log("Autoplay bloqueado pelo navegador até interagir:", error);
            });
        }

        // Se o usuário estiver no final da página, rola para o topo antes do fade
        window.scrollTo({ top: 0, behavior: 'smooth' });

        body.classList.add('darkened');
        screenHero.classList.add('fade-out');

        if (sobreMimSection) {
            sobreMimSection.classList.add('fade-out');
        }

        if (btnSobreMim) {
            btnSobreMim.style.display = 'none'; // Esconde o botão durante o quiz
        }

        setTimeout(() => {
            screenHero.classList.add('hidden');
            if (sobreMimSection) {
                sobreMimSection.classList.add('hidden');
            }

            quizContainer.classList.remove('hidden');
            
            void quizContainer.offsetWidth; 
            quizContainer.classList.add('show');

            step1.classList.add('active');
            step2.classList.remove('active');
            step3.classList.remove('active');

            updateInfoPanel('ventosaterapia');
        }, 1600);
    }
// 1. Pega o elemento do nome (pode usar o seletor da classe ou id que você usou no HTML)
const natallyName = document.querySelector('.hero-title') || document.getElementById('natallyName');

// 2. Onde seu código abre o quiz / escurece a tela ao clicar em Agendar:
btnAgendar.addEventListener('click', () => {
    body.classList.add('darkened');
    
    // Adiciona o brilho no nome Natallyane Costa
    if (natallyName) {
        natallyName.classList.add('glow-natally');
    }

    // ... seu código existente para abrir o quiz
});

// 3. Na sua função closeQuiz() que já existe no main.js:
function closeQuiz() {
    body.classList.remove('darkened');
    
    // Remove o brilho ao voltar para a tela inicial
    if (natallyName) {
        natallyName.classList.remove('glow-natally');
    }

    // ... seu código existente para fechar o quiz
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

    // INTERAÇÃO COM INTERROGAÇÕES E SELEÇÃO DE TÉCNICAS
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
                    step1.classList.remove('active');
                    if (selectedValue === "Preciso de Indicação" || selectedValue === "Avaliação Terapêutica") {
                        bookingState.horario = "";
                        step3.classList.add('active');
                    } else {
                        step2.classList.add('active');
                    }
                }, 350);
            });
        }
    });

    if (btnBackToStep1) {
        btnBackToStep1.addEventListener('click', () => {
            step2.classList.remove('active');
            step1.classList.add('active');
        });
    }

    if (btnBackToStep2) {
        btnBackToStep2.addEventListener('click', () => {
            step3.classList.remove('active');
            if (bookingState.tecnica === "Preciso de Indicação" || bookingState.tecnica === "Avaliação Terapêutica") {
                step1.classList.add('active');
            } else {
                step2.classList.add('active');
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
                step2.classList.remove('active');
                step3.classList.add('active');
            }, 300);
        });
    });

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

            window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
        });
    }// ... Mantenha as declarações existentes e adicione:
const btnBackToHero = document.getElementById('btnBackToHero');

// FUNÇÃO PARA VOLTAR DO QUIZ PARA A TELA INICIAL
function closeQuiz() {
    body.classList.remove('darkened');
    quizContainer.classList.remove('show');

    setTimeout(() => {
        quizContainer.classList.add('hidden');
        
        screenHero.classList.remove('hidden');
        if (sobreMimSection) {
            sobreMimSection.classList.remove('hidden');
        }

        void screenHero.offsetWidth; // Force reflow
        screenHero.classList.remove('fade-out');
        if (sobreMimSection) {
            sobreMimSection.classList.remove('fade-out');
        }

        if (btnSobreMim) {
            btnSobreMim.style.display = 'flex'; // Exibe o botão flutuante novamente
        }
    }, 400);
}

if (btnBackToHero) {
    btnBackToHero.addEventListener('click', () => {
        closeQuiz();
    });
}// SISTEMA DE FITAS DE FUMAÇA DE INCENSO (CURVAS DINÂMICAS)
const canvas = document.getElementById('smokeCanvas');
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

    // Dentro do método reset(side):
reset(side) {
    const margin = 120; // Nasce em uma área inicial mais ampla
    this.x = side === 'left' 
        ? Math.random() * margin 
        : canvas.width - (Math.random() * margin);
    
    this.y = canvas.height + 60;
    
    // Subida ULTRA LENTA
    this.vy = -(Math.random() * 0.08 + 0.04); 
    this.vx = (side === 'left' ? 0.15 : -0.15) * (Math.random() * 0.2 + 0.05);

    // Tamanho GIGANTE desde a base
    this.size = Math.random() * 250 + 180; 
    this.maxSize = Math.random() * 600 + 450; // Expande até ocupar quase a tela toda

    // Opacidade suave para não poluir
    this.opacity = 0;
    this.maxOpacity = Math.random() * 0.2 + 0.08; 

    this.life = 0;
    this.maxLife = Math.random() * 900 + 700; // Vida longa para durar bastante tempo
    this.side = side;
}

// Dentro do método update():
update() {
    this.life++;
    
    // Movimento de subida e balanço bem largo e lento
    this.x += this.vx + Math.sin(this.life * 0.004) * 0.3;
    this.y += this.vy;
    
    // Expansão contínua
    if (this.size < this.maxSize) {
        this.size += 0.4;
    }

    // Transição de opacidade bem longa e progressiva
    if (this.life < 150) {
        this.opacity = (this.life / 150) * this.maxOpacity;
    } else if (this.life > this.maxLife - 200) {
        this.opacity = ((this.maxLife - this.life) / 200) * this.maxOpacity;
    }

    if (this.life >= this.maxLife || this.y < -200) {
        this.reset(this.side);
    }
}reset(side) {
        const margin = 40;
        this.startX = side === 'left' 
            ? Math.random() * margin + 20 
            : canvas.width - (Math.random() * margin + 20);
        
        this.startY = canvas.height + 10;
        this.side = side;

        // Quantidade de pontos que formam a fita
        this.segments = 12;
        this.points = [];
        
        for (let i = 0; i < this.segments; i++) {
            this.points.push({
                x: this.startX,
                y: this.startY - (i * 25),
                offset: Math.random() * Math.PI * 2
            });
        }

        // Velocidade vertical (quanto menor, mais lenta)
this.speed = Math.random() * 0.08 + 0.1; 

// Vida longa para dar tempo de subir devagar
this.maxLife = Math.random() * 800 + 600; 

// Tamanho inicial MAIOR
this.size = Math.random() * 120 + 80; 

// Limite de expansão BEM MAIOR e mais aberto
this.maxSize = Math.random() * 450 + 300; 

// Opacidade suave (transparência levemente reduzida para ficar bem aveludada)
this.maxOpacity = Math.random() * 0.25 + 0.12; 

// Movimento de balanço mais aberto/amplo
this.amplitude = Math.random() * 40 + 25;this.speed = Math.random() * 0.1 + 0.2; // Subida bem calma
        this.life = 0;
        this.maxLife = Math.random() * 500 + 400;
        this.size += Math.random() * 500 + 400;
        this.opacity = 0;
        this.maxOpacity = Math.random() * 0.4 + 0.25; // Brilho esbranquiçado
        this.frequency = Math.random() * 0.02 + 0.01;
        this.amplitude = Math.random() * 25 + 15;
    }

    update() {
        this.life++;

        // Sobe os pontos da fita gradativamente
        for (let i = this.points.length - 1; i >= 0; i--) {
            const p = this.points[i];
            p.y -= this.speed;

            // Ondulação senoidal simulando vento/ar
            const waveDirection = this.side === 'left' ? 1 : -1;
            p.x = this.startX + Math.sin(this.life * this.frequency + p.offset + (i * 0.4)) * (this.amplitude * (i / 3)) + (waveDirection * (this.life * 0.08));
        }
// A fumaça vai se abrindo e crescendo bem suavemente enquanto sobe
if (this.size < this.maxSize) {
    this.size += 0.35; // Controle do ritmo de expansão
}
        // Transição de opacidade
        if (this.life < 80) {
            this.opacity = (this.life / 80) * this.maxOpacity;
        } else if (this.life > this.maxLife - 120) {
            this.opacity = ((this.maxLife - this.life) / 120) * this.maxOpacity;
        }

        if (this.life >= this.maxLife || this.points[0].y < -150) {
            this.reset(this.side);
        }
    }

    draw() {
        if (this.opacity <= 0) return;

        ctx.save();
        ctx.beginPath();
        
        // Início da curva na base
        ctx.moveTo(this.points[0].x, this.points[0].y);

        // Desenha curva suave ligando os pontos com curvas de Bézier
        for (let i = 1; i < this.points.length - 1; i++) {
            const xc = (this.points[i].x + this.points[i + 1].x) / 2;
            const yc = (this.points[i].y + this.points[i + 1].y) / 2;
            ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
        }

        // Estilo de linha esbranquiçada e luminosa
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 0.9})`);
        gradient.addColorStop(0.5, `rgba(225, 235, 245, ${this.opacity * 0.6})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = Math.max(1.2, 3 - (this.life * 0.003)); // Pontas mais finas
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        ctx.shadowBlur = 6;
        
        ctx.stroke();
        ctx.restore();
    }
}

function initSmoke() {
    wisps = [];
    // Gera 6 fitas de fumaça contínuas no canto esquerdo e 6 no direito
    for (let i = 0; i < 6; i++) {
        wisps.push(new SmokeRibbon('left'));
        wisps.push(new SmokeRibbon('right'));
    }
}

function animateSmoke() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (document.body.classList.contains('darkened')) {
        wisps.forEach(wisp => {
            wisp.update();
            wisp.draw();
        });
    }
    
    requestAnimationFrame(animateSmoke);
}

initSmoke();
animateSmoke();
});